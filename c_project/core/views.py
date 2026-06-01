from rest_framework import generics
from .models import Calculation
from .serializers import CalculationSerializer

class CalculationListCreate(generics.ListCreateAPIView):
    # Fetch the 10 most recent calculations, ordered by newest first
    queryset = Calculation.objects.all().order_by('-created_at')[:10]
    serializer_class = CalculationSerializer