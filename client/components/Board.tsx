import { Chessboard } from "react-chessboard";
import blunder from "../public/blunder.png"; // StaticImageData import
import best from "../public/best.png"
import excellent from "../public/excellent.png"
import good from "../public/good.png"
import inaccuracy from "../public/inaccuracy.png"
import mistake from "../public/mistake.png"
interface BoardTypes {
  position?: string;
  move: string;
  type?: string
}

export default function Board({ position, move, type }: BoardTypes) {
  const getSquarePosition = (square: string, boardSize: number) => {
    const file = square.charCodeAt(0) - "a".charCodeAt(0); // "e" => 4
    const rank = 8 - parseInt(square[1]); // "4" => 8 - 4 = 4
    const squareSize = boardSize / 8;
    return {
      left: file * squareSize,
      top: rank * squareSize,
    };
  };

  const { left, top } = move ? getSquarePosition(move, 500) : { left: 0, top: 0 };

  let squareColor: string = ""
  let image;
  if (type === "best") {
    squareColor = "rgb(118, 172, 61)"
    image = best.src
  }
  else if (type === "excellent") {
    squareColor = "rgb(102, 150, 51)"
    image = excellent.src
   } 
  else if (type === "good") {
    squareColor = "rgb(123, 155, 90)"
    image = good.src
  }
  else if (type === "inaccuracy") {
    squareColor = "rgb(196, 179, 33)"
    image = inaccuracy.src
  }
  else if (type === "mistake") {
    squareColor = "rgb(189, 137, 68)"
    image = mistake.src
  }
   else if (type === "blunder") {
    squareColor = "rgba(255, 0, 0, 0.4)"
    image = blunder.src
  }
  return (
    <div className="my-3 relative" style={{ width: "500px", height: "500px" }}>
      <Chessboard
        id="analysis"
        boardWidth={500}
        position={position}
        arePiecesDraggable={false}
        customSquareStyles={{
            [move]: {
                background: squareColor,
            }}
        }
      />
      {/* eslint-disable-next-line @next/next/no-img-element*/}
      <img
        src={image} 
        alt={`move_type_${move}`}
        style={{
          position: "absolute",
          top: top - 5, 
          left: left + 50 - 5, 
          width: 25,
          height: 25,
          zIndex: 1000, 
          pointerEvents: "none", 
        }}
      />
    </div>
  );
}
