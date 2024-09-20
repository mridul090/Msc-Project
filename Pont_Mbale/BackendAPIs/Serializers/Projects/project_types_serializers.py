from rest_framework import serializers
from BackendAPIs.BackendModels.Projects.project_model import ProjectsTypes

class ProjectsTypesSerializers(serializers.ModelSerializer):
    class Meta:
        model = ProjectsTypes
        fields = '__all__'

    def update(self, instance, validated_data):
        instance.updated_at = timezone.now()
        instance.save()
        return instance
