from django.db import models

class Venue(models.Model):
    name = models.CharField(max_length=255, unique=True)
    slug = models.SlugField(max_length=255, unique=True)
    #info = models.TextField(blank=True, null=True)
    url = models.URLField(blank=True, null=True)
    address = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    country = models.CharField(max_length=255)
    phone = models.CharField(max_length=255)
    capacity = models.IntegerField(blank=True, null=True)
    
    x = models.FloatField()
    y = models.FloatField()
    
    
    def __unicode__(self):
        return self.name