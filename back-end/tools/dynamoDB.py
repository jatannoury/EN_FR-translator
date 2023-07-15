import os

import boto3
from fastapi.exceptions import HTTPException
import uuid
from passlib.context import CryptContext
from dotenv import load_dotenv

from models.history import History
from tools.decrypt import aes_decrypt_string

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
        self.history_table = dynamo_db_client.Table("history")
    # Password encryption function
    def encrypt_password(self,password: str) -> str:
        encrypted_pass = self.pwd_context.hash(password)
        return encrypted_pass

    def verify_password(self,password: str, hashed_password: str) -> bool:
        pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
        return pwd_context.verify(password, hashed_password)

    def post_user_table(self,formData) -> str:
        try:
            user_data = formData.__dict__
            user_data['userId'] = str(uuid.uuid4())
            user_data['password'] = self.encrypt_password(user_data['password'])
            self.users_table.put_item(Item=user_data)
            return "Created"
        except Exception as e:
            print(e)
            raise HTTPException(status_code=500, detail="Internal Server Error")

    def get_user_info(self,user_email) -> str:
        try:
            filter_expression = 'email = :user_email'
            expression_attribute_values = {
                ":user_email": user_email
            }
            return self.users_table.scan(
                FilterExpression=filter_expression,
                ExpressionAttributeValues=expression_attribute_values
            )


        except Exception as e:
            print(e)
            raise HTTPException(status_code=500, detail="Internal Server Error")

    def add_history(self,data:History):
        history_info = data.__dict__
        history_info['saved'] = 0
        history_info['translation_id'] = str(uuid.uuid4())
        self.history_table.put_item(Item=history_info)
        return history_info['translation_id']
