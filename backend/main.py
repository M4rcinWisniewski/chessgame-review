from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import chess.pgn
import io
from stockfish import Stockfish
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

def getResult(resultStr=""):

    white = ""
    black =""
    temp = False
    for i in resultStr:
        if i != "-" and temp == False:
            white += i
        elif i =="-":
            temp = not temp
        elif i!= "-" and temp == True:
            black += i
    return {
        "white": white,
        "black": black
    }

class PGNRequest(BaseModel):
    pgn: str


@app.post("/evaluate-pgn")
def handle_game_data(req: PGNRequest):
    try:
        cleaned_pgn = clean_pgn(req.pgn)
        pgn = io.StringIO(cleaned_pgn)
        game = chess.pgn.read_game(pgn)

        if game is None:
            raise HTTPException(status_code=400, detail="Invalid PGN input")

        board = game.board()
        san_moves = []

        fen_positions = ["rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"]
        for move in game.mainline_moves():
            san_moves.append(board.san(move))
            board.push(move)
            fen_positions.append(board.fen())

        stockfish = Stockfish("./stockfish/stockfish.exe", depth=15)
        
        evaluations = []
        for fen in fen_positions:
            stockfish.set_fen_position(fen)
            eval_result = stockfish.get_evaluation()
            
            # Convert evaluation to consistent format (pawns)
            if eval_result['type'] == 'cp':
                score = eval_result['value'] / 100  # centipawns to pawns
            else:  # It's a mate
                score = 999 if eval_result['value'] > 0 else -999
                
            evaluations.append(score)
        
        return {
            "fens": fen_positions,
            "moves": san_moves,
            "white_data": {
                "name": game.headers["White"],
                "elo": game.headers.get("WhiteElo", "Unknown") , 
                },
            "black_data": {
                "name": game.headers["Black"],
                "elo": game.headers.get("BlackElo", "????"),
                },
            "results": getResult(game.headers["Result"]),
            "evaluations": evaluations
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))