from django.db import models

# Create your models here.
class songInfo(models.Model):
    title = models.CharField(max_length=50)
    singer = models.CharField(max_length=50)
    album = models.CharField(max_length=50)
    added_at = models.DateTimeField(auto_now_add=True)
    length = models.CharField(max_length=5)
    image = models.ImageField(upload_to='Songs-Template/')
    song = models.FileField(upload_to='Audio_Files/')