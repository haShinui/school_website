from django.shortcuts import redirect, HttpResponse
from django.http import HttpResponseForbidden

from django.conf import settings
from django.contrib.auth import login, get_user_model, logout
from django.urls import reverse
import msal
import requests
from azure_auth.handlers import AuthHandler
from azure_auth.exceptions import TokenError
import json
UserModel = get_user_model()

def initiate_oauth(request):
    """Initiates the OAuth flow by redirecting the user to the Azure AD authorization page."""
    msal_app = msal.ConfidentialClientApplication(
        client_id=settings.AZURE_AUTH["CLIENT_ID"],
        client_credential=settings.AZURE_AUTH["CLIENT_SECRET"],
        authority=settings.AZURE_AUTH["AUTHORITY"],
    )

    state = msal_app.get_state()
    next_url = request.GET.get('next', '/')
    state_data = json.dumps({'state': state, 'next': next_url})
    request.session['oauth2_state'] = state_data

    auth_url = msal_app.get_authorization_request_url(
        scopes=settings.AZURE_AUTH["SCOPES"],
        redirect_uri=settings.AZURE_AUTH["REDIRECT_URI"],
        state=state_data
    )
    return redirect(auth_url)

import logging

# Set up logger
logger = logging.getLogger('azure_auth')

def azure_auth_callback(request):
    try:
        # Step 1: Retrieve token using auth code flow
        auth_handler = AuthHandler(request)
        token_result = auth_handler.get_token_from_flow()

        # Debug: Print the token result
        print("Token Result:", token_result)

        # Step 2: Get user information from Microsoft Graph API
        graph_response = requests.get(
            "https://graph.microsoft.com/v1.0/me",
            headers={"Authorization": f"Bearer {token_result['access_token']}"},
        )

        # Debug: Print the graph response status and data
        print("Graph API Response Status:", graph_response.status_code)
        print("Graph API Response Data:", graph_response.json())

        if graph_response.status_code != 200:
            raise TokenError(f"Error fetching user info: {graph_response.status_code}")

        user_data = graph_response.json()

        # Step 3: Get or create user in Django
        email = user_data.get("mail", "")
        first_name = user_data.get("givenName", "")
        last_name = user_data.get("surname", "")

        user, created = UserModel.objects.get_or_create(
            username=email,
            defaults={
                "first_name": first_name,
                "last_name": last_name,
                "email": email,
                "is_staff": True,
                "is_active": True,
            },
        )

        # Update the user if they already exist
        if not created:
            user.first_name = first_name
            user.last_name = last_name
            user.email = email
            user.save()

        # Step 4: Log the user in
        login(request, user)

        # Step 5: Redirect to home page
        return redirect(settings.LOGIN_REDIRECT_URL)

    except ValueError as e:
        # Log the ValueError, particularly the missing state error
        logger.error("ValueError: %s", str(e))
        return HttpResponseForbidden("Authentication failed due to a missing state.")
    except TokenError as e:
        logger.error("TokenError: %s", str(e))
        return HttpResponseForbidden(f"Authentication failed: {str(e)}")
    
def home_view(request):
    if not request.user.is_authenticated:
        return HttpResponse("You are not logged in")
    return HttpResponse(f"Welcome")

def logout_view(request):
    auth_handler = AuthHandler(request)
    logout(request)
    logout_url = f"{settings.AZURE_AUTH['AUTHORITY']}/oauth2/v2.0/logout"
    logout_url += f"?post_logout_redirect_uri={settings.AZURE_AUTH.get('LOGOUT_REDIRECT_URI', '/')}"
    return redirect(logout_url)
