
from fastapi import  APIRouter,Query
from fastapi.responses import Response
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
        translation_id = dynamoDB_handler.add_history(data,translated_sentence)
        return {
            "translation_id":translation_id,
            "translated_sentence":translated_sentence
        }

    except:
        return Response(status_code=500,content="Server Error")



@router.post("/save_translation", status_code=200)
def save_translation(translation_id:str = Query(..., description="translation_id")):
    try:
        status_code, save_status= dynamoDB_handler.save_translation_id(translation_id)
        if status_code==200:
            return {"message":f"{'Saved' if save_status == 1 else 'Removed'}"} ,200
        else:
            return Response(status_code=500)

    except:
        return Response(status_code=500)

@router.get("/history", status_code=200)
def get_history(user_id:str = Query(..., description="user_id")):
    try:
        response = dynamoDB_handler.query_history_table(user_id=user_id)
        if response['ResponseMetadata']['HTTPStatusCode']==200:
            return response
        else:
            return Response(status_code=500)

    except:
        return Response(status_code=500)


