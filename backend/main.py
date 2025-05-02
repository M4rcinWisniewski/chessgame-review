from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/PGN/")
@app.post("/PGN/")
def post_PGN():
    return {
        "white": "Wiśniewski Marcin",
        "black": "Szymczak Michał",
        "result": "0.5-0.5"
    }
