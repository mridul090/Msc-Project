from django.db import models
from django.utils import timezone


class ProgressiveBar(models.Model):
    title_1 = models.CharField(max_length = 50)
    amount_1 = models.IntegerField()
    title_2 = models.CharField(max_length = 50)
    amount_2 = models.IntegerField()
    title_3 = models.CharField(max_length = 50)
    amount_3 = models.IntegerField()
    title_4 = models.CharField(max_length = 50)
    amount_4 = models.IntegerField()
    title_5 = models.CharField(max_length = 50)
    amount_5 = models.IntegerField()
    title_6 = models.CharField(max_length = 50)
    amount_6 = models.IntegerField()
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"The progressive bar created at {self.created_at.date()}"
