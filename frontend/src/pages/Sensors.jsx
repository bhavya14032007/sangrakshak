import React from 'react';
import { Cpu, Wifi, Battery, CheckCircle2, AlertTriangle, Activity } from 'lucide-react';

export default function Sensors({ sensors, currentStage }) {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="theme-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Cpu className="w-5 h-5 text-blue-600" />
            Industrial IoT Sensor Nodes & Mesh Health
          </h2>
          <p className="text-xs text-[var(--text-secondary)] mt-1">
            Real-time diagnostics, battery voltage, signal strength (RSSI), and calibration status across all deployed field units.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800 px-3.5 py-2 rounded-xl">
          <CheckCircle2 className="w-4 h-4" />
          <span>LoRaWAN Mesh Gateway: 100% Packet Delivery</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sensors.map((s) => {
          let val = s.value;
          if (s.type === 'gas_ppm') val = currentStage.gas_ppm;
          if (s.type === 'temperature') val = currentStage.temperature;
          if (s.type === 'pressure') val = currentStage.pressure;
          if (s.type === 'vibration') val = currentStage.vibration;
          if (s.type === 'wind_speed') val = currentStage.wind_speed;
          if (s.type === 'wind_direction') val = currentStage.wind_direction;

          const isCritical = val >= s.criticalMax;

          return (
            <div key={s.id} className="theme-card p-5 space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[var(--text-primary)]">{s.name}</h4>
                    <span className="text-[10px] text-[var(--text-secondary)] font-mono">{s.id} • {s.location}</span>
                  </div>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  isCritical 
                    ? 'bg-red-50 text-red-700 border border-red-200 dark:bg-red-950/40 dark:text-red-400 dark:border-red-800' 
                    : 'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800'
                }`}>
                  {isCritical ? 'ALARM' : 'ONLINE'}
                </span>
              </div>

              <div className="bg-[var(--bg-card-subtle)] p-3 rounded-xl border border-[var(--border-main)] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[var(--text-secondary)] uppercase font-mono block">Current Ingestion</span>
                  <span className={`text-xl font-bold font-mono ${isCritical ? 'text-red-600' : 'text-[var(--text-primary)]'}`}>
                    {typeof val === 'number' ? val.toFixed(1) : val} {s.unit}
                  </span>
                </div>
                <div className="text-right text-[10px] font-mono text-[var(--text-secondary)]">
                  <div>Sampling: 1.0s</div>
                  <div>Buffer: 0ms lag</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-1 text-[10px] font-mono text-[var(--text-secondary)] border-t border-[var(--border-main)]">
                <div className="flex items-center gap-1">
                  <Battery className="w-3.5 h-3.5 text-emerald-600" />
                  <span>98% Batt</span>
                </div>
                <div className="flex items-center gap-1">
                  <Wifi className="w-3.5 h-3.5 text-blue-600" />
                  <span>-64 dBm</span>
                </div>
                <div className="text-right text-[var(--text-primary)] font-semibold">
                  <span>Cal: 2d ago</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
