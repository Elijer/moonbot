from django.test import Client

def registration_helper():
    c = Client()
    response = c.post('/api/register/',
    {
        'username':'Elijah',
        'password':'p',
        'confirmation':'p',
        'email': 'elijahclimbs@gmail.com',

    }, content_type="application/json")
    access = response.json()['access']
    refresh = response.json()['refresh']

    return {'access': access, 'refresh': refresh, "status": response.status_code}