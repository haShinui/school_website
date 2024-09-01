from django.contrib import admin
from django.urls import path, include
from django.contrib import admin
from app.views import get_user_info, api_logout, csrf_token_view, secure_microsoft_login, secure_allauth_login #, CustomLoginView,
from rest_framework import routers
from django.contrib.auth import views as auth_views
router = routers.DefaultRouter()
from django.contrib import admin
from allauth.account.decorators import secure_admin_login

admin.autodiscover()
admin.site.login = secure_admin_login(admin.site.login)


urlpatterns = [
    #path('accounts/logout/', auth_views.LogoutView.as_view(), name='logout'),
    #path('api/accounts/', vue_accounts_view, name='vue_accounts_view'),  # Account management API
    path('admin/', admin.site.urls),  # Admin site
    path('accounts/', include('allauth.urls')),  # Ensure this is included for Allaut
    #path('microsoft/', microsoft_login_link_view, name='microsoft-login'),
    #path('accounts/login/', CustomLoginView.as_view(), name='account_login'),
    #path('test/', test_view, name='test'),
    #path('accounts/', include('allauth.urls')),
    #path('accounts/', include('allauth.socialaccount.urls')),
    #path('custom-login/', your_custom_login_view, name='custom_login'),
    
    path('api/', include([
        path('user-info/', get_user_info, name='user_info_api'),
        path('logout/', api_logout, name='api_logout'),
        path('csrf-token/', csrf_token_view, name='csrf_token_api'),
        path('microsoft-secure-login/', secure_microsoft_login, name='secure_microsoft_login'),
        path('allauth-secure-login/', secure_allauth_login, name='secure_allauth_login'),
        #path('accounts/login/', CustomLoginView.as_view(), name='account_login'),  # Login API
    ])),
]




