from django.db import models
from venue.models import Venue

class Artist(models.Model):    
    name = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255)
    
    bio = models.TextField()
    images = models.TextField() # comma separated
    videos = models.TextField() # comma separated
    
    
    
    def __unicode__(self):
        return self.name    
    
    
    
class Poster(models.Model):    
    file = models.ImageField(upload_to="posters")


    def __unicode__(self):
        return self.file.name

    @models.permalink
    def get_absolute_url(self):
        return ('upload-new', )

    def save(self, *args, **kwargs):
        self.slug = self.file.name
        super(Poster, self).save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        self.file.delete(False)
        super(Poster, self).delete(*args, **kwargs)
    
    
    
    
class Event(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255)
    on_date = models.DateTimeField()
    
    description = models.TextField()
    
    venue = models.ForeignKey(Venue)
    poster = models.ForeignKey(Poster)#models.ImageField(upload_to='static/posters')
    price = models.DecimalField(decimal_places=4, max_digits=8)
    attends = models.PositiveIntegerField(default=0)
    artists = models.ManyToManyField(Artist)
    
    _by = models.IntegerField() # user's id that created this event
    #score = models.FloatField(blank=True, null=True)
    
    def __unicode__(self):
        return self.name


    