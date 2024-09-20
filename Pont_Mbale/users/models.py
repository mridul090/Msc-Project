from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin, Group, Permission
from django.db import models
from django.db.models.signals import pre_save, post_delete
from django.dispatch import receiver
from PIL import Image
from io import BytesIO
from django.core.files import File
import os

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)


class CustomUser(AbstractBaseUser, PermissionsMixin):
    USER_ROLES = [
        ('superuser', 'SuperUser'),
        ('moderator', 'Moderator'),
        ('management', 'Management'),
    ]

    ACCOUNT_STATUS = [
        ('active', 'Active'),
        ('inactive', 'Inactive'),
    ]

    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    username = models.CharField(max_length=30, unique=True)
    email = models.EmailField(unique=True)
    user_role = models.CharField(max_length=10, choices=USER_ROLES)
    account_status = models.CharField(max_length=10, choices=ACCOUNT_STATUS, default='active')
    upload_image = models.ImageField(upload_to='media/profiles/', blank=True, null=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    groups = models.ManyToManyField(
        Group,
        related_name='registeruser_set',
        blank=True,
        help_text=('The groups this user belongs to. A user will get all permissions granted to each of their groups.'),
        related_query_name='registeruser'
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='registeruser_set',
        blank=True,
        help_text=('Specific permissions for this user.'),
        related_query_name='registeruser'
    )

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name']

    def __str__(self):
        return f"User Name {self.username} User Email {self.email}"

    def save(self, *args, **kwargs):
        if self.upload_image:
            self.upload_image = self.resize_image(self.upload_image)
        super(CustomUser, self).save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        self.upload_image.delete(save=False)
        super(CustomUser, self).delete(*args, **kwargs)

    def resize_image(self, image, size=(300, 300)):
        img = Image.open(image)
        img.thumbnail(size, Image.LANCZOS)  # Use LANCZOS instead of ANTIALIAS

        thumb_io = BytesIO()
        img.save(thumb_io, img.format, quality=85)

        new_image = File(thumb_io, name=image.name)
        return new_image

# Signal to delete the old image file on update
@receiver(pre_save, sender=CustomUser)
def delete_old_image(sender, instance, **kwargs):
    if not instance.pk:
        return False

    try:
        old_image = sender.objects.get(pk=instance.pk).upload_image
    except sender.DoesNotExist:
        return False

    new_image = instance.upload_image
    if not old_image == new_image:
        if old_image:
            if os.path.isfile(old_image.path):
                os.remove(old_image.path)

# Signal to delete the image file on delete
@receiver(post_delete, sender=CustomUser)
def delete_image_file(sender, instance, **kwargs):
    if instance.upload_image:
        if os.path.isfile(instance.upload_image.path):
            os.remove(instance.upload_image.path)
