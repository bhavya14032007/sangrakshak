import React from 'react';
import { Activity, AlertCircle, Flame, Wind, Gauge, Droplets, Waves } from 'lucide-react';

const ICON_MAP = {
  gas_ppm: Flame,
  temperature: Flame,
  pressure: Gauge,
  humidity: Droplets,
  wind_speed: Wind,
  wind_direction: Wind,
  vibration: Waves,
  air_quality: Activity,
  voc: AlertCircle
};

export default function SensorCard({ sensor }) {
  const Icon = ICON_MAP[sensor.type] || Activity;

  // Determine status color
  const isCritical = sensor.value >= sensor.criticalMax;
  const isWarning = sensor.value > sensor.normalMax && sensor.value < sensor.criticalMax;
  
  let statusColor = 'text-emerald-600 dark:text-emerald-400';
  let badgeBg = 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800';
  let barColor = 'bg-emerald-500';
  let statusText = 'NORMAL';

  if (isCritical) {
    statusColor = 'text-red-600 dark:text-red-400';
    badgeBg = 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-400 dark:border-red-800';
    barColor = 'bg-red-600';
    statusText = 'CRITICAL';
  } else if (isWarning) {
    statusColor = 'text-amber-600 dark:text-amber-400';
    badgeBg = 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800';
    barColor = 'bg-amber-500';
    statusText = 'WARNING';
  }

  const maxVal = sensor.criticalMax * 1.2 || 100;
  const pct = Math.min(100, Math.max(5, (sensor.value / maxVal) * 100));

  return (
    <div className={`theme-card p-4 transition-all duration-200 hover:shadow-md ${isCritical ? 'border-red-300 dark:border-red-900/60' : ''}`}>
      {/* Top Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2.5">
          <div className={`p-1.5 rounded-lg border ${badgeBg}`}>
            <Icon className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-[var(--text-primary)]">{sensor.name}</h4>
            <span className="text-[10px] text-[var(--text-secondary)] font-mono">{sensor.id} • {sensor.location}</span>
          </div>
        </div>
        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${badgeBg}`}>
          {statusText}
        </span>
      </div>

      {/* Main Value */}
      <div className="my-2.5 flex items-baseline justify-between">
        <div className="flex items-baseline gap-1">
          <span className={`text-2xl font-bold font-mono ${statusColor}`}>
            {typeof sensor.value === 'number' ? sensor.value.toFixed(1) : sensor.value}
          </span>
          <span className="text-xs text-[var(--text-secondary)] font-semibold">{sensor.unit}</span>
        </div>
        <span className="text-[11px] text-[var(--text-muted)] font-mono">
          Thresh: &le; {sensor.normalMax}{sensor.unit}
        </span>
      </div>

      {/* Threshold Meter Bar */}
      <div className="w-full bg-[var(--bg-tertiary)] rounded-full h-1.5 overflow-hidden mt-1">
        <div 
          className={`h-full rounded-full transition-all duration-500 ${barColor}`} 
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
