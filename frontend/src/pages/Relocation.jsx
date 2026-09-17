import React from 'react';
import RelocationTable from '../components/RelocationTable';
import { Truck } from 'lucide-react';

export default function Relocation({ zones, currentStage, onTriggerEvacuation }) {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="theme-card p-6">
        <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
          <Truck className="w-5 h-5 text-blue-600" />
          Immediate Relocation Needs & Evacuation Routing
        </h2>
        <p className="text-xs text-[var(--text-secondary)] mt-1">
          Automated multi-criteria dispatch engine pairing high-risk habitations with nearest emergency shelters and optimal non-intersecting egress routes.
        </p>
      </div>

      <RelocationTable
        zones={zones}
        currentStage={currentStage}
        onTriggerEvacuation={onTriggerEvacuation}
      />
    </div>
  );
}
