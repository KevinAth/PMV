from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import make_password,check_password
from rest_framework.decorators import api_view 
from django.http import JsonResponse
from .models import Usuarios
import json


@api_view(['POST'])
@csrf_exempt
def RegistrarUsuario(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        nuevo_usuario = data.get('usuario')
        nuevo_email = data.get('email')
        password = data.get('password')
        password_val = data.get('password_val')
        
        if password != password_val:
            print("no chale")
            return JsonResponse({'Mensage':'Contraseñas no coinciden'})
        
        hash_pp = make_password(password)
        print(hash_pp)
        Usuarios.objects.create(
            usuario = nuevo_usuario,
            email = nuevo_email,
            contraseña = hash_pp
            )
        
        return JsonResponse({'mesnaje':'Usuario creado'})
    
@api_view(['POST'])
@csrf_exempt       
def ValidarUsuario(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            val_user = data.get('usuario')
            val_password = data.get('password')

            usuario = Usuarios.objects.get(usuario=val_user)

            if check_password(val_password, usuario.contraseña):
                return JsonResponse({'login': True, 'mensaje': '¡Bienvenido!'})
            else:
                return JsonResponse({'login': False, 'mensaje': 'Contraseña incorrecta'})

        except Usuarios.DoesNotExist:
            return JsonResponse({'login': False, 'mensaje': 'Usuario no existe'})

    return JsonResponse({'error': 'Método no permitido'}, status=405)