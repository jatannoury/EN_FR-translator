from http.client import HTTPException

from fastapi import  APIRouter

from models.ModelInput import ModelInput
from tools.dynamoDB import DynamoDbHandler
from tools.translator import Translator

router = APIRouter()
model = Translator()

@router.get("/en_fr", status_code=200)
def translate(data:ModelInput):
    try:
        translated_sentence = model.translate(data.__dict__['text'])
        return translated_sentence
    except:
        raise HTTPException(status_code=500, detail="Internal Server Error")
