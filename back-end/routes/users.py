from fastapi import  APIRouter
from models.user import User
from tools.dynamoDB import DynamoDbHandler


dynamoDB_handler = DynamoDbHandler()
router = APIRouter()

@router.post("/register", status_code=201)
def sign_up(formData: User):
    dynamoDB_handler.post_user_table(formData)
    return {"message": "User created successfully!"}
