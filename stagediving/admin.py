from django.contrib import admin
from models import STUser


class STUserAdmin(admin.ModelAdmin):
    pass
admin.site.register(STUser, STUserAdmin)