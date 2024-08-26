# backend/app/views.py
from django.http import JsonResponse

def home_view(request):
    return JsonResponse({"message": "Welcome to the Home Page!"})

def about_view(request):
    return JsonResponse({"message": "This is the About Page!"})
