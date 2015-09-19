from django.conf.urls import patterns, include, url

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    #url(r'^$', 'stagediving.views.index', name='index'),
    #url(r'^home/$', 'stagediving.views.home', name='home'),
    url(r'^$', 'stagediving.views.home', name='home'),
    url(r'^terms/$', 'stagediving.views.terms', name='terms'),
    url(r'^register/$', 'stagediving.views.register', name='register'),
    url(r'^login/$', 'stagediving.views.login', name='login'),
    url(r'^logout/$', 'stagediving.views.logout', name='logout'),
    url(r'^fb-login/$', 'stagediving.views.fb_login', name='fb_login'),
    url(r'^social-login/$', 'stagediving.views.social_login', name='social_login'),
    url(r'^socialauth_complete/$', 'stagediving.views.social_login', name='social_login'),
    url(r'^socialauth_associate_complete/$', 'stagediving.views.social_login', name='social_login'),
    url(r'^event/', include('event.urls')),
    url(r'^artist/', 'event.views.artistHandler'),

    url(r'^venue/', include('venue.urls')),
    
    url(r'^active_cities/', 'stagediving.views.active_cities'), 
    
    
    url(r'^user_events/$', 'stagediving.views.userEvents'),

    # Uncomment the admin/doc line below to enable admin documentation:
    url(r'^admin/doc/', include('django.contrib.admindocs.urls')),
  
    url(r'^admin/', include(admin.site.urls)),
    
    url(r'', include('social_auth.urls')),
)
