from django.urls import path
from . import views


urlpatterns = [
    path('valuser/',views.ValidarUsuario, name='verificar_usuario'),
    path('resgisteruser/',views.RegistrarUsuario, name='registrar_usuario'),
    path('uservalidate/',views.UserValidate, name='validar_usuario'),
    path("crearcat/", views.CrearCat, name="CrearCat")
]
