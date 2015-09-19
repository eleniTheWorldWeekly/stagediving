from django import forms
from models import Venue
from django.forms import widgets 

class VenueForm(forms.ModelForm):
    
    class Meta:
        model = Venue
        exclude = ('slug','x','y',"name",)
    
    def __init__(self, *args, **kwargs):
        forms.ModelForm.__init__(self, *args, **kwargs)
        #self.fields['name'] = forms.CharField(widget=forms.TextInput(attrs={"class":"field venue_name"}))
        #self.fields['info'] = forms.CharField(widget=forms.Textarea(attrs={"class":"field venue_info"}))
        self.fields['url'] = forms.CharField(widget=forms.TextInput(attrs={"class":"field venue_url"}))
        self.fields['address'] = forms.CharField(widget=forms.TextInput(attrs={"class":"field venue_address"}))
        self.fields['city'] = forms.CharField(widget=forms.TextInput(attrs={"class":"field venue_city"}))
        self.fields['country'] = forms.CharField(widget=forms.TextInput(attrs={"class":"field venue_country"}))
        self.fields['phone'] = forms.CharField(widget=forms.TextInput(attrs={"class":"field venue_phone"}))
        self.fields['capacity'] = forms.CharField(widget=forms.TextInput(attrs={"class":"field venue_capacity"}))


        
    

        
        
