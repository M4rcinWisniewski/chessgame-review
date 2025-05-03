"use client"
import Board from "@/components/Board";
import { useState } from "react";
import axios from "axios";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/Sidebar";


export default function ChessGame() {
  const [pgn, setPgn] = useState<string>('start'); // Default to starting position
  const [fen, setFen] = useState<string>('start');
  const [moves, setMoves] = useState<string[]>([])
  const postToServer = () => {
    axios.post("http://localhost:8000/evaluate-pgn", { pgn })
      .then(response => {
        console.log("Evaluations:", response.data.evaluations);
        console.log("Moves:", response.data.moves);
        setFen(response.data.fen)
        setMoves(response.data.moves)
      })
      .catch(error => {
        console.error("Error:", error.response?.data || error.message);
      });
  };
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPgn(event.target.value);
  };

  return (  
    <main className="flex flex-col mt-2 md:flex-row justify-center items-start w-full h-[50%] gap-8 p-4">
      <div className="flex items-center justify-center gap-4 flex-col">
        <div className="flex justify-center w-full">
          <Board position={fen} />
        </div>
        <Textarea
          onChange={handleChange}
          value={pgn === "start" ? "" : pgn}
          className="text-white w-full"
        />
        <Button
          onClick={postToServer}
          variant={"destructive"}
          className="w-full md:w-auto"
        >
          Button
        </Button>
      </div>
      <div className="mt-1.5">
        <Sidebar movesArray={moves} />
      </div>
    </main>
  );
}
