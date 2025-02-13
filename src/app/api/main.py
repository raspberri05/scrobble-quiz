from fastapi import FastAPI
from combine import combine

app = FastAPI()


@app.get("/")
def route():
  return {"status": "running"}


@app.get("/main")
def route(username: str, period: str):
  return combine(username, period)
