from django.urls import path
from BackendAPIs.Views import userlogin_views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('login/', userlogin_views.login, name='login'),  # Login URL
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # Obtain JWT token
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # Refresh JWT token
    path('current-user/', userlogin_views.current_user_view, name='current_user'),  # Current user details
]
