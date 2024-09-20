from django.urls import path
from BackendAPIs.Views.Projects import project_views

urlpatterns = [
    path('project-type/views', project_views.project_type_views, name='view-project-type'),
    path('project-type/create/', project_views.project_type_views, name='create-project-type'),
    path('project-type/update/<int:pk>/', project_views.modify_project_type, name='update-project-type'),
    path('project-type/delete/<int:pk>/', project_views.modify_project_type, name='delete-project-type'),

    path('project/views', project_views.get_projects, name='view-project'),
    path('project/create/', project_views.post_projects, name='create-project'),
    path('project/update/<int:pk>/', project_views.modify_projects, name='update-project'),
    path('project/delete/<int:pk>/', project_views.modify_projects, name='delete-project'),

    # path('project/views/<int:pk>/', project_views.get_project_by_type, name='view-project-by-project-type'),
    path('project/views/<int:project_type_id>/project/', project_views.get_project_by_type, name='get-project-by-type'),
]