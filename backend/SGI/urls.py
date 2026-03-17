from django.urls import path
from . import views

urlpatterns = [
    path('valuser/',views.ValidarUsuario, name='verificar_usuario'),
    path('resgisteruser/',views.RegistrarUsuario, name='registrar_usuario'),
    path('uservalidate/',views.UserValidate, name='validar_usuario'),
    path("crearcat/", views.CrearCat, name="CrearCat"),
    path("createprod/", views.CrearProd, name="CrearProd"),
    path("obtenervar/",views.Get_variantes, name="GetVar"),
    path("obtenerprodxpag/<int:page>/",views.ProdInvXPag, name="ProdInvXPag"),
    path("getprodxid/<str:id>/",views.Get_productoXid, name="ProdDelXId"),
    path("addlote/<str:id>/",views.AddLote, name="addloteret"),
    path("addlotes/<str:id>/",views.GetLotes, name="getlotes"),
    path("addprov/",views.AddProv, name="addprov"),
    path("getprov/",views.GetProv, name="getprov"),
    path("getnoti/",views.GetNoti, name="getnoti"),
    path("eliprod/<str:id>/",views.Delete_prod, name="deleteprod"),
    path("modprod/<str:id>/",views.Modiprod, name="modiprod"),
    path("elilote/<str:id>/",views.Delete_lote, name="elilote"),
    path("modprov/<str:id>/",views.ModiProvs, name="modprovs"),
    path("eliproves/<str:id>/",views.Delete_proves, name="eliproves")
]
