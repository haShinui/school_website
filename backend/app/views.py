from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required, user_passes_test
from django.views.decorators.csrf import csrf_protect, ensure_csrf_cookie
from django.contrib.auth import logout, login, authenticate
from django.views.decorators.http import require_POST
from django.urls import reverse
import json
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from django.contrib.auth import logout
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.contrib.auth import get_user_model
from django.middleware.csrf import get_token
from django.contrib.auth.models import User
from allauth.account.views import LoginView
#from django_ratelimit.decorators import ratelimit
from axes.models import AccessAttempt
from django.http import JsonResponse
from axes.handlers.proxy import AxesProxyHandler
from django.conf import settings
from django.utils import timezone
from django.core.cache import cache
from axes.signals import user_locked_out
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

import math
import logging

import requests
UserModel = get_user_model()

from django.contrib.auth import logout, authenticate
from django.http import JsonResponse


def index(request, path=None):
    """
    This serves the React frontend's index.html file for all routes except API routes.
    """
    return render(request, 'index.html')

def get_client_ip(request):
    """
    Retrieves the client's IP address from the request, considering possible reverse proxies.
    """
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        # X-Forwarded-For can contain multiple IPs; take the first one
        ip = x_forwarded_for.split(',')[0].strip()
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip
@ensure_csrf_cookie
def csrf_token_view(request):
    """
    Provides a CSRF token to be used in subsequent requests.
    """
    csrf_token = get_token(request)
    return JsonResponse({'csrfToken': csrf_token})

@ensure_csrf_cookie
def get_initial_data(request):
    """
    Returns initial data along with a CSRF token.
    """
    csrf_token = get_token(request)
    return JsonResponse({'message': 'Initial data and CSRF token set', 'csrfToken': csrf_token})


@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def check_auth(request):
    print(request.user.userprofile.role)
    return JsonResponse({
        'isAuthenticated': request.user.is_authenticated,
        'role': request.user.userprofile.role
    })
# Define the test to check if the user is a manager
@csrf_protect
@login_required
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['GET'])
def is_manager(request):
    user_profile = request.user.userprofile  # Adjust based on your user profile setup
    is_manager = user_profile.role == 'manager'
    return JsonResponse({'isManager': is_manager})


@require_POST
@csrf_protect
@login_required
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def manager_dashboard(request):
    if request.user.userprofile.role != 'manager':  # Adjust according to your user profile
        return JsonResponse({'error': 'Unauthorized'}, status=403)

    users = User.objects.exclude(is_superuser=True).select_related('userprofile').values('username', 'first_name', 'userprofile__role')
    return JsonResponse(list(users), safe=False)

@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_user_info(request):
    """
    Fetches user information if the user is authenticated via session or token.
    """
    if request.user.is_authenticated:
        user_data = {
            'username': request.user.username,
            'first_name': request.user.first_name,
            'last_name': request.user.last_name,
        }
        return JsonResponse({'success': True, 'user': user_data})
    else:
        return JsonResponse({'success': False, 'message': 'Unauthorized'}, status=401)


@csrf_protect
@login_required
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def manager_dashboard(request):
    print("Accessing manager dashboard")
    users = User.objects.exclude(is_superuser=True).select_related('userprofile').values('username', 'first_name', 'userprofile__role')
    users_list = list(users)
    return JsonResponse(users_list, safe=False)

@csrf_protect
@require_POST
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def signup_course_view(request):
    user_profile = getattr(request.user, 'userprofile', None)
    if user_profile.role in ['signed_up', 'completed', 'manager', 'admin']:
        return JsonResponse({'success': False, 'message': 'Sign up not allowed.'}, status=400)

    if user_profile.role == 'normal':
        user_profile.role = 'signed_up'
        user_profile.save()
        return JsonResponse({'success': True, 'message': 'You have successfully signed up for the course!'})

    return JsonResponse({'success': False, 'message': 'Unexpected role encountered.'}, status=400)

@require_POST
@csrf_protect
def secure_microsoft_login(request):
    # Redirect to the original Microsoft login URL provided by allauth
    login_url = request.build_absolute_uri(reverse('microsoft_login'))
    return JsonResponse({'login_url': login_url})

def microsoft_callback(request):
    """
    Handles the callback from Microsoft after the user has authenticated.
    If successful, it generates and returns a new token.
    """
    # Get the user associated with this request (from the session or authentication flow)
    user = request.user

    if user.is_authenticated:
        # Delete old token if it exists
        Token.objects.filter(user=user).delete()

        # Generate new token
        token, _ = Token.objects.get_or_create(user=user)

        return JsonResponse({
            'success': True,
            'message': 'Microsoft login successful.',
            'token': token.key
        }, status=200)
    else:
        return JsonResponse({'success': False, 'message': 'Login failed.'}, status=401)

# 5 requests per minute per IP
@csrf_protect
@require_POST
def secure_allauth_login(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'Only POST method is allowed.'}, status=405)
    
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({'success': False, 'message': 'Invalid JSON format.'}, status=400)
    
    username = data.get('username')
    password = data.get('password')
    
    
    if not username or not password:
        return JsonResponse({'success': False, 'message': 'Username and password are required.'}, status=400)
    
    user = authenticate(request, username=username, password=password)
    if user is not None:
        # Log the user in
        login(request, user)

        # Delete old token (if it exists)
        Token.objects.filter(user=user).delete()

        # Generate new token
        token, _ = Token.objects.get_or_create(user=user)

        return JsonResponse({
            'success': True, 
            'message': 'Logged in successfully.',
            'token': token.key  # Return the new token
        }, status=200)
    else:
        return JsonResponse({'success': False, 'message': 'Authentication failed.'}, status=401)
    
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.contrib.auth import logout

@csrf_protect
@require_POST
def api_logout(request):
    if request.user.is_authenticated:
        # Get the user's token
        try:
            token = Token.objects.get(user=request.user)
            token.delete()  # Delete the token
        except Token.DoesNotExist:
            return JsonResponse({'success': False, 'message': 'Token not found.'}, status=400)
        
        # Log out the user
        logout(request)

        response = JsonResponse({'success': True, 'message': 'Logged out successfully.'})
        response.delete_cookie('auth_token')  # Optionally, delete the auth cookie if applicable
        return response
    else:
        return JsonResponse({'success': False, 'message': 'No authenticated user to log out.'}, status=401)