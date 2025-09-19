from django.contrib.auth.models import User
from django.db import models


class Trip(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="trips")
    destination = models.CharField(max_length=200)
    start_date = models.DateField()
    end_date = models.DateField()
    preferences = models.JSONField(default=list)  # ["nature", "culture"]

class Activity(models.Model):
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, related_name="activities")
    name = models.CharField(max_length=200)
    category = models.CharField(max_length=100)  # nature, culture, food
    day = models.IntegerField()
    time = models.CharField(max_length=50, blank=True, null=True)
    cost = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)

class Expense(models.Model):
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, related_name="expenses")
    category = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits=10, decimal_places=2)

