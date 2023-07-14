import os

import boto3
from fastapi.exceptions import HTTPException
import uuid
from passlib.context import CryptContext
from dotenv import load_dotenv

load_dotenv()

class DynamoDbHandler:
    def __init__(self):
        self.pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
        dynamo_db_client = boto3.resource(
            'dynamodb',
            aws_access_key_id = os.environ.get("AWS_ACCESS_KEY_ID"),
            aws_secret_access_key = os.environ.get("AWS_SECRET_ACCESS_KEY")
        )
        self.users_table = dynamo_db_client.Table("users")

    # Password encryption function
    def encrypt_password(self,password: str) -> str:
        return self.pwd_context.hash(password)

    def post_user_table(self,formData) -> str:
        try:
            print(formData)
            user_data = formData.__dict__
            user_data['userId'] = str(uuid.uuid4())
            user_data['password'] = self.encrypt_password(user_data['password'])
            print(self.encrypt_password(user_data['password']))
            self.users_table.put_item(Item=user_data)
            return "Created"
        except Exception as e:
            print(e)
            raise HTTPException(status_code=500, detail="Internal Server Error")
