from django import forms
from models import Event, Artist
from venue.models import Venue
from django.forms import widgets 
from django.core.urlresolvers import reverse


class EventForm(forms.ModelForm):
    
    class Meta:
        model = Event
        exclude = ('artist','venue',)
        
    #artists = forms.ModelMultipleChoiceField(queryset=Artist.objects.all())
    #venues = forms.ModelChoiceField(queryset=Venue.objects.all())
    
    def __init__(self, *args, **kwargs):
    
        '''if 'instance' in kwargs:
          
            initial = kwargs.setdefault('initial', {})
            initial['artists'] = [t.pk for t in kwargs['instance'].artist_set.all()]
            initial['venue'] = [t.pk for t in kwargs['instance'].venue]'''
    
        forms.ModelForm.__init__(self, *args, **kwargs)
        self.fields['on_date'] = forms.CharField(widget=forms.TextInput(attrs={"class":"field date"}))
        self.fields['price'] = forms.CharField(widget=forms.TextInput(attrs={"class":"field entrance"}))

        
    
    
    def save(self, commit=True):
    
        instance = forms.ModelForm.save(self, False)
    
    
        '''old_save_m2m = self.save_m2m
        def save_m2m():
            old_save_m2m()
            instance.topping_set.clear()
            for topping in self.cleaned_data['toppings']:
                instance.topping_set.add(topping)
        self.save_m2m = save_m2m
    
        if commit:
            instance.save()
            self.save_m2m()
    
        return instance'''
        
        
class ArtistForm(forms.ModelForm):
    
    class Meta:
        model = Artist
        exclude = ('slug',)
        
    def __init__(self, *args, **kwargs):
    
        forms.ModelForm.__init__(self, *args, **kwargs)
        self.fields['name'] = forms.CharField(widget=forms.TextInput(attrs={"class":"field artist"}))
        
        

        

        
    