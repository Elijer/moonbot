FROM python:3
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN pip install -r backend/requirements.txt
CMD ["python3", "manage.py", "runserver", "7000"]