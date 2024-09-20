from django.urls import path
from BackendAPIs.Views.contractus_views import sending_email


urlpatterns = [
    path('contact/message/<int:pk>/', sending_email, name='send_email'),
]