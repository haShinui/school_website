from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse

@login_required
def home_view(request):
    return render(request, 'home.html')  # Replace with the actual template

@login_required
def about_view(request):
    return render(request, 'about.html')  # Replace with the actual template

def login_successful(request):
    return HttpResponse('Hey you did it.')
