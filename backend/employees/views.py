from django.shortcuts import render
from rest_framework.decorators import api_view
from .serializer import Employeeserializer
from .models import Employee
from rest_framework.response import Response
from rest_framework import status
# Create your views here.
@api_view(['GET'])
def display(request):
    s=Employee.objects.all()
    seirilaizer=Employeeserializer(s,many=True)
    return Response(seirilaizer.data)
@api_view(['POST'])
def insert(request):
    seirilazier=Employeeserializer(data=request.data)
    if seirilazier.is_valid():
        seirilazier.save()
        return Response(seirilazier.data)
    return Response(seirilazier.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def update(request,id):
    s=Employee.objects.get(id=id)
    serilaizer=Employeeserializer(s,data=request.data)
    if serilaizer.is_valid():
        serilaizer.save()
        return Response(serilaizer.data)
    return Response(serilaizer.errors)

@api_view(['PATCH'])
def partial_update(request,id):
    s=Employee.objects.get(id=id)
    serilizer=Employeeserializer(s,data=request.data,partial=True)
    if serilizer.is_valid():
        serilizer.save()
        return Response(serilizer.data)
    return Response(serilizer.errors)

@api_view(['DELETE'])
def delete(request,id):
    s=Employee.objects.get(id=id)
    s.delete()
    return Response({"message":'Employee delected succefully.......'})