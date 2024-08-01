from django.shortcuts import render
from .models import songInfo
from .forms import songInfoForm

# Create your views here.
def index(request):
    songs = songInfo.objects.all()

    if songs:
        first_song = songs[0]
    return render(request, 'index.html', {'songs':songs, 'firstsong':first_song})

def login(request):
    pass

def logout(request):
    pass
