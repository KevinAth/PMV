from django.test import TestCase

import random
from django.core.files import File
from SGI.models import Producto, Categorias, Proveedores,Usuarios

imagen = "/home/kevin/Imágenes/productos.jpeg"

categorias = Categorias.objects.filter(id__in=[
    "8cd762e4-78af-4c51-a4b6-05e0273cd3d2",
    "878841ca-485e-4a6a-bff3-2c4a2fb19a15",
    "0681b200-4621-4e19-99c1-9389df60873b",
    "a38cec06-7021-407e-992d-b2676c355ec1"
])

proveedores = Proveedores.objects.filter(id__in=[
    "5ed44682-b6bf-4d77-92be-c50588a4d6a7",
    "0a859ec4-5f2b-4143-963a-e0d66c963955",
    "2185b863-4c1e-42ac-9ae6-e654e75ec038"
])

usuario = Usuarios.objects.get(id="fc7ea352-561f-463b-8ab9-86072bbede4b")

for i in range(80):
    cate = random.choice(list(categorias))
    prov = random.choice(list(proveedores))

    with open(imagen, 'rb') as f:
        producto = Producto.objects.create(
            usuario=usuario,
            nombre=f"producto generico {i}",
            descripcion="Lorem ipsum...",
            categoria=cate,
            proveedor=prov,
            stock_minimo=random.randint(20, 200),
            maneja_lote=True,
        )
        producto.imagen.save(f"img_{i}.jpg", File(f), save=True)