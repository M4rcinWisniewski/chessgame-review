import MoveBlock from "./Move"

interface propsType {
    movesArray: string[]
}

export default function Sidebar({movesArray}: propsType) {
    // const splitMoves = () => {
    //     const whiteMoves: string[] = []
    //     const blackMoves: string[] = []
    //     movesArray.forEach((move: string, index: number) => {
    //         if ((index & 1) == 0) {
    //             whiteMoves.push(move)
    //         } else {
    //             blackMoves.push(move)
    //         }
    //     });
    //     return {
    //         white: whiteMoves,
    //         black: blackMoves
    //     }
    // }
    return (
        <main className="w-[20vw] h-[480px] bg-[#181818] px-5 rounded-md overflow-y-auto">
        <div className="py-4">  
          <div className="grid grid-cols-2 gap-4"> 
            {movesArray.map((move, i) => (
              <div
                key={i}

                className={`${(i & 1) === 0 ? 'justify-self-end' : 'justify-self-start'}`}  
              > 
                <MoveBlock move={move} />
              </div>
            ))}
          </div>
        </div>
      </main>
    )
}