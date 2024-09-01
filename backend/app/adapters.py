
from allauth.socialaccount.adapter import DefaultSocialAccountAdapter
from django.conf import settings

class MySocialAccountAdapter(DefaultSocialAccountAdapter):
    def get_login_redirect_url(self, request):
        # Redirect to Vue.js frontend after login
        return settings.LOGIN_REDIRECT_URL
    
# myapp/adapters.py

from allauth.account.adapter import DefaultAccountAdapter
from django.forms import ValidationError

class NoSignupAdapter(DefaultAccountAdapter):

    def is_open_for_signup(self, request):
        # Only allow sign-up through Microsoft
        if request.session.get('socialaccount_sociallogin'):
            return True
        return False

    def save_user(self, request, user, form, commit=True):
        # Prevent saving the user if not signing up through Microsoft
        if not self.is_open_for_signup(request):
            raise ValidationError("Account creation via email is disabled.")
        return super().save_user(request, user, form, commit)
