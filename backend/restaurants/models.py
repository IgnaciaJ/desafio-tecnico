from django.db import models
from django.core.exceptions import ValidationError
from django.core.validators import MaxValueValidator, MinValueValidator

class Restaurant(models.Model):
    name = models.TextField()
    foodtype = models.TextField()
    city = models.TextField()
    country = models.TextField()
    visited = models.BooleanField()
    qualification = models.FloatField(null=True,
    validators=[MinValueValidator(0.0), MaxValueValidator(100.0)],)

    def clean(self):
        if self.visited and not self.qualification.strip():
            raise ValidationError('Qualification is required')
    def __str__(self):
        return f"{self.name} - {self.city},{self.country} - {self.foodtype}\n"

# Create your models here.
