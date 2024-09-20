from django.urls import path
from BackendAPIs.Views.Projects import progressbar_views

urlpatterns = [
    path('progress/views', progressbar_views.progressbar_views, name='view-progress-bar'),
    path('progress/create/', progressbar_views.progressbar_views, name='create-progress-bar'),
    path('progress/update/<int:pk>/', progressbar_views.modify_progressbar, name='update-progress-bar'),
    path('progress/delete/<int:pk>/', progressbar_views.modify_progressbar, name='delete-progress-bar'),
]
