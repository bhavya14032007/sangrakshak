import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  Radio,
  Search,
  Users,
  Flame,
  Thermometer,
  Gauge,
  Bell,
  ChevronRight,
  Play,
  Pause,
  RotateCcw,
  ShieldAlert,
  Siren,
  Shield,
  Activity,
  ArrowUpRight,
  Wind,
  TrendingUp
} from 'lucide-react';
import HazardTrendsChart from '../components/HazardTrendsChart';
import HazardRadarView from '../components/HazardRadarView';
import { SIMULATION_STAGES } from '../data/mockData';

/* ── Small helper: stat card ── */
function StatCard({ label, value, unit, sub, icon: Icon, iconColor, subColor, accent }) {
  return (
    <article
      className="theme-card"
      style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span
          style={{
            fontSize: '11px',
            fontWeight: '700',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)'
          }}
        >
          {label}
        </span>
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: `${iconColor}18`,
            color: iconColor,
            flexShrink: 0
          }}
        >
          <Icon style={{ width: '16px', height: '16px' }} />
        </div>
      </div>

      <div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
          <span
            style={{
              fontSize: '30px',
              fontWeight: '800',
              letterSpacing: '-0.03em',
              color: accent || 'var(--text-primary)',
              fontFamily: 'var(--font-sans)',
              lineHeight: '1'
            }}
          >
            {value}
          </span>
          {unit && (
            <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-muted)' }}>
              {unit}
            </span>
          )}
        </div>
        {sub && (
          <div
            style={{
              marginTop: '6px',
              fontSize: '12px',
              fontWeight: '600',
              color: subColor || 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: subColor || 'var(--text-muted)',
                display: 'inline-block',
                flexShrink: 0
              }}
            />
            {sub}
          </div>
        )}
      </div>
    </article>
  );
}

/* ── Sensor node row ── */
function SensorNode({ name, type, value, unit, limit, status, icon: Icon, iconBg, statusColor, statusLabel, lastSeen }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
        padding: '14px 16px',
        borderRadius: '12px',
        border: '1px solid var(--border-main)',
        background: 'var(--bg-card-subtle)',
        transition: 'all 0.15s ease'
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = 'var(--bg-tertiary)';
        e.currentTarget.style.borderColor = 'var(--border-highlight)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'var(--bg-card-subtle)';
        e.currentTarget.style.borderColor = 'var(--border-main)';
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: iconBg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}
        >
          <Icon style={{ width: '18px', height: '18px', color: statusColor }} />
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)', lineHeight: '1.2' }}>
            {name}
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px', fontWeight: '500' }}>
            {type}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '13px', fontWeight: '700', color: statusColor }}>
            {value} {unit}
          </div>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            Limit: {limit}
          </div>
        </div>

        <span
          style={{
            padding: '3px 10px',
            borderRadius: '999px',
            fontSize: '11px',
            fontWeight: '700',
            background: `${statusColor}18`,
            color: statusColor,
            border: `1px solid ${statusColor}30`,
            whiteSpace: 'nowrap'
          }}
        >
          {statusLabel}
        </span>

        <span
          className="hidden sm:inline"
          style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
        >
          {lastSeen}
        </span>
      </div>
    </div>
  );
}

/* ── Emergency response unit row ── */
function ResponseUnit({ name, sub, color, eta, etaLabel, icon: Icon }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
        padding: '12px 14px',
        borderRadius: '12px',
        border: `1px solid ${color}25`,
        background: `${color}08`
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxShadow: `0 4px 10px ${color}40`
          }}
        >
          <Icon style={{ width: '16px', height: '16px', color: 'white' }} />
        </div>
        <div>
          <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-primary)' }}>{name}</div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '500' }}>{sub}</div>
        </div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <div style={{ fontSize: '13px', fontWeight: '700', color: color, fontFamily: 'var(--font-mono)' }}>
          {eta}
        </div>
        <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{etaLabel}</div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   DASHBOARD PAGE
   ═══════════════════════════════════════════════════════ */
export default function Dashboard({
  currentStage,
  currentStageIndex = 4,
  onSelectStage,
  isPlaying,
  onTogglePlay,
  onReset,
  onOpenEmergencyModal,
  isSimulationOpen = false
}) {
  const [acknowledged, setAcknowledged] = useState(false);

  const riskIndex  = currentStage?.riskScore ?? 78;
  const gasPpm     = currentStage?.gas_ppm ?? 96;
  const dangerRadius = currentStage?.hazardPlumeRadiusKm ?? 1.1;

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', paddingBottom: '40px' }}>

      {/* ── Simulation Drawer ── */}
      {isSimulationOpen && (
        <div
          className="animate-slide-in-down"
          style={{
            marginBottom: '24px',
            padding: '20px',
            borderRadius: '14px',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-main)',
            boxShadow: 'var(--shadow-card)'
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              marginBottom: '16px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    padding: '8px',
                    borderRadius: '10px',
                    background: 'rgba(225,29,72,0.08)',
                    color: '#e11d48'
                  }}
                >
                  <ShieldAlert style={{ width: '16px', height: '16px' }} />
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)' }}>
                    Live Simulation Scenarios
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    Test telemetry updates, hazard radius shifts, and alert conditions across 6 stages
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  onClick={onTogglePlay}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 14px',
                    borderRadius: '10px',
                    background: '#e11d48',
                    color: 'white',
                    border: 'none',
                    fontSize: '12px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                    boxShadow: '0 4px 12px rgba(225,29,72,0.3)'
                  }}
                >
                  {isPlaying ? <Pause style={{ width: '13px', height: '13px' }} /> : <Play style={{ width: '13px', height: '13px' }} />}
                  {isPlaying ? 'Pause' : 'Auto Play'}
                </button>
                <button
                  onClick={onReset}
                  title="Reset to Baseline"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '34px',
                    height: '34px',
                    borderRadius: '10px',
                    border: '1px solid var(--border-main)',
                    background: 'var(--bg-card-subtle)',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                    transition: 'all 0.15s'
                  }}
                >
                  <RotateCcw style={{ width: '14px', height: '14px' }} />
                </button>
              </div>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
              gap: '8px'
            }}
          >
            {SIMULATION_STAGES.map((s, idx) => {
              const active = idx === currentStageIndex;
              return (
                <button
                  key={s.stage}
                  onClick={() => onSelectStage && onSelectStage(idx)}
                  style={{
                    padding: '10px 12px',
                    borderRadius: '10px',
                    border: active
                      ? '1px solid rgba(225,29,72,0.3)'
                      : '1px solid var(--border-main)',
                    background: active ? 'rgba(225,29,72,0.08)' : 'var(--bg-card-subtle)',
                    color: active ? '#e11d48' : 'var(--text-secondary)',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.15s'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', fontWeight: '700' }}>
                      Stage {s.stage}
                    </span>
                    <span
                      style={{
                        fontSize: '10px',
                        fontWeight: '700',
                        color: s.riskScore > 60 ? '#e11d48' : '#16a34a'
                      }}
                    >
                      {s.riskScore}%
                    </span>
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: '600', display: 'block' }}>
                    {s.name.split(':')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Critical Alert Banner ── */}
      <section
        aria-label="Critical Incident Alert"
        style={{
          padding: '20px 24px',
          borderRadius: '16px',
          border: '1px solid var(--alert-critical-border)',
          background: 'var(--alert-critical-bg)',
          marginBottom: '24px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', minWidth: 0 }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '14px',
              background: 'rgba(225,29,72,0.12)',
              border: '1px solid rgba(225,29,72,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <Siren style={{ width: '22px', height: '22px', color: '#e11d48' }} className="animate-pulse" />
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span
                style={{
                  padding: '3px 10px',
                  borderRadius: '999px',
                  fontSize: '10px',
                  fontWeight: '800',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  background: '#e11d48',
                  color: 'white'
                }}
              >
                CRITICAL ALERT
              </span>
              <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--alert-critical-text)', opacity: 0.8 }}>
                Tank Farm T-04 · Detected 2m ago
              </span>
            </div>
            <h2
              style={{
                fontSize: '15px',
                fontWeight: '800',
                color: 'var(--alert-critical-text)',
                lineHeight: '1.4',
                letterSpacing: '-0.01em'
              }}
            >
              Elevated Gas Levels ({gasPpm} ppm) exceeding safe operating threshold
            </h2>
            <p style={{ fontSize: '12px', color: 'var(--alert-critical-text)', opacity: 0.7, marginTop: '4px', fontWeight: '500' }}>
              Safety threshold is 60 ppm. Immediate containment protocol recommended for Zone 1 perimeter ({dangerRadius} km radius).
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          <button
            onClick={() => setAcknowledged(!acknowledged)}
            style={{
              padding: '9px 16px',
              borderRadius: '10px',
              fontSize: '12px',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.15s',
              border: acknowledged ? '1px solid rgba(22,163,74,0.3)' : '1px solid var(--border-main)',
              background: acknowledged ? 'rgba(22,163,74,0.08)' : 'var(--bg-secondary)',
              color: acknowledged ? '#16a34a' : 'var(--text-primary)'
            }}
          >
            {acknowledged ? 'Acknowledged ✓' : 'Acknowledge'}
          </button>
          <button
            onClick={onOpenEmergencyModal}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '7px',
              padding: '9px 18px',
              borderRadius: '10px',
              background: '#e11d48',
              color: 'white',
              border: 'none',
              fontSize: '12px',
              fontWeight: '800',
              letterSpacing: '0.02em',
              cursor: 'pointer',
              transition: 'all 0.15s',
              boxShadow: '0 4px 16px rgba(225,29,72,0.4)'
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#be123c'}
            onMouseLeave={e => e.currentTarget.style.background = '#e11d48'}
          >
            <AlertTriangle style={{ width: '14px', height: '14px' }} />
            Start Evacuation
          </button>
        </div>
      </section>

      {/* ── KPI Grid ── */}
      <section
        aria-label="Key Performance Indicators"
        className="kpi-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '24px'
        }}
      >
        <StatCard
          label="Overall Risk Score"
          value={riskIndex}
          unit="/ 100"
          sub="Stage 4 Elevated Status"
          icon={AlertTriangle}
          iconColor="#e11d48"
          subColor="#e11d48"
          accent="#e11d48"
        />
        <StatCard
          label="Active Sensors"
          value={142}
          unit="/ 148"
          sub="96% Operational (6 Offline)"
          icon={Radio}
          iconColor="#22c55e"
          subColor="#16a34a"
        />
        <StatCard
          label="Open Anomalies"
          value={3}
          unit="total"
          sub="1 Critical · 2 Minor"
          icon={Search}
          iconColor="#f59e0b"
          subColor="#d97706"
        />
        <StatCard
          label="Population at Risk"
          value="3,400"
          unit="civs"
          sub="Within 1.5 km perimeter"
          icon={Users}
          iconColor="#64748b"
          subColor="var(--text-secondary)"
        />
      </section>

      {/* ── Main 2-Col Grid ── */}
      <div
        className="dashboard-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)',
          gap: '24px'
        }}
      >
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', minWidth: 0 }}>
          {/* Sensor Trends Chart */}
          <section className="theme-card" style={{ padding: '24px' }} aria-label="Sensor Telemetry Trends">
            <HazardTrendsChart currentPpm={gasPpm} />
          </section>

          {/* Sensor Nodes */}
          <section className="theme-card" style={{ padding: '24px' }} aria-label="Monitored Sensor Nodes">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '16px'
              }}
            >
              <div>
                <h3 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
                  Monitored Sensor Nodes
                </h3>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '3px', fontWeight: '500' }}>
                  Live telemetry stream across critical plant points
                </p>
              </div>
              <Link
                to="/sensors"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '12px',
                  fontWeight: '700',
                  color: '#0d9488',
                  textDecoration: 'none',
                  transition: 'opacity 0.15s'
                }}
              >
                View All (148)
                <ChevronRight style={{ width: '14px', height: '14px' }} />
              </Link>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <SensorNode
                name="Tank Farm T-04"
                type="Toxic VOC & Gas Sensor"
                value={gasPpm}
                unit="ppm"
                limit="60 ppm"
                icon={Flame}
                iconBg="rgba(225,29,72,0.10)"
                statusColor="#e11d48"
                statusLabel="Critical"
                lastSeen="2s ago"
              />
              <SensorNode
                name="Reactor R-02"
                type="Core Temperature Monitor"
                value="61"
                unit="°C"
                limit="65°C"
                icon={Thermometer}
                iconBg="rgba(245,158,11,0.10)"
                statusColor="#f59e0b"
                statusLabel="Warning"
                lastSeen="14s ago"
              />
              <SensorNode
                name="Pipeline P-11"
                type="Pressure & Differential Flow"
                value="5.4"
                unit="bar"
                limit="6.0 bar"
                icon={Gauge}
                iconBg="rgba(13,148,136,0.10)"
                statusColor="#0d9488"
                statusLabel="Normal"
                lastSeen="45s ago"
              />
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', minWidth: 0 }}>
          {/* Hazard Zone Overview */}
          <section className="theme-card" style={{ padding: '24px' }} aria-label="Hazard Zone Overview">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
                  Hazard Zone
                </h3>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '3px', fontWeight: '500' }}>
                  Perimeter dispersion radius
                </p>
              </div>
              <span
                style={{
                  padding: '4px 10px',
                  borderRadius: '999px',
                  fontSize: '11px',
                  fontWeight: '700',
                  background: 'rgba(225,29,72,0.10)',
                  color: '#e11d48',
                  border: '1px solid rgba(225,29,72,0.2)'
                }}
              >
                Active Plume
              </span>
            </div>
            <HazardRadarView
              unit="Tank Farm T-04"
              dangerRadius={dangerRadius}
              bufferRadius={1.5}
              gasPpm={gasPpm}
              windSpeed={14}
              windDirection="SE"
            />
          </section>

          {/* Emergency Response */}
          <section className="theme-card" style={{ padding: '24px' }} aria-label="Emergency Response">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
                  Emergency Response
                </h3>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '3px', fontWeight: '500' }}>
                  On-site containment & protocols
                </p>
              </div>
              <span
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: '#22c55e',
                  display: 'block'
                }}
                className="animate-pulse"
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <ResponseUnit
                name="Hazmat Squad 02"
                sub="Dispatched via Gate B"
                color="#e11d48"
                eta="ETA 4m"
                etaLabel="En Route"
                icon={Shield}
              />
              <ResponseUnit
                name="NDRF Quick Response"
                sub="Assembly Node 1"
                color="#2563eb"
                eta="ETA 12m"
                etaLabel="Standby"
                icon={ShieldAlert}
              />
            </div>

            <button
              onClick={onOpenEmergencyModal}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                width: '100%',
                marginTop: '16px',
                padding: '11px',
                borderRadius: '12px',
                background: 'rgba(225,29,72,0.08)',
                border: '1px dashed rgba(225,29,72,0.3)',
                color: '#e11d48',
                fontSize: '13px',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.15s'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(225,29,72,0.14)';
                e.currentTarget.style.borderStyle = 'solid';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(225,29,72,0.08)';
                e.currentTarget.style.borderStyle = 'dashed';
              }}
            >
              <Siren style={{ width: '15px', height: '15px' }} />
              Trigger Emergency Protocol
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
