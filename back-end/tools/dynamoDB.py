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
            aws_access_key_id=os.environ.get("AWS_ACCESS_KEY_ID"),
            aws_secret_access_key=os.environ.get("AWS_SECRET_ACCESS_KEY")
        )
        self.users_table = dynamo_db_client.Table("users")
        self.history_table = dynamo_db_client.Table("history")

    # Password encryption function
    def encrypt_password(self, password: str) -> str:
        encrypted_pass = self.pwd_context.hash(password)
        return encrypted_pass

    def verify_password(self, password: str, hashed_password: str) -> bool:
        pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
        return pwd_context.verify(password, hashed_password)

    def post_user_table(self, formData) -> str:
        try:
            user_data = formData.__dict__
            user_data['userId'] = str(uuid.uuid4())
            user_data['password'] = self.encrypt_password(user_data['password'])
            self.users_table.put_item(Item=user_data)
            return "Created"
        except Exception as e:
            print(e)
            raise HTTPException(status_code=500, detail="Internal Server Error")

    def get_user_info(self, user_email) -> str:
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

    def add_history(self, data: History,translated_sentence:str):
        history_info = data.__dict__
        history_info['saved'] = 0
        history_info['translation_id'] = str(uuid.uuid4())
        history_info['fr_text'] = translated_sentence
        self.history_table.put_item(Item=history_info)
        return history_info['translation_id']

    def query_history_table(self, translation_id):
        filter_expression = 'translation_id = :translation_id'
        expression_attribute_values = {
            ":translation_id": translation_id
        }
        print(translation_id)
        return self.history_table.scan(
            FilterExpression=filter_expression,
            ExpressionAttributeValues=expression_attribute_values
        )

    def save_translation_id(self, translation_id):
        """Saves the translation ID to the history table.

        Args:
            translation_id (str): The ID of the translation to be saved.
        """
        translation_id = str(translation_id)

        translation_info = self.query_history_table(translation_id)['Items'][0]

        item_key = {
            'translation_id': translation_id,
            "user_id":translation_info['user_id']
        }

        translation_info['saved'] = 0 if int(translation_info['saved'] )== 1 else 1


        # Update the item in the DynamoDB table.
        response = self.history_table.update_item(
            Key=item_key,
            UpdateExpression='SET saved = :saved',
            ExpressionAttributeValues={':saved': translation_info['saved']}
        )
        print(response['ResponseMetadata']['HTTPStatusCode'] )
        if response['ResponseMetadata']['HTTPStatusCode'] == 200:
            print('Translation ID saved successfully.')
            return 200 , translation_info['saved']
        else:
            return response['ResponseMetadata']['HTTPStatusCode'], None



