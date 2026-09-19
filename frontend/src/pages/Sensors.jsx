import React, { useState } from 'react';
import { 
  Cpu, 
  Wifi, 
  Battery, 
  CheckCircle2, 
  AlertTriangle, 
  Activity, 
  Radio, 
  Gauge, 
  Thermometer, 
  Wind, 
  Zap, 
  SlidersHorizontal,
  Search,
  RefreshCw,
  ShieldCheck,
  Flame
} from 'lucide-react';

export default function Sensors({ sensors = [], currentStage = {} }) {
  const [filter, setFilter] = useState('ALL'); // 'ALL' | 'ALARM' | 'NORMAL'
  const [searchQuery, setSearchQuery] = useState('');

  // Calculate live values and status for each sensor
  const processedSensors = sensors.map((s) => {
    let val = s.value;
    if (s.type === 'gas_ppm' && currentStage.gas_ppm !== undefined) val = currentStage.gas_ppm;
    if (s.type === 'temperature' && currentStage.temperature !== undefined) val = currentStage.temperature;
    if (s.type === 'pressure' && currentStage.pressure !== undefined) val = currentStage.pressure;
    if (s.type === 'vibration' && currentStage.vibration !== undefined) val = currentStage.vibration;
    if (s.type === 'wind_speed' && currentStage.wind_speed !== undefined) val = currentStage.wind_speed;
    if (s.type === 'wind_direction' && currentStage.wind_direction !== undefined) val = currentStage.wind_direction;

    const isCritical = typeof val === 'number' && s.criticalMax !== undefined ? val >= s.criticalMax : false;
    const isWarning = typeof val === 'number' && s.normalMax !== undefined && !isCritical ? val > s.normalMax : false;

    // Calculate percentage fill within normal-to-critical range
    const min = s.normalMin ?? 0;
    const max = s.criticalMax ?? (s.normalMax ? s.normalMax * 1.5 : 100);
    const rangePercent = Math.min(Math.max(((val - min) / (max - min)) * 100, 4), 100);

    return {
      ...s,
      currentValue: val,
      isCritical,
      isWarning,
      rangePercent
    };
  });

  // Filter and search
  const filteredSensors = processedSensors.filter((s) => {
    const matchesFilter = 
      filter === 'ALL' ? true :
      filter === 'ALARM' ? (s.isCritical || s.isWarning) :
      filter === 'NORMAL' ? (!s.isCritical && !s.isWarning) : true;

    const matchesSearch = 
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.location.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const alarmCount = processedSensors.filter(s => s.isCritical).length;
  const warningCount = processedSensors.filter(s => s.isWarning).length;
  const normalCount = processedSensors.length - alarmCount - warningCount;

  // Icon helper based on sensor type
  const getSensorIcon = (type) => {
    switch (type) {
      case 'gas_ppm':
      case 'voc':
        return <Flame className="w-4 h-4 text-amber-500" />;
      case 'temperature':
        return <Thermometer className="w-4 h-4 text-red-500" />;
      case 'pressure':
        return <Gauge className="w-4 h-4 text-blue-500" />;
      case 'wind_speed':
      case 'wind_direction':
        return <Wind className="w-4 h-4 text-cyan-500" />;
      case 'vibration':
        return <Zap className="w-4 h-4 text-purple-500" />;
      default:
        return <Activity className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <section className="max-w-7xl mx-auto space-y-6 pb-12" aria-labelledby="sensors-page-title">
      {/* Top Header Card */}
      <header className="theme-card p-6 md:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-600/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
                <Cpu className="w-6 h-6" />
              </div>
              <div>
                <h1 id="sensors-page-title" className="text-xl md:text-2xl font-bold tracking-tight text-[var(--text-primary)]">
                  Industrial IoT Sensor Nodes & Mesh Health
                </h1>
                <p className="text-sm text-[var(--text-secondary)] mt-0.5">
                  Real-time telemetry diagnostics, battery voltage, signal strength (RSSI), and calibration status across deployed field units.
                </p>
              </div>
            </div>
          </div>

          {/* Gateway Status Badge */}
          <div className="flex items-center gap-3 self-start lg:self-center px-4 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 shrink-0">
            <Radio className="w-4 h-4 text-emerald-600 dark:text-emerald-400 animate-pulse" />
            <div className="text-xs">
              <span className="font-semibold block">LoRaWAN Mesh Gateway</span>
              <span className="text-[11px] opacity-80">100% Packet Delivery • 868 MHz</span>
            </div>
          </div>
        </div>

        {/* Quick Summary Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-[var(--border-main)]">
          <div className="p-3.5 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-main)] flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-medium text-[var(--text-secondary)] block">Total Nodes</span>
              <span className="text-lg font-bold font-mono text-[var(--text-primary)]">{processedSensors.length} Deployed</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-main)] flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-medium text-[var(--text-secondary)] block">Nominal State</span>
              <span className="text-lg font-bold font-mono text-emerald-600 dark:text-emerald-400">{normalCount} Units</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-main)] flex items-center gap-3">
            <div className="p-2 rounded-lg bg-red-500/10 text-red-600 dark:text-red-400">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-medium text-[var(--text-secondary)] block">Critical / Alarm</span>
              <span className="text-lg font-bold font-mono text-red-600 dark:text-red-400">{alarmCount} Triggered</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-main)] flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
              <Wifi className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-medium text-[var(--text-secondary)] block">Avg Signal (RSSI)</span>
              <span className="text-lg font-bold font-mono text-[var(--text-primary)]">-64 dBm</span>
            </div>
          </div>
        </div>
      </header>

      {/* Control Bar: Filters & Search */}
      <nav className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4" aria-label="Sensor Filters">
        <div className="flex items-center gap-2 bg-[var(--bg-card)] p-1.5 rounded-xl border border-[var(--border-main)]">
          <button
            onClick={() => setFilter('ALL')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filter === 'ALL'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            All Nodes ({processedSensors.length})
          </button>
          <button
            onClick={() => setFilter('ALARM')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              filter === 'ALARM'
                ? 'bg-red-600 text-white shadow-sm'
                : 'text-[var(--text-secondary)] hover:text-red-500'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></span>
            Alarms ({alarmCount + warningCount})
          </button>
          <button
            onClick={() => setFilter('NORMAL')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filter === 'NORMAL'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-[var(--text-secondary)] hover:text-emerald-500'
            }`}
          >
            Normal ({normalCount})
          </button>
        </div>

        {/* Search Field */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
          <input
            type="text"
            placeholder="Search node, location, ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[var(--bg-card)] border border-[var(--border-main)] rounded-xl text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
          />
        </div>
      </nav>

      {/* Sensor Node Cards Grid with 24px/32px spacing */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredSensors.map((s) => {
          const isCritical = s.isCritical;
          const isWarning = s.isWarning;

          return (
            <article 
              key={s.id} 
              className={`theme-card p-6 flex flex-col justify-between transition-all hover:shadow-lg ${
                isCritical ? 'border-red-500/40 ring-1 ring-red-500/20' : ''
              }`}
            >
              {/* Card Header */}
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`p-2.5 rounded-xl shrink-0 ${
                      isCritical 
                        ? 'bg-red-500/10 text-red-600 dark:text-red-400' 
                        : 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                    }`}>
                      {getSensorIcon(s.type)}
                    </div>
                    <div className="min-w-0">
                      <h2 className="text-sm font-bold text-[var(--text-primary)] truncate" title={s.name}>
                        {s.name}
                      </h2>
                      <p className="text-xs text-[var(--text-secondary)] font-mono truncate mt-0.5">
                        <span className="font-semibold text-blue-600 dark:text-blue-400">{s.id}</span> • {s.location}
                      </p>
                    </div>
                  </div>

                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider shrink-0 ${
                    isCritical 
                      ? 'bg-red-100 text-red-700 border border-red-200 dark:bg-red-950/60 dark:text-red-400 dark:border-red-800' 
                      : isWarning
                      ? 'bg-amber-100 text-amber-700 border border-amber-200 dark:bg-amber-950/60 dark:text-amber-400 dark:border-amber-800'
                      : 'bg-emerald-100 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-400 dark:border-emerald-800'
                  }`}>
                    {isCritical ? 'CRITICAL ALARM' : isWarning ? 'WARNING' : 'ONLINE'}
                  </span>
                </div>

                {/* Primary Reading Box */}
                <div className="p-4 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-main)] space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[var(--text-secondary)]">
                      Current Telemetry
                    </span>
                    <span className="text-[10px] font-mono text-[var(--text-secondary)]">
                      Rate: 1.0s / 0ms lag
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between gap-2">
                    <div className={`text-2xl sm:text-3xl font-black font-mono tracking-tight ${
                      isCritical ? 'text-red-600 dark:text-red-400' : 'text-[var(--text-primary)]'
                    }`}>
                      {typeof s.currentValue === 'number' ? s.currentValue.toFixed(1) : s.currentValue}
                      <span className="text-sm font-semibold ml-1 text-[var(--text-secondary)]">
                        {s.unit}
                      </span>
                    </div>

                    <div className="text-right text-[11px] font-mono text-[var(--text-muted)]">
                      <span>Max Safe: {s.normalMax ?? '--'} {s.unit}</span>
                    </div>
                  </div>

                  {/* Range visual indicator bar */}
                  <div className="space-y-1 pt-1">
                    <div className="w-full bg-[var(--border-subtle)] h-2 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          isCritical 
                            ? 'bg-red-500' 
                            : isWarning 
                            ? 'bg-amber-500' 
                            : 'bg-emerald-500'
                        }`}
                        style={{ width: `${s.rangePercent}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] font-mono text-[var(--text-muted)] px-0.5">
                      <span>{s.normalMin ?? 0}</span>
                      <span>Threshold: {s.criticalMax ?? s.normalMax ?? '--'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer: Diagnostics & Mesh Health */}
              <footer className="grid grid-cols-3 gap-2 pt-4 mt-4 border-t border-[var(--border-main)] text-xs font-mono text-[var(--text-secondary)]">
                <div className="flex items-center gap-1.5" title="Battery Voltage & Charge">
                  <Battery className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span className="text-[11px] font-medium">98% Batt</span>
                </div>
                <div className="flex items-center gap-1.5" title="Mesh Signal Strength">
                  <Wifi className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span className="text-[11px] font-medium">-64 dBm</span>
                </div>
                <div className="text-right text-[11px] text-[var(--text-primary)] font-semibold" title="Calibration status">
                  <span>Cal: 2d ago</span>
                </div>
              </footer>
            </article>
          );
        })}
      </div>

      {filteredSensors.length === 0 && (
        <div className="theme-card p-12 text-center space-y-3">
          <Activity className="w-10 h-10 text-[var(--text-muted)] mx-auto" />
          <h3 className="text-base font-bold text-[var(--text-primary)]">No sensor nodes found</h3>
          <p className="text-xs text-[var(--text-secondary)]">
            No sensor matched your filter query "{searchQuery}". Try clearing your search.
          </p>
        </div>
      )}
    </section>
  );
}

