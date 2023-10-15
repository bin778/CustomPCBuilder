from django.shortcuts import render
from django.http import HttpResponse
from .models import Cpu

def post_view(request):
  cpu = Cpu.objects.all()
  print(cpu)