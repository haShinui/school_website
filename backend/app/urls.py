from django.urls import path, include
from .views import home_view, get_user_info, api_logout


urlpatterns = [
    path('home/', home_view, name='home'),  # Home view
    #path('', views.login_successful, name='login-view')
    # Add the following line
    path('api/user-info/', get_user_info, name='get_user_info'),
    path('api/logout/', api_logout, name='api_logout'),
]


