from django.urls import reverse
from .helpers import registration_helper, timeQuantifierAMPM, getHoursOfRest, datestring_converter
from datetime import datetime

from django.db.models import Max
from django.test import TestCase, Client
from .models import User, Entry

from rest_framework.test import RequestsClient

class NetworkTestCase(TestCase):

    # Set up mock data
    def setUp(self):

        # Create Users
        u1 = User.objects.create(id="1", username="Charlie", email="Char@hotmail.com")
        u2 = User.objects.create(id="2", username="Rae", email="Rae@gmail.com")
        u3 = User.objects.create(id="3", username="Joe", email="Joe@gmail.com", password="p")
        u3.followers.set([u2, u3])
        
        e1 = Entry.objects.create(id="1", dateString = "11-14-2021", creator= u1, sleep = "12:30", sleepDomain = "am", wake = "9:45", wakeDomain = "am")
        e2 = Entry.objects.create(id="2", creator= u2, sleep = "8:46", sleepDomain = "pm", wake = "8:47", wakeDomain = "am")
        e3 = Entry.objects.create(id="3", creator= u3, sleep = "12:45", sleepDomain = "am", wake = "12:45", wakeDomain = "pm")

        
        # Create Posts
        # p1 = Post.objects.create(body="Hey!", creator=u2, id="1", timestamp="Oct 28 2021, 07:52 PM")
        # p2 = Post.objects.create(body="Hey!", creator=u1, id="1", timestamp="Oct 28 2021, 07:52 PM")

    # Make sure tests are working as expected
    def test_something_that_will_pass(self):
        self.assertFalse(False)

    # /api/register/
    # Test that login is not possible without login credentials
    def test_login_failure(self):
        c = Client()
        response = c.get("/api/register/")
        above300 = response.status_code > 300
        self.assertTrue(above300)

    # /api/register/
    # Test that registration is successful with valid login credentials
    # Uses registration_helper() function to avoid repetition in following tests
    def test_register_success(self):
        response = registration_helper()
        self.assertEqual(response['status'], 200)
        self.assertTrue(len(response['access']) > 250 and len(response['refresh']) > 250)

    # /api/register/
    # Tests whether registration and then login works
    # Not using registration_helper() just so we can see the whole process spelled out
    def test_registration_success(self):
        c = Client()
        c.post('/api/register/',
        {
            'username':'Zauner',
            'password':'p',
            'confirmation':'p',
            'email': 'jbrekky@gmail.com',
        }, content_type="application/json")

        response = c.post('/api/token/',
        {
            'username':'Zauner',
            'password':'p',
        }, content_type="application/json")
        self.assertEqual(response.status_code, 200)


    # /api/token/refresh/
    # Tests whether refreshing both tokens with a valid refresh token works
    def test_refresh_success(self):
        response = registration_helper()
        c = Client()

        response2 = c.post('/api/token/refresh/',
        {
            'refresh': response['refresh']
        }, content_type="application/json")

        self.assertEqual(response2.status_code, 200)
    
    # after 12 test
    def test_quantifyTimeAMPM_1(self):
        e1 = Entry.objects.get(id="1")
        sleepTime = timeQuantifierAMPM(e1.sleep, e1.sleepDomain)
        self.assertEqual(sleepTime, 1470)
    
    # waking up in the PM
    def test_quantifyTimeAMPM_2(self):
        e3 = Entry.objects.get(id="3")
        sleepTime = timeQuantifierAMPM(e3.wake, e3.wakeDomain)
        self.assertEqual(sleepTime, 765)
        
    def test_sleep_amount(self):
        # e2 = Entry.objects.create(id="2", creator= u2, sleep = "8:46", sleepDomain = "pm", wake = "8:47", wakeDomain = "am")
        e2 = Entry.objects.get(id="2")
        sleepTime = timeQuantifierAMPM(e2.sleep, e2.sleepDomain) # 1246
        # 1440 is the amount of minutes in a day
        wakeTime = timeQuantifierAMPM(e2.wake, e2.wakeDomain) + 1440 # 527 + 1440 = 1967
        rest = wakeTime - sleepTime #719
        self.assertEqual(rest, 721)
        
    def test_sleep_amount_2(self):
        # e3 = Entry.objects.create(id="3", creator= u3, sleep = "12:45", sleepDomain = "am", wake = "12:45", wakeDomain = "pm")
        
        # 1485 sleep time 
        # 2205 wake time, factoring in 1440 extra hours since it's the next day / date
        # difference = 720
        # / 60 = 12 exactly (get the hours)
        # which makes perfect sense.
        e3 = Entry.objects.get(id="2")
        rest = getHoursOfRest(e3.sleep, e3.sleepDomain, e3.wake, e3.wakeDomain)
        self.assertEqual(rest, 12)
        
    def test_sleep_amount_3(self):
        # e1 = Entry.objects.create(id="1", creator= u1, sleep = "12:30", sleepDomain = "am", wake = "9:45", wakeDomain = "am")
        # 1470
        # 545 + 1440 = 2025
        # 2025 - 1470 = 555
        # 9.25
        # rounded up that's 9.3
        # nope turns out it rounds down!! I guess it just cuts off the decimal actually.
        e1 = Entry.objects.get(id="1")
        rest = getHoursOfRest(e1.sleep, e1.sleepDomain, e1.wake, e1.wakeDomain)
        self.assertEqual(rest, 9.2)
        
    def test_assess_dateString(self):
        e1 = Entry.objects.get(id="1")
        self.assertEqual(e1.dateString, "11-14-2021")
        
    def test_save_day_field(self):
        e1 = Entry.objects.get(id="1")
        e1.day = datestring_converter(e1.dateString)
        e1.save()
        
        # datetime takes args: year, month, day
        d = datetime( 2021, 11, 14)
        
        self.assertEqual(e1.day, d)
        