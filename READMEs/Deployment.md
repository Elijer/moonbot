

# Deployment Process
**Backend**
Backend is set as a heroku subdirectory deployment triggered by pushes to main. Any pushes to main will redeploy the backend (even if the only changes are to the frontend).

**Frontend**
Frontend is deployed via Netflify in the same way - any pushes to origin/main will automatically redeploy the frontend to netflify, currently at mymoonbot.netlify.app


# Guide for setting it up / how it works

## Heroku Deployment for Backend
I am following [this guide](https://realpython.com/django-hosting-on-heroku/) to start with.


# 1) Set up Heroku
Make sure you have a heroku account and that the Heroku CLI is installed.
While using heroku cli, you can run `heroku <command> --help` to learn more about any given command

First, login with `heroku login`
1. [Article: Deploying a subdirecty as a heroku app](https://jtway.co/deploying-subdirectory-projects-to-heroku-f31ed65f3f2)
2. [Video: Deploying a subdir app on Heroku and frontend react app on Netflify](https://www.youtube.com/watch?v=rSkxia0ZZQ0)
3. [Real Python Article: Deploying a Djano Project to Heroku](https://realpython.com/django-hosting-on-heroku/)
4. [Digital Ocean: Creating a Django app and connecting it to a Database](https://www.digitalocean.com/community/tutorials/how-to-create-a-django-app-and-connect-it-to-a-database)

# 2) Deploy a Subdirectory of your repo as a Heroku app

### Overview

[This guide outlines how to deploy a subdirectory of a repo as a Heroku app.](https://jtway.co/deploying-subdirectory-projects-to-heroku-f31ed65f3f2). Because we are deploying the frontend and backend separately, I am going with option number two, "the heroku way", which uses a buildpack to delete all other folders in your app during the Heroku app deployment (not in your repo of course).

According to this guide, we set a new buildpack with `heroku buildpacks:set https://github.com/heroku/heroku-buildpack-inline.git --app <heroku-app-name>`, where that URL is the url to a custom buildpack called "Heroku buildpack Inline".

I actually found the guide a bit vague, [but found a video that *continues *this idea with a bit more detail.](https://www.youtube.com/watch?v=rSkxia0ZZQ0). Bonus points, he also deploys a React frontend using Netflify. I'll check that out after.

### Details
For now, let's look at heroku.
- Create an app on heroku
- Connects the app to github (in depoloyment section of Heroku), authorize it
- adds the repository, connect to it
- enable automatic deploys - for now I will specify main as the automatic deploy triggering branch, but **later I should create a release branch and switch it to that**
- add a buildpack (still using the GUI), an option that can be found in "settings" (I actually removed the buildpack from the first article here)
- Add a nodejs buildpack

This guy instead uses [this buildpack](https://github.com/timanovsky/subdir-heroku-buildpack), aptly called subdir-heroku-buildpack

- Add a second buildpack uses the URL of that buildpack repo
- Drag it above the other, node buildpack
- Although of course we won't use a *node* buildpack because it's django -- we'll use python-- but we can come back to this
- Then we add an env variable on Heroku called `PROJECT_PATH` which stipulates the directory we want to build from

So now I'll go back to the RealPython tutorial about a heroku app and hopefully this subdir buildpack plays nice. Low and behold, that article is asking us to deploy with a buildpack as well!

They say that as long as we have a requirements.txt file, Heroku will automatically know it's a python project and that it will automatically recognize Django too, so we don't actually need to set a buildpack I guess...? (this turned out to be a lie in my case)

- (optional) Now create a runtime.txt file stipulating the python version we want to use - this is safer than letting heroku decide
- Create a procfile that tells Heroku what command to run in order to run our app. I think this is going to change but for now we have this: `web: python manage.py runserver 0.0.0.0:$PORT`
    - To break it down,
      - 'web' is talking about the "process" type (I don't know what this is, but apparently there are four types. Web is the one that recieves HTTP traffic. So we might have to do another one for scheduled jobs, but for an API I guess web should be good?)
      - `python manage.py runserver` of course runs the app, although this should change - I don't *think* this was actually designed for running on servers, despite the name
      - And lastly we are just passing the runserver command the localhost address with, appended, a Heroku variable PORT that we actually pass in via a flag in the next step:

Now we can test this all out by running `heroku local`, which will test out your heroku configuration locally.
We'll use the port flag and set it to 7000 though, because that's what the frontend expects, and the best test of our setup is to see if the (local) frontend will work with it. So we run:
`heroku local --port 7000`

So that worked. Dope. In theory, this should be good to deploy I guess - let's try it, especially to see if the subdirectly code works.

Okay so it deployed, but failed because Django isn't there, no python deps are there -- I use Pipenv to create that virtual environment and I didn't even run `pipenv shell`. So I added `pipenv shell` to the Procfile just to see what happens, but I don't think it will work since the pipenv folder isn't, I don't think, in this directory even. That virtual environment is saved somewhere else on my computer.

But I dunno if we actually need a virtual environment on the server, since we have the frozen `requirements.txt` file. All we should had to do is run `pip install -r requirements.txt` in the procfile. Or perhaps `pip3`. And pip should be around, right, because of the automatically detected buildpack?

Alright! The build succeeded this time. But it is followed by a lot of other errors, as soon as we tried to access the app I believe, from the Heroku Router. Maybe because we tried to access a path that doesn't exist, like an expected error? Let's add something to the root `/` get route to prevent this.

Okay weird, now it's still saying that it can't find Django.

Let me try adding a python buildpack manually.

Alright! That worked. Now I'm getting a "disallowed hosts" message because, of course, heroku isn't an allowed host. So let me add that.

Done.

### Review:
- The winning Procfile command was:

    ```web: pip3 install -r requirements.txt; python manage.py runserver 0.0.0.0:$PORT```

- No virtual environment was needed because all python3 dependencies are installed on the fly in the dyno by the pip3 command in the Procfile
- The URL must be added to allowed hosts in settings.py of the django app

### Still to do
- Create a release branch and switch heroku deploys to release
- Check if manage.py runserver is appropriate and adequate for a continuously available server
- Obviously create a frontend app and point it towards the backend to make sure that the backend works
- Set up a production database, not SQLite

# 3) Deploy the frontend
- Create a netflify account, connect it to your repo and select the release branch you want


### To Do
- Change the branch I want to a new "release branch", which will also deploy for Django
- Make sure that the backend URL is loaded through environmental variables, different for local and production.

# 4) Use Doppler
Doppler is a secret management solution that I've been meaning to check out for a while. Their pitch is, simplify secret management across environments.

- Create an account
- Install the CLI

### Paint Points
- For create-react-app apps, all environmental variables, doppler or otherwise, must start with [REACT_APP](https://create-react-app.dev/docs/adding-custom-environment-variables/).
- Make sure to include `python manage.py migrate` to Procfile - Django won't be able to work at all without migrating first
- Make sure that correct folder (in this case, frontend) is selected as the place to run the necessary command on Netflify - 