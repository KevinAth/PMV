
from django.db import models
import uuid


class Usuarios(models.Model):
    id_usuario = models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False,)
    usuario = models.CharField(max_length=200,unique=True)
    contraseña = models.CharField(max_length=128)
    email = models.EmailField(max_length=256)
    activo = models.BooleanField(default=True)
    fecha_registro = models.DateField(auto_now_add=True)
    
    def __str__(self):
        return self.usuario + ' - ' + self.contraseña