# Local Settings Dot Py
There is a file in the backend called `local_settings.py`. Or rather, there may not be, because it is listed in the `.gitignore` file. This is so that merges between the production and main branches of this repo don't break the server configuration. You may need to copy the contents below into a `settings_py` file in order to configure the server. This file will tell your server to set DEBUG to False, configure the databse for MYSQL server instead of SQLITE which is used in develoment environment, and anything alse that you would like to define to be different on the server, like timezone or something. You can really define the allowed hosts in either.

<br>

----

<br>

## Production: `local_settings.py`
```python
# For Server
import os
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

ALLOWED_HOSTS = ["moonbot.me", "104.131.76.82"]
DEBUG = False

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'OPTIONS': {
            'read_default_file': '/etc/mysql/my.cnf',
        },
    }
}
```

<br>

----

<br>

## Development: `local_settings.py`
```python
# For Development
import os
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# When debug is true, allowed hosts will be validated against:
# ['.localhost', '127.0.0.1', '[::1]'].
ALLOWED_HOSTS = []
DEBUG = True

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}
```