import React from 'react';
import RiskGauge from '../components/RiskGauge';
import HazardTrendsChart from '../components/HazardTrendsChart';
import PredictionCard from '../components/PredictionCard';
import { AlertTriangle, BrainCircuit, BarChart2, ShieldAlert } from 'lucide-react';

export default function RiskDetection({ currentStage }) {
  const risk = currentStage?.riskScore ?? 78;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Header */}
      <div className="theme-card p-6">
        <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-500" />
          Multi-Factor Hazard Prediction & Anomaly Engine
        </h2>
        <p className="text-xs text-[var(--text-secondary)] mt-1">
          Combines Gradient Boost ML classification, CPCB statutory thresholds, and dynamic plume physics.
        </p>
      </div>

      {/* Top Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 theme-card p-6 flex flex-col items-center justify-center">
          <RiskGauge score={risk} size={220} />
          <div className="mt-5 w-full space-y-2 text-xs">
            <div className="flex justify-between p-3 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-main)]">
              <span className="text-[var(--text-secondary)] font-medium">Current Hazard State</span>
              <span className="font-bold text-[var(--text-primary)]">{currentStage?.hazardLevel ?? 'CRITICAL'}</span>
            </div>
            <div className="flex justify-between p-3 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-main)]">
              <span className="text-[var(--text-secondary)] font-medium">Confidence Interval</span>
              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">95% (±1.8%)</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8">
          <PredictionCard currentRisk={risk} currentStage={currentStage} />
        </div>
      </div>

      {/* Historical vs Predicted Risk Curve */}
      <div className="theme-card p-6">
        <HazardTrendsChart currentRisk={risk} />
      </div>
    </div>
  );
}
