from django.urls import path
from .views import Mensaje

urlpatterns = [
    path('mensaje/',Mensaje, name='mensaje'),
]
