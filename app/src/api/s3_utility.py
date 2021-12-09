import boto3

def upload_file(file_info, bucket):
    local_path = file_info["path"]
    s3_client = boto3.client('s3')

    class_id = file_info["class-id"]
    student_id = file_info["student-id"]
    response = s3_client.upload_file(local_path, bucket, f"{class_id}/{student_id}.png")

    return response

def download_file(file_name, bucket):
    s3 = boto3.resource('s3')
    output = f"downloads/{file_name}"
    s3.Bucket(bucket).download_file(file_name, output)

    return output

def list_files(bucket):
    s3 = boto3.client('s3')
    contents = []
    for item in s3.list_objects(Bucket = bucket)['Contents']:
        contents.append(item)
    
    return contents
