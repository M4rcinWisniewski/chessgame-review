interface propsType  {
    move: string;
    index: number;
    currentMove: number;
    onClick: () => void;
  };
  
  export default function MoveBlock({
    move,
    index,
    currentMove,
    onClick,
  }: propsType) {
    const style =
      index === currentMove - 1
        ? "w-25 bg-[#a80f4c] p-1 flex justify-center items-center text-white text-xl rounded-md cursor-pointer"
        : "w-25 bg-[#202020] p-1 flex justify-center items-center text-white text-xl rounded-md cursor-pointer";
  
    return (
      <div onClick={onClick} className={style}>
        {move}
      </div>
    );
  }
  
  