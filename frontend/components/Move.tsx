interface propsType {
    move: string
}

export default function MoveBlock({move}: propsType) {

    return (
        <main className="w-15 bg-[#202020] flex justify-center items-center text-white"> 
            <p>{move}</p>
        </main>
    )
}