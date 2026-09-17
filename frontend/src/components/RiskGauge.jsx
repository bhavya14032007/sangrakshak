import React from 'react';

export default function RiskGauge({ score = 18, size = 180, showLabel = true }) {
  const normalizedScore = Math.max(0, Math.min(100, score));
  
  const radius = 68;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (normalizedScore / 100) * (circumference * 0.75);

  const getColor = (s) => {
    if (s >= 75) return '#dc2626'; // Red
    if (s >= 50) return '#ea580c'; // Orange
    if (s >= 30) return '#d97706'; // Amber
    return '#16a34a'; // Emerald
  };

  const getLabel = (s) => {
    if (s >= 75) return 'CRITICAL HAZARD';
    if (s >= 50) return 'HIGH RISK';
    if (s >= 30) return 'MODERATE WATCH';
    return 'SAFE BASELINE';
  };

  const activeColor = getColor(normalizedScore);

  return (
    <div className="flex flex-col items-center justify-center relative select-none">
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="w-full h-full transform -rotate-135" viewBox="0 0 160 160">
          {/* Background Track */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="var(--bg-tertiary)"
            strokeWidth="12"
            fill="transparent"
            strokeDasharray={circumference * 0.75}
            strokeDashoffset="0"
            strokeLinecap="round"
          />
          {/* Animated Value Arc */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke={activeColor}
            strokeWidth="12"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
          />
        </svg>

        {/* Center Text Indicator */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-3xl font-extrabold tracking-tight" style={{ color: activeColor }}>
            {normalizedScore}
            <span className="text-sm font-semibold opacity-60">/100</span>
          </span>
          <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-[var(--text-secondary)] mt-0.5">
            HAZARD INDEX
          </span>
        </div>
      </div>

      {showLabel && (
        <div 
          className="mt-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition-colors duration-300"
          style={{
            backgroundColor: `${activeColor}15`,
            color: activeColor,
            border: `1px solid ${activeColor}40`
          }}
        >
          {getLabel(normalizedScore)}
        </div>
      )}
    </div>
  );
}
