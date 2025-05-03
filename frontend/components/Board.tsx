import { Chessboard } from "react-chessboard"
interface boardTypes{
    position?: string
}
export default function Board({position}: boardTypes) {

    return (
        <div className="my-3">
            <Chessboard 
                id="analysis"
                boardWidth={500}
                position={position}
                />
        </div>
    )
}