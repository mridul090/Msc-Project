from django.db import models
from django.utils import timezone
from BackendAPIs.BackendModels.setting_model import ImageLibrary


class HistoryContent(models.Model):
    HISTORY_TYPE = [
        ('general', 'General'),
        ('history', 'History')
    ]

    title = models.CharField(max_length=50)
    subtitle = models.CharField(max_length=100)
    details = models.TextField()
    image_field_1 = models.ForeignKey(
        'ImageLibrary', on_delete=models.SET_NULL, null=True, blank=True, related_name='history_image_1'
    )
    image_field_2 = models.ForeignKey(
        'ImageLibrary', on_delete=models.SET_NULL, null=True, blank=True, related_name='history_image_2'
    )
    image_field_3 = models.ForeignKey(
        'ImageLibrary', on_delete=models.SET_NULL, null=True, blank=True, related_name='history_image_3'
    )
    image_field_4 = models.ForeignKey(
        'ImageLibrary', on_delete=models.SET_NULL, null=True, blank=True, related_name='history_image_4'
    )
    video_link = models.URLField(null=True, blank=True)
    created_date = models.DateTimeField(default=timezone.now)
    update_data = models.DateTimeField(auto_now=True)
    history_type = models.CharField(max_length=20, choices=HISTORY_TYPE, default='general')

    def __str__(self):
        return f"Title {self.title} \nType {self.history_type} \nDate of create {self.created_date}"
