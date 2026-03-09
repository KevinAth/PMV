from django.contrib.auth.hashers import make_password,check_password
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view , permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Usuarios,Categorias,Producto,Proveedores,Lote,Notificacion
from django.core.paginator import Paginator
from django.db.models import F

## Registra Usuarios
@api_view(['POST'])
def RegistrarUsuario(request):
    try:
        data = request.data
        nuevo_usuario = data.get('usuario')
        nuevo_email = data.get('email')
        password = data.get('password')
        password_val = data.get('password_val')
        
        if not nuevo_usuario or not nuevo_email or not password or not password_val:
            return Response({"status":"error","message":"Faltan credenciales para registrar usuario."}, status=status.HTTP_400_BAD_REQUEST)

        
        if password != password_val:
            return Response({'status':'error',"message":"Las contraseñas no coinciden."},status=status.HTTP_400_BAD_REQUEST)
        
        hash_pp = make_password(password)
        print(hash_pp)
        Usuarios.objects.create(
            username = nuevo_usuario,
            email = nuevo_email,
            password = hash_pp
            )
        return Response({"status":"success","message":"Usuario creado correctamente."},status=status.HTTP_200_OK)
    
    except Exception as e:
        return Response ({
            "status":"error",
            "message" : "Error interno del servidor.",
            "detail" : str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
## Valida credenciales de un usuario y genera un token.        
@api_view(['POST'])    
def ValidarUsuario(request):
    try:
        data = request.data
        val_user = data.get('usuario')
        val_password = data.get('password')
        
        if not val_user or not val_password:
            return Response({
                "status" : "error",
                "message" : "Faltan credenciales para la autenticacion de usuario."
            }, status=status.HTTP_400_BAD_REQUEST)

        usuario = Usuarios.objects.get(username=val_user)
        
        if check_password(val_password, usuario.password):
            refresh = RefreshToken.for_user(usuario)
            return Response({
                "status":"success",
                "message": "Usuario autenticado.",
                'refresh' : str(refresh),
                'access' : str(refresh.access_token)
            },status=status.HTTP_200_OK)
        else:
            return Response({'status': "error", 'message': "Usuario o Contraseña incorrectos."},status=status.HTTP_401_UNAUTHORIZED)

    except Usuarios.DoesNotExist:
        return Response({"status": "error", "message":"Usuario no existe en la base de datos."},status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'status': 'error', 
                        'message': 'Error interno del servidor.',
                        "detail":str(e)},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
@api_view(['GET'])#-> tiene esto alguna funcionalidad real? - ver a futuro y dependiendo borrar,
@permission_classes([IsAuthenticated])
def UserValidate(request):
    user = request.user
    data = {"id":user.id,
            "username":user.username,
            "email":user.email}
    return Response({"status":"success","message":"Usuario verificado.","user":data}, status=status.HTTP_200_OK)
# -> crear categoria
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def CrearCat(request):
    Categorias.objects.create(usuario=request.user,nombre=request.data.get("nombre"))
    
    return Response ({"status":"success","message":"Categoria creada correctamente."}, status=status.HTTP_200_OK)

# -> crear proveedor

# -> crear productos
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def CrearProd(request):
    try:
        datos = request.data

        if not datos.get("nombre") or not datos.get("descripcion") or not datos.get('categoria') or not datos.get('proveedor') or not datos.get('stock_minimo') or not datos.get('maneja_lote'):
            return Response ({'status':'error','message':'Datos incompletos'}, status=status.HTTP_400_BAD_REQUEST)
        
        cate = Categorias.objects.get(id=datos.get("categoria"))
        prove = Proveedores.objects.get(id=datos.get("proveedor"))

        imagen = request.FILES.get("imagen")

        if datos.get("maneja_lote") == "false":
            lote = False
        else:
            lote = True

        Producto.objects.create(usuario=request.user,
                                nombre=datos.get('nombre'),
                                descripcion=datos.get('descripcion'),
                                categoria=cate,
                                proveedor=prove,
                                stock_minimo=datos.get('stock_minimo'),
                                maneja_lote=lote,
                                imagen=imagen
                                )
        return Response({'status':'success','message':'Producto creado correctamente'}, status=status.HTTP_200_OK)
    except Exception as e:
        print(str(e)),
        return Response({'status':'error','message':'Error interno del servidor','details':str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# -> obtener variables
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def Get_variantes(request):
    proveedores = (Proveedores.objects.values("id","nombre"))
    categorias = (Categorias.objects.values("id","nombre"))
    return Response({"proveedores":proveedores,"categorias":categorias},status=status.HTTP_200_OK)

# Obtener producto por id
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def Get_productoXid(request,id):
    producto = Producto.objects.filter(usuario=request.user.id,id=id).values()
    result = producto[0]
    categoria = Categorias.objects.get(id=result["categoria_id"])
    proveedor = Proveedores.objects.get(id=result["proveedor_id"])
    result["categoria"] = categoria.nombre
    result["proveedor"] = proveedor.nombre

    return Response({"status":'succes',"message":"Producto cargado correctamente.",'result':result}, status=status.HTTP_200_OK)

# Paginacion
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def ProdInvXPag(request,page):
    try:
        prodSet = Producto.objects.filter(usuario=request.user.id).values()
        pageNumber = 10
        
        paginador = Paginator(prodSet,pageNumber)
        page_obj = paginador.get_page(page)

        result = []
        for item in page_obj:
            categoria = Categorias.objects.get(id=item["categoria_id"])
            proveedor = Proveedores.objects.get(id=item["proveedor_id"])
            item["categoria"] = categoria.nombre
            item["proveedor"] = proveedor.nombre
            result.append(item)
        
        return Response({
            'result': result,
            'total_pages': paginador.num_pages,
            'current_page': page_obj.number,
            'has_next': page_obj.has_next(),
            'has_previous' : page_obj.has_previous(),
            'conunt': paginador.count
        }, status=status.HTTP_200_OK)
    
    except Exception as e:
        print(e)

# agregar lotes de productos
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def AddLote(request,id):
    try:
        datos = request.data
        producto = Producto.objects.get(id=id)
        Lote.objects.create(producto=producto,precio_lote=datos["precio_lote"],fecha_vencimiento=datos["vencimiento_lote"],cantidad_ingresada=datos["cantidad_lote"],cantidad_actual=datos["cantidad_lote"])
    except Exception as e :
        print(e)
    return Response("ZHI")

# Obtener todos los lotes de un producto
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def GetLotes(request,id):
    lotes = Lote.objects.filter(producto=id).values()
    return Response({"status":'succes',"message":"Producto cargado correctamente.",'result':list(lotes)}, status=status.HTTP_200_OK)

# agregar Proveedores
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def AddProv(request):
    try:
        data = request.data
        print(request.user.id)
        usuario = Usuarios.objects.get(id=request.user.id)
        Proveedores.objects.create(
            usuario=usuario,
            nombre=data.get("nombre"),
            acerca= data.get("acerca"),
            telefono = data.get("telefono"),
            direccion = data.get("direccion"),
            email= data.get("email")
        )
        return Response({'status':'success','message':'Proveedor Creado corectamente'})
    except Exception as e:
        print(e)
        return Response({
            "status":"error",
            "message" : "Error interno del servidor.",
            "detail" : str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def GetProv(request):
    try:
        usuario = Usuarios.objects.get(id=request.user.id)
        provers = Proveedores.objects.filter(usuario=usuario).values()
        return Response({'status':'success','message':'Proveedor cargado corectamente',"result":provers})
    except Exception as e:
                return Response({
            "status":"error",
            "message" : "Error interno del servidor.",
            "detail" : str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

from datetime import timedelta
from django.utils import timezone

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def GetNoti(request):
    try:
        data=[]

        hoy = timezone.now().date()
        limite = hoy + timedelta(days=7)

        stock_menos = Producto.objects.filter(stock_actual__lte=F("stock_minimo"),stock_actual__gt=0).values()
        stock_agotado = Producto.objects.filter(stock_actual=0).values()
        
        vencidos = Lote.objects.filter(fecha_vencimiento__lte=hoy).values()
        xvencer = Lote.objects.filter(fecha_vencimiento__lte=limite,fecha_vencimiento__gt=hoy).values()


        for i in stock_menos:
            data.append({
                "mensaje": f"El stock({i['stock_actual']}) del producto {i['nombre']} esta por debajo del stock minimo({i['stock_minimo']}).",
                "tipo":"agotandose",
                "id":i["id"]
            })


        for z in stock_agotado:
            data.append({
                "mensaje": f"El producto {z['nombre']} no tiene existencias.",
                "tipo":"agotado",
                "id":z["id"]
            })


        for x in vencidos:
            xprod = Producto.objects.get(id=x["producto_id"])

            data.append({
                "mensaje": f"El lote#{x['id']} del producto {xprod.nombre} llego a su fecha de vencimiento.",
                "tipo":"vencido",
                "id":x["producto_id"]
            })


        for y in xvencer:
            yprod = Producto.objects.get(id=y["producto_id"])
            data.append({
                "mensaje": f"El lote#{y['id']} del producto {yprod.nombre} esta cerca de la fecha de vencimiento.",
                "tipo":"xvencido",
                "id":y["producto_id"]
            })

        return Response({"status":'succes',"message":"Notificaciones cargadas correctamente.",'result':list(data)}, status=status.HTTP_200_OK)
    except Exception as e:
        print(e)
        return Response({
            "status":"error",
            "message" : "Error interno del servidor.",
            "detail" : str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
