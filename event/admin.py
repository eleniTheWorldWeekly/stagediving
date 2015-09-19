from django.contrib import admin
from models import Artist, Event, Poster


class ArtistAdmin(admin.ModelAdmin):
    pass
admin.site.register(Artist, ArtistAdmin)

class EventAdmin(admin.ModelAdmin):
    pass
admin.site.register(Event, EventAdmin)

class PosterAdmin(admin.ModelAdmin):
    pass
admin.site.register(Poster, PosterAdmin)