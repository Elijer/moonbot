from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField
from astral.models import User


class ProfileSerializer(ModelSerializer):
    
    followers = PrimaryKeyRelatedField(many=True, allow_null=True, read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'following', 'followers', 'email']