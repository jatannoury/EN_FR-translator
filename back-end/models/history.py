from pydantic import BaseModel, validator
from typing import Optional
import re

class History(BaseModel):
    user_id:str
    en_text:str
    fr_text:str