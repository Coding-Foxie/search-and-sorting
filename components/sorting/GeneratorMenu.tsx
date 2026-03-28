"use client";

import React from 'react';
import { Settings2, RefreshCw, Hash, Binary, MoveHorizontal } from 'lucide-react';
import { DSANumber } from './DSAnumber';

// --- 1. Interfaces (The "Single Source of Truth") ---
export interface GeneratorSettings {
  count: number;
  min: number;
  max: number;
  includeFloat: boolean;
  includeNegative: boolean;
}

interface GeneratorMenuProps {
  settings: GeneratorSettings;
  setSettings: (settings: GeneratorSettings) => void;
  onGenerate: () => void;
}

interface ToggleProps {
  label: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
  colorClass?: string;
}

// --- 2. The Reusable Toggle Helper ---
const Toggle = ({ label, icon, active, onClick, colorClass = "bg-blue-600" }: ToggleProps) => (
  <div
    className="flex items-center justify-between group cursor-pointer select-none"
    onClick={onClick}
  >
    <span className="text-xs text-slate-400 group-hover:text-slate-200 transition-colors flex items-center gap-2">
      {icon} {label}
    </span>
    <div className={`w-8 h-4 rounded-full p-0.5 transition-colors ${active ? colorClass : 'bg-slate-800'}`}>
      <div className={`w-3 h-3 bg-white rounded-full transition-transform duration-200 ${active ? 'translate-x-4' : 'translate-x-0'}`} />
    </div>
  </div>
);

// --- 3. The Main Menu Component ---
export const GeneratorMenu = ({ settings, setSettings, onGenerate }: GeneratorMenuProps) => {

  // Generic update handler: Type-safe and DRY
  const updateSetting = <K extends keyof GeneratorSettings>(
    key: K,
    value: GeneratorSettings[K]
  ) => {
    let finalValue = value;

    // --- 1. Range Constraint Logic ---
    if (key === 'min' || key === 'max') {
      const numValue = Number(value);
      // Clamp the value between -100 and 100
      finalValue = Math.min(Math.max(numValue, -100), 100) as GeneratorSettings[K];
    }

    setSettings({ ...settings, [key]: finalValue });
  };

  return (
    <div className="w-72 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
      {/* Header */}
      <div className="bg-slate-950/50 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Settings2 size={14} className="text-blue-400" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Array Engine</span>
        </div>
      </div>

      <div className="p-4 space-y-5">
        {/* Count Slider */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-[10px] text-slate-500 uppercase flex items-center gap-1.5">
              <Hash size={12} /> Array Size
            </label>
            <DSANumber value={settings.count} className="text-xs" />
          </div>
          <input
            type="range" min="4" max="20" step="1"
            value={settings.count}
            onChange={(e) => updateSetting('count', Number(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
        </div>

        {/* Min/Max Inputs with HTML constraints */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-[10px] text-slate-500 uppercase">Min Limit</label>
            <input
              type="number"
              min="-100"
              max="100"
              value={settings.min}
              onChange={(e) => updateSetting('min', Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs font-mono text-blue-400 outline-none focus:border-blue-500/50 transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] text-slate-500 uppercase">Max Limit</label>
            <input
              type="number"
              min="-100"
              max="100"
              value={settings.max}
              onChange={(e) => updateSetting('max', Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs font-mono text-blue-400 outline-none focus:border-blue-500/50 transition-all"
            />
          </div>
        </div>

        {/* Info Note for the User */}
        <p className="text-[9px] text-slate-00 font-mono text-center">
          Range locked: [-100, 100]
        </p>

        {/* Using our New Helper */}
        <div className="space-y-3 pt-2 border-t border-slate-800/50">
          <Toggle
            label="Floating Points"
            icon={<Binary size={14} />}
            active={settings.includeFloat}
            onClick={() => updateSetting('includeFloat', !settings.includeFloat)}
          />
          <Toggle
            label="Negative Values"
            icon={<MoveHorizontal size={14} />}
            active={settings.includeNegative}
            onClick={() => updateSetting('includeNegative', !settings.includeNegative)}
            colorClass="bg-red-600"
          />
        </div>

        <button
          onClick={onGenerate}
          className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-xl transition-all flex items-center justify-center gap-2 group active:scale-[0.98]"
        >
          <RefreshCw size={14} className="group-active:animate-spin" />
          CONFIRM & GENERATE
        </button>
      </div>
    </div>
  );
};