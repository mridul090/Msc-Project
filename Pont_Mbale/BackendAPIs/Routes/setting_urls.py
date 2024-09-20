from django.urls import path
from BackendAPIs.Views import setting_views


urlpatterns = [
    path('settings/images/', setting_views.upload_view_images, name='Upload_View_Images'),
    path('settings/images/<int:pk>/', setting_views.update_delete_images, name='update_delete_images'),

    path('settings/<int:pk>/', setting_views.create_update_settings, name='setting'),

]