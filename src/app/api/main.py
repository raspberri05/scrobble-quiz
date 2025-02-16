from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from combine import combine

app = FastAPI()

origins = [
  "http://localhost:3000",  # Next.js frontend
  "http://127.0.0.1:3000",  # Alternative local frontend
]

app.add_middleware(
  CORSMiddleware,
  allow_origins=origins,
  allow_credentials=True,
  allow_methods=["GET", "POST", "OPTIONS"],
  allow_headers=["Content-Type", "Authorization"],
  expose_headers=["Content-Type"],
)


@app.get("/")
def route():
  return {"status": "running"}


@app.get("/main")
def route(username: str, period: str):
  return combine(username, period)
