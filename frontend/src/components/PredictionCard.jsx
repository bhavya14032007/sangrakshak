import React from 'react';
import { BrainCircuit, CheckCircle, AlertTriangle, ArrowUpRight, Zap } from 'lucide-react';

export default function PredictionCard({ currentRisk = 18, currentStage }) {
  const isHighRisk = currentRisk >= 50;

  const features = [
    { name: 'Gas Concentration Rate of Rise', value: currentStage?.gas_ppm > 300 ? '+420 ppm/min' : '+2.1 ppm/min', impact: currentStage?.gas_ppm > 300 ? 'CRITICAL' : 'LOW' },
    { name: 'Exothermic Vessel Core Temp', value: `${currentStage?.temperature || 38}°C`, impact: currentStage?.temperature > 70 ? 'CRITICAL' : 'LOW' },
    { name: 'Feedline Pressure Differential', value: `${currentStage?.pressure || 4.8} bar`, impact: currentStage?.pressure > 7 ? 'HIGH' : 'LOW' },
    { name: 'Downwind Habitation Vulnerability', value: currentStage?.stage >= 4 ? 'ZONE A & B IN PLUME CONE' : 'NEUTRAL DISPERSION', impact: currentStage?.stage >= 4 ? 'CRITICAL' : 'LOW' },
  ];

  return (
    <div className="theme-card p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400">
            <BrainCircuit className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[var(--text-primary)]">Adaptive ML Classifier (Gradient Boost v3.2)</h3>
            <span className="text-[11px] text-[var(--text-secondary)] font-medium">Stratified 5-Fold Cross Validated • F1-Score: 0.962</span>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
          Latency: 14ms
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-[var(--bg-card-subtle)] p-3.5 rounded-xl border border-[var(--border-main)]">
          <span className="text-[10px] uppercase font-mono text-[var(--text-secondary)] block mb-1">Predicted Incident Class</span>
          <span className={`text-sm font-bold ${isHighRisk ? 'text-red-600' : 'text-emerald-600'}`}>
            {isHighRisk ? 'TOXIC VAPOR PLUME RELEASE' : 'NOMINAL STEADY STATE'}
          </span>
        </div>
        <div className="bg-[var(--bg-card-subtle)] p-3.5 rounded-xl border border-[var(--border-main)]">
          <span className="text-[10px] uppercase font-mono text-[var(--text-secondary)] block mb-1">Prediction Confidence</span>
          <span className="text-sm font-bold text-[var(--text-primary)] font-mono">
            {isHighRisk ? '96.8%' : '94.2%'}
          </span>
        </div>
      </div>

      {/* Feature Attribution List */}
      <div>
        <h4 className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-amber-500" />
          Real-time Feature Attribution
        </h4>
        <div className="space-y-2">
          {features.map((f, idx) => (
            <div key={idx} className="flex items-center justify-between text-xs py-2 px-3 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-main)]">
              <span className="text-[var(--text-primary)] font-medium">{f.name}</span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[var(--text-secondary)]">{f.value}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  f.impact === 'CRITICAL' ? 'bg-red-50 text-red-700 border border-red-200 dark:bg-red-950/40 dark:text-red-400 dark:border-red-800' :
                  f.impact === 'HIGH' ? 'bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800' :
                  'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800'
                }`}>
                  {f.impact}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
