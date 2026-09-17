import React, { useState } from 'react';
import { 
  AreaChart, 
  Area, 
  Line,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';

const TIMEFRAME_DATA = {
  '1h': [
    { time: '19:00', gas: 45, threshold: 60, baseline: 22 },
    { time: '19:15', gas: 68, threshold: 60, baseline: 22 },
    { time: '19:30', gas: 84, threshold: 60, baseline: 22 },
    { time: '19:45', gas: 92, threshold: 60, baseline: 22 },
    { time: 'Now (20:00)', gas: 96, threshold: 60, baseline: 22 },
  ],
  '6h': [
    { time: '15:00', gas: 20, threshold: 60, baseline: 20 },
    { time: '16:00', gas: 22, threshold: 60, baseline: 20 },
    { time: '17:00', gas: 24, threshold: 60, baseline: 20 },
    { time: '18:00', gas: 28, threshold: 60, baseline: 20 },
    { time: '19:00', gas: 96, threshold: 60, baseline: 20 },
    { time: 'Now (20:00)', gas: 94, threshold: 60, baseline: 20 },
  ],
  '24h': [
    { time: 'Yesterday', gas: 18, threshold: 60, baseline: 20 },
    { time: '04:00', gas: 19, threshold: 60, baseline: 20 },
    { time: '08:00', gas: 21, threshold: 60, baseline: 20 },
    { time: '12:00', gas: 25, threshold: 60, baseline: 20 },
    { time: '16:00', gas: 42, threshold: 60, baseline: 20 },
    { time: 'Now (20:00)', gas: 96, threshold: 60, baseline: 20 },
  ]
};

export default function HazardTrendsChart({ currentPpm = 96 }) {
  const [timeframe, setTimeframe] = useState('6h');

  const rawData = TIMEFRAME_DATA[timeframe];
  const data = rawData.map((pt, i) => {
    if (i === rawData.length - 1) {
      return { ...pt, gas: currentPpm };
    }
    return pt;
  });

  return (
    <div className="w-full select-none">
      {/* Chart Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
        <div>
          <h3 className="text-sm font-bold text-[var(--text-primary)]">
            Sensor Telemetry Trends
          </h3>
          <p className="text-xs text-[var(--text-secondary)]">
            Gas Concentration (PPM) vs. Safety Threshold
          </p>
        </div>

        {/* Timeframe Filter Tabs */}
        <div className="flex items-center p-1 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-main)] self-start sm:self-auto">
          {['1h', '6h', '24h'].map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                timeframe === tf
                  ? 'bg-[var(--bg-secondary)] text-[var(--text-primary)] shadow-sm'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Sub-Legend matching design */}
      <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-4 text-xs font-semibold">
        <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-600 inline-block"></span>
          <span>Gas Reading ({currentPpm} ppm)</span>
        </div>
        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-mono">
          <span className="w-3.5 h-0.5 border-t-2 border-dashed border-slate-400 inline-block"></span>
          <span>Threshold Limit (60 ppm)</span>
        </div>
        <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400">
          <span className="w-2.5 h-2.5 rounded-full bg-teal-500 inline-block"></span>
          <span>Normal Baseline</span>
        </div>
      </div>

      {/* Recharts Area Container */}
      <div className="h-60 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 25, right: 15, left: -25, bottom: 0 }}>
            <defs>
              <linearGradient id="gasLeakGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#e11d48" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#e11d48" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-main)" opacity={0.6} vertical={false} />
            
            <XAxis 
              dataKey="time" 
              stroke="var(--text-muted)" 
              fontSize={11} 
              tickLine={false}
              axisLine={false}
              dy={6}
            />
            <YAxis 
              stroke="var(--text-muted)" 
              fontSize={11} 
              domain={[0, 120]} 
              ticks={[0, 30, 60, 90, 120]}
              tickLine={false}
              axisLine={false}
              dx={-6}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border-main)',
                borderRadius: '12px',
                fontSize: '12px',
                boxShadow: 'var(--shadow-elevated)',
                color: 'var(--text-primary)'
              }}
              labelStyle={{ fontWeight: 'bold', color: 'var(--text-primary)' }}
            />

            {/* Threshold Limit Reference Line */}
            <ReferenceLine 
              y={60} 
              stroke="#94a3b8" 
              strokeDasharray="4 4" 
              strokeWidth={1.5}
            />

            {/* Normal Baseline Line */}
            <Area 
              type="monotone" 
              dataKey="baseline" 
              name="Baseline"
              stroke="#14b8a6" 
              strokeWidth={2}
              fill="transparent"
            />

            {/* Primary Gas Reading Area */}
            <Area 
              type="monotone" 
              dataKey="gas" 
              name="Toxic Gas Level"
              stroke="#e11d48" 
              strokeWidth={2.5}
              fillOpacity={1} 
              fill="url(#gasLeakGradient)" 
            />
          </AreaChart>
        </ResponsiveContainer>

        {/* Spike Detected Callout Badge */}
        <div className="absolute top-2 right-12 sm:right-20 px-2.5 py-1 rounded-full bg-rose-50 border border-rose-200 dark:bg-rose-950/60 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-[10px] font-bold shadow-sm flex items-center gap-1.5 animate-bounce">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-ping"></span>
          <span>{currentPpm} PPM SPIKE DETECTED</span>
        </div>
      </div>
    </div>
  );
}
