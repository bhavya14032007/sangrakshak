import React, { useState } from 'react';
import { ShieldAlert, Volume2, Bell, Radio, X, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function EmergencyModal({ isOpen, onClose, onConfirm, currentStage }) {
  const [sirenActive, setSirenActive] = useState(true);
  const [smsBroadcast, setSmsBroadcast] = useState(true);
  const [sdrfAlert, setSdrfAlert] = useState(true);
  const [executed, setExecuted] = useState(false);

  if (!isOpen) return null;

  const handleExecute = () => {
    setExecuted(true);
    setTimeout(() => {
      onConfirm({ sirenActive, smsBroadcast, sdrfAlert });
      setExecuted(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div className="theme-card max-w-lg w-full p-6 relative shadow-2xl animate-in zoom-in-95 duration-150 border-red-300 dark:border-red-900">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[var(--text-muted)] hover:text-[var(--text-primary)] p-1.5 rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3.5 mb-4">
          <div className="w-11 h-11 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-md flex-shrink-0">
            <ShieldAlert className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[var(--text-primary)]">
              Emergency Protocol Activation
            </h3>
            <span className="text-xs text-red-600 font-bold uppercase tracking-wider">
              Level 3 Protocol • Red Zone Evacuation Directive
            </span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-red-50 border border-red-200 dark:bg-red-950/30 dark:border-red-900/50 text-xs text-[var(--text-primary)] mb-5">
          <p className="font-bold text-red-700 dark:text-red-400 mb-1">
            Authorizing Immediate Relocation for Downwind Habitations:
          </p>
          <p className="text-[var(--text-secondary)] font-medium">
            • Zone A - North Residential Colony (2,800 residents)<br />
            • Zone B - Northeast Habitation Sector (3,450 residents)
          </p>
        </div>

        {/* Action Checkboxes */}
        <div className="space-y-2.5 mb-6 text-xs">
          <label className="flex items-center gap-3 p-3 rounded-xl border border-[var(--border-main)] bg-[var(--bg-card-subtle)] hover:bg-[var(--bg-tertiary)] cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={sirenActive}
              onChange={(e) => setSirenActive(e.target.checked)}
              className="rounded text-red-600 focus:ring-red-500 w-4 h-4 cursor-pointer"
            />
            <div className="flex items-center gap-2 text-[var(--text-primary)] font-semibold">
              <Volume2 className="w-4 h-4 text-red-600" />
              <span>Activate Multi-Tone Industrial Warning Sirens (120dB)</span>
            </div>
          </label>

          <label className="flex items-center gap-3 p-3 rounded-xl border border-[var(--border-main)] bg-[var(--bg-card-subtle)] hover:bg-[var(--bg-tertiary)] cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={smsBroadcast}
              onChange={(e) => setSmsBroadcast(e.target.checked)}
              className="rounded text-red-600 focus:ring-red-500 w-4 h-4 cursor-pointer"
            />
            <div className="flex items-center gap-2 text-[var(--text-primary)] font-semibold">
              <Bell className="w-4 h-4 text-amber-600" />
              <span>Send Geo-Targeted CAP Warning SMS to 3,400 Cell Devices</span>
            </div>
          </label>

          <label className="flex items-center gap-3 p-3 rounded-xl border border-[var(--border-main)] bg-[var(--bg-card-subtle)] hover:bg-[var(--bg-tertiary)] cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={sdrfAlert}
              onChange={(e) => setSdrfAlert(e.target.checked)}
              className="rounded text-red-600 focus:ring-red-500 w-4 h-4 cursor-pointer"
            />
            <div className="flex items-center gap-2 text-[var(--text-primary)] font-semibold">
              <Radio className="w-4 h-4 text-blue-600" />
              <span>Dispatch NDRF 5th Battalion & SDRF Rapid Response Units</span>
            </div>
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 px-4 rounded-xl border border-[var(--border-main)] bg-[var(--bg-secondary)] hover:bg-[var(--bg-tertiary)] text-[var(--text-primary)] text-xs font-bold transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleExecute}
            disabled={executed}
            className="flex-1 py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            {executed ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>DIRECTIVE DISPATCHED...</span>
              </>
            ) : (
              <>
                <AlertTriangle className="w-4 h-4" />
                <span>CONFIRM & EXECUTE</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
