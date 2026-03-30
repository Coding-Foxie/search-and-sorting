import { Pause, Play, Settings, Shuffle } from "lucide-react";

interface SortingHeaderProps {
  sortingAlgorithm: string;
  dataInput: string;
  setDataInput: (val: string) => void;
  isSorting: boolean;
  onStart: () => void;
  onReset: () => void;
  isPaused: boolean;
  onPause: () => void;
  currentArrayLength: number;
  onGenerate?: () => void;
  setOpenGenerator: () => void;
}

export const SortingHeader = ({
  sortingAlgorithm, dataInput, setDataInput, isSorting, onStart, onReset, isPaused, onPause, currentArrayLength, onGenerate, setOpenGenerator
}: SortingHeaderProps) => {
  // Helper to determine what the main button does
  const handleMainButtonClick = () => {
    if (!isSorting) {
      onStart();
    } else {
      onPause();
    }
  }

  return (
    <div className="p-6 border-b border-slate-800 bg-slate-900/50 flex flex-col md:flex-row items-center justify-between gap-6">
      <h1 className="text-xl font-black bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent uppercase tracking-tighter">
        InnoTrace: <br /> {sortingAlgorithm}
      </h1>

      <div className="flex flex-1 max-w-md gap-3">

        {/* Data Input Box */}
        <input
          type="text"
          value={dataInput}
          onChange={(e) => setDataInput(e.target.value)}
          disabled={isSorting}
          className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-sm focus:ring-1 focus:ring-orange-500 outline-none transition-all opacity-80"
          placeholder="Unsorted: 45, 12, 5, 31..."
        />

        {/* Randomize Array Button */}
        <button
          onClick={onGenerate}
          disabled={isSorting}
          className="p-2 bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 text-orange-400 transition-all active:rotate-180 duration-500 disabled:opacity-30"
          title="Generate Random Array"
        >
          <Shuffle
            size={20}
            className="transition-transform duration-500 group-active:rotate-180"
          />
        </button>

        <button
          type="button"
          onClick={setOpenGenerator} // Directly calling the prop
          disabled={isSorting}
          className="p-2 bg-slate-800 hover:bg-slate-700 hover:text-blue-400 rounded-xl border border-slate-700 transition-all active:scale-95 disabled:opacity-30"
          title="Open Array Engine"
        >
          <Settings size={20} />
        </button>
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleMainButtonClick}
          disabled={currentArrayLength === 0}
          className={`px-6 py-2 rounded-xl font-bold text-sm transition-all active:scale-95 flex items-center gap-2 shadow-lg 
            ${!isSorting
              ? 'bg-orange-600 hover:bg-orange-500 shadow-orange-900/20'
              : isPaused
                ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-900/20'
                : 'bg-amber-600 hover:bg-amber-500 shadow-amber-900/20'
            }`}
        >
          {/* Visual Cues for the User */}
          {!isSorting ? (
            <>
              <Play size={16} fill="currentColor" />
              START
            </>
          ) : isPaused ? (
            <>
              <Play size={16} fill="currentColor" />
              CONTINUE
            </>
          ) : (
            <>
              <Pause size={16} fill="currentColor" />
              PAUSE
            </>
          )}
        </button>

        {/* Reset button is now enabled even during Pause so users can escape a long sort */}
        <button
          onClick={onReset}
          className="bg-slate-800 hover:bg-slate-700 px-5 py-2 rounded-xl font-bold text-sm border border-slate-700 text-slate-300 transition-colors"
        >
          RESET
        </button>
      </div>
    </div>
  );
};