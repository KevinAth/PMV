from django.shortcuts import render
from django.http import JsonResponse
# Create your views here.

def Mensaje(request):
    print("mierda")
    return JsonResponse({'mensaje': 'puto'})