from pyowm import OWM
from pyowm.utils import config
from pyowm.utils import timestamps


import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

import smtplib

import logging

from celery import Celery
from celery.schedules import crontab, schedule

app = Celery('main', broker="pyamqp://guest@localhost//")


cred = credentials.Certificate("C:/Users/nurly/attender/app/src/celery/attender-c6e24-firebase-adminsdk-dgcpr-67aded5525.json")
firebase_admin.initialize_app(cred,
    {
	    'databaseURL': 'https://attender-c6e24-default-rtdb.asia-southeast1.firebasedatabase.app'
	}
)

company_info = db.reference("/additional_info").get()

workers = db.reference("/workers").get()

logging.info(company_info)

# ---------- Send notification email -------------------

def send_notification_email(email):
    #SERVER = "localhost"

    FROM = 'nurik01nim@gmail.com'

    TO = [email] # must be a list

    SUBJECT = "Hello!"

    TEXT = "This message was sent with Python's smtplib."

    # Prepare actual message

    message = """\
    Extreme weather conditions | No work today

    This email is to notify that due to the extreme weather conditions it is an official day off."""

    # Send the mail
    PASSWORD = open("PASSWORD", "r").read()

    server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
    server.login(FROM, PASSWORD)
    server.sendmail(FROM, TO, message)
    server.quit()
    
    logging.info('Person {} is notified'.format(email))


# ---------- FREE API KEY examples ---------------------

owm = OWM('97ff2ce429d7c2266f97592d85647150')
mgr = owm.weather_manager()


# --------- celery zapustit tut ------------------------
# --------- wrap wrap wrap -----------------------------

@app.task
def see_you():
    logging.info('HERE Hello?????!')

    # Search for current weather in London (Great Britain) and get details
    observation = mgr.weather_at_place(company_info['location'])
    w = observation.weather

    logging.info(w.detailed_status)         # 'clouds'

    temp = w.temperature('celsius')['temp']

    logging.info(temp, type(temp))
    if temp < float(company_info['extreme_temp']):
        logging.info('WTF? Bruh ')        

        for uid in workers:
            worker = workers[uid]
            send_notification_email(worker['email'])
    else:
        logging.info('ALRIGHT ALRIGHT ALRIGHT!!!')


    logging.info(w.temperature('celsius'))  # {'temp_max': 10.5, 'temp': 9.7, 'temp_min': 9.0}
    return 322


app.conf.beat_schedule = {
    "check-weather-app": {
        "task": "main.see_you",
        "schedule": crontab(hour="*/24")
    }
}
