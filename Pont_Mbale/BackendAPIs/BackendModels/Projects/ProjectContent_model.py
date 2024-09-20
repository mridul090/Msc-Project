from django.db import models
from django.utils import timezone
from django.apps import apps

class ProjectContent(models.Model):
    CONTENT_TYPE = (
        ('approch', 'Approch'),
        ('impact', 'Impact'),
        ('general', 'General'),
    )

    title = models.CharField(max_length=50)
    sub_title = models.CharField(max_length=50)
    details = models.TextField()
    image = models.ForeignKey('ImageLibrary', on_delete=models.SET_NULL, null=True, blank=True, related_name='project_content_image')
    video_link = models.URLField(null=True, blank=True)
    content_type = models.CharField(max_length=50, choices=CONTENT_TYPE, default='general')
    project_type = models.ForeignKey('ProjectsTypes', on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Project Content Title {self.title} date of created, {self.created_at.date()}"
