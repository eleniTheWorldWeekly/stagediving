from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from event.models import Event



class STUser(models.Model):
    user = models.OneToOneField(User)
    events = models.ManyToManyField(Event, null=True, blank=True)
    

    
    def __unicode__(self):
        return self.user.username
    

    
    
    
def create_STUser(sender, instance, created, **kwargs):  
    if created:  
        profile, created = STUser.objects.get_or_create(user=instance)  

post_save.connect(create_STUser, sender=User) 
   
