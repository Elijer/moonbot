# Change Points
I wish I could just deploy my frontend and backend directly onto the server. However, there are a few things that need to different on the server -- for production, you know -- and they can be hard to keep track of. I'm going to write them out here:

# Backend

### Backend Alternations between Dev and Prod environments
1. settings.py - DEBUG = false
2. settings.py - ALLOWED_HOSTS = [{add whatever server IP address}]
3. SQLite turns into MYSQL server
4. Backend port 7000 may change

### Handling Alternating Config Variables in Backend
The pattern I've chosen for this is implementing a `local_settings.py` file within the `backend/backend/` directory. This file should be added to `.gitignore` to prevent it from being overwritten during git merges from the main branch to the production branch, which will happen as the application continues to develop. The way the `local_settings.py` file works is that the following block is added to the end of the normal `settings.py` file:

```python
try:
    from .local_settings import *
except ImportError as e:
    pass
```

This block imports every variable from the `local_settings.py` file and overwrite whatever values those variables may have had in the `local_settings.py` file. If the `local_settings.py` file is not found, that error is passed over, meaning that you could make the default configuration variables either for the server or dev environment, and then overwrite them on whichever of those environments is NOT the default. I think I will choose to overwrite them locally, since it is easier to simply DELETE a file than it is to WRITE and DEBUG one in the server environment. That said, I will still define an example for each file as if you were over-writing existing values, since I think it is clearer that way. You can find these examples in the `local_settings.md` file in this `README` directory.

<br>

----

<br>

# Frontend

### Frontend Alternations between Dev and Prod environments
1. `src/context/Config - serverURL variable
2. SASS seems to be stricter. For example, `opacity: 70%` must be `opacity: 0.7`.
3. Frontend port 3000 may change

### Handling Alternating Config Variables in Frontend
I feel that I have better tools at my disposal for handling configuration alterations in the frontend. Our two best tools are

1) This conditional: `if (window.location.hostname === "localhost"){ ...`
2) Node's `process.env.VARIABLE`

Which can probably be made globally accessible most easily through the `frontend/src/context/Config.js` context.