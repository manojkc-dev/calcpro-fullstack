from django.db import models

class Calculation(models.Model):
    # Stores the equation (e.g., "5 + 5")
    equation = models.CharField(max_length=255)

    # Stores the answer (e.g., "10")
    result = models.CharField(max_length=255)

    # Automatically saves the exact date/time it was created
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.equation} = {self.result}"