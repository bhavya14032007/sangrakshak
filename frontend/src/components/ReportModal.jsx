import React, { useState } from 'react';
import { 
  X, 
  FileDown, 
  CheckCircle2, 
  FileText, 
  ShieldCheck, 
  AlertTriangle,
  Building,
  Printer
} from 'lucide-react';

export default function ReportModal({ isOpen, onClose, currentStage, unitName = 'Unit A — Petrochem' }) {
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setDownloadSuccess(true);
      setTimeout(() => {
        setDownloadSuccess(false);
        onClose();
      }, 1500);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div className="theme-card max-w-xl w-full p-6 relative shadow-2xl animate-in zoom-in-95 duration-150">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[var(--text-muted)] hover:text-[var(--text-primary)] p-1.5 rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-600/20 text-blue-600 flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[var(--text-primary)]">
              Industrial Hazard Compliance Report
            </h3>
            <span className="text-xs text-[var(--text-secondary)] font-medium">
              Statutory CPCB / NDMA Incident Record • PS 26191
            </span>
          </div>
        </div>

        {/* Report Preview Summary */}
        <div className="p-4 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-main)] space-y-3 mb-6 text-xs text-[var(--text-secondary)]">
          <div className="flex justify-between items-center pb-2 border-b border-[var(--border-main)]">
            <span className="font-semibold text-[var(--text-primary)]">Facility Node</span>
            <span className="font-mono text-[var(--text-primary)]">{unitName}</span>
          </div>
          <div className="flex justify-between items-center pb-2 border-b border-[var(--border-main)]">
            <span className="font-semibold text-[var(--text-primary)]">Composite Hazard Index</span>
            <span className="font-mono font-bold text-red-600">{currentStage?.riskScore ?? 78} / 100</span>
          </div>
          <div className="flex justify-between items-center pb-2 border-b border-[var(--border-main)]">
            <span className="font-semibold text-[var(--text-primary)]">Active Red Zone Radius</span>
            <span className="font-mono text-[var(--text-primary)]">{currentStage?.hazardPlumeRadiusKm ?? 1.2} km</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-[var(--text-primary)]">Vulnerable Population Count</span>
            <span className="font-mono font-bold text-[var(--text-primary)]">3,400 residents</span>
          </div>
        </div>

        {/* Modal Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 px-4 rounded-xl border border-[var(--border-main)] bg-[var(--bg-secondary)] hover:bg-[var(--bg-tertiary)] text-[var(--text-primary)] text-xs font-bold transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="flex-1 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            {downloadSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                <span>Report Exported</span>
              </>
            ) : downloading ? (
              <span>Generating PDF...</span>
            ) : (
              <>
                <FileDown className="w-4 h-4" />
                <span>Download Executive PDF</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
