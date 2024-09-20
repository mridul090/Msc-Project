from rest_framework import serializers
from django.utils import timezone
from BackendAPIs.BackendModels.Projects.progressbar_model import ProgressiveBar

class ProgressiveBarSerializers(serializers.ModelSerializer):

    class Meta:
        model = ProgressiveBar
        fields = '__all__'

    def update(self, instance, validated_data):
        instance.updated_at = timezone.now()
        instance.save()
        return instance