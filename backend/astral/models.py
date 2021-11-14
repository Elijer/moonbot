from django.contrib.auth.models import AbstractUser
from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator


class User(AbstractUser):
    following = models.ManyToManyField("User", related_name="followers", blank=True)

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "following": self.following,
            "followers": self.followers.all(),
            "email": self.email
        }

    def __str__(self):
        return f"User {self.id} with username: {self.username}"

    def follower_count(self):
        return self.followers.count()

    def follows_self(self):
        if self.followers.filter(id=self.id).count() == 1:
            return True
        else:
            return False
        
class Entry(models.Model):
    creator = models.ForeignKey("User", on_delete=models.CASCADE, related_name="logged_entries")
    timestamp = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now_add=True)
    wake = models.CharField(max_length=5, default="")
    sleep = models.CharField(max_length=5, default="")
    dateString = models.CharField(max_length=10)
    energy = models.IntegerField(
        default=0,
        validators=[
            MaxValueValidator(3),
            MinValueValidator(0)
            ]
        )
    cries = models.IntegerField(
        default=0,
        validators=[
            MaxValueValidator(-1),
            MinValueValidator(1008) # pretty arbitrary. Like an easter egg I guess?
            ]
        )
    BC_day = models.IntegerField(
        default=0,
        validators=[
            MaxValueValidator(0),
            MinValueValidator(31) # hmmm most days in month. Except leap year?
            ]
        )
    
    def serialize(self):
        return {
            "id": self.id,
            "creator": self.creator.id,
            "sleep": self.sleep,
            "wake": self.wake,
            "updatedAt": self.updatedAt,
            "createdAt": self.timestamp,
            "dateString": self.dateString,
            "energy": self.energy,
            "cries": self.cries,
            "BC_day": self.BC_day
        }
        
    def serializeSleep(self):

        sleepNum = self.sleep.replace(':', '')
        if (sleepNum != ""):
            sleepNumInt = int(sleepNum)
        else:
            sleepNumInt = 0
        
        
        return {
            "dateString": self.dateString,
            "sleep": sleepNumInt
        }
    
    def __str__(self):
        return f"[id:{self.id}] ---> '{self.dateString}' ---> {self.creator.username}"

class Post(models.Model):
    creator = models.ForeignKey("User", on_delete=models.CASCADE, related_name="created_posts")
    body = models.TextField(max_length="256")
    timestamp = models.DateTimeField(auto_now_add=True)
    likes = models.ManyToManyField("User", related_name="liked_posts")

    def serialize(self, currentUser):
        return {
            "id": self.id,
            "liked": self.liked(currentUser),
            "creator": self.creator.username,
            "creatorID": self.creator.id,
            "body": self.body,
            "timestamp": self.timestamp.strftime("%b %d %Y, %I:%M %p"),
            "likes": self.likes.count()
        }
    
    def liked(self, currentUser):
        likesPost = self.likes.filter(id__contains=currentUser).count()
        if likesPost > 0:
            return True
        else:
            return False

    def __str__(self):
        return f"Post {self.id} body: '{self.body[0:10]}' created  by {self.creator}."
