# Shell
# from astral.models import Entry

from django.core.exceptions import ObjectDoesNotExist

from backend.settings import SECRET_KEY

import json
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes

from django.core.paginator import Paginator

import jwt

from .serializers import ProfileSerializer

from .models import User, Entry
# from network.models import User, Post

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def analyzeRequest(request):
    if request.body:
        option = json.loads(request.body).get("option", "")

        # Get all header data
        if option == "headers":
            return Response( request.headers.keys() )

        # Get all body data
        elif option == "body":
            return Response(json.loads(request.body))

        elif option == "decode":
            return Response(decodeToken(request))
    else:

        # Get just the authorization key
        return Response(request.headers["Authorization"]) # This returns just the Authorization jwt-access-key

def decodeToken(request):
    data = request.headers["Authorization"]
    token = str.replace(str(data), 'Bearer ', '')
    decodedToken = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
    return (decodedToken["user_id"])

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def graphRest(request):
    u = User.objects.get(id=decodeToken(request))
    entries = Entry.objects.filter(creator=u).order_by('dayInMilliseconds')
    return Response([entry.serializeRest() for entry in entries])

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def graphAllEntries(request):
    u = User.objects.get(id=decodeToken(request))
    entries = Entry.objects.filter(creator=u).order_by('timestamp')
    entryCount = entries.count()
    options = {"entryCount": entryCount}
    return Response([entry.serializeSleep() for entry in entries])


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def getAllEntries(request):
    u = User.objects.get(id=decodeToken(request))
    entries = Entry.objects.filter(creator=u)
    entryCount = entries.count()
    options = {"entryCount": entryCount}
    return Response(([entry.serialize() for entry in entries], options))
    

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def getEntry(request):
    data = json.loads(request.body)
    dateString = data.get("dateString", "")
    # dayInMilliseconds = data.get("dayInMilliseconds", "")
    u = User.objects.get(id=decodeToken(request))
    entryCount = Entry.objects.filter(dateString=dateString, creator=u).count()
    
    if entryCount == 1:
        entry = Entry.objects.get(dateString=dateString, creator=u)
        return Response(entry.serialize())
    elif entryCount == 0:
        return Response("Entry does not exist yet.")
    elif entryCount > 1:
        return Response("More than one entry exists, which should not be the case.")
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def updateEntry(request):
    # Non-optional data
    data = json.loads(request.body)
    dateString = data.get("dateString", "")
    dayInMilliseconds = data.get("dayInMilliseconds", "")
    u = User.objects.get(id=decodeToken(request))
    entryCount = Entry.objects.filter(dateString=dateString, creator=u).count()
    
    # Error handling to make sure valid entry exists
    if entryCount == 1:
        entry = Entry.objects.get(dateString=dateString, creator=u)
    elif entryCount == 0:
        entry = Entry(
            creator=u,
            dateString=dateString,
            dayInMilliseconds=dayInMilliseconds
        )
    elif entryCount > 1:
        return Response("Found multiple entries with same datestring and creator, indicating a problem.")
    else:
        return Response("Unknown problem finding and updating sleep data of correct entry")
    
    # Optional data updates to entry
    if data.get("energy", "") != "":
        entry.energy = data.get("energy", "")
    if data.get("wake", "") != "":
        entry.wake = data.get("wake", "")
    if data.get("sleep", "") != "":
        entry.sleep = data.get("sleep", "")
    if data.get("cries", "") != "":
        entry.cries = data.get("cries", "")
    if data.get("BC_day", "") != "":
        entry.BC_day = data.get("BC_day", "")
    if data.get("sleepDomain", "") != "":
        entry.sleepDomain = data.get("sleepDomain", "")
    if data.get("wakeDomain", "") != "":
        entry.wakeDomain = data.get("wakeDomain", "")
        
    entry.save()
    return JsonResponse(status=201, data = entry.serialize())
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def updateEnergy(request):
    data = json.loads(request.body)
    dateString = data.get("dateString", "")
    u = User.objects.get(id=decodeToken(request))
    entryCount = Entry.objects.filter(dateString=dateString, creator=u).count()
    
    if entryCount == 1:
        entry = Entry.objects.get(dateString=dateString, creator=u)
    elif entryCount == 0:
        entry = Entry(
            creator=u,
            dateString=dateString,
        )
    elif entryCount > 1:
        return Response("Found multiple entries with same datestring and creator, indicating a problem.")
    else:
        return Response("Unknown problem finding and updating sleep data of correct entry")
        
    if data.get("energy", "") != "":
        entry.energy = data.get("energy", "")

    entry.save()
    return JsonResponse(status=201, data = entry.serialize())

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def updateSleep(request):
    data = json.loads(request.body)
    dateString = data.get("dateString", "")
    u = User.objects.get(id=decodeToken(request))
    entryCount = Entry.objects.filter(dateString=dateString, creator=u).count()
    
    if entryCount == 1:
        entry = Entry.objects.get(dateString=dateString, creator=u)
    elif entryCount == 0:
        entry = Entry(
            creator=u,
            dateString=dateString,
        )
    elif entryCount > 1:
        return Response("Found multiple entries with same datestring and creator, indicating a problem.")
    else:
        return Response("Unknown problem finding and updating sleep data of correct entry")
        
    if data.get("wake", "") != "":
        entry.wake = data.get("wake", "")
    if data.get("sleep", "") != "":
        entry.sleep = data.get("sleep", "")

    entry.save()
    return JsonResponse(status=201, data = entry.serialize())