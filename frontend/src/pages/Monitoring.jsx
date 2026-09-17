import React from 'react';
import SensorCard from '../components/SensorCard';
import { Activity, ShieldCheck } from 'lucide-react';

export default function Monitoring({ sensors, currentStage }) {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Page Header */}
      <div className="theme-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-600" />
            Real-Time Industrial IoT Telemetry Stream
          </h2>
          <p className="text-xs text-[var(--text-secondary)] mt-1">
            Continuous high-frequency polling across 9 critical chemical reactor & meteorological sensor nodes.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-50 border border-emerald-200 dark:bg-emerald-950/40 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>9 / 9 Active Nodes Online</span>
          </div>
        </div>
      </div>

      {/* Sensor Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {sensors.map((sensor) => {
          let val = sensor.value;
          if (sensor.type === 'gas_ppm') val = currentStage?.gas_ppm;
          if (sensor.type === 'temperature') val = currentStage?.temperature;
          if (sensor.type === 'pressure') val = currentStage?.pressure;
          if (sensor.type === 'vibration') val = currentStage?.vibration;
          if (sensor.type === 'wind_speed') val = currentStage?.wind_speed;
          if (sensor.type === 'wind_direction') val = currentStage?.wind_direction;

          return (
            <SensorCard
              key={sensor.id}
              sensor={{
                ...sensor,
                value: val
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
