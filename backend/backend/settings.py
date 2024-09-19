"""
Django settings for backend project.

Generated by 'django-admin startproject' using Django 5.0.7.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.0/ref/settings/
"""

import os
from datetime import timedelta
from pathlib import Path
import dj_database_url
from dotenv import load_dotenv

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(os.path.join(BASE_DIR, '.env'))
# SECURITY CONFIGURATION

# SECURITY WARNING: keep the secret key used in production secret!
#TODO:generate new key and .env
SECRET_KEY = 'django-insecure-c)g%$184o8z=mi-3!##hs5z8^=*b-u%m$_*m8al@de@y12^s3w'

# SECURITY WARNING: don't run with debug turned on in production!
#TODO: Debug false and changed allow host production
DEBUG = True

ALLOWED_HOSTS = ['localhost', '127.0.0.1']

# CSRF and Cookie Security Settings
CSRF_TRUSTED_ORIGINS = ['http://localhost:8082', 'http://localhost:8000/']
CSRF_COOKIE_NAME = 'csrftoken'
CSRF_COOKIE_HTTPONLY = False  # Make True in Production, could cause problems

# Only allow session cookies over HTTPS (recommended in production)
#TODO: changed all those settings
SESSION_COOKIE_SECURE = False  # set to true when using HTTPS

# Mark session cookies as HTTP-only, preventing JavaScript from accessing them
SESSION_COOKIE_HTTPONLY = True # True when in production

# Set the expiration for sessions (e.g., 1 day)
SESSION_COOKIE_AGE = 86400  # 1 day in seconds

# CSRF Protection on session-based requests
CSRF_COOKIE_SECURE = False #true for production with HTTPs

# Cross-site cookies
SESSION_COOKIE_SAMESITE = 'Lax'  # or 'None' if using cross-site requests

#so my website cant be imbedded in others
X_FRAME_OPTIONS = 'DENY'
SECURE_CONTENT_TYPE_NOSNIFF = True

# Enable HTTPS when ready (currently commented out for development)
# SECURE_SSL_REDIRECT = True  # Uncomment for HTTPS in production
# CSRF_COOKIE_SECURE = True  # Uncomment for HTTPS
# SESSION_COOKIE_SECURE = True  # Uncomment for HTTPS

# CORS Settings
CORS_ALLOW_ALL_ORIGINS = False
CORS_ALLOWED_ORIGINS = [
    'http://localhost:8082',
    'http://localhost:8000',
]
CORS_ALLOW_CREDENTIALS = True  # If you're using cookies for authentication

# SESSION CONFIGURATION

SESSION_COOKIE_DOMAIN = 'localhost'

# APPLICATION CONFIGURATION
SITE_ID = 1
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    #'django.contrib.sites',  
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'rest_framework.authtoken',  # for token-based authentication
    'app',
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'allauth.socialaccount.providers.microsoft',
    'django_extensions',
    'corsheaders',
    'dj_rest_auth',
    #'django_ratelimit',
    'axes'

    #'sslserver',  # Uncomment if needed for SSL in development
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'corsheaders.middleware.CorsMiddleware',  # This should come immediately after SecurityMiddleware
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',  # This should come before CsrfViewMiddleware for CORS to handle properly
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    "allauth.account.middleware.AccountMiddleware",
    'django.middleware.csrf.CsrfViewMiddleware',
    'app.middleware.TokenCookieMiddleware',
    'app.middleware.TokenRefreshMiddleware',
    #'django_ratelimit.middleware.RatelimitMiddleware',
    'axes.middleware.AxesMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware', 
]

ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'django.template.context_processors.request',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'

# AUTHENTICATION SETTINGS

AUTHENTICATION_BACKENDS = [
    'axes.backends.AxesStandaloneBackend',
    'django.contrib.auth.backends.ModelBackend',
    'allauth.account.auth_backends.AuthenticationBackend',
]

# LOGIN/LOGOUT Redirects
LOGIN_REDIRECT_URL = 'http://localhost:8082/'  
LOGOUT_REDIRECT_URL = 'http://localhost:8082/'  # Redirect to the home page after logout

# SOCIAL ACCOUNT SETTINGS
ACCOUNT_ADAPTER = 'app.adapters.NoSignupAdapter'
SOCIALACCOUNT_ADAPTER = 'app.adapters.MySocialAccountAdapter'
ACCOUNT_EMAIL_REQUIRED = False
ACCOUNT_EMAIL_VERIFICATION = "none"
ACCOUNT_USERNAME_REQUIRED = True
SOCIALACCOUNT_LOGIN_ON_GET = True

# Microsoft login
# CLIENT_ID, CLIENT_SECRET, AUTHORI#TY, and other related variables can go here.
#AXES_LOCKOUT_CALLABLE = 'app.axes_lockout.custom_lockout_response'

ACCOUNT_RATE_LIMITS = {
    'login_failed': '5/5m'  # Example value, meaning 5 attempts per 5 minutes
}
# settings.py


AXES_ENABLED = True
# Axes Configuration
AXES_FAILURE_LIMIT = 5 # Number of failed login attempts before lockout
AXES_LOCK_OUT_AT_FAILURE = True  # Lock out the user/IP after failure limit is reached

AXES_CACHE = 'default'
#AXES_USE_USER_AGENT = False  # Include user agent in failure tracking
AXES_ENABLE_ACCESS_FAILURE_LOG = True
#AXES_LOCKOUT_TEMPLATE = 'axes/lockout.html'  # Optional: Custom lockout page template
#AXES_RESET_ON_SUCCESS = True  # Reset the failure counter after a successful login
AXES_COOLOFF_TIME = 0.0833333  # 5 minutes
AXES_STORAGE = 'axes.storage.database.AxesDatabaseStorage'

# REST FRAMEWORK SETTINGS
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.TokenAuthentication',
        'rest_framework.authentication.SessionAuthentication'
    )
}

# DATABASE CONFIGURATION
# Replace the SQLite DATABASES configuration with PostgreSQL:

DATABASES = {
    "default": dj_database_url.config(default=os.getenv("DATABASE_URL"))
}
# PASSWORD VALIDATION
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# TIMEZONE & LANGUAGE SETTINGS
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# STATIC FILES

# This setting informs Django of the URI path from which your static files will be served to users
# Here, they well be accessible at your-domain.onrender.com/static/... or yourcustomdomain.com/static/...
STATIC_URL = '/static/'
# This production code might break development mode, so we check whether we're in DEBUG mode   # Tell Django to copy static assets into a path called `staticfiles` (this is specific to Render)
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
    # Enable the WhiteNoise storage backend, which compresses static files to reduce disk use
    # and renames the files with unique names for each version to support long-term caching
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'app', 'static'),
]

# DEFAULT PRIMARY KEY FIELD TYPE
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
