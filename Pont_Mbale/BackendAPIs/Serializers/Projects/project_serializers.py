from rest_framework import serializers
from django.utils import timezone
from BackendAPIs.BackendModels.Projects.project_model import Projects, ProjectsTypes
from BackendAPIs.BackendModels.Projects.ProjectContent_model import ProjectContent
from BackendAPIs.BackendModels.Projects.progressbar_model import ProgressiveBar
from BackendAPIs.BackendModels.contentgallery_model import Content_Gallery
from BackendAPIs.Serializers.Projects.ProjectContent_serializers import ProjectContentSerializersViews, ProjectContentSerializers
from BackendAPIs.Serializers.Projects.progressbar_serializers import ProgressiveBarSerializers
from BackendAPIs.Serializers.contentgallery_serializers import ContentGallerySerializerViews
from BackendAPIs.Serializers.Projects.project_types_serializers import ProjectsTypesSerializers

class ProjectsSerializersViews(serializers.ModelSerializer):
    project_content1 = ProjectContentSerializersViews(read_only=True)
    project_content2 = ProjectContentSerializersViews(read_only=True)
    project_content3 = ProjectContentSerializersViews(read_only=True)
    project_content4 = ProjectContentSerializersViews(read_only=True)
    project_content5 = ProjectContentSerializersViews(read_only=True)
    project_content6 = ProjectContentSerializersViews(read_only=True)

    project_progressive_bar = ProgressiveBarSerializers(read_only=True)

    project_approach = ProjectContentSerializersViews(read_only=True)
    project_impact = ProjectContentSerializersViews(read_only=True)

    content_gallery1 = ContentGallerySerializerViews(read_only=True)
    content_gallery2 = ContentGallerySerializerViews(read_only=True)
    content_gallery3 = ContentGallerySerializerViews(read_only=True)
    content_gallery4 = ContentGallerySerializerViews(read_only=True)
    content_gallery5 = ContentGallerySerializerViews(read_only=True)
    content_gallery6 = ContentGallerySerializerViews(read_only=True)

    project_types = ProjectsTypesSerializers(read_only=True)

    class Meta:
        model = Projects
        fields = '__all__'

class ProjectsSerializers(serializers.ModelSerializer):
    project_content1 = serializers.PrimaryKeyRelatedField(queryset=ProjectContent.objects.all(), required=False, allow_null=True)
    project_content2 = serializers.PrimaryKeyRelatedField(queryset=ProjectContent.objects.all(), required=False, allow_null=True)
    project_content3 = serializers.PrimaryKeyRelatedField(queryset=ProjectContent.objects.all(), required=False, allow_null=True)
    project_content4 = serializers.PrimaryKeyRelatedField(queryset=ProjectContent.objects.all(), required=False, allow_null=True)
    project_content5 = serializers.PrimaryKeyRelatedField(queryset=ProjectContent.objects.all(), required=False, allow_null=True)
    project_content6 = serializers.PrimaryKeyRelatedField(queryset=ProjectContent.objects.all(), required=False, allow_null=True)

    project_progressive_bar = serializers.PrimaryKeyRelatedField(queryset=ProgressiveBar.objects.all(), required=False, allow_null=True)

    project_approach = serializers.PrimaryKeyRelatedField(queryset=ProjectContent.objects.all(), required=False, allow_null=True)
    project_impact = serializers.PrimaryKeyRelatedField(queryset=ProjectContent.objects.all(), required=False, allow_null=True)

    content_gallery1 = serializers.PrimaryKeyRelatedField(queryset=Content_Gallery.objects.all(), required=False, allow_null=True)
    content_gallery2 = serializers.PrimaryKeyRelatedField(queryset=Content_Gallery.objects.all(), required=False, allow_null=True)
    content_gallery3 = serializers.PrimaryKeyRelatedField(queryset=Content_Gallery.objects.all(), required=False, allow_null=True)
    content_gallery4 = serializers.PrimaryKeyRelatedField(queryset=Content_Gallery.objects.all(), required=False, allow_null=True)
    content_gallery5 = serializers.PrimaryKeyRelatedField(queryset=Content_Gallery.objects.all(), required=False, allow_null=True)
    content_gallery6 = serializers.PrimaryKeyRelatedField(queryset=Content_Gallery.objects.all(), required=False, allow_null=True)

    project_types = serializers.PrimaryKeyRelatedField(queryset=ProjectsTypes.objects.all(), required=True, allow_null=True)

    class Meta:
        model = Projects
        fields = '__all__'

    # def validate(self, data):
    #     project_type = data.get('project_types')
    #     if project_type and Projects.objects.filter(project_types=project_type).exists():
    #         raise ValidationError({'project_types': f"A project with the project type '{project_type.type_name}' already exists."})
    #     return data

    def create(self, validated_data):
        project = Projects.objects.create(**validated_data)
        project.save()
        return project

    def update(self, instance, validated_data):
        instance.project_content1 = validated_data.get('project_content1', instance.project_content1)
        instance.project_content2 = validated_data.get('project_content2', instance.project_content2)
        instance.project_content3 = validated_data.get('project_content3', instance.project_content3)
        instance.project_content4 = validated_data.get('project_content4', instance.project_content4)
        instance.project_content5 = validated_data.get('project_content5', instance.project_content5)
        instance.project_content6 = validated_data.get('project_content6', instance.project_content6)

        instance.project_progressive_bar = validated_data.get('project_progressive_bar', instance.project_progressive_bar)

        instance.project_approach = validated_data.get('project_approach', instance.project_approach)
        instance.project_impact = validated_data.get('project_impact', instance.project_impact)

        instance.content_gallery1 = validated_data.get('content_gallery1', instance.content_gallery1)
        instance.content_gallery2 = validated_data.get('content_gallery2', instance.content_gallery2)
        instance.content_gallery3 = validated_data.get('content_gallery3', instance.content_gallery3)
        instance.content_gallery4 = validated_data.get('content_gallery4', instance.content_gallery4)
        instance.content_gallery5 = validated_data.get('content_gallery5', instance.content_gallery5)
        instance.content_gallery6 = validated_data.get('content_gallery6', instance.content_gallery6)

        instance.project_types = validated_data.get('project_types', instance.project_types)

        instance.updated_at = timezone.now()

        instance.save()
        return instance
