from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import chess.pgn
import io

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def clean_pgn(raw_pgn: str) -> str:
    # Strip leading/trailing whitespace and normalize indentation
    lines = [line.strip() for line in raw_pgn.strip().splitlines()]
    return "\n".join(lines)


class PGNRequest(BaseModel):
    pgn: str

@app.post("/evaluate-pgn")
def get_game_data(req: PGNRequest):
    try:
        cleaned_pgn = clean_pgn(req.pgn)
        pgn = io.StringIO(cleaned_pgn)
        game = chess.pgn.read_game(pgn)

        if game is None:
            raise HTTPException(status_code=400, detail="Invalid PGN input")

        board = game.board()
        san_moves = []

        for move in game.mainline_moves():
            san_moves.append(board.san(move))
            board.push(move)

        final_fen = board.fen()
        return {
            "fen": final_fen,
            "moves": san_moves
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))