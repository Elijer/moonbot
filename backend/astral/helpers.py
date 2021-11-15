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

def timeQuantifierAMPM(input, AMPM):
    noColon = input.replace(":", "")
    length = len(noColon)
    
    if length == 4:
        hours = noColon[0:2]
        minutes = noColon[2:4]
        
    elif length == 3:
        hours = noColon[0]
        minutes = noColon[1:3]
        
    if AMPM == "pm" and hours != '12' or hours == '12' and AMPM != 'pm':
        hours = int(hours) + 12
        
    output = int(hours) * 60 + int(minutes)
    return output 
        
        
def getHoursOfRest(sleepTime, sleepAMPM, wakeTime, wakeAMPM):
    sleepTimeInMinutes = timeQuantifierAMPM(sleepTime, sleepAMPM)
    wakeTimeInMinutes = timeQuantifierAMPM(wakeTime, wakeAMPM) + 1440
    minutesOfRest = wakeTimeInMinutes - sleepTimeInMinutes
    hoursOfRest = (minutesOfRest / 60)
    rounded = round(hoursOfRest, 1)
    return rounded

def datestring_date_converter(date_string):
    from datetime import datetime, date, time, timezone
    import re
    
    date_items = re.split("\-", date_string)
    
    for i in range(0, len(date_items)):
        date_items[i] = int(date_items[i])
    
    d = datetime( date_items[1], date_items[2], date_items[0])
    return d

# print(datestring_date_converter("11-12-2012"))