from rest_framework import serializers
from BackendAPIs.BackendModels.About_Pont.about_model import About
from BackendAPIs.BackendModels.setting_model import ImageLibrary
from BackendAPIs.BackendModels.About_Pont.historycontent_model import HistoryContent
from BackendAPIs.BackendModels.contentgallery_model import Content_Gallery
from BackendAPIs.Serializers.setting_serializers import ImageLibrarySerializers
from BackendAPIs.Serializers.About_Pont.historycontent_serializers import HistoryContentSerializer
from BackendAPIs.Serializers.contentgallery_serializers import ContentGallerySerializer, ContentGallerySerializerViews
from django.utils import timezone


class AboutSerializerViews(serializers.ModelSerializer):
    image_field_1 = ImageLibrarySerializers(read_only=True)
    image_field_2 = ImageLibrarySerializers(read_only=True)
    image_field_3 = ImageLibrarySerializers(read_only=True)
    image_field_4 = ImageLibrarySerializers(read_only=True)
    image_field_5 = ImageLibrarySerializers(read_only=True)
    image_field_6 = ImageLibrarySerializers(read_only=True)
    image_field_7 = ImageLibrarySerializers(read_only=True)
    image_field_8 = ImageLibrarySerializers(read_only=True)
    image_field_9 = ImageLibrarySerializers(read_only=True)
    image_field_10 = ImageLibrarySerializers(read_only=True)
    image_field_11 = ImageLibrarySerializers(read_only=True)
    image_field_12 = ImageLibrarySerializers(read_only=True)

    class Meta:
        model = About
        fields = '__all__'


class AboutSerializer(serializers.ModelSerializer):

    historycontent_1 = serializers.PrimaryKeyRelatedField(queryset=HistoryContent.objects.all(), required=False, allow_null=True)
    historycontent_1 = serializers.PrimaryKeyRelatedField(queryset=HistoryContent.objects.all(), required=False, allow_null=True)
    historycontent_1 = serializers.PrimaryKeyRelatedField(queryset=HistoryContent.objects.all(), required=False, allow_null=True)

    image_field_1 = serializers.PrimaryKeyRelatedField(queryset=ImageLibrary.objects.all(), required=False, allow_null=True)
    image_field_2 = serializers.PrimaryKeyRelatedField(queryset=ImageLibrary.objects.all(), required=False, allow_null=True)
    image_field_3 = serializers.PrimaryKeyRelatedField(queryset=ImageLibrary.objects.all(), required=False, allow_null=True)
    image_field_4 = serializers.PrimaryKeyRelatedField(queryset=ImageLibrary.objects.all(), required=False, allow_null=True)
    image_field_5 = serializers.PrimaryKeyRelatedField(queryset=ImageLibrary.objects.all(), required=False, allow_null=True)
    image_field_6 = serializers.PrimaryKeyRelatedField(queryset=ImageLibrary.objects.all(), required=False, allow_null=True)
    image_field_7 = serializers.PrimaryKeyRelatedField(queryset=ImageLibrary.objects.all(), required=False, allow_null=True)
    image_field_8 = serializers.PrimaryKeyRelatedField(queryset=ImageLibrary.objects.all(), required=False, allow_null=True)

    content_gallery = serializers.PrimaryKeyRelatedField(queryset=Content_Gallery.objects.all(), required=False, allow_null=True)

    class Meta:
        model = About
        fields = '__all__'

    def create(self, validated_data):
        about = About.objects.create(**validated_data)
        about.save()
        return about

    def update(self, instance, validated_data):
        instance.historycontent_1 = validated_data.get('historycontent_1', instance.historycontent_1)
        instance.historycontent_2 = validated_data.get('historycontent_2', instance.historycontent_2)
        instance.historycontent_3 = validated_data.get('historycontent_3', instance.historycontent_3)
        instance.image_field_1 = validated_data.get('image_field_1', instance.image_field_1)
        instance.image_field_2 = validated_data.get('image_field_2', instance.image_field_2)
        instance.image_field_3 = validated_data.get('image_field_3', instance.image_field_3)
        instance.image_field_4 = validated_data.get('image_field_4', instance.image_field_4)
        instance.image_field_5 = validated_data.get('image_field_5', instance.image_field_5)
        instance.image_field_6 = validated_data.get('image_field_6', instance.image_field_6)
        instance.image_field_7 = validated_data.get('image_field_7', instance.image_field_7)
        instance.image_field_8 = validated_data.get('image_field_8', instance.image_field_8)
        instance.history_content = validated_data.get('history_content', instance.history_content)
        instance.update_date = timezone.now()
        instance.content_gallery = validated_data.get('content_gallery', instance.content_gallery)
        instance.save()
        return instance

