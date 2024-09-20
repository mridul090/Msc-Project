from rest_framework import serializers
from BackendAPIs.BackendModels.blog_model import BlogPost, Tag, Category
from BackendAPIs.BackendModels.setting_model import ImageLibrary
from BackendAPIs.Serializers.setting_serializers import ImageLibrarySerializers
from django.utils import timezone
# from django.contrib.auth.models import User


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['name', 'slug']


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']


# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ['id', 'username', 'email']

class BlogPostSerializerView(serializers.ModelSerializer):

    image_field_1 = ImageLibrarySerializers(read_only=True)
    image_field_2 = ImageLibrarySerializers(read_only=True)
    image_field_3 = ImageLibrarySerializers(read_only=True)
    image_field_4 = ImageLibrarySerializers(read_only=True)
    image_field_5 = ImageLibrarySerializers(read_only=True)
    image_field_6 = ImageLibrarySerializers(read_only=True)
    image_field_7 = ImageLibrarySerializers(read_only=True)
    image_field_8 = ImageLibrarySerializers(read_only=True)

    slug = serializers.SlugField(read_only=True)

    class Meta:
        model = BlogPost
        fields = '__all__'

class BlogPostSerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all(), required=False, allow_null=True)

    image_field_1 = serializers.PrimaryKeyRelatedField(queryset=ImageLibrary.objects.all(), required=False, allow_null=True)
    image_field_2 = serializers.PrimaryKeyRelatedField(queryset=ImageLibrary.objects.all(), required=False, allow_null=True)
    image_field_3 = serializers.PrimaryKeyRelatedField(queryset=ImageLibrary.objects.all(), required=False, allow_null=True)
    image_field_4 = serializers.PrimaryKeyRelatedField(queryset=ImageLibrary.objects.all(), required=False, allow_null=True)
    image_field_5 = serializers.PrimaryKeyRelatedField(queryset=ImageLibrary.objects.all(), required=False, allow_null=True)
    image_field_6 = serializers.PrimaryKeyRelatedField(queryset=ImageLibrary.objects.all(), required=False, allow_null=True)
    image_field_7 = serializers.PrimaryKeyRelatedField(queryset=ImageLibrary.objects.all(), required=False, allow_null=True)
    image_field_8 = serializers.PrimaryKeyRelatedField(queryset=ImageLibrary.objects.all(), required=False, allow_null=True)

    slug = serializers.SlugField(read_only=True)

    class Meta:
        model = BlogPost
        fields = [
            'id', 'title', 'content',
            'created_at', 'updated_at', 'slug',
            'start_date', 'end_date', 'status', 'category',
            'image_field_1', 'image_field_2', 'image_field_3', 'image_field_4',
            'image_field_5', 'image_field_6', 'image_field_7', 'image_field_8',
            'video_link', 'embedded_link'
        ]

    def create(self, validated_data):
        blog_post = BlogPost.objects.create(**validated_data)
        blog_post.save()
        return blog_post

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.content = validated_data.get('content', instance.content)
        instance.status = validated_data.get('status', instance.status)
        instance.category = validated_data.get('category', instance.category)
        instance.start_date = validated_data.get('start_date', instance.start_date)
        instance.end_date = validated_data.get('end_date', instance.end_date)
        instance.image_field_1 = validated_data.get('image_field_1', instance.image_field_1)
        instance.image_field_2 = validated_data.get('image_field_2', instance.image_field_2)
        instance.image_field_3 = validated_data.get('image_field_3', instance.image_field_3)
        instance.image_field_4 = validated_data.get('image_field_4', instance.image_field_4)
        instance.image_field_5 = validated_data.get('image_field_5', instance.image_field_5)
        instance.image_field_6 = validated_data.get('image_field_6', instance.image_field_6)
        instance.image_field_7 = validated_data.get('image_field_7', instance.image_field_7)
        instance.image_field_8 = validated_data.get('image_field_8', instance.image_field_8)
        instance.video_link = validated_data.get('video_link', instance.video_link)
        instance.embedded_link = validated_data.get('embedded_link', instance.embedded_link)
        instance.updated_at = timezone.now()
        instance.save()
        return instance



