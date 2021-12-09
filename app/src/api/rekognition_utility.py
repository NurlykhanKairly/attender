import boto3

MINIMUM_SIMILARITY_SCORE = 70
MAX_NUMBER_OF_FACES_FROM_AWS = 1

def create_collection(collection_id):
    client = boto3.client("rekognition")
    response = client.create_collection(CollectionId = collection_id)
    print(response)


def add_image_to_collection(collection_id, path_to_image, student_id):
    '''
    path_to_image is a local path to image.
    collection_id identifies an AWS Rekognition collection
    that is used for face indexing.
    Returns True if the operation is successful.
    Otherwise, returns False.
    '''
    client = boto3.client("rekognition")

    with open(path_to_image, 'rb') as image:
        response = client.index_faces(
                CollectionId = collection_id,
                Image = {"Bytes": image.read()},
                ExternalImageId = student_id,
                MaxFaces = 1,
                QualityFilter = "AUTO",
                DetectionAttributes = ["ALL"])
        return True
'''
Exceptions are not handled (aws might not see any faces in the picture)
'''

def search_for_face(collection_id, path_to_image):
    '''
    path_to_image is a local path to image.
    collection_id identifies an AWS Rekognition collection
    that is used for face indexing.
    Returns {student_id: student_id} if there is a match.
    Otherwise, returns {}.
    '''
    threshold = MINIMUM_SIMILARITY_SCORE 
    max_faces = MAX_NUMBER_OF_FACES_FROM_AWS 

    client = boto3.client("rekognition")

    with open(path_to_image, "rb") as image:
        response = client.search_faces_by_image(
                CollectionId = collection_id,
                Image = {"Bytes": image.read()},
                FaceMatchThreshold = threshold,
                MaxFaces = max_faces)
        face_matches = response["FaceMatches"]
        if len(face_matches) >= 1:
            face_match = face_matches[0]
            face_match = face_match["Face"]
            external_image_id = face_match["ExternalImageId"]
            return {"student-id": external_image_id}
        else:
            return {}
'''
!Exceptions are not handled
'''

def print_collections_info():
    client = boto3.client("rekognition")
    response = client.list_collections()
    print(response)

def describe_collection(collection_id):
    client = boto3.client('rekognition')
    response = client.describe_collection(CollectionId = collection_id)
    print(collection_id)
    print(response)

def test_create_and_populate_collection():
    collection_id = "CS320"
    create_collection(collection_id)
    for i in range(1, 6):
        path_to_image = f"./tests/face-images/face{i}.jpg"
        add_image_to_collection(collection_id, path_to_image, f"{i}")

def test_search_for_faces():
    collection_id = "CS320"
    for i in range(1, 6):
        path_to_image = f"./tests/face-images/face{i}.jpg"
        response = search_for_face(collection_id, path_to_image)
        print(response)

def test_describe_collection():
    collection_id = "CS320"
    describe_collection(collection_id)
