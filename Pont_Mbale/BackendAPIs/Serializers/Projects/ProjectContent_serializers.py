from rest_framework import serializers
from django.utils import timezone
from BackendAPIs.BackendModels.Projects.ProjectContent_model import ProjectContent
from BackendAPIs.BackendModels.setting_model import ImageLibrary
from BackendAPIs.Serializers.setting_serializers import ImageLibrarySerializers
from BackendAPIs.BackendModels.Projects.project_model import ProjectsTypes

class ProjectContentSerializersViews(serializers.ModelSerializer):
    image = ImageLibrarySerializers(read_only=True)
    project_type = serializers.SerializerMethodField()

    class Meta:
        model = ProjectContent
        fields = '__all__'

    def get_project_type(self, obj):
        ProjectsTypesSerializers = self.get_projects_types_serializers()
        return ProjectsTypesSerializers(obj.project_type).data

    def get_projects_types_serializers(self):
        from BackendAPIs.Serializers.Projects.project_serializers import ProjectsTypesSerializers
        return ProjectsTypesSerializers

class ProjectContentSerializers(serializers.ModelSerializer):
    image = serializers.PrimaryKeyRelatedField(queryset=ImageLibrary.objects.all(), required=False, allow_null=True)
    project_type = serializers.PrimaryKeyRelatedField(queryset=ProjectsTypes.objects.all(), required=False, allow_null=True)  # Ensure correct import

    class Meta:
        model = ProjectContent
        fields = '__all__'

    def create(self, validated_data):
        project_content = ProjectContent.objects.create(**validated_data)
        project_content.save()
        return project_content

    def update(self, instance, validated_data):
        instance.image = validated_data.get('image', instance.image)
        instance.project_type = validated_data.get('project_type', instance.project_type)
        instance.updated_at = timezone.now()
        instance.save()
        return instance
