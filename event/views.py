from event.models import Event, Artist, Poster
from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.template import RequestContext
from forms import EventForm, ArtistForm
from venue.forms import VenueForm
from venue.models import Venue
from stagediving.models import STUser
from django.db.models import Q
from django.core import serializers
import json
from datetime import datetime
import traceback
import operator

def serialize_events(events):
    stuff = {'events':[]}
    
    for i,e in enumerate(events):
        #print e.on_date
        temp = {}
        temp["N"] = i+1
        temp['Id'] = e.id
        temp["Date"] = e.on_date.isoformat()
        temp['Price'] = float(e.price)
        temp["Poster"] = str(e.poster.file)
        temp["Attends"] = e.attends
        temp["description"] = e.description
        temp["_by"] = e._by
        
        v = e.venue
        temp['venue'] = {'venueName':v.name, 'venueUrl':v.url,
                          'venueAddr':v.address, 'venueCity':v.city, 
                          'venueX':v.x, 'venueY':v.y, 'venuePhone':v.phone,
                          'venueCapac':v.capacity}
        
        artists = e.artists.all()
        temp['artists'] = []
        for artist in artists:
            
            temp['artists'].append({'artist':artist.name})
            
        stuff['events'].append(temp)
       
    return json.dumps(stuff)



def eventHandler(request, event_id=None):
    if request.method == 'GET':
        query = request.GET.get('query', None)
        if query:
            limit = 50
            param = request.GET.get('param')
            if param == "artist": # search events by artist name
                events = Event.objects.select_related().prefetch_related().filter(artists__name__icontains=query).order_by("on_date")[:limit]
                
            
            elif param == "combined":
                try:
                    filter = request.GET.get('filter')
                    #print "date_from" , request.GET.get('date_from')
                    date_from = datetime.strptime(request.GET.get('date_from'), '%d-%m-%Y')
                    try:
                        date_to = datetime.strptime(request.GET.get('date_to'), '%d-%m-%Y')
                    except:
                        # day overflow , client maybe?
                        norm = request.GET.get('date_to')
                        n = "30-" + "-".join(norm.split("-")[1:])
                        date_to = datetime.strptime(n, '%d-%m-%Y')
                        
                        
                    towns = request.GET.get('towns', None)
                    
                    qargs = Q()
                    qargs = qargs & Q(on_date__gte=date_from) & Q(on_date__lte=date_to)

                    
                    if towns:
                        # PURE DARK MAGIC
                        towns = json.loads(towns)      
                        t = Q()
                        for x in towns:
                            t |= Q(venue__city__icontains=x) 
                            
                        qargs &= t

                    
                        
                    
                    if filter == "all":
                        events = Event.objects.select_related().prefetch_related().filter(qargs).order_by("on_date")[:limit]
                    elif filter == "recommended":
                        # needs better implementation
                        events = Event.objects.select_related().prefetch_related().filter(qargs).order_by("on_date")[:limit]
                    elif filter == "popular":
                        events = Event.objects.select_related().prefetch_related().filter(qargs).order_by("-attends", "on_date")[:limit]
                    elif filter == "free":
                        qargs &= Q(price=0.0)
                        events = Event.objects.select_related().prefetch_related().filter(qargs).order_by("on_date")[:limit]
                except:
                    print traceback.format_exc()
                    
            stuff = serialize_events(events=events)
            return HttpResponse(stuff, mimetype="application/json")       
                    
        
        
        event_id = request.GET.get('event_id', None)
        if event_id is None:
            event_form = EventForm()
            artist_form = ArtistForm()
            venue_form = VenueForm()
            return render_to_response('add_event.html', locals(), context_instance=RequestContext(request))
        else:
            #event = Event.objects.get(pk=event_id)#.select_related().prefetch_related().filter(pk=event_id)[0]
            event = Event.objects.select_related().prefetch_related().get(pk=event_id)
            #print "lele", event, event.name
            #return render_to_response('poster_view.html', locals(), context_instance=RequestContext(request))
            stuff = serialize_events(events=[event])
            return HttpResponse(stuff, mimetype="application/json")     
            
    if request.method == 'POST':
        try:
            date = datetime.strptime(request.POST.get('date'), '%d-%m-%Y %H:%M')
            #date = datetime.strptime(request.POST.get('date'), '%d-%m-%Y')
            description = request.POST.get('description')
            price = request.POST.get('price')
            artist_ids = json.loads(request.POST.get('artist_ids'))
            venue_id = request.POST.get('venue_id')
            poster_id = request.POST.get('poster_id')
            
            venue = Venue.objects.get(id=venue_id)
            try:
                user = STUser.objects.get(user=request.user)
            except:
                user = STUser.objects.get(user=request.session['user_id'])
            
            possible_name = venue.name + "-" + str(date) + "_" + str(artist_ids[0])
            # print "description", description, "poster_id", poster_id, "venue_id", venue_id
            try:
                Event.objects.filter(name=possible_name)[0]
                return HttpResponse(json.dumps({"success":False}), mimetype="application/json")
            except:pass

            
            event = Event()
            event._by = user.user.id
            event.on_date = date
            event.price = price
            event.venue = venue
            event.name = possible_name
            event.description = description
            event.poster = Poster.objects.get(id=poster_id)
            event.save()
            for artist_id in artist_ids:
                artist = Artist.objects.get(id=artist_id)
                event.artists.add(artist)
            
            return HttpResponse(json.dumps({"success":True}), mimetype="application/json")
        except: 
            print traceback.print_exc()    
            return HttpResponse(json.dumps({"success":False}), mimetype="application/json")
        
    if request.method == 'PUT': # inc attends of event, and add this info to user
        try:
            spl = request.raw_post_data.split("=")
            event_id = spl[1]
            event = Event.objects.get(id=event_id)
            event.attends += 1
            event.save()
            
            try:
                stuser = STUser.objects.get(user=request.user)
            except:
                stuser = STUser.objects.get(user=request.session['user_id'])
            stuser.events.add(event)
        
            return HttpResponse(json.dumps({"success":True}), mimetype="application/json")
        except: 
            print traceback.print_exc()    
            return HttpResponse(json.dumps({"success":False}), mimetype="application/json")
        
        
    if request.method == 'DELETE': # deletes event, comes with event_id
        try:
            #print "lele", event_id
            event = Event.objects.get(id=event_id)
            event.delete()
        
            return HttpResponse(json.dumps({"success":True}), mimetype="application/json")
        except: 
            print traceback.print_exc()    
            return HttpResponse(json.dumps({"success":False}), mimetype="application/json")
        
        
def get_events(request):
    if request.method == 'GET':
        try:
            starts = request.GET.get('starts')
            ends = request.GET.get('ends')
            towns = request.GET.get('towns')
            
            if starts == ends == towns == None:
                events = Event.objects.select_related().prefetch_related().all().order_by("on_date")[:20]
                stuff = serialize_events(events=events)
                return HttpResponse(stuff, mimetype="application/json")
        except Exception as e: print e
        
        
        
def artistHandler(request):
    if request.method == 'GET':
        query = request.GET.get('artist', None)
        limit = 10
        if query:
            qargs = [Q(name__istartswith=query)]   
  
        data = serializers.serialize('json',  Artist.objects.filter(Q(*qargs))[:limit])
        return HttpResponse(data)          
             
    if request.method == 'POST':
        try:
            name = request.POST.get('name')
            bio = request.POST.get("bio", "")
            images = request.POST.get("images", "")
            videos = request.POST.get("videos", "")
            artist, created = Artist.objects.get_or_create(name=name)
            
            artist.bio = bio
            artist.images = images
            artist.videos = videos
            artist.save()
            
            return HttpResponse(json.dumps({"fields":{"name":artist.name, "bio":artist.bio, "images":artist.images, "videos":artist.videos}, "pk":artist.pk}), mimetype="application/json")
        except Exception as e: print e
        
        
        
def artist_autocomplete(request):
    """ returns data displayed at autocomplete list - 
    this function is accessed by AJAX calls
    """

    limit = 10
    query = request.GET.get('name_startsWith', None)
    callback = request.GET.get("callback") 
    
    # it is up to you how query looks
    if query:
        qargs = [Q(name__istartswith=query)]
        
    data = serializers.serialize('json',  Artist.objects.filter(Q(*qargs))[:limit])
    response = callback + "(" + data + ")"

    return HttpResponse(response)


def venue_autocomplete(request):
    """ returns data displayed at autocomplete list - 
    this function is accessed by AJAX calls
    """
    limit = 10
    query = request.GET.get('name_startsWith', None)
    callback = request.GET.get("callback") 
    
    # it is up to you how query looks
    if query:
        qargs = [Q(name__istartswith=query)]

    data = serializers.serialize('json', Venue.objects.filter(Q(*qargs))[:limit], fields=('name','url', 'country', 'phone', 'capacity', 'city', 'address', "info"))


    response = callback + "(" + data + ")"

    return HttpResponse(response)



def uploadPoster(request):
    if request.method == 'POST':
        f = request.FILES.get("file")
        print "try uploading poster" , f , type(f)
        try:
            poster = Poster(file=f)
            poster.save()
        except Exception as e: print e
    
        result = [ {'name': f.name.replace(" ", "_"),
                   'size': f.size,
                   'url': poster.file.url,
                    "id" : poster.id
                   },]
        

      
        response_data = json.dumps(result)
        if "application/json" in request.META['HTTP_ACCEPT_ENCODING']:
            mimetype = 'application/json'
        else:
            mimetype = 'text/plain'
        return HttpResponse(response_data, mimetype=mimetype)

    
    
    
    
    
    