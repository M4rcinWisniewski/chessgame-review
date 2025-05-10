import MoveBlock from "./Move"
import { MdOutlineKeyboardArrowLeft, 
  MdOutlineKeyboardDoubleArrowLeft, 
  MdOutlineKeyboardDoubleArrowRight, 
  MdOutlineKeyboardArrowRight 
} from "react-icons/md";

interface propsType {
    movesArray: string[]
    next: () => void
    previous: () => void
    fastForward: () => void
    fastBackward: () => void
    currentMove: number
    setMove:  React.Dispatch<React.SetStateAction<number>>;
}

const iconStyle: number = 40

export default function Sidebar({movesArray, next, previous, fastForward, fastBackward, currentMove, setMove}: propsType) {

    return (
        <main className="flex flex-col">
          <div className="w-[20vw] h-[80vh]  min-h-[450px]  bg-[#181818] px-4 rounded-md  flex flex-col items-center p-2 overflow-y-auto">
              
              <div className="min-h-[70px] sticky top-0 w-full h-20 bg-[#a80f4c] rounded-md text-white text-4xl flex justify-center items-center shadow-md z-10">
                <h1>Game Review</h1>
                </div>

          <div className="py-4 ">  
            <div className="grid grid-cols-2 gap-2"> 
              {movesArray.map((move, i) => (
                <div
                  key={i}

                  className={`${(i & 1) === 0 ? 'justify-self-end' : 'justify-self-start'}`}  
                > 
                  <MoveBlock onClick={() => setMove(i + 1)} move={move} currentMove={currentMove} index={i}/>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-2 justify-center text-white">
          <MdOutlineKeyboardDoubleArrowLeft className="hover:cursor-pointer hover:text-gray-500" size={iconStyle} onClick={fastBackward}/>
          <MdOutlineKeyboardArrowLeft className="hover:cursor-pointer hover:text-gray-500" size={iconStyle} onClick={previous}/>
          <MdOutlineKeyboardArrowRight className="hover:cursor-pointer hover:text-gray-500" size={iconStyle} onClick={next}/>
          <MdOutlineKeyboardDoubleArrowRight className="hover:cursor-pointer hover:text-gray-500" size={iconStyle} onClick={fastForward}/>
        </div>
      </main>
    )
}