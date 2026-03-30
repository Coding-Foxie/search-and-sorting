import { CodeLine } from "@/types/sorting";

interface AlgorithmState {
  isSorting: boolean;
  isSwapping: boolean;
  isScanning?: boolean;     // For Selection/Insertion Sort
  minIdx?: number | null;    // For Selection Sort
  pivotIdx?: number | null;  // For Quick Sort
  [key: string]: boolean | number | null | undefined; // Fallback for safety
}

interface CodeViewerProps {
  filename: string;
  lines: CodeLine[];
  currentState: AlgorithmState;
}

export const CodeViewer = ({ filename, lines, currentState }: CodeViewerProps) => {
  return (
    <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-1 overflow-hidden shadow-2xl h-full flex flex-col">
      {/* Tab Bar / Header */}
      <div className="bg-slate-950/50 px-4 py-2.5 border-b border-slate-800 rounded-t-2xl flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-500/40" /> {/* File Icon dot */}
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
            {filename}
          </span>
        </div>

        {/* Window Controls */}
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/10 border border-red-500/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/10 border border-yellow-500/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/10 border border-green-500/20" />
        </div>
      </div>

      {/* Code Area */}
      <div className="p-6 font-mono text-xs md:text-sm leading-relaxed overflow-x-auto flex-1 bg-slate-900/50">
        {lines.map((line, idx) => {
          const active = line.isActive(currentState);

          return (
            <div
              key={idx}
              className={`flex items-start gap-4 px-2 py-0.5 rounded transition-all duration-200 ${active
                ? (line.color || "bg-blue-500/10 text-blue-400 border-l-2 border-blue-500 shadow-[inset_4px_0_10px_rgba(59,130,246,0.05)]")
                : "text-slate-500 opacity-40"
                }`}
            >
              {/* Line Number */}
              <span className="text-[10px] w-4 text-slate-700 select-none text-right">
                {idx + 1}
              </span>

              {/* Code Content */}
              <span
                style={{ paddingLeft: `${line.indent * 1.5}rem` }}
                className={active ? "font-bold" : "font-normal"}
              >
                {line.code}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};