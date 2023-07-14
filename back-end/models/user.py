from pydantic import BaseModel

class User(BaseModel):
    firstName:str
    lastName:str
    birthday:str
    gender:str
    email:str
    password:str