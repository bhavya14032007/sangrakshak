import React from 'react';
import { Shield } from 'lucide-react';

export default function PageLoader() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        gap: '16px',
        color: 'var(--text-secondary)'
      }}
      role="status"
      aria-live="polite"
      aria-label="Loading module..."
    >
      <div
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '14px',
          background: 'linear-gradient(135deg, var(--color-accent-red) 0%, #9f1239 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'var(--shadow-red-glow)',
          animation: 'radar-pulse 2s infinite ease-in-out'
        }}
      >
        <Shield style={{ width: '24px', height: '24px', color: 'white' }} />
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)' }}>
          Loading Sangrakshak Module...
        </div>
        <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
          Initializing Real-time Telemetry & AI Engines
        </div>
      </div>
    </div>
  );
}
