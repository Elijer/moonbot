FROM python:3.9.6

COPY . /usr/src/app

WORKDIR /usr/src/app

RUN pip install -r requirements.txt

RUN python3 manage.py makemigrations

RUN python3 manage.py migrate

ENV PORT=7000

EXPOSE 7000

CMD ["python3", "manage.py", "runserver", "0.0.0.0:7000"]