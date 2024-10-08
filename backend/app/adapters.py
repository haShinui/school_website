
from allauth.socialaccount.adapter import DefaultSocialAccountAdapter
from django.conf import settings

class MySocialAccountAdapter(DefaultSocialAccountAdapter):
    def is_open_for_signup(self, request, sociallogin):
        return True
    def get_login_redirect_url(self, request):
        # Redirect to Vue.js frontend after login
        return 'https://www.fgz-fablab.ch/'
    
# myapp/adapters.py

from allauth.account.adapter import DefaultAccountAdapter
from django.forms import ValidationError

class NoSignupAdapter(DefaultAccountAdapter):

    def is_open_for_signup(self, request):
        return False
    def get_login_redirect_url(self, request):
        return 'https://www.fgz-fablab.ch/'  # Redirect to frontend homepage
    
    

