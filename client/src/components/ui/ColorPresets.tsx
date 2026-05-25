/*client/src/components/ui/ColorPresets.tsx*/

import React from "react";

interface ColorPreset {
  name: string;
  primary: string;
  secondary: string;
  gradient: string;
}

interface ColorPresetsProps {
  onSelectPreset: (primary: string, secondary: string) => void;
}

export const ColorPresets: React.FC<ColorPresetsProps> = ({ onSelectPreset }) => {
  const presets: ColorPreset[] = [
    {
      name: "Océano",
      primary: "#2563eb",
      secondary: "#1e40af",
      gradient: "from-blue-600 to-blue-800",
    },
    {
      name: "Bosque",
      primary: "#10b981",
      secondary: "#059669",
      gradient: "from-emerald-500 to-emerald-700",
    },
    {
      name: "Fuego",
      primary: "#ef4444",
      secondary: "#dc2626",
      gradient: "from-red-500 to-red-700",
    },
    {
      name: "Púrpura",
      primary: "#8b5cf6",
      secondary: "#7c3aed",
      gradient: "from-violet-500 to-violet-700",
    },
    {
      name: "Naranja",
      primary: "#f97316",
      secondary: "#ea580c",
      gradient: "from-orange-500 to-orange-700",
    },
    {
      name: "Cian",
      primary: "#06b6d4",
      secondary: "#0891b2",
      gradient: "from-cyan-500 to-cyan-700",
    },
    {
      name: "Rosa",
      primary: "#ec4899",
      secondary: "#db2777",
      gradient: "from-pink-500 to-pink-700",
    },
    {
      name: "Indigo",
      primary: "#6366f1",
      secondary: "#4f46e5",
      gradient: "from-indigo-500 to-indigo-700",
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-2">
      {presets.map((preset) => (
        <button
          key={preset.name}
          onClick={() => onSelectPreset(preset.primary, preset.secondary)}
          className="group relative"
          title={preset.name}
        >
          <div
            className={`h-10 rounded-lg bg-gradient-to-r ${preset.gradient} shadow-md hover:shadow-xl transition-all transform hover:scale-105`}
          ></div>
          <span className="text-[10px] text-slate-400 mt-1 block text-center group-hover:text-zinc-800 transition-colors">
            {preset.name}
          </span>
        </button>
      ))}
    </div>
  );
};
