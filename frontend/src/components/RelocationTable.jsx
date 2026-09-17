import React from 'react';
import { Truck, AlertOctagon, CheckCircle2, Navigation, Clock, Shield } from 'lucide-react';

export default function RelocationTable({ zones = [], currentStage, onTriggerEvacuation }) {
  const rankedZones = [...zones].map((zone) => {
    let score = 20;
    let status = 'STANDBY';
    let urgency = 'LOW';

    if (currentStage?.redZones?.includes(zone.id)) {
      score = 98;
      status = 'IMMEDIATE EVACUATION';
      urgency = 'CRITICAL';
    } else if (currentStage?.affectedZones?.includes(zone.id)) {
      score = 68;
      status = 'PRE-ALERT EVACUATION';
      urgency = 'HIGH';
    }

    return {
      ...zone,
      relocationScore: score,
      status,
      urgency
    };
  }).sort((a, b) => b.relocationScore - a.relocationScore);

  return (
    <div className="theme-card p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Truck className="w-4 h-4 text-blue-600" />
            Vulnerable Habitation Relocation Intelligence Matrix
          </h3>
          <p className="text-xs text-[var(--text-secondary)]">
            Automated priority ranking based on Hazard Plume Proximity × Population Carrying Overload
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-[var(--bg-card-subtle)] text-[var(--text-secondary)] uppercase font-mono text-[10px] border-b border-[var(--border-main)]">
            <tr>
              <th className="py-3 px-3.5">Priority Rank</th>
              <th className="py-3 px-3.5">Habitation Zone</th>
              <th className="py-3 px-3.5">Population</th>
              <th className="py-3 px-3.5">Distance & Bearing</th>
              <th className="py-3 px-3.5">Designated Safe Shelter</th>
              <th className="py-3 px-3.5">Est. Transit Time</th>
              <th className="py-3 px-3.5">Status</th>
              <th className="py-3 px-3.5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-main)] font-medium">
            {rankedZones.map((zone, idx) => {
              const isCrit = zone.urgency === 'CRITICAL';
              const isHigh = zone.urgency === 'HIGH';

              return (
                <tr 
                  key={zone.id} 
                  className={`transition-colors ${isCrit ? 'bg-red-50/50 dark:bg-red-950/20' : isHigh ? 'bg-amber-50/50 dark:bg-amber-950/15' : 'hover:bg-[var(--bg-card-subtle)]'}`}
                >
                  <td className="py-3 px-3.5 font-mono">
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                      isCrit ? 'bg-red-600 text-white' :
                      isHigh ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400' :
                      'bg-[var(--bg-card-subtle)] text-[var(--text-secondary)]'
                    }`}>
                      #{idx + 1}
                    </span>
                  </td>
                  <td className="py-3 px-3.5">
                    <div className="font-bold text-[var(--text-primary)]">{zone.name}</div>
                    <div className="text-[10px] text-[var(--text-secondary)] font-mono">ID: {zone.id}</div>
                  </td>
                  <td className="py-3 px-3.5 font-mono text-[var(--text-primary)]">
                    {zone.population.toLocaleString()} pax
                  </td>
                  <td className="py-3 px-3.5 font-mono text-[var(--text-secondary)]">
                    {zone.distanceKm} km @ {zone.bearingDeg}°
                  </td>
                  <td className="py-3 px-3.5">
                    <div className="text-emerald-700 dark:text-emerald-400 flex items-center gap-1 font-semibold">
                      <Shield className="w-3.5 h-3.5" />
                      {zone.designatedShelter}
                    </div>
                    <div className="text-[10px] text-[var(--text-secondary)]">Cap: {zone.shelterCapacity}</div>
                  </td>
                  <td className="py-3 px-3.5 font-mono text-[var(--text-primary)]">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[var(--text-secondary)]" />
                      {zone.estEvacuationTimeMin} mins
                    </div>
                  </td>
                  <td className="py-3 px-3.5">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      isCrit ? 'bg-red-50 text-red-700 border border-red-200 dark:bg-red-950/40 dark:text-red-400 dark:border-red-800' :
                      isHigh ? 'bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800' :
                      'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800'
                    }`}>
                      {zone.status}
                    </span>
                  </td>
                  <td className="py-3 px-3.5 text-right">
                    <button
                      onClick={() => onTriggerEvacuation && onTriggerEvacuation(zone)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isCrit 
                          ? 'bg-red-600 hover:bg-red-500 text-white shadow-sm' 
                          : 'bg-[var(--bg-secondary)] hover:bg-[var(--bg-card-subtle)] text-[var(--text-primary)] border border-[var(--border-main)]'
                      }`}
                    >
                      {isCrit ? 'DISPATCH NDRF' : 'Issue Alert'}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
