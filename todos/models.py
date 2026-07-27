from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class TODO_data(models.Model):
    user = models.ForeignKey(
            User,
            on_delete=models.CASCADE
        )    

    title = models.CharField(max_length=75)
    description = models.TextField()
    status = models.BooleanField(default=False)
    date = models.DateTimeField(auto_now_add=True)