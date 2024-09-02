# app/models.py

from django.conf import settings
from django.db import models

class UserProfile(models.Model):
    USER_ROLE_CHOICES = [
        ('normal', 'Normal User'),
        ('signed_up', 'Signed Up for Course'),
        ('completed', 'Completed Course'),
        ('manager', 'Manager'),
    ]

    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    role = models.CharField(max_length=10, choices=USER_ROLE_CHOICES, default='normal')

    def __str__(self):
        return f"{self.user.username} - {self.get_role_display()}"
