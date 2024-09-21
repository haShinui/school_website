from django.utils.deprecation import MiddlewareMixin
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.exceptions import AuthenticationFailed

from django.utils.deprecation import MiddlewareMixin
from rest_framework.authtoken.models import Token

class TokenCookieMiddleware(MiddlewareMixin):
    def process_response(self, request, response):
        if not response:  # Ensure the response is not None
            return response

        if request.user.is_authenticated:
            # Get or create the token for the user
            token, created = Token.objects.get_or_create(user=request.user)

            # Set the token in a secure cookie
            response.set_cookie(
                'auth_token',
                token.key,
                httponly=True,
                max_age=3600 * 24 * 7,  # 7 days
                samesite='None',
                secure=True
            )
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
        if not response:  # Ensure the response is not None
            return response

        if request.user.is_authenticated:
            try:
                # Try to fetch the token
                token = Token.objects.get(user=request.user)

                # Set the desired token lifetime (7 days)
                token_lifetime = timedelta(days=1)

                # If the token is expired, delete it and issue a new one
                if now() > (token.created + token_lifetime):
                    token.delete()
                    new_token = Token.objects.create(user=request.user)
                    response.set_cookie(
                        'auth_token',
                        new_token.key,
                        httponly=True,
                        max_age=3600 * 24,  # 1 days
                        samesite='None',
                        secure=True
                    )
            except Token.DoesNotExist:
                # If the token doesn't exist, handle gracefully (e.g., ignore or log it)
                pass
        return response
