from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from drf_spectacular.utils import extend_schema
from django.contrib.auth import get_user_model
from BackendAPIs.Serializers.registeruser_serializers import RegisterUserSerializer, AllUserEmailSerializers
from users.models import CustomUser


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_current_user(request):
    user = request.user
    serializer = RegisterUserSerializer(user)
    return Response(serializer.data)

@extend_schema(request=RegisterUserSerializer, responses=RegisterUserSerializer)
@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def create_user(request):
   if request.method == 'POST':
       serializer = RegisterUserSerializer(data=request.data)
       if serializer.is_valid():
           serializer.save()
           return Response(serializer.data, status=status.HTTP_201_CREATED)
       return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@extend_schema(responses=RegisterUserSerializer)
@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def list_users(request):
   if request.method == 'GET':
       users = CustomUser.objects.all()
       serializer = RegisterUserSerializer(users, many=True)
       return Response(serializer.data)


@extend_schema(request=RegisterUserSerializer, responses=RegisterUserSerializer)
@api_view(['GET', 'PUT', 'DELETE'])
def user_detail(request, pk):
    try:
        user = CustomUser.objects.get(pk=pk)
    except CustomUser.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = RegisterUserSerializer(user)
        return Response(serializer.data)

    elif request.method == 'PUT':

        serializer = RegisterUserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        print(serializer.errors)  # Add this line to see the exact errors
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@extend_schema(responses=AllUserEmailSerializers)
@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def all_users_email(request):
   if request.method == 'GET':
       users = CustomUser.objects.all()
       serializer = RegisterUserSerializer(users, many=True)
       return Response(serializer.data)



