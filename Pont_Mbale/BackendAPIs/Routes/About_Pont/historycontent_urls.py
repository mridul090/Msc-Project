from django.urls import path
from BackendAPIs.Views.About_Pont import historycontent_views

urlpatterns = [
    path('historycontents/', historycontent_views.historycontent_list, name='historycontent-list'),
    path('historycontents/views/', historycontent_views.historycontent_views, name='historycontent-list'),
    path('historycontents/update/<int:pk>/', historycontent_views.historycontent_detail, name='historycontent-detail'),
    path('historycontents/delete/<int:pk>/', historycontent_views.historycontent_detail, name='historycontent-detail'),
]
