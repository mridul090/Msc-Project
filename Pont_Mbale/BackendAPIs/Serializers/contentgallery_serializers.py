from rest_framework import serializers
from BackendAPIs.BackendModels.contentgallery_model import Content_Gallery
from BackendAPIs.BackendModels.setting_model import ImageLibrary
from BackendAPIs.Serializers.setting_serializers import ImageLibrarySerializers


class ContentGallerySerializerViews(serializers.ModelSerializer):

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
        model = Content_Gallery
        fields = '__all__'

class ContentGallerySerializer(serializers.ModelSerializer):
    image_field_1 = serializers.PrimaryKeyRelatedField(queryset=ImageLibrary.objects.all(), required=False, allow_null=True)
    image_field_2 = serializers.PrimaryKeyRelatedField(queryset=ImageLibrary.objects.all(), required=False, allow_null=True)
    image_field_3 = serializers.PrimaryKeyRelatedField(queryset=ImageLibrary.objects.all(), required=False, allow_null=True)
    image_field_4 = serializers.PrimaryKeyRelatedField(queryset=ImageLibrary.objects.all(), required=False, allow_null=True)
    image_field_5 = serializers.PrimaryKeyRelatedField(queryset=ImageLibrary.objects.all(), required=False, allow_null=True)
    image_field_6 = serializers.PrimaryKeyRelatedField(queryset=ImageLibrary.objects.all(), required=False, allow_null=True)
    image_field_7 = serializers.PrimaryKeyRelatedField(queryset=ImageLibrary.objects.all(), required=False, allow_null=True)
    image_field_8 = serializers.PrimaryKeyRelatedField(queryset=ImageLibrary.objects.all(), required=False, allow_null=True)
    image_field_9 = serializers.PrimaryKeyRelatedField(queryset=ImageLibrary.objects.all(), required=False, allow_null=True)
    image_field_10 = serializers.PrimaryKeyRelatedField(queryset=ImageLibrary.objects.all(), required=False, allow_null=True)
    image_field_11 = serializers.PrimaryKeyRelatedField(queryset=ImageLibrary.objects.all(), required=False, allow_null=True)
    image_field_12 = serializers.PrimaryKeyRelatedField(queryset=ImageLibrary.objects.all(), required=False, allow_null=True)

    class Meta:
        model = Content_Gallery
        fields = '__all__'

    def create(self, validated_data):
        content_gallery = Content_Gallery.objects.create(**validated_data)
        content_gallery.save()
        return content_gallery

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.image_field_1 = validated_data.get('image_field_1', instance.image_field_1)
        instance.image_field_2 = validated_data.get('image_field_2', instance.image_field_2)
        instance.image_field_3 = validated_data.get('image_field_3', instance.image_field_3)
        instance.image_field_4 = validated_data.get('image_field_4', instance.image_field_4)
        instance.image_field_5 = validated_data.get('image_field_5', instance.image_field_5)
        instance.image_field_6 = validated_data.get('image_field_6', instance.image_field_6)
        instance.image_field_7 = validated_data.get('image_field_7', instance.image_field_7)
        instance.image_field_8 = validated_data.get('image_field_8', instance.image_field_8)
        instance.image_field_9 = validated_data.get('image_field_9', instance.image_field_9)
        instance.image_field_10 = validated_data.get('image_field_10', instance.image_field_10)
        instance.image_field_11 = validated_data.get('image_field_11', instance.image_field_11)
        instance.image_field_12 = validated_data.get('image_field_12', instance.image_field_12)
        instance.save()
        return instance