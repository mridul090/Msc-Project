from django.db import models
from django.utils import timezone
from BackendAPIs.BackendModels.setting_model import ImageLibrary
from BackendAPIs.BackendModels.contentgallery_model import Content_Gallery


class About(models.Model):
    historycontent_1 = models.ForeignKey(
        'HistoryContent', on_delete=models.SET_NULL, null=True, blank=True, related_name='about_historycontent_1'
    )
    historycontent_2 = models.ForeignKey(
        'HistoryContent', on_delete=models.SET_NULL, null=True, blank=True, related_name='about_historycontent_2'
    )
    historycontent_3 = models.ForeignKey(
        'HistoryContent', on_delete=models.SET_NULL, null=True, blank=True, related_name='about_historycontent_3'
    )
    image_field_1 = models.ForeignKey(
        'ImageLibrary', on_delete=models.SET_NULL, null=True, blank=True, related_name='about_image_1'
    )
    image_field_2 = models.ForeignKey(
        'ImageLibrary', on_delete=models.SET_NULL, null=True, blank=True, related_name='about_image_2'
    )
    image_field_3 = models.ForeignKey(
        'ImageLibrary', on_delete=models.SET_NULL, null=True, blank=True, related_name='about_image_3'
    )
    image_field_4 = models.ForeignKey(
        'ImageLibrary', on_delete=models.SET_NULL, null=True, blank=True, related_name='about_image_4'
    )
    image_field_5 = models.ForeignKey(
        'ImageLibrary', on_delete=models.SET_NULL, null=True, blank=True, related_name='about_image_5'
    )
    image_field_6 = models.ForeignKey(
        'ImageLibrary', on_delete=models.SET_NULL, null=True, blank=True, related_name='about_image_6'
    )
    image_field_7 = models.ForeignKey(
        'ImageLibrary', on_delete=models.SET_NULL, null=True, blank=True, related_name='about_image_7'
    )
    image_field_8 = models.ForeignKey(
        'ImageLibrary', on_delete=models.SET_NULL, null=True, blank=True, related_name='about_image_8'
    )
    history_content = models.TextField()
    created_date = models.DateTimeField(default=timezone.now)
    update_date = models.DateTimeField(auto_now=True)
    content_gallery = models.ForeignKey('Content_Gallery', on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f"About section, <b>Created at {self.created_date}</b>"
