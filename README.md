# Comming Back
I am returning to this project after a while.

### Running the Backend
Navigate into the `backend` directory.
Run `pipenv shell` to activate a virtual environment using Pipenv.
(venv is also a popular solution to using virtual Python environments, but Pipenv is being used by this project and is much simpler because it doesn't require one to know where their virtual environment files are stored.)
You can view the available project command by navigating to `backend/Pipfile` and, like a `package.json` file, you will see a few commands under the scripts section.

Now run `pipenv install` do install dependencies.
Then run `pipenv run run` (shorthand command in the ready-made scripts mentioned above) or, `python manage.py runserver 7000` which runs django on port 7000, which is the expected port for this app (by the frontend).

### Running the frontend
Navigate to the `frontend` directory in the terminal. Similar to the backend, you can see some useful scripts by opening the `package.json` file and looking in the scripts section.
First, run `npm i` to install all dependencies. If it's been a while, you might want to just delete your `node_modules` folder and start from scratch.

Then run `npm run start`.

This will automatically compile and open the frontend in a new browser window.

Personally, at this point I got a message that told me to run `npm rebuild node-sass`, so I did it, then ran `npm start` again.

At this point, I had a problem where my sass files used a certain type of opacity declaration somewhere:
`>> $placeholderColor: rgb(82, 82, 82, .9);`
I forget, but sass compilers can be finicky about this. What I had to do was simply change all rgb declarations with a 4th alpha argument to `rgba`.

After this, if you get an dependency errors, you may have to install those dependencies which may not have been saved to the package.json

Later in the day, I had another issue with sass. Turns out I was using node-sass, an older sass library, so I switched to dart-sass, the better maintained one by running `npm uninstall node-sass` then `npm install dart-sass` and recompiling the frontend. Simple enough.


### Frontend and Backend working together
After these steps, the frontend and backend should work together.

=======
# To View Moonbot Live
Go to [moonbot.me](http://moonbot.me/login) where Moonbot is running live.
<br>
<br>


# To Run Moonbot Locally

From the main directory:
```bash
cd backend
pipenv shell
pipenv install
pipenv run run
cd ..
cd frontend
npm install
npm start
```

Then go to `http://localhost:3000/` to see frontend of app.

To see the Django admin console for the backend, got to `http://localhost:7000/admin`

To enter the admin console, you will probably have to create a Django superUser, like this:
```django
cd backend
pipenv shell
pipenv run su
```
Then enter your user information when prompted.

If you don't have pipenv, you can install it with pip:
`pip3 install pipenv`

If you would rather not install and use `pipenv`, you should be able to install all the dependencies using pip like this:
`pip3 install -r requirements.txt`

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
npm run runBuild
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

# Frontend Files and File Structure

The frontend file structure contains a React.js app built with the [create-react-app CLI tool.](https://create-react-app.dev/docs/getting-started). I have kept their file structure intact, mostly working within the `src` directory.

### `App.js` File
This is the top level component of `moonbot`'s frontend. It includes the arrangement of all data contexts and uses react-router to create the layout and define the routing for the page-views in the app through the `header` component and the page components included in the `pages` folder. It also defines a `404` page to be displayed if the route is outside the route requested is outside the route pattern.

### `index.js` File
This is the true entry level javascript file that imports the top-level `App.js` component and appends it to the body of the single `root` element in `index.html`. This is a common pattern in single page apps, where all javascript files are bundled, minified, and then loaded as a single, enormous file or, in this case, cache-able chunks, into a single HTML elements.

### `.gitignore` File
This git configuration file tells git which files not to track.

### `Dockerfile` File
This file is used by Docker as blueprints that define how to create an image with all of the environmental dependencies and conditions necessary for running the moonbot frontend, as well as running an NGINX server to serve the frontend app.

### `nginx.conf` File
This is the configuration file for NGINX, mostly telling it which files to serve.

### `package-lock.json` File
This file catalogues *all* dependencies, including the dependencies of the top-level dependencies themselves.

### `package.json` File
This is where all top-level npm dependencies are listed with their version numbers.

---

### `frontend/build` Directory
Contains files generated by the `build` command of the `create-react-app` library, which creates a very small bundle of the react project files contained in the `src` and `public` directories.

---

### `frontend/node_modules` Directory
This directory contains all of the dependency packages downloaded form node. Most of them are dependencies to react and create-react-app, but there are a few notable packages that were added specifically for this project:
- `jwt-decode`
- `react-dom`
- `moment`
- `recharts`

---

### `frontend/public` Directory
These are files that will not be minified and bundled, and are included as they are in the build folder when the build command is run. I created the `favicon.ico` file, but not the `index.html` or `manifest.json` files, which were generated by the `create-react-app` CLI tool.

---

### `frontend/src` Directory
This is really the folder where the frontend of `moonbot` was built. It has seven directories:

#### `frontend/src/charts`
stores the chart components used to visualize `moonbot` data on the `Log` page
1. `Rechart_1.js` This component renders a Rechart.js AreaChart component. This is the chart currently fully developed and being used.
2. `Rechart_Linechart_1.js` This is not a fully built component that uses Rechart's LineChart component.

#### `frontend/src/components`
This folder stores miscellaneous components that can be re-used for multiple pages
1. `Header.js`: This component renders the navbar. It is visible on every page of the app, but displays different nav items depending on whether the user is logged in or not.
2. `LogoutFooter.js`: This is a currently un-used componented that renders a logout option at the bottom of any given page. It is not being used because this option exists in the Header component.

#### `frontend/src/context`
This folder stores context-providing components: these components make use of React's
1. `AuthContext.js: This component checks for a JWT user-access token in the browser storage, and if one exists, it attempts to log that user in using the authentication routes in the backend. It also handles the authentication and browser-storage for manually logging in and logging out. Additionally, it updates the access and refresh tokens at given interavls to keep them fresh as long as the user token is actively being used.
2. `Config.js`: The concept for this component was to keep configuration variables in their own dedicated space. The only variable that ended up being necesssary so far is the serverURL variable, which stores the address and port number by which the backend can be accessed. All HTTP requests throughout the front-end should make use of this contextual variable.
3. `RequestContext.js`: This context component was designed to reduce un-DRY HTTP requests that are made in the same way across multiple components. So far this includes the `updateEntry` and `updateSettings` methods, which are each used by more than one component. The pattern of storing a re-useable HTTP requests inside of a context component is that although HTTP requests within `moonbot` often have many contextual dependencies, like the app's `time` object, the `user` object and the `config` context, as well as many react and other imports, they can be used by other components with just one import and one line of usage, drastically reducing the amount of code and reducing the complexity of the dependency web.
4. 'TimeContext`: moonbot is a heavily time-reliant app. Time is frequently parsed, interpreted and used in database queries throughout the app. The time context gets the time once, parses it into several forms, and then allows access to that same information through the app.

#### `frontend/src/images`
Two background jpeg images are used by `moonbot`. They are stored here. There is `pink_sky.jpeg' and 'snowy_moon.jpeg', which are used by the `LoginPage` and the 'RegisterPage' components, respectively.

#### `frontend/src/pages`
this is where components that render an entire page are stored. It is also worth noting that `pages` contains a `Tracker` subdirectory. This subdirectory is where all of the sub-components for the `Tracker.js` component are stored.
1. `Log.js`: This component renders the content of the `/_log` route, where user data is rendered into a Recharts.js area graph.
2. `LoginPage.js`: This page is where the user logs in.
4. `NotFound.js`: This is a 404 page that is rendered when the user navigates to a route outside of the url pattern.
5. 'RegisterPage.js`: This page is where the user can register a new account.
6. `SettingsPage.js`: This page allows the user to customize which mood tracking components they see on the main page. The user can choose to see all or none of them. This page includes one component that does not exist yet: the outside tracker.
7. `Tracker.js`: This is the main page displayed to a logged-in user, and the hotspot of functionality in the app. It contains several data-input/data-display components that are included in the `frontend/src/Pages/Tracker` subdirectory. These components all have a similar structure but a different purpose. Each component checks to see if data has been input into one of their fields that day (or in the case of the energy tracker, that _part_ of the day). If so, they show that data has been rendered with the placeholder value or with backround color. Regardless, they also have handlers that listen for changes and log them to the database if the new information is valid. Note that none of these components are actually responsible for querying existing data from the database, which is actually passed down to them through props from `Tracker.js`. It turns out that in order to render data from props when a component is initialized, props must be saved to state inside ofa useEffect block with the props object listed in the dependency array, as props data is actually _not_ available when the component renders for the first time. Tracker.js makes a request to the `getEntry` route from the backend.
---

#### `frontend/src/pages/Tracker`
1. `BCInput.js`: This component renders a grid of 28 days and is designed to help the user keep keep track of which birth control pill was taken on which day. Similar to the other tracker components.
2. `CryInput.js`: This component renders a number and a plus and minus button on either side of it used to increase or decrease the number.
3. `EnergyInput.js: This component renders three buttons that represent three different energy levels: `little`, `some`, and `lots`.
4. `SleepInput.js`: Although it is visually small, this is the most complex of the tracker components. It has four inputs: sleepTime, wakeTime, sleepDomain and wakeDomain. The `domain` fields represent the am or pm value of the wake and sleep times. This component relies on the `formatTime` helper function imported from `frontend/src/utilities/utilities.js` to reformat user input and prevent them from entering characters that would represent non-existant or innacurate times. Note: this custom helper function is very logically complex and might be replaced by a tested and existing method from a trusted time-formatting library.
5. `TimeDisplay.js`: This component is not like the others in this folder, but it lives here because like them, it is also used by the tracker component. The `TimeDisplay` compenent asks the `TimeContext` provider what time it is and uses that information to render the date and time on the top right and left corners of the screen underneath the header component.

#### `frontend/src/style`
This is where all `style` files live, excepting `frontend/src/App.scss`, which is responsible for loading them. Because style uses the Sass preprocessor, they can be split up into separate files and then imported, making style organization much more effective and CSS specificity (potentially) easier to manage. I will not write up a description for each individual style sheet because I think they are well-organized and the correspondance of names to the components they are styling in sufficient in describing what their purpose is. However, I will do a general desciption of the layout of this folder.
- The `Charts` folder holds a single file, `Recharts_1.scss`, which styles the `Recharts_1` component.
- The `Tracker` folder holds a stylesheet for most, but not all, of the components in `frontend/src/pages/Tracker`.
- The `_vars.scss` file contains eight color values that are used throughout `moonbot`. There may be some hard-coded color values in the application, but for the most part only these eight variables are used to make re-coloring easier and to keep the color scheme consistent and tight.

All remaining files in this directory correspond to a page, _except_ for `reset.scss`, a popular styling convention that removes certain implicit style supplied by web browsers in different ways.

#### `frontend/src/utilities`
This folder stores helpful functions and components that have a broad function needed in certain pages or components.
1. `Debugger.js`: this file defines a debugger method, `dd`, which is used throughout the project. It's much faster to type than `console.log`, and it can be turned off with a single environmental variable in production. Importantly, because it is bound to the `window.console` context, it produces error tracing in the developer console logged from the file with the error, instead of from the `Debugger.js` file itself, which would prevent the developer from effectively finding where errors where occuring.
2. `PrivateRoute.js`: This react component is actually an extension of the `Route` component provided by react-router-dom. It has been modified from the original by checking to see if the user is logged in, and only displaying the contents of the route if they are. It is a simple component, but it is based almost entirely off of an idea provided by Dennis Ivy, a youtuber who makes many videos about Django/React integration.
3. `utilities.js`: this is where the rest of the utility/helper functions Moonbot relies on are stored. There's `formatTime`, which is mentioned above in the `sleepInput` component. There is also `up`, which simply capitalizes all of the first letters of words in any string passed to it. The similar `upFirstLetterOnly` only capitalizes the first letter of the input string. `insert` insterts a string inside of another string at the specified index. Lastly, `dayInMilliseconds` gets the current date and returns that date as a value of milliseconds since January 1st, 1970, which is arguably the only way to pass time between Javascript and Django in a way that can be fully trusted in all circumstances. That would be a paranoid argument, but too much (or not enough) date parsing can do weird things to a developer.

----
<br>
<br>

# Backend Files and File Structure
### `astral` directory.
`astral` is the is the main app in the `backend` Django project. It's not the most intentional space metaphor, but it gets the job done. astral has a special sub-directory called `api`, which handles all user/user-auth functionality, whereas the main `astral` directory can be considered responsible for handling requests for all other types of data.

#### `backend/astral/api/urls.py` and `backend/astral/api/views.py`
This `urls` file loads the four routes that comprise the user-auth section of `moonbot`'s backend.
1. `path('', views.getRoutes)`: `http://{__url__}:7000/api/` uses rest_API's formatting to display the other routes of astral/api.
2. `http://{__url__}:7000/api/register` takes a user password and username, creates a user, and returns a JWT access and refresh toke
3. `http://{__url__}:7000/api/token` takes a modified version of `rest_framework_simplejwt`'s TokenObtainPairSerializer serializer and uses a modified version of `rest_framework_simplejwt`'s `TokenObtainPairView` method to return a refresh/token pair when valid username/password credentials are given.
4. `http://localhost:7000/api/token/refresh` uses `rest_framework_simplejwt`'s `TokenRefreshView` to take an refresh token and, if valid, return new valid access and refresh token.


#### `backend/astral/fixtures`
This fixtures directory stores user and entry data that can be loaded into the database directly, saving time if the database needs to be deleted in the development environment.

#### `backend/astral/views.py` and `backend/astral/urls.py`
These include various routes and views used to write, update and retrieve mood tracker data and, in one case, user settings.

#### `Dockerfile` and `.dockerignore`
The Dockerfile file is used by Docker as blueprints that define how to create an image with all of the environmental dependencies and conditions necessary for running the moonbot backend and exposing the proper ports.

#### `Pipfile` and `Pipfile.lock`
I used pipenv to manage python package dependencies in the backend of moonbot. It's a super convenient and powerful tool for abstractly maintaining a virtual python environment for hte project.

#### `.python-version
This file was generated by the `pyenv` package and is used to store a local python version that this project was built with.

#### `requirements.txt`
This is where all pip dependencies and their version numbers have been exported to a file. This file can be used by pip or docker to reinstall dependencies for the project if they don't exit.

----
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

# Distinctiveness and Complexity
<<<<<<< HEAD

`Moonbot` is an online mood tracker that allows users to log personal data each day, such as energy level and sleep schedule. It also provides users with an area graph of the data they've tracked, and the ability to customize the types of data they would like to track.

The front-end is mobile-first and built as a "single-page" react app; navigating to a different page in the site does not require the browser to refresh. When logged in, the user may navigate between three separate pages that each have different relationships with the database. This multi-page interface is built on top of a user authentication system, with login, logout and registration events provided as navigation options depending on the login state of the user.

The backend of Moonbot has been split into two separate areas of functionality. One, in the `backend/astral/api` folder, is the user authentication system. This system uses the Django secret to generate JWT tokens for each user account; an access token, and a refresh token. The access token has an expiry date baked into it, but a new access token can be retrieved with a valid refresh token. The user-auth sustem uses these JSON Web Tokens to log users in and check whether the current user account is allowed to perform other interactions in the database, such as reading or writing data.

The other half of the backend is the `backend/astral` directory. The routes of this api are comprised of views that allow data to be updated or retrieved, but *only* when a valid access token is provided in the request. The data each user provides and requests for themselves is sensitive, and describes private information about their behavior and life. It is important to have a system that prevents user data to be accessed by users who did not create that data. Because the user account and project secret is embedded within the JWT token, it would be difficult to forge one in order to access user data.

In terms of arthictecture, a great deal of consideration was put into maximizing the ease and simplicity of user-experience. It would have been much simpler to provide a single form on the main mood tracker page that records all user data from each area of input when submitted. However, people can be distracted, and it is not uncommon for a form to be accidentally refreshed before it is fully submitted. This type of form input interruption can be a frustrating experience. To prevent this frustration, as well as potentially losing data that the user entered, each data input element has a handler that validates the data, live, whenever the value of that input changes. Consequently, any valid data entered into the form is sent to the database immediately. At scale, it is worth considering how an excess of database requests could be unsustainable or overly expensive. Howevever, I would make the argument that these demands on the backend are justified. Self-reporting is difficult to do consistently, yet consistency is key to generating the quality of data necessary to identify trends in behavior. Therefore, I think that this aggressive data entry pattern is one of the most important features that Moonbot has.

Another relatively invisible yet significant feature that promote a comfortable and effective user experience is special display behavior built into each form input. For example, when valid energy or birth control data is entered, the input for that form is hidden. Instead, a positive message is displayed that tells the user that their data has been recorded. This is designed to congratulate the user, hopefully creating a positive feedback system that encourages consistent daily data tracking. It also helps the user not waste energy in wondering whether they entered data that day, which is not only vaguely distressing but can *also* lead to extra, unecessary calls to the database, or even potentially overwriting accurate data with innaccurate data.

Both of these examples demonstrate how data accuracy and a simple, communicative user experience go hand in hand.

If done correctly, I think that features like this, which respond to and reward the most effective user behaviors, make the data tracker feel seen, productive, and maybe even understood. In this vein of design, I have added special messages that appear in response to outlier data input, such as reporting an amount of cries above 30 or 50. For a database or an input form, this is just a number. However, if a person where to *tell* you "I cried over fifty times today" you wouldn't just say "Thank you for providing me with this data, I will now save it securely", you would probably say "Oh god, are you okay?" and give them a hug. I don't think it's especially likely that a user will report crying this much and I don't know how useful the crying component will be. However, I think it's important to try to bend the funcionality of these digital processes to mirror the common courtesy of human behavior and interest in order to be kind, and to reach for a bar in interface design for akin to true service than simply system functionality. I really I think that this features like these are important because they create the very positive illusion to the user that someone is paying attention to their usage of the site, which will hopefully encourage them to pay the same amount of attention to themselves. After all, attention to oneself is essentially the goal of a mood tracker application; if the user is not empowered to believe that their input is important, they are less likely to report personal data with care or discover insights from it when it is returned to them in the form of a graph.

The goal of this application is to provide a customizeable set of tools to track behavior and, ideally, identify reocurring cycles of that behavior. The hope is that graping out these cycles will help the user "forecast" their own emotional weather to some degree. The interface and aesthetic of Moonbot is heavily geared towards tracking menstration-related period cycles in behavior and phsysiological information: period cycles can be accompanied by a wide range of emotional and physical symptoms that are regularly powerful enough to be disruptive. There are also populations of people who experience these symptoms in dramatically greater magnitude, such as those with Post-Menstrual Distress Disorder. Symptoms of depression, mania, and body aches can be very disruptive. One of the primary goals of Moonbot is to identify patterns in those symptoms so that their cadence can be better understood and their onset does not take the user by surprise.

However, the `settings` page allows the tracked information to be completely customizeable. The information tracked is important and diverse, yet not too complex, making the app ideal for users who are interested in a set of low-commitment tools to track information about their state of being every day. It is especially important that the app is not especially demanding; one of the most desireable outcomes of this moodtracking app is to discover trends in negative states of mind such as depression, apathy, or anxiety. As all of these mental states can make prior commitments overwhelming, it is crucial that using the app on a daily basis requires the minimum amount of buy-in, commitment, and energy. My goal for Moonbot is to create a powerful data generation tool that has the lowest bar for entry when it comes it consistent, self-reported data. Many other mood trackers exist, but a simple yet simultaneously customizeable one does not have a many peers.

I believe that the aesthetic of this website reflects and bolsters the purpose of Moonbot. The purple color scheme was chosen to be myserious, intriguing, yet also comforting. It was also chosen because of its visual proximity to pink and the related feminine connotations. However, I chose one step to the left of the full-blown feminine associations of pink to encourage use of Moonbot for reasons other than period tracking as well. The moon imagery and language link Moonbot it to the common cultural association between menstration and lunar cycles. More generally, lunar cycles are also referenced by the look of Moonbot as a metaphor for repeated cycles of human behavior through time. Meanwhile, outerspace as a whole represents a realm of discovery and the unknown. I think that these imagery and associations are likely to set the scene for a refletion, self-discovery, and maybe a moment of peace.

I chose to use React as a large part of my front-end development pattern for two reasons.

For one, I wanted the user's experiene to benefit from how a single-page design does not need to be refreshed to change pages. Secondly, from an organizational standpoint, I foresaw that the complexity of this application would be well-supported by the component encapsulation that React offers. Storing all of the behavior for each tracker component in it's own file, with it's own props, state and logic was a huge boon to being able to give each component sophisticated yet maintainable code. In addition, there were many opportunities where common functionality could be extracted from multiple components and distilled into a single component, shrinking the codebase by removing redundancies, and making it more readable. Suprisingly, these distillations were mostly in data-context, and not html rendering. For example, consolidating re-used HTTP requests into the RequestContext component was an amazing way to prune the code of the UserSettings and Tracker components down to a much more readable level, while reducing the likelihood of easy-to-make HTTP request typos and errors.

What distinguishes this project from others I have created in this course? The main two features of this project that are entirely unique in comparison to the other projects I have created are the Log (graph) page and the Settings Page.

Like retrieving email or listing auctions, the graph page requests data from the database from all or many documents in a collection. It then renders that data in a visual way for an arbitrary number of documents. However, rendering data to a graph was a new challenge for me because it was distinct in many ways from rendering an array of data to `divs` or a list. There *are* some technical reasons for this. The graphing library I used, Recharts.js, will only render data that has been mapped to a certain structure. To get the labels to display the correct variables, this required the creation of some custom logic in the serializers on the backend as well as a bit of remapping on the frontend of the javascript objects they return.

Much more significantly, however, data that has been mapped to a graph is much more demanding when it comes to normalization. Not only must fields be consistent, but the numberical ranges of the data must be represented with values that can be compared, and are consistently of the same type, even across different fields in a model. Or, in my case, abstractions of those fields. For example, the date object cannot be represented by a string, but must be represented in milliseconds. However, it cannot be *labelled* in milliseconds -- that would be nearly incomprehensible to the user and I quickly found that it even got in the way of me reading my own data during development. Even more challenging was creating a graphable value that represented sleep data in a meaningful way. I recorded the time the user went to sleep and when they woke up the following morning on any given day they provided input. When parsing this in human terms, it's very straightforward (to someone who speaks the same language as you, is an adult with time-processing schooling, and has the same time-reading conventions as you, which is actually not super common if you consider everyone on earth). You went to sleep at 10 last night and you woke up at 6 this morning. Given that information, it's very easy to infer that you got eight hours of sleep. Good job. If that's normal for you, you will live long and prosper. But in terms of pure data, I was recording the raw information in 4 separate strings that meant nothing without some system for interpretation. There are some amazing time intepretation tools available, and I have no complaints about their functionality, only their plentitude. This whole project deserves a 'time refactor' that leverages heavy usage and understanding of a couple (one for javascript, one for python) time/time-formatting liraries, and does away with all of the custom, time-interpretation and time-formatting helper functions I have written. In any case, creating a validated an "hours-of-rest" value using the user input from the SleepInput component was a good deal more complicated than simply rendering out HTML elements that showed the information. What I am trying to say is that this project, by doing a small amount of data interpretation *in addition* to data collection, possesses an extra data appendage that the other project did not. Those project may have walked on the legs of data reading and data writing, but they lacked the arms of data interpretation. My chosen tools for this extra functionality is primitive, but it was an exciting exploration of data interpretation, and awakened an excitement for the possibilities available for rendering user data in the modern tech ecosystem. Implementing this feature also struck me as meaningful in its symmetry, as the user is giving something to one interface and recieving something back in another. 

The second feature that distinguishes this project in complexity from the others I created in this course is the settings page. Unlike graphing, this was relatively straightforward to build. However, it makes this project the first one I have created in which the user can customize their own interface, taking some of the burden off of me as a developer to pre-empt their usage and preferences. I think of this feature as a meta-feature, since it instructs other components how to behave or, in this case, whether they should exists in the user experience. This value of this feature was so obvious to me that it stressed me out a bit because I felt I needed to create it. While creating the mood tracking components, it was very clear that just the presence of certain inputs would be confusing to many users. The app is not *explicitly* a period-tracking app, but the birth control pill tracker and, perhaps the `cry counter` components sort of lock it in to that job description. If I had no choice, I am totally fine with locking it in as a period tracking applocation. Doing one thing well is better than doing a broad set of things mildly well. However, I was aware that it didn't *have* to be locked in to this specific function. To be honest, as a person who doesn't experience periods, I was slightly dissapointed to be alienated by my own app. It was really exciting to me that I could create a feature that would allow me to personalize the app for my own data-tracking interests, and the possibilities this might afford to everyone. After all, I don't know what kind of data the user wants to track! I can narrow it down with some research, but they might not know either.

Another exciting implication of this "meta-feature" is of continuous development; it should provide a structure that is very open to additions. In the future, I can create new components that add to the functionality of the app without changing any of the existing functionality, or forcing users to use every feature if they don't want to.

I think it's interesting how some apps and programs have "meta-features" and some don't. The homepage for an operatingn system, for example, has many. They can install entire programs, and you can drag around the shortcuts on a desktop view as you see fit. You can even download images and make them the background of the desktop! In some banking and productivity apps, you can customize your dashboard with the "widgets" you find most useful.

I find this an interesting dimension in software development and the user experiences therein because it makes usage much more fluid. With usage analytics, it can even introduce a self-optimizing positive-feedback process in which the behavior of the user's themselves can be used to direct the development of future features by analyizing which ones are used the most, and are the most loved. To me, this idea casts a critical shadow on the common expectation that a software developer and/or designer must intuit a close understanding of a user's needs. Take one glance around at the development/UX design industry anytime in the last twenty years and it is apparent it is not new to criticize this paradigm. However, like Frued's thrillingly and baseless conjectures within the discipline of psychology, I think the "build it and they will come" methodology is a sort of ground zero on which modern development seems to constantly look back on. There is the idea of the MVP, there is CI/CD, and entire schools of thought about how to continuously perfirm user research to produce a product that people really want, really need, and really enjoy. Any engineering paradigm that places users in the driver's seat must contend with the inescapable paradox; the *user* isn't the one creating the product, and so they must constantly be consulted in order to move forward. Despite this, it is still better than the less efficient and much more expensive method of building something without ever consulting the user about what it is they want.† Therefore, any program that attempts to place any valuable freedom in the hands of the user to design their own experience possesses a potential for satisfaction that might not exist otherwise. Although Moonbot only does this on the simplest level, it is thrilling to have built a feature of this kind for the first time, and it certainly sets Moonbot apart from any application I have built before.

 † Except, confusingly, in the rare cases of incredible brilliance and innovation, like the iPhone, Instagram, Pokemon Go, Tom's (the shoes), Airbnb, and the fidget spinner. That initial gamble of creation cannot be measured in terms of user appreciation where the user has never seen anything like it. I see this as yet another piece of evidence that user continuous user research cannot be the only or even best answer to innovation. I am interested in the potential of systems of user *participation*, by which a user can customize their own experience, giving developers much more to actually observe in terms of choice and the direction a piece of technology might go.

 <br>

----

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

# Problems
1. The background images for the Login and Register pages will not display in production build (but no problem in development build). The developer-tools say that they are requested successfully, `200 OK`. I've tried loading them many different ways.

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
>>>>>>> 4c669cfb7114a09ec4a40fe8f2031837bf3b9840
