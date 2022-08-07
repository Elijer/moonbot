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
Navigate to the `frontend` directory in the terminal. Similar to the backend, you can see some useful scripts by opening the `package.json` file and looking in the scripts section. You're probably going to want to run `npm run start`.

This will automatically compile and open the frontend in a new browser window.
Except...it probably won't work because you're going to need to download dependencies.
Close this process and run `npm i`.