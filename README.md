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

