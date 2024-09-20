from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from BackendAPIs.Serializers.userlogin_serializers import LoginSerializer, UserSerializer
from drf_spectacular.utils import extend_schema
from django.contrib.auth import get_user_model

User = get_user_model()


@extend_schema(request=LoginSerializer, responses={200: "Token"})
@api_view(['POST'])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')
    serializer = LoginSerializer(data={'email': email, 'password': password})

    if serializer.is_valid():
        try:
            # Retrieve the user object
            user = User.objects.get(email=email)

            # Check if the user is active before authentication
            if not user.is_active:
                return Response({'error': 'User account is disabled.'}, status=status.HTTP_400_BAD_REQUEST)

            # Authenticate the user
            user = authenticate(email=email, password=password)

            if user is not None:
                refresh = RefreshToken.for_user(user)
                return Response({
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                }, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Invalid credentials.'}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({'error': 'User does not exist.'}, status=status.HTTP_400_BAD_REQUEST)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def current_user_view(request):
    serializer = UserSerializer(request.user)
    print("Logged in user data, ", serializer.data)
    return Response(serializer.data)