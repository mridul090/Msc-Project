from django.urls import path
from BackendAPIs.Views.Projects import ProjectContent_views

urlpatterns = [
    path('project-content/views', ProjectContent_views.get_project_content, name='view-project-content'),
    path('project-content/create/', ProjectContent_views.post_project_content, name='create-project-content'),
    path('project-content/update/<int:pk>/', ProjectContent_views.modify_project_content, name='update-project-content'),
    path('project-content/delete/<int:pk>/', ProjectContent_views.modify_project_content, name='delete-project-content'),
]