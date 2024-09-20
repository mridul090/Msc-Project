from rest_framework import serializers
from BackendAPIs.BackendModels.About_Pont.historycontent_model import HistoryContent
from BackendAPIs.BackendModels.setting_model import ImageLibrary
from BackendAPIs.Serializers.setting_serializers import ImageLibrarySerializers
from django.utils import timezone

class HistoryContentSerializerViews(serializers.ModelSerializer):
    image_field_1 = ImageLibrarySerializers(read_only=True)
    image_field_2 = ImageLibrarySerializers(read_only=True)
    image_field_3 = ImageLibrarySerializers(read_only=True)
    image_field_4 = ImageLibrarySerializers(read_only=True)

    class Meta:
        model = HistoryContent
        fields = '__all__'


class HistoryContentSerializer(serializers.ModelSerializer):
    image_field_1 = serializers.PrimaryKeyRelatedField(queryset=ImageLibrary.objects.all(), required=False, allow_null=True)
    image_field_2 = serializers.PrimaryKeyRelatedField(queryset=ImageLibrary.objects.all(), required=False, allow_null=True)
    image_field_3 = serializers.PrimaryKeyRelatedField(queryset=ImageLibrary.objects.all(), required=False, allow_null=True)
    image_field_4 = serializers.PrimaryKeyRelatedField(queryset=ImageLibrary.objects.all(), required=False, allow_null=True)

    class Meta:
        model = HistoryContent
        fields = '__all__'

    def create(self, validated_data):
        history_content = HistoryContent.objects.create(**validated_data)
        history_content.save()
        return about

    def update(self, instance, validated_data):
        instance.image_field_1 = validated_data.get('image_field_1', instance.image_field_1)
        instance.image_field_2 = validated_data.get('image_field_2', instance.image_field_2)
        instance.image_field_3 = validated_data.get('image_field_3', instance.image_field_3)
        instance.image_field_4 = validated_data.get('image_field_4', instance.image_field_4)
        instance.update_date = timezone.now()
        instance.save()
        return instance