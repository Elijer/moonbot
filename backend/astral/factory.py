from .models import User, Entry

def create_fake_data():
    u1 = User.objects.create(id="2001", username="Monkeyjoe", email="Char@hotmail.com")
    u2 = User.objects.create(id="2002", username="HippieJoe", email="Rae@gmail.com")
    u3 = User.objects.create(id="2003", username="Turtlejoe", email="Joe@gmail.com", password="p")
    
    e1 = Entry.objects.create(id="2001", dateString = "11-14-2021", creator= u1, sleep = "12:30", sleepDomain = "am", wake = "9:45", wakeDomain = "am")
    e2 = Entry.objects.create(id="2002", creator= u2, sleep = "8:46", sleepDomain = "pm", wake = "8:47", wakeDomain = "am")
    e3 = Entry.objects.create(id="2003", creator= u3, sleep = "12:45", sleepDomain = "am", wake = "12:45", wakeDomain = "pm")
    
def destroy_fake_data():
    User.objects.get(id="2001").delete()
    User.objects.get(id="2002").delete()
    User.objects.get(id="2003").delete()
    
    Entry.objects.get(id="2001").delete()
    Entry.objects.get(id="2002").delete()
    Entry.objects.get(id="2003").delete()