# -*- coding: utf-8 -*-
import json
import requests

from stagediving import settings
from django.core.management import setup_environ
setup_environ(settings)
import traceback

from venue.models import Venue
from django.contrib.auth.models import User

#user = User.objects.filter(username="Christos Konium")[0]
#user.delete()

from stagediving import email_utils

import os

try:
    f = open(os.path.join("/home/hymloth/Dropbox/eleni/stagediving/emails", "SDemail.html"), "r")
    template = f.read()
    f.close()
except: 
    print "FATAL ERROR ??? COULD NOT OPEN template IN CELERY TASK"    



r = email_utils.send_email(sender =  "StageDiving <team@stagediving.gr>",
           to = "leniw.koumara@gmail.com",
           title = "StageDiving.gr is up and running!",
           html = template,
           API_KEY = settings.MAILGUN_API_KEY
           ) 


print r , r.text

'''cities = ["agrinio", "aleksandroupoli", "athens", "chalcis", "chania", "heraklion", "ioanina", "kalamata", "katerini",
          "kavala", "kozani", "lamia", "larisa", "patras", "rhodes", "serres", "trikala", "veria", "volos"]


for v in Venue.objects.all():
    if v.city not in cities:
        print v.city
        if len(v.city)  == 6:
            v.city = "athens"
            v.save()
        if len(v.city)  > 8:
            v.city = "thessaloniki"
            v.save()'''
            

            
'''from event.models import Event

for e in Event.objects.all().prefetch_related():
    print e.venue.city
    
print 666, Event.objects.all().values('venue__city').distinct()#.prefetch_related()'''


'''for i in cities:
    r = requests.get("https://api.foursquare.com/v2/venues/explore?near=%s&section=drinks&radius=10000&oauth_token=PCECJEODFGTKPVBUJKQTVM3KUSXWO2WLQ4TJDDMTXC2OVQQB&v=20130203" % i)
    d = json.loads(r.text)
    print i
    try:
        for j in d["response"]["groups"]:
            for k in j["items"]:
    
                
                name = k["venue"]["name"]
                address = ""
                if "address" in k["venue"]["location"]:
                    address = k["venue"]["location"]["address"]
                x = k["venue"]["location"]["lng"]
                y = k["venue"]["location"]["lat"]
                
                phone = ""
                if "phone" in k["venue"]["contact"]:
                    phone = k["venue"]["contact"]["phone"]
                #for m in k["venue"]:
                #    print m
                try:
                    Venue.objects.filter(name=name)[0]
                    print "already exists ", name
                except:
                    try:
                        v = Venue()
                        v.name = name
                        v.slug = "_".join(name.split())
                        v.address = address
                        v.url = ""
                        v.phone = phone
                        v.country = "Greece"
                        v.city = i
                        v.x = x
                        v.y = y
                        v.save()
                    except:
                        print "lele"#traceback.print_exc()
    except:print traceback.print_exc()'''









