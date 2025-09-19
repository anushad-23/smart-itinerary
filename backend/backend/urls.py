"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from api.views import TripViewSet, ActivityViewSet, search_places

# Use DRF router to handle ViewSets
router = DefaultRouter()
router.register(r'trips', TripViewSet, basename="trip")
router.register(r'activities', ActivityViewSet, basename="activity")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),           # Trips + Activities endpoints
    path('api/search_places/', search_places, name="search_places"),  # Google Places API
]


