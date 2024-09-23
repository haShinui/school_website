from django.contrib import admin
from django.urls import path, include
from app.views import (
    index, microsoft_callback, manager_dashboard, is_manager,
    get_user_info, csrf_token_view, api_logout, secure_microsoft_login, 
    secure_allauth_login, signup_course_view, check_auth, send_email,
    send_date_time_email, send_course_signup_email
)
from rest_framework import routers
from django.http import HttpResponse
from django.contrib.auth import views as auth_views
from allauth.account.decorators import secure_admin_login
from .views import MicrosoftLogin
from django.conf.urls.static import static
from django.conf import settings
from allauth.account.views import LoginView, LogoutView
from allauth.socialaccount.providers.microsoft.views import oauth2_login, oauth2_callback
# Create a simple favicon handler
def empty_favicon(request):
    return HttpResponse(status=204)  # Return empty response

# Admin site settings
admin.autodiscover()
admin.site.login = secure_admin_login(admin.site.login)

# Define the urlpatterns
urlpatterns = [
    path('admin/', admin.site.urls),  # Admin site
    #path('dj-rest-auth/', include('dj_rest_auth.urls')),  # dj-rest-auth endpoints
    path('accounts/', include('allauth.urls')),  # Allauth URLs
    #path('accounts/login/', LoginView.as_view(), name='account_login'),  # Allauth login view
    #path('accounts/logout/', LogoutView.as_view(), name='account_logout'),  # Allauth logout view
    path('accounts/microsoft/login/', oauth2_login, name='microsoft_login'),
    path('accounts/microsoft/login/callback/', oauth2_callback, name='microsoft_callback'),

    #path('accounts/login/', LoginView.as_view(), name='account_login'),  # Enable only the login view
    #path('accounts/logout/', LogoutView.as_view(), name='account_logout'),  # Enable logout view
    #path('dj-rest-auth/Microsoft/', MicrosoftLogin.as_view(), name='Microsoft_login'),  # Microsoft login API
    path('favicon.ico', empty_favicon),  # Handle favicon requests
    
    # API endpoints
    path('api/', include([
        path('logout/', api_logout, name='api_logout'),  # Logout API
        path('csrf-token/', csrf_token_view, name='csrf_token_api'),  # CSRF token API
        path('microsoft-secure-login/', secure_microsoft_login, name='secure_microsoft_login'),  # Microsoft secure login
        path('allauth-secure-login/', secure_allauth_login, name='secure_allauth_login'),  # Allauth secure login
        path('signup-course/', signup_course_view, name='signup_course'),  # Course signup API
        path('check-auth/', check_auth, name='check_auth'),  # Check authentication API
        path('user-info/', get_user_info, name='user_info'),  # User info API
        path('is-manager/', is_manager, name='is_manager'),  # Manager check API
        path('manager-dashboard/', manager_dashboard, name='manager_dashboard'),  # Manager dashboard API
        path('send-email/', send_email, name='send-email'),
        path('send-course-signup-email/', send_course_signup_email, name='send_course_signup_email'),
        path('send-date-time-email/', send_date_time_email, name='send_date_time_email'),
    ])),

    # Catch-all route for React frontend
    #path('', index, name='index'),  # Serve React index.html for all other routes
    #path('<path:path>', index),  # Catch-all to let React handle routing
]
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)