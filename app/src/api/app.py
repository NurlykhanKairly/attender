from flask import Flask
from flask import render_template
from flask import request
from flask import redirect
from flask import send_file
from flask_cors import CORS

from s3_utility import download_file, upload_file
from rekognition_utility import create_collection, add_image_to_collection, search_for_face
from database_utility import add_professor_to_firebase, add_student_to_firebase, mark_attendance_in_firebase

import os
import time

app = Flask(__name__)
CORS(app)

BUCKET = "asmir-bucket0"
UPLOAD_PATH = os.path.join(app.instance_path, "uploads")
ATTENDANCE_PATH = os.path.join(app.instance_path, "attendance")

@app.route("/")
def index():
    return "HELLO_WORLD"

@app.route("/api/students/signup", methods = ["POST"])
def receive_image():
    student_id = request.form["student-id"]
    # student_password = request.form["password"]
    student_password = "asdasd"
    class_id = request.form["class-id"]
    student_image_as_file = request.files["student-image"]

    folder = os.path.join(UPLOAD_PATH, f"{class_id}")
    if not os.path.exists(folder):
        os.makedirs(folder)

    path_to_image = os.path.join(folder, f"{student_id}.png")
    student_image_as_file.save(path_to_image)

    #image_info = {"path" : path_to_image, "student-id": student_id, "class-id": class_id}
    # upload_file(image_info, BUCKET)

    add_student_to_firebase(student_id, class_id, student_password)
    add_image_to_collection(class_id, path_to_image, student_id)

    return {"ok":"true"}, 200

@app.route("/api/rpi/check-attendance", methods = ["POST"])
def receive_face():
    class_id = request.form["class-id"]
    attendance_date = request.form["date"]
    attendance_time = request.form["time"]
    print(attendance_date)
    print(attendance_time)
    student_image_as_file = request.files["student-image"]
    
    path_to_image = os.path.join(ATTENDANCE_PATH, "temp.png")
    student_image_as_file.save(path_to_image)

    search_result = search_for_face(class_id, path_to_image)

    if len(search_result) == 0:
        print("attendance not checked")
        return {"ok": "false"}, 200
    else:
        mark_attendance_in_firebase(search_result["student-id"], time.time())
        return {"ok":"true"}, 200

'''
Does not work on multithreaded server.
Maybe, possible to skip the local save of the file and 
write it directly to AWS.
'''

@app.route("/api/professors/signup", methods = ["POST"])
def professor_signin():
    data = request.form
    professor_id = data["professor-id"]
    professor_password = data["password"]
    class_id = data["class-id"]

    add_professor_to_firebase(professor_id, class_id, professor_password)
    create_collection(class_id)

    return {"ok": "true"}, 200


if __name__ == "__main__":
    app.run(debug = True)
