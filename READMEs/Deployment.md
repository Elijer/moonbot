# Heroku Deployment for Backend
I am following [this guide](https://realpython.com/django-hosting-on-heroku/) to start with.

# Set up Heroku
Make sure you have a heroku account
Make sure the Heroku CLI is installed.
While using heroku cli, you can run `heroku <comman> --help` to learn more about any given command

First, login with `heroku login`

Because we are deploying the frontend and backend separately, I am going with option number two [outlined here](https://jtway.co/deploying-subdirectory-projects-to-heroku-f31ed65f3f2) to only deploy a certain subdirectory to heroku.

According to this guide, we set a new buildpack with `heroku buildpacks:set https://github.com/heroku/heroku-buildpack-inline.git --app <heroku-app-name>`, where that URL is the url to a custom buildpack called "Heroku buildpack Inline".

^^ Not sure if this will work yet. There was some ambiguity in that article, so I actually didn't try deploying with the changes they instruct as it wasn't totally clear to me where I specify the subdirectory.

Now I am watching [this tutorial](https://www.youtube.com/watch?v=rSkxia0ZZQ0) which is great because he is actually doing this same thing of auto-deploying a React frontend in addition to a backend on Heroku. For the frontend subdirectory, he is using Netflify, so I will try that out.

For now, let's look at heroku.
- he creates an app on heroku
- connects the app to github, authorizes it
- adds the repository, connects to it\
- enables automatic deploys - for now I will specify main as the automatic deploy triggering branch, but **later I should create a release branch and switch it to that**
- add a buildpack (still using the GUI), an option that can be found in "settings" (I actually removed the buildpack from the first article here)
- Add a nodejs buildpack

This guy instead uses [this buildpack](https://github.com/timanovsky/subdir-heroku-buildpack), aptly called subdir-heroku-buildpack

- Add a second buildpack uses the URL of that buildpack repo
- Drag it above the other, node buildpack
  - Although of course we won't use a node buildpack because it's django, but we can come back to this
- Then we add an env variable on Heroku called `PROJECT_PATH` which stipulates the directory we want to build from

So now I'll go back to the RealPython tutorial about a heroku app and hopefully this subdir buildpack plays nice. Low and behold, that article is asking us to deploy with a buildpack as well!

They say that as long as we have a requirements.txt file, Heroku will automatically know it's a python project and that it will automatically recognize Django too, so we don't actually need to set a buildpack I guess...?

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

### Still to do
Create a release branch and switch heroku deploys to release