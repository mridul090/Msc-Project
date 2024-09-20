from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from users.models import CustomUser

class RegisterUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False, validators=[validate_password])
    upload_image = serializers.ImageField(required=False)
    is_staff = serializers.BooleanField(required=False)
    is_active = serializers.BooleanField(required=False)

    class Meta:
        model = CustomUser
        fields = (
            'id', 'first_name', 'last_name', 'username', 'email', 'password', 'user_role', 'account_status', 'upload_image', 'is_staff', 'is_active'
        )

    def __init__(self, *args, **kwargs):
        super(RegisterUserSerializer, self).__init__(*args, **kwargs)
        if self.instance:
            # Make password optional during update
            self.fields['password'].required = False

    def create(self, validated_data):
        user = CustomUser.objects.create(
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            username=validated_data['username'],
            email=validated_data['email'],
            user_role=validated_data['user_role'],
            account_status=validated_data['account_status'],
            upload_image=validated_data.get('upload_image'),
            is_staff=validated_data.get('is_staff', False),
            is_active=validated_data.get('is_active', True),
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

    def update(self, instance, validated_data):
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        instance.user_role = validated_data.get('user_role', instance.user_role)
        instance.account_status = validated_data.get('account_status', instance.account_status)

        if 'password' in validated_data and validated_data['password']:
            instance.set_password(validated_data['password'])

        if 'upload_image' in validated_data:
            instance.upload_image = validated_data['upload_image']

        instance.is_staff = validated_data.get('is_staff', instance.is_staff)
        instance.is_active = validated_data.get('is_active', instance.is_active)

        instance.save()
        return instance

class AllUserEmailSerializers(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = (
            'id', 'email',
        )