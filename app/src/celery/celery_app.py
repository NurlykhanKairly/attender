from celery import Celery

import process

from celery.schedules import crontab

app = Celery('periodic', broker="pyamqp://guest@localhost//")

@app.task
def see_you():
    process.check_weather()
    
    print("See you in ten seconds!")

app.conf.beat_schedule = {
    "see-you-in-ten-seconds-task": {
        "task": "periodic.see_you",
        "schedule": 10
    }
}