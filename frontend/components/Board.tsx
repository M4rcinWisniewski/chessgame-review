import { Chessboard } from "react-chessboard"

export default function Board() {

    return (
        <div className="my-3">
            <Chessboard 
                id="analysis"
                boardWidth={500}
                />
        </div>
    )
}