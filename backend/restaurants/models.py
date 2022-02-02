from django.db import models


class Restaurant(models.Model):
    name = models.TextField()
    foodtype = models.TextField()
    city = models.TextField()
    country = models.TextField()
    qualification = models.FloatField(
            blank=True, null=True)
    visited = models.TextField(null=True, blank=True)

    def set_visited(self):
        self.visited = not self.visited
        self.save()

    def set_qualification(self, number):
        self.qualification = number
        self.save()

    def __str__(self):
        return f"{self.name} - {self.city},{self.country} - {self.foodtype}\n"

# Create your models here.
