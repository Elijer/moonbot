from django.contrib.auth.models import AbstractUser
from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

# from .graphs import quantifyTime
from .helpers import getHoursOfRest, datestring_converter

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
    dateString = models.CharField(max_length=10)
    day = models.DateTimeField(null = True, blank=True)
    
    wake = models.CharField(max_length=5, default="")
    wakeDomain = models.CharField(max_length=2, default="am")
    sleepDomain = models.CharField(max_length=2, default="pm")
    sleep = models.CharField(max_length=5, default="")

    rest_calculated = models.BooleanField(default = False)
    rest = models.DecimalField(default=0, max_digits = 3, decimal_places = 1 )
    
    energy = models.IntegerField(
        default=0, validators=[MinValueValidator(0), MaxValueValidator(3) ] )
    
    cries = models.IntegerField(
        default=0, validators=[MinValueValidator(-1), MaxValueValidator(1008) ] )
    
    BC_day = models.IntegerField(
        default=0, validators=[MinValueValidator(0), MaxValueValidator(31) ] )

    
    def serialize(self):
        return {
            "id": self.id,
            "creator": self.creator.id,
            "sleep": self.sleep,
            "sleepDomain": self.sleepDomain,
            "wake": self.wake,
            "wakeDomain": self.wakeDomain,
            "updatedAt": self.updatedAt,
            "createdAt": self.timestamp,
            "dateString": self.dateString,
            "energy": self.energy,
            "cries": self.cries,
            "BC_day": self.BC_day
        }

        
    def serializeSleep(self):
        return {
            # "sleep": quantifyTime(self.sleep),
            "sleep": int(self.energy),
            "dateString": self.dateString
        }
        
    def serializeRest(self):
        return {
            # "sleep": quantifyTime(self.sleep),
            "rest": self.calculateRest(),
            "dateString": self.dateString,
            "day": self.day.total_seconds()
        }
    
    def __str__(self):
        return f"[id:{self.id}] ---> '{self.dateString}' ---> {self.creator.username}"
    
    def calculateRest(self):
        if not self.rest_calculated and self.sleep != "" and self.wake != "":
            rest = getHoursOfRest(self.sleep, self.sleepDomain, self.wake, self.wakeDomain)
            self.rest = rest
            self.rest_calculated = True
            # self.save?
            return self.rest
        elif self.rest_calculated:
            return self.rest
        else:
            return False
        
    def update_day(self):
        self.day = datestring_converter(self.dateString)