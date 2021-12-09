import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

import time

cred = credentials.Certificate("./credentials/services-computing-8a42f-firebase-adminsdk-cetbc-96415823da.json")
DATABASE_URL = "https://services-computing-8a42f-default-rtdb.asia-southeast1.firebasedatabase.app/"

firebase_admin.initialize_app(cred, {
    "databaseURL": DATABASE_URL
})

def add_professor_to_firebase(professor_id, class_id, password):
    professors_ref = db.reference("/professors")
    professor_ref = professors_ref.child(professor_id)
    professor_ref.set({
            "class-id": class_id,
            "password": password
    })

def add_student_to_firebase(student_id, class_id, password):
    students_ref = db.reference("/students")
    students_ref.set({
        student_id: {
            "class-id": class_id,
            "password": password,
        }
    })

def mark_attendance_in_firebase(student_id, check_time):
    attendance_ref = db.reference(f"/students/{student_id}/attendance").push()
    attendance_ref.set({
        "time": check_time
    })

def test():
    professor_id = "p20101010"
    class_id = "cs439"
    professor_password = "password"
    #add_professor_to_firebase(professor_id, class_id, professor_password)
    
    student_id = "s20180823"
    student_password = "studentpassword"
    #add_student_to_firebase(student_id, class_id, student_password)

    mark_attendance(student_id, time.time())
