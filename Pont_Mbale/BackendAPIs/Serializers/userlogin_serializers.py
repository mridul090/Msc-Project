# serializers.py
from rest_framework import serializers
from users.models import CustomUser

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'first_name', 'last_name', 'username', 'email', 'user_role', 'account_status', 'upload_image']
