# Ports
Django port: `7000`
React Port: `9000`
Firestore emulators: `8090`

**To change ports:**
- In react, change port by changing an environmental variable: `export PORT=9000`
- In django, go into Pipfile and change `run` command to reflect desired port.

<br>

# REACT
To run app
`cd frontend` >
`npm start`

Notes:
- To change the port HTTP request are sent to, go to `frontend/src/context/Config.js` and change the serverURL variable. It is currently set to just add port 7000 on the end of the current base URL.

<br>

# DJANGO
To Run app:
`cd backend` >
`pipenv run run`

Notes
- In the top directory of moonbot, there should be a yaml file for Insomnia nd a txt file for Postman. These are HTTP request testing/viewing programs. I think in the end I like Insomnia's simplicity. I highly recommend looking at the routes in one of these programs in order to smoothly use the Django API.

<br>
# To Do
1. A bit of styling and style file organization refactoring
2. Create tests
3. Dockerize
4. Create tool for selecting mood tracker components
5. Set up twilio, possibly with geolocation?
6. Clear out unused code in backend AND frontend
7. create data visualization / data consumption tools (probably on its own page)
8. 
<br>
# Potential Problems
1. Since all data is just input whenever it changes, if there are ANY artifacts, like an initial state, that is exposed to set the state somehow, it is likely it will also be able to change the data in the database, permanently erasing user data. I have run into this problem in CryInput and BCInput and fixed it by created a userInteraction boolean with useState that just determines if the user has HAD any valid interaction as a prequisite for sending any http updates requests.

2. I'm not returning anything from the updateEntry callback, like data that gets rendered or *not* rendered. So each input component just sort of assumes success, and if it fails for some reason, then there's no indication to the user that anything bad has happened. I think that I need to make the function a promise (which I think it already is? Or possibly, return a promise that is saved to a data variable, so that I can do any renders to the HTML using whatever data it returns, namely NOT setting the background to buttons if pressing them didn't succeed in sending the data to the database.

3. Put more succinctly, UI state is changing based on HTTP requests, not responses. It should be the other way around.

4. Making multiple entries for the same datestring -- this seems to be happening already. Figure out how it can happen, shut it down.

5. Time input is very convoluted, mostly on this logic -- there are 4 fields sent back and forth,
- sleep
- wake
- sleepDomain
- wakeDomain

But there could be just 2 passed back and forth, which would minimize all sorts of annoying complexity. The trick is settling on a format that both python and javascript are happy with, and committing to a similar time library to use for both frontend and backend. But there's nothing wrong with it, it's just overly complicated.

# Note on create-react-app React Linting
The eslint warnings were really getting to me. Mostly about things left out of dependency arrays and imports that I wasn't using. Many of which were not very important during the current moment. I disabled them. To re-enable them, go to `package.json` and add this block after the `scripts` section:
```json
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
```