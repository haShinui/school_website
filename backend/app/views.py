# backend/app/views.py
from django.http import JsonResponse

def home_view(request):
    return JsonResponse({"message": "Welcome to the Home Page!"})

def about_view(request):
    return JsonResponse({"message": "This is the About Page!"})
# backend/app/views.py

from django.shortcuts import redirect

def root_view(request):
    return redirect('/api/home/')
