from django.urls import path
from  BackendAPIs.Views import contentgallery_views

urlpatterns = [
    path('contentgalleries/', contentgallery_views.content_gallery_list, name='content-gallery-list'),
    path('contentgalleries/create/', contentgallery_views.content_gallery_create, name='content-gallery-list'),
    path('contentgalleries/update/<int:pk>/', contentgallery_views.content_gallery_detail, name='content-gallery-detail'),
    path('contentgalleries/delete/<int:pk>/', contentgallery_views.content_gallery_detail,
         name='content-gallery-detail'),
]
