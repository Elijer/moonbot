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

def timeQuantifier(input):
    noColon = input.replace(":", "")
    length = len(noColon)
    if length == 4:
        hours = noColon[0:2]
        minutes = noColon[2:4]
        
    elif length == 3:
        hours = noColon[0]
        minutes = noColon[1:3]
        
    else:
        print("invalid string")
        return(0)
    
    output = int(hours) * 60 + int(minutes)
    return output