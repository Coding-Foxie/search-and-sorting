import { Database } from "lucide-react";

interface InputSnapshotProps {
  data: number[];
}

export const InputSnapshot = ({ data }: InputSnapshotProps) => {
  // Don't render anything if there's no data yet
  if (!data || data.length === 0) return null;

  return (
    <div className="bg-slate-950/40 border border-slate-800/60 rounded-xl p-4 shadow-inner animate-in fade-in zoom-in-95 duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Database size={12} className="text-blue-500" />
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
            Input Snapshot
          </span>
        </div>
        <span className="text-[7px] px-1.5 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-600 font-mono">
          IMMUTABLE_BUFFER
        </span>
      </div>

      {/* Data Row */}
      <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto custom-scrollbar">
        {data.map((num, i) => (
          <div
            key={i}
            className="flex items-center justify-center min-w-[32px] h-8 px-2 bg-slate-900/50 border border-slate-800 rounded-md text-[11px] font-mono text-blue-400/90 shadow-sm"
          >
            {num}
          </div>
        ))}
      </div>

      <p className="mt-3 text-[8px] text-slate-600 font-mono italic">
        * Original values captured at execution start.
      </p>
    </div>
  );
};