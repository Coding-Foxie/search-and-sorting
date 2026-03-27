interface VisualizerStageProps {
  displayArray: number[];
  idxA: number;
  idxB: number;
  isSwapping: boolean;
  lastSorted: number;
  isSorting: boolean;
}

export const VisualizerStage = ({
  displayArray, idxA, idxB, isSwapping, lastSorted, isSorting
}: VisualizerStageProps) => (
  <div className="lg:col-span-3 bg-slate-950/30 rounded-2xl border border-slate-800/50 p-8 flex flex-col items-center justify-center relative overflow-hidden">
    <div className="flex flex-wrap gap-3 justify-center max-w-full">
      {displayArray.map((num, index) => {
        const isActive = index === idxA || index === idxB;
        const isSorted = index >= lastSorted;
        return (
          <div
            key={index}
            className={`w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-xl border-2 text-lg font-bold transition-all duration-300 relative
              ${isActive && !isSwapping ? 'border-purple-500 bg-purple-500/20 scale-110 z-10 shadow-[0_0_20px_rgba(168,85,247,0.3)]' : 'border-slate-800 bg-slate-950'}
              ${isSwapping && isActive ? 'border-red-500 bg-red-500/40 scale-125 z-20 animate-pulse shadow-[0_0_30px_rgba(239,68,68,0.5)]' : ''}
              ${isSorted ? 'border-green-500 bg-green-500/20 text-green-400 opacity-60' : 'text-slate-200'}
            `}
          >
            {num}
            {isSwapping && isActive && (
              <div className="absolute -top-8 bg-red-500 text-[8px] px-2 py-0.5 rounded text-white font-black animate-bounce">SWAP</div>
            )}
          </div>
        );
      })}
    </div>

    {!isSorting && lastSorted === 0 && (
      <div className="absolute bottom-12 animate-in fade-in slide-in-from-bottom-4">
        <div className="bg-green-500 text-slate-950 px-8 py-2 rounded-full font-black uppercase tracking-widest shadow-[0_0_40px_rgba(34,197,94,0.4)]">
          Array Sorted!
        </div>
      </div>
    )}
  </div>
);