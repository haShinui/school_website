# backend/views.py

from django.shortcuts import redirect
from msal import ConfidentialClientApplication
from django.conf import settings
from django.http import HttpResponse

def login(request):
    msal_app = ConfidentialClientApplication(
        client_id=settings.MSAL_CLIENT_ID,
        client_credential=settings.MSAL_CLIENT_SECRET,
        authority=settings.MSAL_AUTHORITY,
    )
    auth_url = msal_app.get_authorization_request_url(
        scopes=settings.MSAL_SCOPES,
        redirect_uri="http://localhost:8000/accounts/msal/callback/"
    )
    return redirect(auth_url)

def callback(request):
    msal_app = ConfidentialClientApplication(
        client_id=settings.MSAL_CLIENT_ID,
        client_credential=settings.MSAL_CLIENT_SECRET,
        authority=settings.MSAL_AUTHORITY,
    )
    code = request.GET.get('code')
    result = msal_app.acquire_token_by_authorization_code(
        code,
        scopes=settings.MSAL_SCOPES,
        redirect_uri="http://localhost:8000/accounts/msal/callback/"
    )
    if 'access_token' in result:
        request.session['user'] = result.get('id_token_claims')
        return redirect('/')  # Redirect to the frontend or another URL
    return HttpResponse("Login failed", status=401)

def logout(request):
    request.session.flush()  # Clear the session data
    return redirect('https://login.microsoftonline.com/common/oauth2/v2.0/logout?post_logout_redirect_uri=http://localhost:8082/')
