"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
# backend/urls.py
from django.contrib import admin
from django.urls import path
from app.views import home_view, about_view  # Your app-specific views
from .views import login, callback, logout  # MSAL views for authentication

urlpatterns = [
    # Admin site
    path('admin/', admin.site.urls),
    
    # App-specific API endpoints
    path('api/home/', home_view, name='home'),
    path('api/about/', about_view, name='about'),
    
    # MSAL Authentication URLs
    path('accounts/msal/login/', login, name='msal_login'),
    path('accounts/msal/callback/', callback, name='msal_callback'),
    path('accounts/msal/logout/', logout, name='msal_logout'),
]