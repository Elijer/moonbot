from django.urls import reverse
from .helpers import registration_helper

from django.db.models import Max
from django.test import TestCase, Client
from .models import User, Post, Entry

from rest_framework.test import RequestsClient

class NetworkTestCase(TestCase):

    # Set up mock data
    def setUp(self):

        # Create Users
        u1 = User.objects.create(id="1", username="Charlie", email="Char@hotmail.com")
        u2 = User.objects.create(id="2", username="Rae", email="Rae@gmail.com")
        u3 = User.objects.create(id="3", username="Joe", email="Joe@gmail.com", password="p")
        u3.followers.set([u2, u3])
        
        e1 = Entry.objects.create(id="1", creator= u1, sleep = "12:30", sleepDomain = "am", wake = "9:45", wakeDomain = "am")

        # Create Posts
        p1 = Post.objects.create(body="Hey!", creator=u2, id="1", timestamp="Oct 28 2021, 07:52 PM")
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
        
    







    # ----- UNUSED -----

    # /getPosts/
    # Tests whether a registered user can get posts
    def test_getPosts_success(self):
        response = registration_helper()
        self.assertEqual(response['status'], 200)

        auth_headers = {
            'HTTP_AUTHORIZATION': 'Bearer ' + response['access']
        }

        c = Client()
        response2 = c.post('/getPosts/',
        {
            'id':'1'
        }, content_type="application/json", **auth_headers)
        self.assertEqual(response2.status_code, 200)

    # /newPost/
    # Tests whether a valid reistered user with valid access key can createa a post
    def test_make_post(self):
        response = registration_helper()
        self.assertEqual(response['status'], 200)

        auth_headers = {
            'HTTP_AUTHORIZATION': 'Bearer ' + response['access']
        }
        
        c = Client()
        response2 = c.post('/newPost/',
        {
            'id':'1',
            'body':'This is a test post created by tests dot py!'
        }, content_type="application/json", **auth_headers)

        self.assertEqual(response2.status_code, 201)
    
    
    # /getProfile/
    # Test to see if a valid registered user with access token can get the profile info of another user
    def test_get_profile(self):
        response = registration_helper()
        self.assertEqual(response['status'], 200)

        auth_headers = {
            'HTTP_AUTHORIZATION': 'Bearer ' + response['access']
        }

        c = Client()
        response2 = c.post('/getProfile/',
        {
            'id':'2'
        }, content_type="application/json", **auth_headers)

        self.assertEqual(response2.status_code, 200)
        
"""     def test_calculate_rest(self):
        

    # I should definitely test the new following route """