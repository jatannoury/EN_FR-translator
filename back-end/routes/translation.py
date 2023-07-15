from http.client import HTTPException

from fastapi import  APIRouter,Query

from models.ModelInput import ModelInput
from models.history import History
from tools.dynamoDB import DynamoDbHandler
from tools.translator import Translator

router = APIRouter()
model = Translator()
dynamoDB_handler = DynamoDbHandler()


@router.post("/en_fr", status_code=201)
def translate(data:History):
    try:
        history_data = data.__dict__
        translated_sentence = model.translate(history_data['en_text'])
        translation_id = dynamoDB_handler.add_history(data)
        return {
            "translation_id":translation_id,
            "translated_sentence":translated_sentence
        }

    except:
        raise HTTPException(status_code=500, detail="Internal Server Error")




