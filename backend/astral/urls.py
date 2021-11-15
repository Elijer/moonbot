from django.urls import path

from . import views

urlpatterns = [
    path('analyzeRequest/', views.analyzeRequest, name="analyze"),
    
    path('updateSleep/', views.updateSleep, name="updateSleep"),
    path('updateEnergy/', views.updateEnergy, name="updateEnergy"),
    path('updateEntry/', views.updateEntry, name="updateEntry"),
    path('getEntry/', views.getEntry, name="getEntry"),
    path('getAllEntries/', views.getAllEntries, name="getEntry"),
    path('graphAllEntries/', views.graphAllEntries, name="graphEntry"),
    path('graphRest/', views.graphRest, name="graphRest"),
]
