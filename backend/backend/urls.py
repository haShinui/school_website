from django.contrib import admin
from django.urls import path, include
from django.contrib import admin
from app.views import microsoft_callback, manager_dashboard, is_manager, get_user_info, csrf_token_view, api_logout, secure_microsoft_login, secure_allauth_login, signup_course_view, check_auth#, manager_dashboard #, CustomLoginView,
from rest_framework import routers
from django.contrib.auth import views as auth_views
from django.contrib import admin
from allauth.account.decorators import secure_admin_login
from .views import MicrosoftLogin
router = routers.DefaultRouter()



admin.autodiscover()
admin.site.login = secure_admin_login(admin.site.login)


# Define the urlpatterns
urlpatterns = [
    path('admin/', admin.site.urls),  # Admin site
    path('dj-rest-auth/', include('dj_rest_auth.urls')),  # dj-rest-auth endpoints
    path('accounts/', include('allauth.urls')),  # Allauth URLs
    path('dj-rest-auth/Microsoft/', MicrosoftLogin.as_view(), name='Microsoft_login'),  # Microsoft login API
    #path('accounts/microsoft/logins/callback/', MicrosoftLogin.as_view(), name='account_microsoft_callback'),
    #path('accounts/microsoft/logins/callback/', microsoft_callback, name='microsoft_callback'),
    # API endpoints
    path('api/', include([
        path('logout/', api_logout, name='api_logout'),  # Logout API
        path('csrf-token/', csrf_token_view, name='csrf_token_api'),  # CSRF token API
        path('microsoft-secure-login/', secure_microsoft_login, name='secure_microsoft_login'),  # Microsoft secure login
        path('allauth-secure-login/', secure_allauth_login, name='secure_allauth_login'),  # Allauth secure login
        path('signup-course/', signup_course_view, name='signup_course'),  # Course signup API
        path('check-auth/', check_auth, name='check_auth'),  # Check authentication API
        path('user-info/', get_user_info, name='user-info'),  # User info API
        path('is-manager/', is_manager, name='is_manager'),  # Manager check API
        path('manager-dashboard/', manager_dashboard, name='manager_dashboard'),  # Manager dashboard API
    ])),
]



