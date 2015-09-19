from django.shortcuts import render_to_response
from django.template import RequestContext
from django.contrib.auth.models import User
from django.contrib.auth import logout as log__out
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.auth import authenticate
from django.contrib.auth import login as auth_login
from django.db.models import Q
import json
from models import STUser, Event
from django.core import serializers

from venue.forms import VenueForm

import traceback
import datetime





def index(request):
    if request.user.is_authenticated():
        venue_form = VenueForm()
        show_login = False
        return render_to_response('index.html',locals(), RequestContext(request))
    else:
        return render_to_response('splash.html', RequestContext(request))

    
    
def home(request):
    venue_form = VenueForm()
    try:
        user_id = request.session['user_id']
        show_login = False
        return render_to_response('index.html', locals(), RequestContext(request))
    except:
        if request.user.is_authenticated():
            user = User.objects.filter(username=request.user)[0] # TODO: optimize fetch only id
            user_id = user.id
            venue_form = VenueForm()
            show_login = False
            return render_to_response('index.html',locals(), RequestContext(request))
        else:
            show_login = True
            user_id = ""
            return render_to_response('index.html', locals(), RequestContext(request))
            
            
            
            
def fb_login(request):
    if request.method == 'POST':
        from urllib import urlopen
        
        user_id = request.POST.get("userID")
        access_token = request.POST.get("access_token")
        
        url = "https://graph.facebook.com/%s?fields=id,name,email&access_token=%s" % (user_id, access_token)
        response = urlopen(url)
        data = json.loads(response.read())
        #print 777, data, user_id
        
        
        user = authenticate(username=data["name"], password="genericFBpasswd")
        #print "here", user , data["name"]
        if user is not None:
            if user.is_active:
                auth_login(request, user)
                request.session['user_id'] = user.id
                return HttpResponse(json.dumps({'success':True}), mimetype="application/json")
            else:
                return HttpResponse(json.dumps({'success':False}), mimetype="application/json")
        else:
            try:
                user = User.objects.create_user(data["name"], data["email"], "genericFBpasswd")
                #print "created", user
                user = authenticate(username=data["name"], password="genericFBpasswd")
                auth_login(request, user)
                request.session['user_id'] = user.id
                return HttpResponse(json.dumps({'success':True}), mimetype="application/json")
            except:
                return HttpResponse(json.dumps({'success':False}), mimetype="application/json")
    

            


def logout(request):
    try:
        del request.session['user_id']
    except KeyError:
        pass
    log__out(request)
    #return render_to_response('index.html', RequestContext(request))
    return HttpResponseRedirect("/")


def register(request):
    if request.method == 'POST':
        username = request.POST.get("username")
        password = request.POST.get("password")
        email = request.POST.get("email")
        try:
            user = User.objects.create_user(username, email, password)
            return HttpResponse(json.dumps({'success':True}), mimetype="application/json")
        except:
            #print traceback.format_exc()
            return HttpResponse(json.dumps({'success':False}), mimetype="application/json")


def login(request):
    if request.method == 'POST':
        username = request.POST.get("username")
        password = request.POST.get("password")
        keep = request.POST.get("keep")
        user = authenticate(username=username, password=password)
        if user is not None:
            if user.is_active:
                auth_login(request, user)
                if keep == "true":
                    request.session['user_id'] = user.id
                    
                return HttpResponse(json.dumps({'success':True, "user_id":user.id}), mimetype="application/json")
            else:
                return HttpResponse(json.dumps({'success':False}), mimetype="application/json")
        else:
            return HttpResponse(json.dumps({'success':False}), mimetype="application/json")
            
            
def social_login(request):
    return HttpResponseRedirect("/")


def userEvents(request):

    def json_response(items):
        data = serializers.serialize('json',  items, relations=('artists','venue', 'poster',))
        return HttpResponse(data, mimetype='application/json')

    stuser = STUser.objects.select_related().prefetch_related().get(user=request.user)
    try:
        return json_response(stuser.events.filter(on_date__gte=datetime.datetime.now()).order_by("on_date"))
    except:
        return HttpResponse(json.dumps([]), mimetype="application/json")


def active_cities(request):

    if request.method == 'GET':
        _from = request.GET.get("from", datetime.datetime.now())
        _to = request.GET.get("to", None)
        
        if _to:
            cities = Event.objects.filter(Q(on_date__gte=_from) and Q(on_date__lte=_to)).values('venue__city').distinct()
        else:
            cities = Event.objects.filter(Q(on_date__gte=_from)).values('venue__city').distinct()

        cities = [i["venue__city"] for i in cities]
        
        return HttpResponse(json.dumps(cities), mimetype="application/json")


    
def terms(request):
    return render_to_response('terms_of_use.html', RequestContext(request))
