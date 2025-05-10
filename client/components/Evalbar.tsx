export default function EvaluationBar({ evalScore = 0, mateInfo}: { evalScore: number, mateInfo:  string }) {
    const numericScore = typeof evalScore === 'number' ? evalScore : 0;
    const clamped = Math.max(-10, Math.min(10, evalScore));
    const whitePercent = 50 - clamped * 5;
    const color = numericScore > 0  ? "bg-white text-black" :  "bg-black text-white"
    const displayMate = Math.abs(parseInt(mateInfo)) !== null && Math.abs(parseInt(mateInfo)) > 0 ?
      `#M${Math.abs(parseInt(mateInfo))}`
     : "Mate"
    const displayScore = () => {
        if (numericScore >= 999 && mateInfo != null) return displayMate;  // Very large positive values
        if (numericScore <= -999  && mateInfo != null) return displayMate; // Very large negative values
        if (numericScore > 0) return `+${numericScore.toFixed(2)}`; // Positive values
        if (numericScore < 0) return numericScore.toFixed(2); // Already has negative sign
        return "0.0";  // Zero value
    };
    return (
      <div className="relative w-6 h-full border border-gray-700">
        {/* White evaluation (top) */}
        <div
          style={{ height: `${whitePercent}%` }}
          className="bg-black transition-all duration-300 ease-in-out"
        />
        {/* Black evaluation (bottom) */}
        <div
          style={{ height: `${100 - whitePercent}%` }}
          className="bg-white transition-all duration-300 ease-in-out"
        />
  
        {/* Evaluation score overlay */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-sm font-bold ${color} px-1 py-0.5 rounded pointer-events-none whitespace-nowrap shadow-lg`}>
          {displayScore()}
        </div>
      </div>
    );
  }
  