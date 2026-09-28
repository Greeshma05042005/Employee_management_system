from django.urls import path
from . import views

urlpatterns = [
    path('display/', views.display),
    path('create/', views.insert),
    path('update/<int:id>/', views.update),
    path('partial-update/<int:id>/', views.partial_update),
    path('delete/<int:id>/', views.delete),
]