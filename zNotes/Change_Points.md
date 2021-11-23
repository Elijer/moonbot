# Change Points
I wish I could just deploy my frontend and backend directly onto the server. However, there are a few things that need to different on the server -- for production, you know -- and they can be hard to keep track of. I'm going to write them out here:

### Backend
1. settings.py - DEBUG = false
2. settings.py - ALLOWED_HOSTS = [{add whatever server IP address}]

### Backend database
1. SQLite turns into MYSQL server

### Frontend
1. `src/context/Config - serverURL variable
2. SASS seems to be stricter. For example, `opacity: 70%` must be `opacity: 0.7`.

### Ports
1. Backend port 7000 may change
2. Frontend port 3000 may change


# Getting started
The server isn't too hard: Allowed hosts are added to repo, and config file is added to gitignore, including debug variable. Reference the auctions example for this.

For the frontend, it shouldn't be bad either. All we need to do is pass a node environmental variable in.
