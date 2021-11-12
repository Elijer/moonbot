# Ports
Django port: `7000`
React Port: `9000`
Firestore emulators: `8090`

**To change ports:**
- In react, change port by changing an environmental variable: `export PORT=9000`
- In django, go into Pipfile and change `run` command to reflect desired port.

# REACT
To run app
`cd frontend` >
`npm start`

Port to backend is hardcoded into 

# DJANGO
To Run app:
`cd backend` >
`pipenv run run`

# Firebase Implementation

Package:
`npm install firebase@9.3.0 --save`

# To Do
1. A bit of styling and style file organization refactoring
2. Create tests
3. Dockerize
4. Create tool for selecting mood tracker components
5. Set up twilio, possibly with geolocation?
6. Clear out unused code in backend AND frontend
7. create data visualization / data consumption tools (probably on its own page)

# Potential Problems
1. Since all data is just input whenever it changes, if there are ANY artifacts, like an initial state, that is exposed to set the state somehow, it is likely it will also be able to change the data in the database, permanently erasing user data. I have run into this problem in CryInput and BCInput and fixed it by created a userInteraction boolean with useState that just determines if the user has HAD any valid interaction as a prequisite for sending any http updates requests.
