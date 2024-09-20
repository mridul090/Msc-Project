from django.db import models
# from django.contrib.auth.models import User
from django.utils.text import slugify
from django.utils import timezone
from BackendAPIs.BackendModels.setting_model import ImageLibrary


class BlogPost(models.Model):
    STATUS_CHOICES = (
        ('draft', 'Draft'),
        ('published', 'Published'),
    )

    title = models.CharField(max_length=200)
    content = models.TextField()
    # author = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    start_date = models.DateTimeField(auto_now=True, blank=True)
    end_date = models.DateTimeField(auto_now=True, blank=True)

    slug = models.SlugField(max_length=200, unique=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='draft')
    # tags = models.ManyToManyField('Tag', blank=True)
    category = models.ForeignKey('Category', on_delete=models.SET_NULL, null=True, blank=True)
    image_field_1 = models.ForeignKey('ImageLibrary', on_delete=models.SET_NULL, null=True, blank=True, related_name='blogpost_image_1')
    image_field_2 = models.ForeignKey('ImageLibrary', on_delete=models.SET_NULL, null=True, blank=True, related_name='blogpost_image_2')
    image_field_3 = models.ForeignKey('ImageLibrary', on_delete=models.SET_NULL, null=True, blank=True, related_name='blogpost_image_3')
    image_field_4 = models.ForeignKey('ImageLibrary', on_delete=models.SET_NULL, null=True, blank=True, related_name='blogpost_image_4')
    image_field_5 = models.ForeignKey('ImageLibrary', on_delete=models.SET_NULL, null=True, blank=True, related_name='blogpost_image_5')
    image_field_6 = models.ForeignKey('ImageLibrary', on_delete=models.SET_NULL, null=True, blank=True, related_name='blogpost_image_6')
    image_field_7 = models.ForeignKey('ImageLibrary', on_delete=models.SET_NULL, null=True, blank=True, related_name='blogpost_image_7')
    image_field_8 = models.ForeignKey('ImageLibrary', on_delete=models.SET_NULL, null=True, blank=True, related_name='blogpost_image_8')
    video_link = models.URLField(null=True, blank=True)
    embedded_link = models.URLField(null=True, blank=True)

    class Meta:
        ordering = ['-created_at']
        unique_together = ('title', 'slug')
        verbose_name = "Blog Post"
        verbose_name_plural = "Blog Posts"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super(BlogPost, self).save(*args, **kwargs)

    def __str__(self):
        return self.title

class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True)
    slug = models.SlugField(max_length=50, unique=True)

    class Meta:
        verbose_name = "Tag"
        verbose_name_plural = "Tags"
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super(Tag, self).save(*args, **kwargs)

    def __str__(self):
        return self.name

class Category(models.Model):
    name = models.CharField(max_length=50, unique=True)

    class Meta:
        verbose_name = "Category"
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name

