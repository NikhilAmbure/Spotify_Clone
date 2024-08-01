from django import forms
from django.forms import ModelForm

from .models import songInfo

class songInfoForm(forms.ModelForm):
    class Meta:
        model = songInfo
        fields = '__all__'