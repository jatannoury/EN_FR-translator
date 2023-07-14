from pydantic import BaseModel, validator
from typing import Optional


class User(BaseModel):
    firstName: Optional[str]
    lastName: Optional[str]
    birthday: Optional[str]
    gender: Optional[str]
    email: Optional[str]
    password: Optional[str]

    @validator('*')
    def enforce_non_empty(cls, value):
        if value is None:
            raise ValueError("Field cannot be None")
        if isinstance(value, str) and not value.strip():
            raise ValueError("Field cannot be empty")
        return value
