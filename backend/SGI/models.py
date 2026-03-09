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

        total_cantidad = lotes.aggregate(
            total_valor = Sum("cantidad_actual")
        )
        print(total_cantidad["total_valor"])
        total_precio = lotes.aggregate(
            total_valor=Sum(
                ExpressionWrapper(
                    F("precio_lote") * F("cantidad_actual"),
                    output_field=DecimalField()
                )
            ),
            total_cantidad=Sum("cantidad_actual")
        )
        print(total_precio["total_valor"])
        if total_cantidad["total_valor"]:
            self.stock_actual = total_cantidad["total_valor"]
        else:
            self.stock_actual = 0
        if total_precio["total_cantidad"]:
            self.precio_venta = total_precio["total_valor"] / total_cantidad["total_valor"]
        else:
            self.precio_venta = 0
        
        self.save(update_fields=["precio_venta","stock_actual"])
    
class Lote(models.Model):#-> Mejorar esta huevada
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE, related_name='lotes')
    precio_lote=models.DecimalField(max_digits=12,decimal_places=2,default=0)
    fecha_vencimiento = models.DateField(null=True, blank=True)
    fecha_ingreso = models.DateField(auto_now_add=True)
    cantidad_ingresada = models.IntegerField()
    cantidad_actual = models.IntegerField()
    
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs) 
        self.producto.Calcularprecio()

class Notificacion(models.Model):
    usuario = models.ForeignKey(Usuarios, on_delete=models.CASCADE, related_name='notificaciones')
    
    mensaje = models.CharField(max_length=255)
    tipo = models.CharField(max_length=50)
    leida = models.BooleanField(default=False)
    fecha = models.DateField(auto_now_add=True)


## -> añadir la tabla para Guardar productos añadidos, parecido a un historial de entradas
## -> añadir una tabla para guardas los producto vendidos o que salieron del inventario, parecido a un historial de ventas
    