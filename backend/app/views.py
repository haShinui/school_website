from rest_framework import viewsets
from .models import Student
from .serializers import StudentSerializer

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

# backend/app/views.py
from django.http import JsonResponse

def home(request):
    return JsonResponse({'message': 'Welcome to the homepage!'})
