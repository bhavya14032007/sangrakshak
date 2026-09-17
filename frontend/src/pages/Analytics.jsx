import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';
import { BarChart3, TrendingUp, Bell } from 'lucide-react';

export default function Analytics({ currentStage }) {
  const [timeRange, setTimeRange] = useState('24h');

  const multiSensorTrend = [
    { time: '00:00', gas: 130, temp: 35, risk: 15 },
    { time: '04:00', gas: 135, temp: 36, risk: 16 },
    { time: '08:00', gas: 145, temp: 38, risk: 18 },
    { time: '12:00', gas: 180, temp: 44, risk: 32 },
    { time: '16:00', gas: currentStage?.gas_ppm || 430, temp: currentStage?.temperature || 76, risk: currentStage?.riskScore || 78 },
    { time: '20:00 (Proj)', gas: Math.min(600, (currentStage?.gas_ppm || 430) * 1.1), temp: Math.min(100, (currentStage?.temperature || 76) * 1.05), risk: Math.min(100, (currentStage?.riskScore || 78) * 1.1) },
  ];

  const zoneVulnerabilityComparison = [
    { zone: 'Zone A', population: 2800, capacity: 1500, riskIndex: currentStage?.redZones?.includes('ZONE-A') ? 95 : 30 },
    { zone: 'Zone B', population: 3450, capacity: 2000, riskIndex: currentStage?.redZones?.includes('ZONE-B') ? 90 : 35 },
    { zone: 'Zone C', population: 860, capacity: 700, riskIndex: 20 },
    { zone: 'Zone D', population: 1240, capacity: 800, riskIndex: 18 },
    { zone: 'Zone E', population: 1950, capacity: 1800, riskIndex: 15 },
    { zone: 'Zone F', population: 420, capacity: 400, riskIndex: currentStage?.affectedZones?.includes('ZONE-F') ? 65 : 25 },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="theme-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            Cross-Correlation Industrial Telemetry Analytics & Alerts
          </h2>
          <p className="text-xs text-[var(--text-secondary)] mt-1">
            Multi-variate regression and historical trend analysis detecting coupled thermal-pressure runaway conditions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {['1h', '6h', '24h', '7d'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                timeRange === range
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-[var(--bg-card-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-main)]'
              }`}
            >
              {range.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Multi Sensor Trend Chart */}
      <div className="theme-card p-6">
        <h3 className="text-sm font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-blue-600" />
          Multi-Sensor Cross-Variable Correlation (Gas vs Temp vs Hazard Risk)
        </h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={multiSensorTrend} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-main)" opacity={0.6} />
              <XAxis dataKey="time" stroke="var(--text-muted)" fontSize={11} />
              <YAxis stroke="var(--text-muted)" fontSize={11} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border-main)',
                  borderRadius: '12px',
                  fontSize: '12px',
                  boxShadow: 'var(--shadow-elevated)',
                  color: 'var(--text-primary)'
                }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <Line type="monotone" dataKey="risk" name="Hazard Risk Index (%)" stroke="#dc2626" strokeWidth={3} />
              <Line type="monotone" dataKey="gas" name="Gas Concentration (ppm)" stroke="#0284c7" strokeWidth={2} />
              <Line type="monotone" dataKey="temp" name="Core Vessel Temp (°C)" stroke="#ea580c" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Population Density vs Risk Distribution */}
      <div className="theme-card p-6">
        <h3 className="text-sm font-bold text-[var(--text-primary)] mb-4">
          Habitation Sector Carrying Overload vs Risk Index
        </h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={zoneVulnerabilityComparison} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-main)" opacity={0.6} />
              <XAxis dataKey="zone" stroke="var(--text-muted)" fontSize={11} />
              <YAxis stroke="var(--text-muted)" fontSize={11} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border-main)',
                  borderRadius: '12px',
                  fontSize: '12px',
                  boxShadow: 'var(--shadow-elevated)',
                  color: 'var(--text-primary)'
                }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <Bar dataKey="population" name="Total Population" fill="#2563eb" radius={[6, 6, 0, 0]} />
              <Bar dataKey="capacity" name="Safe Carrying Capacity" fill="#16a34a" radius={[6, 6, 0, 0]} />
              <Bar dataKey="riskIndex" name="Calculated Risk Score (%)" fill="#dc2626" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
