from django.db import models
from BackendAPIs.BackendModels.setting_model import ImageLibrary


class Content_Gallery(models.Model):
    title = models.CharField(max_length=30)
    image_field_1 = models.ForeignKey(
        'ImageLibrary', on_delete=models.SET_NULL, null=True, blank=True, related_name='gallery_image_1'
    )
    image_field_2 = models.ForeignKey(
        'ImageLibrary', on_delete=models.SET_NULL, null=True, blank=True, related_name='gallery_image_2'
    )
    image_field_3 = models.ForeignKey(
        'ImageLibrary', on_delete=models.SET_NULL, null=True, blank=True, related_name='gallery_image_3'
    )
    image_field_4 = models.ForeignKey(
        'ImageLibrary', on_delete=models.SET_NULL, null=True, blank=True, related_name='gallery_image_4'
    )
    image_field_5 = models.ForeignKey(
        'ImageLibrary', on_delete=models.SET_NULL, null=True, blank=True, related_name='gallery_image_5'
    )
    image_field_6 = models.ForeignKey(
        'ImageLibrary', on_delete=models.SET_NULL, null=True, blank=True, related_name='gallery_image_6'
    )
    image_field_7 = models.ForeignKey(
        'ImageLibrary', on_delete=models.SET_NULL, null=True, blank=True, related_name='gallery_image_7'
    )
    image_field_8 = models.ForeignKey(
        'ImageLibrary', on_delete=models.SET_NULL, null=True, blank=True, related_name='gallery_image_8'
    )
    image_field_9 = models.ForeignKey(
        'ImageLibrary', on_delete=models.SET_NULL, null=True, blank=True, related_name='gallery_image_9'
    )
    image_field_10 = models.ForeignKey(
        'ImageLibrary', on_delete=models.SET_NULL, null=True, blank=True, related_name='gallery_image_10'
    )
    image_field_11 = models.ForeignKey(
        'ImageLibrary', on_delete=models.SET_NULL, null=True, blank=True, related_name='gallery_image_11'
    )
    image_field_12 = models.ForeignKey(
        'ImageLibrary', on_delete=models.SET_NULL, null=True, blank=True, related_name='gallery_image_12'
    )

    def __str__(self):
        return f'Title of Gallery {self.title}'
