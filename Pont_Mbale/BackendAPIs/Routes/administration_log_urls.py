from django.urls import path
from BackendAPIs.Views import administration_log_views

urlpatterns = [
    path('logs/views/', administration_log_views.LogTableViews, name='log-list'),
]
