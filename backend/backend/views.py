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
from django.urls import reverse_lazy

from dj_rest_auth.registration.views import SocialLoginView
from dj_rest_auth.social_serializers import MicrosoftLoginSerializer

class MicrosoftLogin(SocialLoginView):
   """
   Microsoft Login
   """
   adapter_class = MicrosoftGraphOAuth2Adapter
   client_class = OAuth2Client
   callback_url = reverse_lazy('account_microsoft_callback')


