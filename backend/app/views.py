from django.http import JsonResponse
from django.shortcuts import redirect
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
import requests
UserModel = get_user_model()

from django.contrib.auth import logout, authenticate
from django.http import JsonResponse

@ensure_csrf_cookie
def csrf_token_view(request):
    return JsonResponse({'csrfToken': get_token(request)})
@ensure_csrf_cookie
def get_initial_data(request):
    # Some logic to return initial data required by the app
    return JsonResponse({'message': 'Initial data and CSRF token set'})

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
@ensure_csrf_cookie
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
            return JsonResponse({'success': True, 'message': 'Logged in successfully'})
        else:
            return JsonResponse({'success': False, 'message': 'Authentication failed'}, status=401)
    
    except json.JSONDecodeError:
        return JsonResponse({'success': False, 'message': 'Invalid request format.'}, status=400)

from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.contrib.auth import logout

@require_POST
def api_logout(request):
    print("hello logout")
    # If the user is authenticated, handle the logout process
    if request.user.is_authenticated:
        # Clear the session and delete the cookie
        logout(request)  # This clears the session and logs the user out
        response = JsonResponse({'success': True, 'message': 'You have been logged out successfully.'})
        response.delete_cookie('auth_token')  # Explicitly instruct the browser to delete the auth_token cookie
        print("Token and session cleared")
        return response
    else:
        return JsonResponse({'success': False, 'message': 'No authenticated user to log out.'}, status=401)
