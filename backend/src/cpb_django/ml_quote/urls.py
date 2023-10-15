from django.contrib import admin
from django.urls import path
from . import views
from . import keyword

urlpatterns = [
    path('', keyword.main),
    path('', views.post_view),
]