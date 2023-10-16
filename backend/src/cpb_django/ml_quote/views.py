from django.shortcuts import render
from django.http import HttpResponse

# 부품 목록
from .models import Cpu
from .models import Cooler
from .models import Mainboard
from .models import Memory
from .models import Videocard
from .models import Storage
from .models import Power
from .models import Comcase

def post_view(request):
  cpu = Cpu.objects.all()
  cooler = Cooler.objects.all()
  mainboard = Mainboard.objects.all()
  memory = Memory.objects.all()
  videocard = Videocard.objects.all()
  storage = Storage.objects.all()
  power = Power.objects.all()
  comcase = Comcase.objects.all()

  return render(request, 'index.html',{
    "cpu": cpu, 
    "cooler": cooler,
    "mainboard": mainboard,
    "memory": memory,
    "videocard": videocard,
    "storage": storage,
    "power": power,
    "comcase": comcase,
  })