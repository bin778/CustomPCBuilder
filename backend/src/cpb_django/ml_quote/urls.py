from django.urls import path, include
from . import keyword

urlpatterns = [
    path('', keyword.main),
]