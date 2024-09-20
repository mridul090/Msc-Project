from django.urls import path
from BackendAPIs.Views import proxy_view

urlpatterns = [
    path('proxy/', proxy_view.proxy_api_view, name='proxy_api'),
]
