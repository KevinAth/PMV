from django.contrib.auth.models import AbstractUser
from django.db import models
import uuid

class Usuarios(AbstractUser):#-> si hay tiempo y ganas modificar esta tabla de usuarios para eliminar campos innecesarios tridos con el AbstracUser
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    activo = models.BooleanField(default=True)
    fecha_registro = models.DateField(auto_now_add=True)
    
class Categorias(models.Model):#-> No creo que necesite mas.
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    nombre = models.CharField(max_length=75) 

class Proveedores(models.Model):#-> creo que podria borrar algunos campo no tan necesarios.
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable = False)
    nombre = models.CharField(max_length=75)
    acerca = models.TextField(blank=True, null=True)
    
    telefono = models.CharField(max_length=20,blank=True, null=True)
    direccin = models.CharField(max_length=128)
    email = models.EmailField(blank=True, null=True)
            
class Producto(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    nombre = models.CharField(max_length=200)
    descripcion = models.TextField(blank=True, null=True)
    
    catagoria = models.ForeignKey(Categorias, on_delete=models.SET_NULL, null=True, related_name='categorias')
    proveedor =models.ForeignKey(Proveedores, on_delete=models.SET_NULL, null=True, related_name='proveedor')
    
    precio_compra = models.DecimalField(max_digits=12,decimal_places=2,default=0)
    precio_venta = models.DecimalField(max_digits=12,decimal_places=2,default=0)
    stock_total = models.IntegerField(default= 0)
    stock_minimo = models.IntegerField()    
    
    maneja_lote = models.BooleanField(default=False)
    
    activo = models.BooleanField(default=True)
    date_add = models.DateField(auto_now_add=True)
    date_update = models.DateField(auto_created=True)
    ##imagen = models.ImageField(upload_to='productos/', blank=True, null=True)#-> no funciona, creo que para subir imagen tengo que crear en urls una ruta a archivos staticos pero creo que eso sobre llena los servidores, pero aja. toca ver.

    ##Tengo que añadir alguna forma de que la cantidad de productos traidas en un lote se sumen a la cantidad total de productos en Producto
    
class Lote(models.Model):#-> Mejorar esta huevada
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE, related_name='lotes')
    numero_lote = models.CharField(max_length=50)
    fecha_vencimiento = models.DateField(null=True, blank=True)
    fecha_ingreso = models.DateField(auto_now_add=True)
    cantidad_ingresada = models.DecimalField(max_digits=12, decimal_places=3)
    cantidad_actual = models.DecimalField(max_digits=12, decimal_places=3)
    
## -> añadir la tabla para Guardar productos añadidos, parecido a un historial de entradas
## -> añadir una tabla para guardas los producto vendidos o que salieron del inventario, parecido a un historial de ventas
    