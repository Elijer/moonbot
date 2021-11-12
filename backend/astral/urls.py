from django.urls import path

from . import views

urlpatterns = [
    path('updateSleep/', views.updateSleep, name="updateSleep"),
    path('updateEnergy/', views.updateEnergy, name="updateEnergy"),
    path('updateEntry/', views.updateEntry, name="updateEntry"),
    path('getEntry/', views.getEntry, name="getEntry"),
    
    path('getPosts/', views.getPosts, name="getPosts"),
    path('newPost/', views.newPost, name="newpost"),
    path('likePost/', views.likePost, name="likepost"),
    path('editPost/', views.editPost, name="editPost"),
    path('getProfile/', views.getProfile, name="getProfile"),
    path('follow/', views.follow, name="follow"),
    path('analyzeRequest/', views.analyzeRequest, name="analyze")
]
