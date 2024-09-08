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
UserModel = get_user_model()




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
@require_POST
@login_required
def signup_course_view(request):
    try:
        user_profile = request.user.userprofile
        print("Received POST request for course signup.")
        print(f"User: {request.user}")
        print(f"User Profile Role before update: {user_profile.role}")

        # Roles that cannot sign up for the course
        restricted_roles = ['signed_up','completed', 'manager', 'admin']

        if user_profile.role in restricted_roles:
            print(f"Access denied for user with role: {user_profile.role}")
            return JsonResponse({'success': False, 'message': f'Sign up not allowed. You are already a: {user_profile.get_role_display()}'}, status=400)

        if user_profile.role == 'normal':
            user_profile.role = 'signed_up'
            user_profile.save()
            print(f"User Profile Role after update: {user_profile.role}")
            return JsonResponse({'success': True, 'message': 'You have successfully signed up for the course!'})
        else:
            return JsonResponse({'success': False, 'message': 'Unexpected role encountered.'}, status=400)
    except Exception as e:
        logger.error(f'Error during course signup: {str(e)}')
        print(f"Exception occurred: {str(e)}")
        return JsonResponse({'success': False, 'message': f'Error: {str(e)}'}, status=400)

from django.http import JsonResponse
from django.views.decorators.http import require_http_methods

@require_http_methods(["GET"])
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
        # Print the entire request object
        print(request)
        
        # Print the request body (raw data)
        print("Request body:", request.body)
        # Try to parse the JSON data from the request body
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')

        # Log the received username and password
        print(f"Received username: {username}, password: {password}")

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({'success': True, 'message': 'Logged in successfully'})
        else:
            return JsonResponse({'success': False, 'message': 'Authentication failed. Invalid credentials.'}, status=401)
    except json.JSONDecodeError as e:
        return JsonResponse({'success': False, 'message': 'Invalid request format.'}, status=400)

@csrf_protect
@require_POST
def api_logout(request):
    logout(request)
    return JsonResponse({'success': True, 'message': 'You have been logged out successfully.'})