from django.http import JsonResponse
from django.shortcuts import redirect
from allauth.account.views import LoginView
from django.contrib.auth import get_user_model
from django.contrib.auth.decorators import login_required
from django.middleware.csrf import get_token
from django.views.decorators.csrf import csrf_protect, csrf_exempt, ensure_csrf_cookie
from django.contrib.auth import logout, login
from django.views.decorators.http import require_POST
from django.urls import reverse
import json
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