import React from 'react';
import HazardMap from '../components/HazardMap';
import { Map, Wind, Compass } from 'lucide-react';

export default function HazardMapping({ zones, currentStage }) {
  const downwindBearing = ((currentStage?.wind_direction || 60) + 180) % 360;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="theme-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Map className="w-5 h-5 text-blue-600" />
            GIS Hazard-Based Red Zone & Atmospheric Dispersion
          </h2>
          <p className="text-xs text-[var(--text-secondary)] mt-1">
            Real-time chemical gas cloud propagation model factoring wind velocity, azimuth, and population habitations.
          </p>
        </div>

        {/* Meteorological Quick Card */}
        <div className="flex items-center gap-3 bg-[var(--bg-card-subtle)] border border-[var(--border-main)] px-3.5 py-2 rounded-xl text-xs">
          <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-semibold">
            <Wind className="w-4 h-4" />
            <span className="font-mono">{currentStage?.wind_speed || 12} km/h</span>
          </div>
          <div className="flex items-center gap-1.5 text-[var(--text-primary)] font-semibold">
            <Compass className="w-4 h-4 text-amber-500" />
            <span className="font-mono">{currentStage?.wind_direction || 60}° (Plume &rarr; {downwindBearing}°)</span>
          </div>
        </div>
      </div>

      {/* GIS Leaflet Map Container */}
      <div className="theme-card p-6">
        <HazardMap
          compact={false}
          zones={zones}
          currentStage={currentStage}
          dangerRadius={currentStage?.hazardPlumeRadiusKm || 1.2}
          warningRadius={0.6}
        />
      </div>
    </div>
  );
}
