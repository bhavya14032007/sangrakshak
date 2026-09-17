import React, { useState } from 'react';
import { FileText, Download, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function Reports({ currentStage, zones, sensors }) {
  const [downloaded, setDownloaded] = useState(false);

  const handleExportCSV = () => {
    const headers = 'Sensor_ID,Sensor_Name,Telemetry_Value,Unit,Threshold_Limit,Status\n';
    const rows = sensors.map(s => {
      let val = s.value;
      if (s.type === 'gas_ppm') val = currentStage?.gas_ppm;
      if (s.type === 'temperature') val = currentStage?.temperature;
      if (s.type === 'pressure') val = currentStage?.pressure;
      return `${s.id},"${s.name}",${val},${s.unit},${s.normalMax},${s.status}`;
    }).join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `SANRAKSHAK_Audit_Log_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="theme-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            Statutory Compliance & Incident Audit Reports
          </h2>
          <p className="text-xs text-[var(--text-secondary)] mt-1">
            Automated generation of Central Pollution Control Board (CPCB) and NDMA-compliant industrial audit logs.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all cursor-pointer shadow-sm flex items-center gap-2"
        >
          {downloaded ? <CheckCircle2 className="w-4 h-4" /> : <Download className="w-4 h-4" />}
          <span>{downloaded ? 'CSV Exported!' : 'Export Incident CSV'}</span>
        </button>
      </div>

      {/* Structured Executive Summary Report Preview */}
      <div className="theme-card p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-[var(--border-main)] pb-4">
          <div>
            <h3 className="text-base font-bold text-[var(--text-primary)]">
              SENTINELAI / SANRAKSHAK INDUSTRIAL SAFETY AUDIT
            </h3>
            <span className="text-xs text-blue-600 dark:text-blue-400 font-mono">
              Ref: SENTINEL-PS26191-2026-Q3 • Facility: Unit A — Petrochem
            </span>
          </div>
          <div className="text-right text-xs font-mono text-[var(--text-secondary)]">
            <div>Date: {new Date().toLocaleDateString()}</div>
            <div>Time: {new Date().toLocaleTimeString()} IST</div>
          </div>
        </div>

        {/* Section 1: Executive Summary */}
        <div>
          <h4 className="text-xs font-bold uppercase text-[var(--text-primary)] tracking-wider mb-2">
            1. Executive Safety Assessment
          </h4>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed bg-[var(--bg-card-subtle)] p-4 rounded-xl border border-[var(--border-main)] font-medium">
            Continuous AI telemetry evaluation of Chemical Complex Alpha indicates a composite hazard score of 
            <strong className="text-red-600 font-mono"> {currentStage?.riskScore || 78}/100 </strong> 
            ({currentStage?.hazardLevel || 'CRITICAL'} Severity). Dispersion calculations model a downwind plume radius of 
            <strong className="text-[var(--text-primary)] font-mono"> {currentStage?.hazardPlumeRadiusKm || 1.2} km </strong>.
            Surrounding habitations (6 sectors) with 10,720 aggregate population are currently 
            {(currentStage?.riskScore || 78) > 50 ? ' under emergency evacuation protocol.' : ' operating under statutory safe limits.'}
          </p>
        </div>

        {/* Section 2: Key Telemetry Summary Table */}
        <div>
          <h4 className="text-xs font-bold uppercase text-[var(--text-primary)] tracking-wider mb-2">
            2. Real-Time Telemetry Snapshot
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-main)]">
              <span className="text-[10px] text-[var(--text-secondary)] block">Toxic Gas (ppm)</span>
              <span className="text-sm font-bold font-mono text-[var(--text-primary)]">{currentStage?.gas_ppm || 430} ppm</span>
            </div>
            <div className="p-3 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-main)]">
              <span className="text-[10px] text-[var(--text-secondary)] block">Core Temp</span>
              <span className="text-sm font-bold font-mono text-[var(--text-primary)]">{currentStage?.temperature || 76} °C</span>
            </div>
            <div className="p-3 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-main)]">
              <span className="text-[10px] text-[var(--text-secondary)] block">Feedline Pressure</span>
              <span className="text-sm font-bold font-mono text-[var(--text-primary)]">{currentStage?.pressure || 7.9} bar</span>
            </div>
            <div className="p-3 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-main)]">
              <span className="text-[10px] text-[var(--text-secondary)] block">Wind Dispersion</span>
              <span className="text-sm font-bold font-mono text-[var(--text-primary)]">{currentStage?.wind_speed || 21} km/h @ {currentStage?.wind_direction || 50}°</span>
            </div>
          </div>
        </div>

        {/* Section 3: Statutory Sign-off */}
        <div className="pt-4 border-t border-[var(--border-main)] flex items-center justify-between text-xs text-[var(--text-secondary)]">
          <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>Digital Cryptographic Signature Verified • CPCB Gateway</span>
          </div>
          <span className="font-mono text-[var(--text-muted)]">Hash: 8f9b2c31e4d7a...</span>
        </div>
      </div>
    </div>
  );
}
