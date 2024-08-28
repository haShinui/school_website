from django.contrib import admin
from django.urls import path, include
from backend.views import home_view# Import your home_view

urlpatterns = [
    path('', home_view, name='home'),  # Home page
    path('admin/', admin.site.urls),  # Admin site
    path('azure_auth/', include('azure_auth.urls')),  # Include azure_auth URLs

]

