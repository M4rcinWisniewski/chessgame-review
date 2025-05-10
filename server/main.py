from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import chess.pgn
import io
from stockfish import Stockfish
from services.move_classification import classify


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_destination_squares(fens):
    destinations = []
    for i in range(1, len(fens)):
        board_prev = chess.Board(fens[i - 1])
        board_next = chess.Board(fens[i])
        
        move = None
        for m in board_prev.legal_moves:
            board_prev.push(m)
            if board_prev.board_fen() == board_next.board_fen():
                move = m
                board_prev.pop()
                break
            board_prev.pop()
        
        if move:
            destinations.append(chess.square_name(move.to_square))
        else:
            destinations.append(None)  # fallback if move not found
    return destinations

def clean_pgn(raw_pgn: str) -> str:
    lines = [line.strip() for line in raw_pgn.strip().splitlines()]
    return "\n".join(lines)

def getResult(resultStr=""):
    white = ""
    black = ""
    temp = False
    for i in resultStr:
        if i != "-" and not temp:
            white += i
        elif i == "-":
            temp = True
        elif i != "-" and temp:
            black += i
    return {"white": white, "black": black}

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
        eval_objects = []
        mate_info = []
        move_classification = []
        for i in range(len(fen_positions)):
            stockfish.set_fen_position(fen_positions[i])
            eval_result = stockfish.get_evaluation()
            stockfish.set_fen_position(fen_positions[i])
            eval_result = stockfish.get_evaluation()
            mate_info.append(eval_result['value'] if eval_result['type'] == 'mate' else None)
            # Convert to score
            if eval_result['type'] == 'cp':
                score = eval_result['value'] / 100
            else:
                score = 999 if eval_result['value'] > 0 else -999

            evaluations.append(score)
            eval_objects.append(eval_result)
            if i == 0:
                move_classification.append("book")
            else:
                is_white = i % 2 == 1  # move 1 (i=1) is White, etc.
                move_classification.append(classify(evaluations[i - 1], evaluations[i], is_white))

            
       

        return {
            "fens": fen_positions,
            "moves": san_moves,
            "white_data": {
                "name": game.headers["White"],
                "elo": game.headers.get("WhiteElo", "Unknown"),
            },
            "black_data": {
                "name": game.headers["Black"],
                "elo": game.headers.get("BlackElo", "????"),
            },
            "results": getResult(game.headers["Result"]),
            "evaluations": evaluations,
            "mate_info": mate_info,
            "move_types": move_classification,
            "move":  get_destination_squares(fen_positions),

        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
