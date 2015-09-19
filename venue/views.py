from event.models import Event, Artist
from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.template import RequestContext

from venue.forms import VenueForm
from models import Venue
from django.db.models import Q
from django.core import serializers
import json


def venueHandler(request):
    if request.method == 'GET':
        pass
    if request.method == "POST":
        if request.is_ajax():
            name = request.POST.get('name')
            url = request.POST.get('url', "")
            address = request.POST.get('address')
            city = request.POST.get('city')
            country = request.POST.get('country')
            phone = request.POST.get('phone')
            capacity = request.POST.get('capacity', 0)

            try:
                venue = Venue(name=name, address=address,slug=name,
                                city=city, country=country,
                                url=url, capacity=capacity,
                                phone=phone, x=0.0, y=0.0 )
                venue.save()
                return HttpResponse(json.dumps({"success":True, 
                                                "fields":{"name":name, "url":url, 
                                                            "address":address, "city":city,"country":country,
                                                            "phone":phone, "capacity":capacity},
                                                 "pk":venue.pk}), mimetype="application/json")

            except Exception as e: 
                print e
                return HttpResponse(json.dumps({"success":False}), mimetype="application/json")