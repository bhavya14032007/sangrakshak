import React from 'react';
import { Users } from 'lucide-react';

export default function CapacityGauge({ zone }) {
  const ratio = zone.carryingCapacityRatio || (zone.population / zone.safeCapacity);
  const isOverloaded = ratio > 1.2;
  const isCritical = ratio > 1.5;

  let color = 'text-emerald-600 dark:text-emerald-400';
  let barColor = 'bg-emerald-500';
  let badgeText = 'WITHIN LIMITS';
  let badgeStyle = 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800';

  if (isCritical) {
    color = 'text-red-600 dark:text-red-400';
    barColor = 'bg-red-600';
    badgeText = 'CRITICAL OVERLOAD';
    badgeStyle = 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-400 dark:border-red-800';
  } else if (isOverloaded) {
    color = 'text-amber-600 dark:text-amber-400';
    barColor = 'bg-amber-500';
    badgeText = 'CAPACITY STRAINED';
    badgeStyle = 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800';
  }

  const fillPct = Math.min(100, Math.round((zone.population / (zone.safeCapacity * 1.5)) * 100));

  return (
    <div className="theme-card p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-blue-600" />
          <h4 className="text-xs font-bold text-[var(--text-primary)]">{zone.name}</h4>
        </div>
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${badgeStyle}`}>
          {badgeText}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 my-3 text-center">
        <div className="p-2 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-main)]">
          <span className="text-[10px] text-[var(--text-secondary)] uppercase font-mono block">Population</span>
          <span className="text-sm font-bold font-mono text-[var(--text-primary)]">{zone.population.toLocaleString()}</span>
        </div>
        <div className="p-2 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-main)]">
          <span className="text-[10px] text-[var(--text-secondary)] uppercase font-mono block">Safe Capacity</span>
          <span className="text-sm font-bold font-mono text-[var(--text-primary)]">{zone.safeCapacity.toLocaleString()}</span>
        </div>
        <div className="p-2 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-main)]">
          <span className="text-[10px] text-[var(--text-secondary)] uppercase font-mono block">Density Ratio</span>
          <span className={`text-sm font-bold font-mono ${color}`}>{(ratio).toFixed(2)}x</span>
        </div>
      </div>

      {/* Capacity Load Bar */}
      <div className="mt-3">
        <div className="flex justify-between text-[10px] text-[var(--text-secondary)] font-mono mb-1 font-medium">
          <span>Current Load</span>
          <span>{fillPct}% of buffer limit</span>
        </div>
        <div className="w-full bg-[var(--bg-tertiary)] rounded-full h-2 overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-500 ${barColor}`} 
            style={{ width: `${fillPct}%` }}
          />
        </div>
      </div>
    </div>
  );
}
