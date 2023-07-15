from http.client import HTTPException

from fastapi import  APIRouter

from models.sign_in import SignIn
from models.user import User
from tools.dynamoDB import DynamoDbHandler


dynamoDB_handler = DynamoDbHandler()
router = APIRouter()

@router.post("/register", status_code=201)
def sign_up(formData: User):
    dynamoDB_handler.post_user_table(formData)
    return {"message": "User created successfully!"}

@router.post("/login", status_code=200)
def sign_in(formData: SignIn):
    user_info = formData.__dict__
    db_response = dynamoDB_handler.get_user_info(user_info['email'])
    pass_verification = dynamoDB_handler.verify_password(user_info['password'],db_response['Items'][0]['password'])
    if pass_verification:
        return {"message":"Correct credentials"}
    else:
        raise HTTPException(status_code=401, detail="Wrong credentials")
