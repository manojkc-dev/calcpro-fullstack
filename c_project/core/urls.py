from django.urls import path
from .views import CalculationListCreate

urlpatterns = [
    path('calculations/', CalculationListCreate.as_view(), name='calculation-list'),
]