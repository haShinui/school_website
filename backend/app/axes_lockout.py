# myapp/axes_lockout.py

from django.http import JsonResponse
from django.conf import settings
from axes.models import AccessAttempt
import logging

logger = logging.getLogger(__name__)

def get_client_ip(request):
    """
    Retrieves the client's IP address from the request, considering possible reverse proxies.
    """
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        # X-Forwarded-For can contain multiple IPs; take the first one
        ip = x_forwarded_for.split(',')[0].strip()
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip

def calculate_retry_after(count, base_wait_seconds=300):
    """
    Calculates the Retry-After time based on the number of lockouts.
    Exponential backoff: base_wait * 2^(count-1)
    """
    if count < 1:
        return base_wait_seconds
    return base_wait_seconds * (2 ** (count - 1))

def standard_lockout_response(request, credentials, **kwargs):
    """
    Returns a standard JSON response upon lockout with fixed Retry-After.
    """
    ip = get_client_ip(request)
    retry_after = settings.AXES_COOLOFF_TIME * 3600  # Convert hours to seconds

    logger.warning(f"Lockout for IP: {ip}. Retry after {retry_after} seconds.")
    
    return JsonResponse(
        {'error': 'Too many login attempts. Please try again later.'},
        status=429,
        headers={'Retry-After': str(retry_after)}
    )

def exponential_backoff_lockout_response(request, credentials, **kwargs):
    """
    Returns a JSON response upon lockout with exponentially increasing Retry-After.
    """
    ip = get_client_ip(request)
    
    # Count the number of previous lockouts
    attempts = AccessAttempt.objects.filter(ip_address=ip, successful=False)
    lockout_count = attempts.count()
    
    # Calculate Retry-After using exponential backoff
    retry_after = calculate_retry_after(lockout_count, base_wait_seconds=300)  # 5 minutes base
    
    logger.warning(f"Exponential lockout #{lockout_count} for IP: {ip}. Retry after {retry_after} seconds.")
    
    return JsonResponse(
        {'error': 'Too many login attempts. Please try again later.'},
        status=429,
        headers={'Retry-After': str(retry_after)}
    )


