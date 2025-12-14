from django.contrib.auth.hashers import make_password,check_password
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view , permission_classes, parser_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Usuarios,Categorias,Producto,Proveedores

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

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def CrearCat(request):
    Categorias.objects.create(nombre=request.data.get("nombre"))
    
    return Response ({"status":"success","message":"Categoria creada correctamente."}, status=status.HTTP_200_OK)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def CrearProd(request):
    try:
        datos = request.data

        if not datos.get("nombre") or not datos.get("descripcion") or not datos.get('categoria') or not datos.get('proveedor') or not datos.get('precio_venta') or not datos.get('stock_minimo') or not datos.get('maneja_lote'):
            return Response ({'status':'error','message':'Datos incompletos'}, status=status.HTTP_400_BAD_REQUEST)
        
        cate = Categorias.objects.get(id=datos.get("categoria"))
        prove = Proveedores.objects.get(id=datos.get("proveedor"))

        imagen = request.FILES.get("imagen")

        if datos.get("maneja_lote") == "false":
            lote = False
        else:
            lote = True

        Producto.objects.create(nombre=datos.get('nombre'),
                                descripcion=datos.get('descripcion'),
                                categoria=cate,
                                proveedor=prove,
                                precio_venta=datos.get('precio_venta'),
                                stock_minimo=datos.get('stock_minimo'),
                                maneja_lote=lote,
                                imagen=imagen
                                )
        print('Funciono, GOOD GOOD GOOD')
        return Response({'status':'success','message':'Producto creado correctamente'}, status=status.HTTP_200_OK)
    except Exception as e:
        print(str(e))
        return Response({'status':'error','message':'Error interno del servidor','details':str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
