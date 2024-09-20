from django.urls import path
from BackendAPIs.Views import registeruser_views


urlpatterns = [
    path('users/', registeruser_views.list_users, name='list_users'),
    path('users/create', registeruser_views.create_user, name='create_user'),
    path('users/<int:pk>/', registeruser_views.user_detail, name='user_detail'),
    path('users/emails/', registeruser_views.all_users_email, name='users_emails'),
    path('current-user/', registeruser_views.get_current_user, name='get_current_user'),
]

