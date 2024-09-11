from django.utils.deprecation import MiddlewareMixin
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.exceptions import AuthenticationFailed

class TokenCookieMiddleware(MiddlewareMixin):
    def process_response(self, request, response):
        if request.user.is_authenticated:
            token, _ = Token.objects.get_or_create(user=request.user)
            response.set_cookie('auth_token', token.key, httponly=True, max_age=3600*24*14, samesite='Lax', secure=True)
        return response

from django.utils.timezone import now
from datetime import timedelta
from rest_framework.authtoken.models import Token

from django.utils.timezone import now
from datetime import timedelta
from django.utils.deprecation import MiddlewareMixin
from rest_framework.authtoken.models import Token

class TokenRefreshMiddleware(MiddlewareMixin):
    def process_response(self, request, response):
        if request.user.is_authenticated:
            token = Token.objects.get(user=request.user)
            token_lifetime = timedelta(days=7)  # Set the desired token lifetime
            if now() > (token.created + token_lifetime):
                token.delete()
                new_token = Token.objects.create(user=request.user)
                response.set_cookie('auth_token', new_token.key, httponly=True, max_age=3600*24*7, samesite='Lax', secure=True)
        return response
    
