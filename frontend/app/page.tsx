"use client"
import Board from "@/components/Board";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ChessGame() {
  const [gameInfo, setGameInfo] = useState<any>(null);

  useEffect(() => {
    axios.post("http://localhost:8000/PGN/")

      .then(response => {
        console.log("Backend response:", response.data);
        setGameInfo(response.data);
      })
      .catch(error => {
        console.error("Error fetching PGN data:", error);
      });
  }, []);
  const getResult = (result: string) => {
    const splitResult: string[] = result.match(/\d+(\.\d+)?/g) || [];

    return {
      white: splitResult[0],
      black: splitResult[1]
    }

  } 

  if (!gameInfo) return <p>Loading...</p>;
  const results = getResult(gameInfo.result)
  return (
    <div className="flex h-screen items-center justify-center gap-2">
    <div>
      <p className="flex justify-between px-3">{gameInfo.white} <strong className="text-lg">{results.white}</strong></p>
      <Board />
      <p className="flex justify-between px-3">{gameInfo.black} <strong className="text-lg">{results.black}</strong></p>
    </div>

    
  </div>
  );
}
