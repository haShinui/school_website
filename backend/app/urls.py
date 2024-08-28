from django.urls import path, include
from .views import home_view, about_view
from . import views

urlpatterns = [
    path('home/', home_view, name='home'),  # Home view
    path('about/', about_view, name='about'),  # About view
    path('', views.login_successful, name='login-view')
    # Add the following line

]
