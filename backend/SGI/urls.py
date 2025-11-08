from django.urls import path
from . import views

urlpatterns = [
    path('valuser/',views.ValidarUsuario, name='validar_usuario'),
    path('resgisteruser/',views.RegistrarUsuario, name='registrar_usuario')
]
