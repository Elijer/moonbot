from django.urls import path

from . import views

urlpatterns = [
    
    path('/', views.default, name="default"),
    
    path('analyzeRequest/', views.analyzeRequest, name="analyze"),
    
    path('updateSleep/', views.updateSleep, name="updateSleep"),
    path('updateEnergy/', views.updateEnergy, name="updateEnergy"),
    path('updateEntry/', views.updateEntry, name="updateEntry"),
    path('getEntry/', views.getEntry, name="getEntry"),
    
    path('getSettings/', views.getSettings, name="getSettings"),
    path('updateSettings/', views.updateSettings, name="updateSettings"),
    
    path('getAllEntries/', views.getAllEntries, name="getEntry"),
    path('graphAllEntries/', views.graphAllEntries, name="graphEntry"),
    path('graphRest/', views.graphRest, name="graphRest"),
]
