from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models import Sum, F, DecimalField, ExpressionWrapper
import uuid

class Usuarios(AbstractUser):#-> si hay tiempo y ganas modificar esta tabla de usuarios para eliminar campos innecesarios tridos con el AbstracUser
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    activo = models.BooleanField(default=True)
    fecha_registro = models.DateField(auto_now_add=True)
    
class Categorias(models.Model):#-> No creo que necesite mas.

    usuario=models.ForeignKey(Usuarios, on_delete=models.CASCADE , related_name="categorias")

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    nombre = models.CharField(max_length=75) 

class Proveedores(models.Model):#-> creo que podria borrar algunos campo no tan necesarios.
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable = False)

    usuario=models.ForeignKey(Usuarios, on_delete=models.CASCADE , related_name="proveedores")

    nombre = models.CharField(max_length=75)
    acerca = models.TextField(blank=True, null=True)
    
    telefono = models.CharField(max_length=20,blank=True, null=True)
    direccion = models.CharField(max_length=128)
    email = models.EmailField(blank=True, null=True)
            
class Producto(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    usuario=models.ForeignKey(Usuarios, on_delete=models.CASCADE ,related_name="productos")

    nombre = models.CharField(max_length=200)
    descripcion = models.TextField(blank=True, null=True)
    
    categoria = models.ForeignKey(Categorias, on_delete=models.SET_NULL, null=True, related_name='categorias')
    proveedor =models.ForeignKey(Proveedores, on_delete=models.SET_NULL, null=True, related_name='proveedor')
    
    precio_compra = models.DecimalField(max_digits=12,decimal_places=2,default=0)
    precio_venta = models.DecimalField(max_digits=12,decimal_places=2,default=0)
    stock_minimo = models.IntegerField()
    stock_actual = models.IntegerField(default=0)    
    
    maneja_lote = models.BooleanField(default=False)
    imagen = models.ImageField(upload_to='productos/', blank=True, null=True)
    
    activo = models.BooleanField(default=True)
    date_add = models.DateField(auto_now_add=True)
    date_update = models.DateField(auto_now=True)
    ##Tengo que añadir alguna forma de que la cantidad de productos traidas en un lote se sumen a la cantidad total de productos en Producto

    def Calcularprecio(self):
        lotes = self.lotes.filter(cantidad_actual__gt=0)

        total = lotes.aggregate(
            total_cantidad=Sum("cantidad_actual"),
            total_valor=Sum("precio_lote")
        )

        total_cantidad = total["total_cantidad"] or 0
        total_valor = total["total_valor"] or 0
            
        self.stock_actual = total_cantidad

        if total_cantidad > 0:
            precioUnitario = total_valor / total_cantidad
            precioVenta = float(precioUnitario) * 1.25
            self.precio_venta = precioVenta
            self.precio_compra = precioUnitario
        else:
            self.precio_venta = 0
            self.precio_compra = 0
        
        self.save(update_fields=["precio_venta","precio_compra","stock_actual"])
    
class Lote(models.Model):#-> Mejorar esta huevada
    usuario=models.ForeignKey(Usuarios, on_delete=models.CASCADE ,related_name="lotes")

    producto = models.ForeignKey(Producto, on_delete=models.CASCADE, related_name='lotes')
    precio_lote=models.DecimalField(max_digits=12,decimal_places=2,default=0)
    fecha_vencimiento = models.DateField(null=True, blank=True)
    fecha_ingreso = models.DateField(auto_now_add=True)
    cantidad_ingresada = models.IntegerField()
    cantidad_actual = models.IntegerField()
    
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs) 
        self.producto.Calcularprecio()
    def refresh(self):
        self.producto.Calcularprecio()
