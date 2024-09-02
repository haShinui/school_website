from django.shortcuts import redirect, HttpResponse
from django.http import HttpResponseForbidden


from django.shortcuts import render, redirect, HttpResponse
from django.urls import include, path
from django.contrib import admin
from allauth.socialaccount.models import SocialAccount
from django.contrib.auth.decorators import login_required
#from myapp.views import microsoft_login
from django.urls import reverse
from django.shortcuts import redirect
from allauth.socialaccount.models import SocialApp
from allauth.socialaccount.providers.microsoft.views import MicrosoftGraphOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from allauth.socialaccount.providers.oauth2.views import OAuth2LoginView

from django.conf import settings
from django.contrib.auth import login, get_user_model, logout
from django.urls import reverse
import json


