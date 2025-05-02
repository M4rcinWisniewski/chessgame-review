import chess.pgn

def post_game_pgn(loaded_game):

    game = chess.pgn.read_game(loaded_game)

    if game is None:
        return {"error": "No valid PGN found."}

    return {
        "game 1": loaded_game
    }