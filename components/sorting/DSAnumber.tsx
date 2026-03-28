// components/sorting/DSANumber.tsx
import { formatDSANumber } from "@/utils/format";

interface DSANumberProps {
  value: number | null;
  label?: string;
  className?: string;
  highlight?: boolean;
}

export const DSANumber = ({ value, label, className = "", highlight }: DSANumberProps) => {
  const isNegative = value !== null && value < 0;

  return (
    <div className={`flex flex-col ${className}`}>
      {label && <span className="text-[8px] text-slate-500 uppercase mb-0.5">{label}</span>}
      <span className={`font-mono transition-colors duration-300 ${highlight
        ? 'text-purple-400 font-bold'
        : isNegative ? 'text-red-400' : 'text-emerald-400'
        }`}>
        {formatDSANumber(value)}
      </span>
    </div>
  );
};