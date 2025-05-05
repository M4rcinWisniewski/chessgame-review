# import chess.pgn
# from chess import Board
# import json
# import io
# #json converter for now xd

# def clean_pgn(raw_pgn: str) -> str:
#     # Strip leading/trailing whitespace and normalize indentation
#     lines = [line.strip() for line in raw_pgn.strip().splitlines()]
#     return "\n".join(lines)


# def create_game(): 
#     pgn_string ="""  [Event "Rated blitz game"]
#     [Site "https://lichess.org/jA9pyrQr"]
#     [Date "2025.04.30"]
#     [White "animalischunfassbare"]
#     [Black "Muslie"]
#     [Result "0.5-0.5"]
#     [GameId "jA9pyrQr"]
#     [UTCDate "2025.04.30"]
#     [UTCTime "20:57:40"]
#     [WhiteElo "1442"]
#     [WhiteRatingDiff "+7"]
#     [BlackRatingDiff "-13"]
#     [Variant "Standard"]
#     [TimeControl "180+0"]
#     [ECO "B10"] 
#     [Opening "Caro-Kann Defense"]
#     [Termination "Normal"]
#     [Annotator "lichess.org"]

#     1. e4 c6 2. Nc3 d5 { B10 Caro-Kann 
#     Defense } 3. exd5 cxd5 4. d4 Nf6 5. Nf3 Bf5
#     6. Bb5+ Nc6 7. Bf4 a6 8. Ba4 Qb6 9. Bb3 e6 10. O-O Bb4 11. Ne5 O-O 12. Bg5 Nxd4
#     13. Bxf6 gxf6 14. Nd7 { Black resigns. } 1-0"""
#     cleaned_pgn = clean_pgn(pgn_string)
#     pgn = io.StringIO(cleaned_pgn)
#     game = chess.pgn.read_game(pgn)

#     return json.dumps({"pgn": pgn_string})
    



# print(create_game())


array = [
    0.39,
    0.35,
    0.48,
    0.26,
    0.3,
    0.15,
    -0.01,
    0.02,
    0.2,
    0.15,
    0.38,
    0.13,
    0.44,
    0.22,
    0.17,
    -0.62,
    0.72,
    -0.47,
    -0.41,
    -0.39,
    -0.27,
    -1.63,
    -0.19,
    -1.83,
    3.43,
    0.08,
    0.13,
    0.2
  ]

for i in range(len(array)):
    print(i)