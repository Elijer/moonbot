import json
from django.db import IntegrityError
from django.http import JsonResponse
from django.http.response import HttpResponse
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt

from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken

from astral.models import User

# Extend the serializer into a custom one that also adds username
# Courtesy of this approach to Dennis Ivy, although it is documented in rest_framework_simplyjwt documentation
# Dennis ivy tutorial that inspired this extender class https://www.youtube.com/watch?v=xjMP0hspNLE
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['id'] = user.id
        # ...

        return token

# Dennis ivy tutorial that inspired this extender class https://www.youtube.com/watch?v=xjMP0hspNLE
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET']) # this decorator uses the Response method imported above
def getRoutes(request):
    routes = [
        '/api/token',
        '/api/token/refresh',
        'api/register'
    ]

    return Response(routes)
    # in order to
    #return JsonResponse(routes, safe=False)
    # safe means that we can render out things beyond a python dictionary

@csrf_exempt
def register(request):
    if request.method == "POST":

        data = json.loads(request.body)
        username =     data.get("username")
        email =        data.get("email")
        password =     data.get("password")
        confirmation = data.get("confirmation")

        if password != confirmation:
            return JsonResponse({
                "error": "Passwords don't match."
            }, status=400)
            
        try:
            user = User.objects.create_user(username, email, password)
            user.username = username
            user.save()

        except IntegrityError as e:
            print(e)
            error = "error creating user."
            if e.args[0] ==  "UNIQUE constraint failed: network_user.username":
                error = "That username is taken."
            return JsonResponse({
                "error": error
            }, status=400)

        newTokens = get_tokens_for_user(user)

        return JsonResponse({
            # "username": username,
            # "email": email,
            # "password": password,
            "refresh": newTokens["refresh"],
            "access": newTokens["access"],
            "username": username
        }, status=200)

    else:
        return JsonResponse({
            "error": "GET method not allowed on this route"
        }, status=400)

# stack overflow on adding custom claims to the RefreshToken method: https://stackoverflow.com/questions/65934755/django-how-do-i-return-jwt-with-custom-claim-after-user-sign-up/65941914#65941914
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    refresh['username'] = user.username

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }