from django.http import JsonResponse
from django.shortcuts import redirect
from allauth.account.views import LoginView
from django.contrib.auth import get_user_model
from django.contrib.auth.decorators import login_required, user_passes_test
from django.middleware.csrf import get_token
from django.views.decorators.csrf import csrf_protect, csrf_exempt, ensure_csrf_cookie
from django.contrib.auth import logout, login
from django.views.decorators.http import require_POST
from django.urls import reverse
import json
from django.contrib.auth.models import User
from django.views.decorators.http import require_http_methods
from rest_framework_simplejwt.tokens import RefreshToken
from django.dispatch import receiver
from allauth.account.signals import user_logged_in
from rest_framework.authtoken.models import Token
from django.http import HttpResponse
from allauth.account.signals import user_logged_in

from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from django.http import JsonResponse
UserModel = get_user_model()

@receiver(user_logged_in)
def create_or_update_token(sender, request, user, **kwargs):
    token, created = Token.objects.get_or_create(user=user)
    response = HttpResponse()
    response.set_cookie('auth_token', token.key, httponly=True, max_age=3600*24*14, samesite='Lax', secure=True)
    return response



@login_required
def get_user_info(request):
    user = request.user
    
    if user.is_authenticated:
        if user.has_usable_password():  # This implies the user is using the normal username/password login
            user_data = {
                'username': user.username
            }
        else:  # For users authenticated via other means, like Microsoft login
            user_data = {
                'first_name': user.first_name,
                'last_name': user.last_name,
                'email': user.email,
            }
        
        return JsonResponse({
            'isAuthenticated': True,
            'user': user_data
        })
    else:
        return JsonResponse({
            'isAuthenticated': False,
            'message': 'You are not logged in.'
        })


import logging

logger = logging.getLogger(__name__)

@csrf_protect
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
@require_POST
def signup_course_view(request):
    user_profile = request.user.userprofile
    if user_profile.role in ['signed_up', 'completed', 'manager', 'admin']:
        return JsonResponse({
            'success': False,
            'message': 'Sign up not allowed.'
        }, status=400)

    if user_profile.role == 'normal':
        user_profile.role = 'signed_up'
        user_profile.save()
        Token.objects.filter(user=request.user).delete()
        new_token = Token.objects.create(user=request.user)
        response = JsonResponse({
            'success': True,
            'message': 'You have successfully signed up for the course!',
            'new_token': new_token.key
        })
        response.set_cookie('auth_token', new_token.key, httponly=True, max_age=3600*24*14, samesite='Lax', secure=True)
        return response
    return JsonResponse({'success': False, 'message': 'Unexpected role encountered.'}, status=400)


from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from rest_framework.permissions import IsAuthenticatedOrReadOnly


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticatedOrReadOnly])
def check_auth(request):
    if request.user.is_authenticated:
        # If the user is authenticated, return their username and role
        user_profile = request.user.userprofile  # Assuming the user has a related UserProfile model
        return JsonResponse({
            'isAuthenticated': True,
            'user': {
                'username': request.user.username,
                'first_name': request.user.first_name,
                'last_name': request.user.last_name,
                'role': user_profile.role  # Assuming user_profile has a `role` field
            }
        })
    else:
        # If the user is not authenticated, return false with no user data
        return JsonResponse({
            'isAuthenticated': False,
            'user': None
        })

        
# Define the test to check if the user is a manager
def is_manager(user):
    return user.userprofile.role == 'manager'        
        
@csrf_protect
@require_POST
@login_required
@user_passes_test(is_manager)
def manager_dashboard(request):
    users = User.objects.exclude(is_superuser=True).select_related('userprofile').values('username', 'first_name', 'userprofile__role')
    users_list = list(users)
    return JsonResponse(users_list, safe=False)

        
from django.contrib.auth import logout, authenticate
from django.http import JsonResponse

@ensure_csrf_cookie
def csrf_token_view(request):
    return JsonResponse({'csrfToken': get_token(request)})

@csrf_protect
@require_POST
def secure_microsoft_login(request):
    # Redirect to the original Microsoft login URL provided by allauth
    login_url = request.build_absolute_uri(reverse('microsoft_login'))
    return JsonResponse({'login_url': login_url})

@csrf_protect
@require_POST
def secure_allauth_login(request):
    try:
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            token, _ = Token.objects.get_or_create(user=user)
            response = JsonResponse({
                'success': True,
                'message': 'Logged in successfully',
                'token': token.key  # Optionally return the token in the response
            })
            response.set_cookie(
                'auth_token', 
                token.key, 
                httponly=True, 
                max_age=3600*24*14,  # 14 days
                samesite='Lax',
                secure=True  # Ensure you use HTTPS
            )
            return response
        else:
            return JsonResponse({'success': False, 'message': 'Authentication failed'}, status=401)
    
    except json.JSONDecodeError:
        return JsonResponse({'success': False, 'message': 'Invalid request format.'}, status=400)
@require_POST
def api_logout(request):
    # If the user is authenticated, delete their token
    if request.user.is_authenticated:
        Token.objects.filter(user=request.user).delete()
        print(f"token deleted")
    logout(request)  # This clears the session and logs the user out
    return JsonResponse({'success': True, 'message': 'You have been logged out successfully.'})