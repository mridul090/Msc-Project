from rest_framework import serializers
from BackendAPIs.BackendModels.setting_model import ImageLibrary, Settings
from django.utils import timezone

class ImageLibrarySerializers(serializers.ModelSerializer):
    class Meta:
        model = ImageLibrary
        fields = ['id', 'title', 'image', 'uploaded_time']
        read_only_fields = ['uploaded_time']

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        if 'image' in validated_data:
            instance.image = validated_data['image']
        instance.save()
        return instance


class SettingsSerializers(serializers.ModelSerializer):

    class Meta:
        model = Settings
        fields = '__all__'


    def create(self, validated_data):
        # Ensure only one settings record can be created
        if Settings.objects.exists():
            raise serializers.ValidationError("A settings record already exists.")
        return super(SettingsSerializers, self).create(validated_data)

    def update(self, instance, validated_data):
        instance.opptional_dasboard = validated_data.get('opptional_dasboard', instance.opptional_dasboard)
        instance.activate_dasboard = validated_data.get('activate_dasboard', instance.activate_dasboard)
        instance.responsible_emails = validated_data.get('responsible_emails', instance.responsible_emails)
        instance.updated_at = timezone.now()
        instance.save()
        return instance