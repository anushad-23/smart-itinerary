from rest_framework import viewsets, permissions
from .models import Trip, Activity
from .serializers import TripSerializer, ActivitySerializer
from rest_framework.decorators import action, api_view
from rest_framework.response import Response
from django.http import JsonResponse
from django.conf import settings
import requests


# ------------------------
# 🌍 Google Places Search
# ------------------------
def search_places(request):
    query = request.GET.get("query", "")
    if not query:
        return JsonResponse({"error": "Query is required"}, status=400)

    api_key = settings.GOOGLE_API_KEY
    url = f"https://maps.googleapis.com/maps/api/place/textsearch/json?query={query}&key={api_key}"

    try:
        response = requests.get(url)
        data = response.json()

        # Extract useful info only
        places = [
            {
                "name": place.get("name"),
                "address": place.get("formatted_address"),
                "rating": place.get("rating"),
            }
            for place in data.get("results", [])
        ]

        return JsonResponse({"places": places}, safe=False)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


# ------------------------
# 🗺️ Trip ViewSet
# ------------------------
class TripViewSet(viewsets.ModelViewSet):
    queryset = Trip.objects.all().order_by('-created_at')
    serializer_class = TripSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def get_queryset(self):
        # only return user's trips unless staff
        user = self.request.user
        if user.is_authenticated and not user.is_staff:
            return Trip.objects.filter(owner=user).order_by('-created_at')
        return Trip.objects.all().order_by('-created_at')

    @action(detail=True, methods=['get'])
    def activities_by_category(self, request, pk=None):
        trip = self.get_object()
        category = request.query_params.get("category")
        qs = trip.activities.filter(category=category) if category else trip.activities.all()
        return Response(ActivitySerializer(qs, many=True).data)


# ------------------------
# 🎯 Activity ViewSet
# ------------------------
class ActivityViewSet(viewsets.ModelViewSet):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
