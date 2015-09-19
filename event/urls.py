from django.conf.urls import patterns,  url


urlpatterns = patterns('',
    url(r'^$','event.views.eventHandler'),
    url(r'^(?P<event_id>[-.%\w]+)$','event.views.eventHandler'),
    url(r'upload-poster/$', 'event.views.uploadPoster'),
    url(r'events/$', 'event.views.get_events'),
    url(r'events/ajax/list/artist/$', 'event.views.artist_autocomplete'),
    url(r'events/ajax/list/venue/$', 'event.views.venue_autocomplete'),
)

