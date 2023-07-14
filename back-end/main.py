import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from tools.dynamoDB import DynamoDbHandler
from models.user import User

app = FastAPI()
dynamoDB_handler = DynamoDbHandler()
# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Set this to the appropriate list of allowed origins
    allow_methods=["*"],  # Set this to the appropriate list of allowed HTTP methods
    allow_headers=["*"],  # Set this to the appropriate list of allowed headers
)


@app.get("/")
def ping():
    return {"message": "Ok"}

@app.post("/register", status_code=201)
def sign_up(formData: User):
    dynamoDB_handler.post_user_table(formData)
    return {"message": "User created successfully!"}



if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)
