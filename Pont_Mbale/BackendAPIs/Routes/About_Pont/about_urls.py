from django.urls import path
from BackendAPIs.Views.About_Pont import about_views

urlpatterns = [
    path('abouts/list/', about_views.about_list, name='about-list'),
    path('abouts/create/', about_views.about_create, name='about-list'),
    path('abouts/update/<int:pk>/', about_views.about_detail, name='about-detail'),
    path('abouts/delete/<int:pk>/', about_views.about_detail, name='about-detail'),
]
