from django.db import models
from django.utils import timezone
from django.apps import apps

class Projects(models.Model):
    page_motivation_text1 = models.TextField()
    page_motivation_text2 = models.TextField()

    project_content1 = models.ForeignKey('ProjectContent', on_delete=models.SET_NULL, null=True, blank=True, related_name='project_content_1')
    project_content2 = models.ForeignKey('ProjectContent', on_delete=models.SET_NULL, null=True, blank=True, related_name='project_content_2')
    project_content3 = models.ForeignKey('ProjectContent', on_delete=models.SET_NULL, null=True, blank=True, related_name='project_content_3')
    project_content4 = models.ForeignKey('ProjectContent', on_delete=models.SET_NULL, null=True, blank=True, related_name='project_content_4')
    project_content5 = models.ForeignKey('ProjectContent', on_delete=models.SET_NULL, null=True, blank=True, related_name='project_content_5')
    project_content6 = models.ForeignKey('ProjectContent', on_delete=models.SET_NULL, null=True, blank=True, related_name='project_content_6')

    project_progressive_bar = models.ForeignKey('ProgressiveBar', on_delete=models.SET_NULL, null=True, blank=True, related_name='project_progressive_bar')

    project_approach = models.ForeignKey('ProjectContent', on_delete=models.SET_NULL, null=True, blank=True, related_name='project_approach')
    project_impact = models.ForeignKey('ProjectContent', on_delete=models.SET_NULL, null=True, blank=True, related_name='project_impact')

    content_gallery1 = models.ForeignKey('Content_Gallery', on_delete=models.SET_NULL, null=True, blank=True, related_name='project_content_gallery1')
    content_gallery2 = models.ForeignKey('Content_Gallery', on_delete=models.SET_NULL, null=True, blank=True, related_name='project_content_gallery2')
    content_gallery3 = models.ForeignKey('Content_Gallery', on_delete=models.SET_NULL, null=True, blank=True, related_name='project_content_gallery3')
    content_gallery4 = models.ForeignKey('Content_Gallery', on_delete=models.SET_NULL, null=True, blank=True, related_name='project_content_gallery4')
    content_gallery5 = models.ForeignKey('Content_Gallery', on_delete=models.SET_NULL, null=True, blank=True, related_name='project_content_gallery5')
    content_gallery6 = models.ForeignKey('Content_Gallery', on_delete=models.SET_NULL, null=True, blank=True, related_name='project_content_gallery6')

    related_information = models.TextField()
    project_types = models.OneToOneField('ProjectsTypes', on_delete=models.SET_NULL, null=True, blank=True)

    embedded_links1 = models.URLField(null=True, blank=True)
    embedded_links2 = models.URLField(null=True, blank=True)

    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        try:
            project_type = apps.get_model('BackendAPIs', 'ProjectsTypes')
            project_type_instance = project_type.objects.get(pk=self.project_types_id)
            return f'Project: {project_type_instance.type_name}, Date of created: {self.created_at.date()}'
        except:
            return f'Project: Type Unavailable, Date of created: {self.created_at.date()}'


class ProjectsTypes(models.Model):
    type_name = models.CharField(max_length=100)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'The type Name: {self.type_name}, Date of created: {self.created_at.date()}'
