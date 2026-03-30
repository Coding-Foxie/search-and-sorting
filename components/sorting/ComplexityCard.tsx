import { Code2 } from 'lucide-react';

interface ComplexityProps {
  worst: string;
  best: string;
  space: string;
}

export const ComplexityCard = ({ worst, best, space }: ComplexityProps) => (
  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
    <h3 className="text-sm font-semibold text-slate-300 mb-4 flex items-center gap-2">
      <Code2 size={16} className="text-blue-400" /> Complexity Analysis
    </h3>
    <div className="space-y-4 font-mono text-xs">
      <div className="flex justify-between items-center">
        <span className="text-slate-500">Time (Worst)</span>
        <span className="text-red-400 font-bold">{worst}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-slate-500">Time (Best)</span>
        <span className="text-green-400">{best}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-slate-500">Space Complexity</span>
        <span className="text-blue-400">{space}</span>
      </div>
    </div>
  </div>
);