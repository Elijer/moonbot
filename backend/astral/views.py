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

from .models import User, Post, Entry
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
def getEntry(request):
    data = json.loads(request.body)
    dateString = data.get("dateString", "")
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
    u = User.objects.get(id=decodeToken(request))
    entryCount = Entry.objects.filter(dateString=dateString, creator=u).count()
    
    # Error handling to make sure valid entry exists
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
    
    # Optional data updates to entry
    if data.get("energy", "") != "":
        entry.energy = data.get("energy", "")
    if data.get("wake", "") != "":
        entry.wake = data.get("wake", "")
    if data.get("sleep", "") != "":
        entry.sleep = data.get("sleep", "")
        
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

    

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def getPosts(request):
    data = json.loads(request.body)
    mode = data.get("mode", "")
    userID = data.get("id", "")
    page = data.get("page", "")
    currentUser = decodeToken(request)

    if mode == "default":
        posts = Post.objects.all().order_by('-timestamp')
    elif mode == "byUser":
        posts = Post.objects.filter(creator=userID).order_by('-timestamp')
    elif mode == "postsByFollowedAccounts":
        posts = Post.objects.filter(creator__followers__id__contains=userID).order_by('-timestamp')
    else:
        return Response("You most specify one of the following 'modes' to the getPosts route: default, byUser, or postsByFollowedAccounts")


    # Pagination
    p = Paginator(posts, 10)
    page = p.page(page)
    num = p.num_pages
    options = {"pages":num}
    return Response(([post.serialize(currentUser) for post in page], options))


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def newPost(request):
    
    data = json.loads(request.body)
    body = data.get("body", "")
    id = data.get("id", "")
    user = User.objects.get(id=id)
    currentUser = decodeToken(request)

    post = Post(
        creator=user,
        body=body
    )

    post.save()
    return JsonResponse(post.serialize(currentUser), status=201)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def editPost(request):
    data = json.loads(request.body)
    postID = data.get("postID", "")
    userID = data.get("userID", "")
    edits = data.get("edits", "")
    currentUser = decodeToken(request)

    try:
        post = Post.objects.get(id=postID)
        if currentUser == post.creator.id:
            post.body=edits
            post.save()
            return Response(post.serialize(currentUser))
        else:
            return JsonResponse({
                "error": "Your access token is not authorized to edit another user's posts"
                }, status=401)
    except ObjectDoesNotExist:
        return JsonResponse({
            "error": "Could not edit post because the post could not be found"
            }, status=404)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def getProfile(request):
    data = json.loads(request.body)
    userID = data.get("id", "")
    try:
        user = User.objects.get(id=userID)
        #return Response(user.serialize())
        serializer = ProfileSerializer(user, many=False)
        return Response(serializer.data)
    except ObjectDoesNotExist:
        return Response("Object doesn't exist")

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def follow(request):
    data = json.loads(request.body)
    userID = data.get("id", "")
    targetUserID = data.get("targetUserID", "")
    follow = data.get("follow", "")
    #return Response(f'userID: {userID}, targetUserID: {targetUserID}, follow: {follow}')
    try:
        currentUser = User.objects.get(id=userID)
        targetUser = User.objects.get(id=targetUserID)

        if follow:
            currentUser.following.add(targetUser)
        else:
            currentUser.following.remove(targetUser)

        isFollowing = currentUser.following.filter(id=targetUser.id).count()
        nowFollowing = False
        if isFollowing > 0:
            nowFollowing = True

        return JsonResponse({
            "nowFollowing": nowFollowing
            }, status=201)

    except ObjectDoesNotExist:
        return Response("One or more users involved in the follow operation dont exist")
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def likePost(request):
    data = json.loads(request.body)
    liked = data.get("liked", "")
    postID = data.get("postID", "")
    currentUser = decodeToken(request)
    try:
        u = User.objects.get(id=currentUser)
        p = Post.objects.get(id=postID)
        if liked:
            p.likes.add(u)
        else:
            p.likes.remove(u)

        likes = p.likes.count()
        return Response({"liked": liked, "likes": likes, "status":201})
    except:
        return Response({"error":"failed to add your like to db"})
    