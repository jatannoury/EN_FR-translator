import uvicorn
from fastapi import FastAPI

app = FastAPI()
@app.get("/")
def ping():
    return {"message": "Ok"}


if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)
