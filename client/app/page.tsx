"use client"
import Board from "@/components/Board";
import Sidebar from "@/components/Sidebar";
import axios from "axios";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import EvaluationBar from "@/components/Evalbar";



export default function ChessGame() {
  const [pgn, setPgn] = useState<string>('start'); // Default to starting position
  const [fen, setFen] = useState<string[]>([]);
  const [moves, setMoves] = useState<string[]>([])
  const [moveDestination, setMoveDestination] = useState<string[]>([])
  const [currentMove, setCurrentMove] = useState<number>(1)
  const [evals, setEvals] = useState<number[]>([])
  const [isLoading, setIsLoading] = useState(false);
  const [mateInfo, setMateInfo] = useState([])
  const [moveTypes, setMoveTypes] = useState<string[]>([]);
  const [players, setPlayes] = useState({
    white: {
      name: "",
      elo: "",
      result: ""
    },
    black: {
      name: "",
      elo: "",
      result: ""
    }
  })
  const postToServer = () => {
    setIsLoading(true); // start loading
    axios.post("http://localhost:8000/evaluate-pgn", { pgn })
      .then(response => {
        console.log("Evaluations:", response.data.evaluations);
        setFen(response.data.fens);
        setMoves(response.data.moves);
        setEvals(response.data.evaluations);
        setMoveDestination(response.data.move)
        setPlayes({
          ...players,
          white: {
            name: response.data.white_data.name,
            elo: response.data.white_data.elo,
            result: response.data.results.white
          },
          black: {
            name: response.data.black_data.name,
            elo: response.data.black_data.elo,
            result: response.data.results.black
          }
        });
        setMateInfo(response.data.mate_info)
        setMoveTypes(response.data.move_types)
      })
      .catch(error => {
        console.error("Error:", error.response?.data || error.message);
      })
      .finally(() => {
        setIsLoading(false); // stop loading
      });
  };

  const handlePgnInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPgn(event.target.value);
  };

  const nextMove = () => {
    if (currentMove < fen.length - 1) {
      setCurrentMove(prev => prev + 1)
    }
    
  }



  const previousMove = () => {
    if (currentMove > 0) {
      setCurrentMove(prev => prev - 1)
    }
  }

  const fastForward = () => {
    if (currentMove < fen.length - 1){
      setCurrentMove(fen.length - 1)
    }
  }

  const fastBackward = () => {
    if (currentMove > 0){
      setCurrentMove(0)
    }
  }

  return (  
    <main className="flex flex-col mt-2 md:flex-row justify-center items-start w-full h-[45%] gap-8 p-4">
      
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
          <p className="text-white mt-4">Evaluating...</p>
        </div>
      )}

      <div className="flex items-center justify-center gap-4 flex-col">
        <div className="flex flex-col text-white justify-center w-full">
          <div className="flex justify-between p-5">
              <div className="flex gap-2 ">
              <h1 className="bg-[#a80f4c] rounded-md w-7 h-7 flex justify-center items-center">{players.black.result}</h1>
                <p>{players.black.name}</p>
                <p>{players.black.elo}</p>
                
              </div>
              
            </div>
            <div className="flex items-center gap-5 h-[480px]">
              <EvaluationBar mateInfo={mateInfo[currentMove]} evalScore={evals[currentMove]} />
              <Board type={moveTypes[currentMove]} move={moveDestination[currentMove - 1]} position={fen[currentMove]} />

            </div>

            <div className="flex justify-between p-5">
            <div className="flex gap-2 ">
              <h1 className="bg-[#a80f4c] rounded-md w-7 h-7 flex justify-center items-center">{players.white.result}</h1>
              <p>{players.white.name}</p>
              <p>{players.white.elo}</p>
              
            </div>
            
            </div>
        </div>
        <Textarea
          onChange={handlePgnInput}
          value={pgn === "start" ? "" : pgn}
          className="text-white w-full"
        />
        <Button
          onClick={postToServer}
          className="w-full md:w-auto bg-[#a80f4c] cursor-pointer text-white shadow-xs hover:bg-secondary/80"
        >
          Button
        </Button>

      </div>
      <div className="flex justify-center ">
        <Sidebar 
                  fastBackward={fastBackward} 
                  fastForward={fastForward} 
                  next={nextMove} 
                  previous={previousMove} 
                  movesArray={moves}
                  currentMove={currentMove} 
                  setMove={setCurrentMove}
                  />      
      </div>
    </main>
  );
}
