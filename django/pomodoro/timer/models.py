from django.db import models

# Create your models here.
class Timer(models.Model):
    start_time = models.DateTimeField(null=False, blank=False)
    end_time = models.DateTimeField(null=True, blank=True)
