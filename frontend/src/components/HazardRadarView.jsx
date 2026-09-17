import React from 'react';
import { Wind, Navigation } from 'lucide-react';

export default function HazardRadarView({ 
  unit = 'Tank Farm T-04', 
  dangerRadius = 1.1, 
  bufferRadius = 1.5,
  gasPpm = 96,
  windSpeed = 14,
  windDirection = 'SE'
}) {
  return (
    <div className="w-full select-none">
      {/* Wind Telemetry Pill */}
      <div className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-main)] mb-4 text-xs font-semibold text-[var(--text-secondary)]">
        <div className="flex items-center gap-2 text-teal-700 dark:text-teal-400">
          <Wind className="w-4 h-4" />
          <span>Wind: {windDirection} {windSpeed} km/h</span>
        </div>
        <div className="flex items-center gap-1 font-mono text-[11px] text-[var(--text-muted)]">
          <span>N</span>
          <Navigation className="w-3.5 h-3.5 text-blue-600 rotate-0" />
        </div>
      </div>

      {/* Circular Radar Visualizer */}
      <div className="relative w-full aspect-square max-h-[220px] mx-auto flex items-center justify-center p-2">
        {/* Outer Buffer Ring (1.5 km) */}
        <div className="absolute w-[92%] h-[92%] rounded-full border border-dashed border-amber-300 dark:border-amber-700/60 bg-amber-500/5 flex items-center justify-center animate-radar-pulse"></div>

        {/* Middle Range Ring */}
        <div className="absolute w-[72%] h-[72%] rounded-full border border-gray-200 dark:border-gray-800"></div>

        {/* Inner Danger Ring (1.1 km) */}
        <div className="absolute w-[54%] h-[54%] rounded-full border-2 border-rose-500/70 bg-rose-500/10 dark:bg-rose-500/20 flex items-center justify-center"></div>

        {/* Crosshair lines */}
        <div className="absolute w-full h-[1px] bg-gray-200 dark:bg-gray-800/80"></div>
        <div className="absolute h-full w-[1px] bg-gray-200 dark:bg-gray-800/80"></div>

        {/* Center Plume Origin Marker */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative flex items-center justify-center">
            <span className="animate-ping absolute inline-flex h-5 w-5 rounded-full bg-rose-400 opacity-75"></span>
            <div className="w-3.5 h-3.5 rounded-full bg-rose-600 border-2 border-white shadow-md"></div>
          </div>

          {/* Plant Node Badge */}
          <div className="mt-1.5 px-3 py-1 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-main)] shadow-sm text-center">
            <div className="text-[11px] font-bold text-[var(--text-primary)] leading-tight">
              {unit}
            </div>
            <div className="text-[10px] font-bold font-mono text-rose-600 mt-0.5">
              {gasPpm} PPM VOC
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Danger & Buffer Zone Cards */}
      <div className="grid grid-cols-2 gap-3 mt-4 pt-3 border-t border-[var(--border-main)]">
        <div className="p-2.5 rounded-xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200/80 dark:border-rose-900/50">
          <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400 block mb-0.5">
            Danger Zone
          </span>
          <div className="text-sm font-bold text-[var(--text-primary)] font-mono">
            {dangerRadius} km
          </div>
          <span className="text-[10px] text-[var(--text-secondary)] font-medium">
            Immediate Evacuation
          </span>
        </div>

        <div className="p-2.5 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/50">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 block mb-0.5">
            Buffer Zone
          </span>
          <div className="text-sm font-bold text-[var(--text-primary)] font-mono">
            {bufferRadius} km
          </div>
          <span className="text-[10px] text-[var(--text-secondary)] font-medium">
            Shelter in Place
          </span>
        </div>
      </div>
    </div>
  );
}
