from django.db import models

# Create your models here.
class TODO_data(models.Model):
    title = models.CharField(max_length=75)
    description = models.TextField()
    status = models.BooleanField(default=False)
    date = models.DateTimeField(auto_now_add=True)