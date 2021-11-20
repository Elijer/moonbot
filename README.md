# To Run Moonbot Locally

```bash
cd backend
pipenv shell
pipenv run run
cd ..
cd frontend
npm start
```
Then go to `http://localhost:3000/` to see frontend of app.

To see the Django admin console for the backend, got to `http://localhost:7000/admin`

You will probably have to create a Django superUser, like this:
```django
cd backend
pipenv shell
pipenv run su
```
Then enter your user information when prompted.

<br>
<br>

# To Build Moonbot for Production

## Method 1
Turn off debug variable in `settings.py`.
Then run backend in the same way as in development.
Note that SQLITE will work on a server, but it is not meant for production. It would be a good idea to set up MSQL or Postgres or something. If you end up going the MYSQL route on something like Digital Ocean, Digital Ocean has a great series of tutorial articles on connecting Myseql with Django on a Linux server:

[Digital Ocean: How To Create a Django App and Connect it to a Database](https://www.digitalocean.com/community/tutorials/how-to-create-a-django-app-and-connect-it-to-a-database)

For frontend:
```bash
cd frontend
npm run build
npx serve -s build
```
That should do it! This will create a build folder for you that can be run with the `npx serve -s build` command on a server. It could also be served with an NGINX proxy.

**Note of caution:** If you run the frontend and backend on different servers, they might run into CORS issues. To lazily avoid this, just run them on the same server.

## Method 2
You will notice that there are two docker-compose files in the top level of the moonbot directory:
```bash
docker-compose.dev.yml
docker-compose.prod.yml
```
And also a `Dockerfile` and a `.dockerignore` in both the frontend and backend directories.

<br>
<br>

# Distinctiveness and Complexity

<br>
<br>

# File Structure

The frontend file structure contains a React.js app built with the [create-react-app CLI tool.](https://create-react-app.dev/docs/getting-started). I have kept their file structure intact, mostly working within the `src` directory.

<br>
<br>


# Distinctiveness and Complexity


<br>
<br>

# Ports
- Django port: `7000`
- React Port: `3000`
- In react, change port by changing an environmental variable: `export PORT=9000`
- In django, go into Pipfile and change `run` command to reflect desired port.
- If you change the port serving Django, you will also need to reflect that in the `serverURL` variable found here: `frontend/src/context/Config.js`

<br>
<br>

# REACT
The frontend was created with React, specifically through the file structure produced by the `create-react-app` [CLI tool.](https://create-react-app.dev/docs/getting-started)

<br>

# DJANGO

In the top directory of moonbot, there should be a yaml file for Insomnia nd a txt file for Postman. These are HTTP request testing/viewing programs. I think in the end I like Insomnia's simplicity. I highly recommend looking at the routes in one of these programs in order to smoothly use the Django API.

<br>
<br>

# To Do

1. A bit of styling and style file organization refactoring
2. Create tests
3. Dockerize
4. Create tool for selecting mood tracker components
5. Set up twilio, possibly with geolocation?
6. Clear out unused code in backend AND frontend
7. create data visualization / data consumption tools (probably on its own page)


<br>
<br>

# Potential Problems

1. Since all data is just input whenever it changes, if there are ANY artifacts, like an initial state, that is exposed to set the state somehow, it is likely it will also be able to change the data in the database, permanently erasing user data for the field in question. I have run into this problem in CryInput and BCInput and fixed it by created a userInteraction boolean with useState that just determines if the user has HAD any valid interaction as a prequisite for sending any http updates requests.

2. I'm not returning anything from the updateEntry callback, like data that gets rendered or *not* rendered. So each input component just sort of assumes success, and if it fails for some reason, then there's no indication to the user that anything bad has happened. I think that I need to make the function a promise (which I think it already is? Or possibly, return a promise that is saved to a data variable, so that I can do any renders to the HTML using whatever data it returns, namely NOT setting the background to buttons if pressing them didn't succeed in sending the data to the database.

3. Put more succinctly, UI state is changing based on HTTP requests, not responses. It should be the other way around.

4. Making multiple entries for the same datestring -- this may be happening. Find out if it is and make sure this does not happen.

5. Time input is very convoluted, mostly on this logic -- there are 4 fields sent back and forth,
- sleep
- wake
- sleepDomain
- wakeDomain

But there could be just 2 passed back and forth, which would minimize all sorts of annoying complexity. The trick is settling on a format that both python and javascript are happy with, and committing to a similar time library to use for both frontend and backend. But there's nothing wrong with it, it's just overly complicated.

<br>

# Note on create-react-app React Linting Debug Messages

The eslint warnings were really getting to me. Mostly about things left out of dependency arrays and imports that I wasn't using. Many of which were not very important during the current moment. I disabled them. To re-enable them, go to `package.json` and add this block after the `scripts` section:
```json
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
```