interface MiniVisualizerProps {
  array: number[];
  activeIndices: number[];
  swappingIndices: number[];
  maxValue: number;
  label?: string;
}

export const MiniVisualizer = ({
  array,
  activeIndices,
  swappingIndices,
  maxValue,
  label = "Execution Preview"
}: MiniVisualizerProps) => {
  // Ensure we don't divide by zero
  const safeMax = maxValue > 0 ? maxValue : 1;

  return (
    // Change: h-full -> h-fit to prevent "pushing" the parent
    <div className="bg-slate-950/40 border border-slate-800/60 rounded-xl p-4 flex flex-col h-fit min-h-[160px] shadow-inner shrink-0">
      {/* Header */}
      <div className="flex justify-between items-center mb-4"> {/* Reduced mb-6 to mb-4 */}
        <span className="text-[9px] text-slate-500 font-mono uppercase tracking-[0.2em]">
          {label}
        </span>
        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
      </div>

      {/* Bar Container */}
      <div className="flex items-end gap-1.5 h-24 w-full mt-auto"> {/* Reduced h-32 to h-24 */}
        {array.map((value, idx) => {
          const isComparing = activeIndices.includes(idx);
          const isSwapping = swappingIndices.includes(idx);
          const barHeight = Math.max((value / safeMax) * 100, 5); // Minimum 5% height so it stays visible

          return (
            <div key={idx} className="flex flex-col items-center flex-1">
              <span className={`text-[8px] font-mono mb-1 ${isSwapping ? 'text-red-400' : isComparing ? 'text-blue-400' : 'text-slate-600'
                }`}>
                {value}
              </span>

              <div
                className={`w-full rounded-t-[1px] border-t transition-all duration-300 ${isSwapping
                    ? 'bg-red-500/20 border-red-500'
                    : isComparing
                      ? 'bg-blue-500/20 border-blue-500'
                      : 'bg-slate-800/30 border-slate-700/50'
                  }`}
                style={{ height: `${barHeight}%` }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};