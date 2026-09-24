import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, ArrowRight, Eye, EyeOff, Lock } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('Plant Safety Officer');
  const [industryId, setIndustryId] = useState('IND-CHEM-ALPHA-01');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const roles = [
    { title: 'Plant Safety Officer', badge: 'Facility Alpha', desc: 'Direct IoT sensor telemetry & containment control' },
    { title: 'NDRF Incident Commander', badge: '5th Battalion', desc: 'Evacuation coordination & tactical relocation dispatch' },
    { title: 'District Disaster Magistrate', badge: 'Kurla District', desc: 'Statutory Red Zone declaration & public alert authority' }
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    // Security & Input Validation: sanitize inputs
    const trimmedId = industryId.trim();
    if (!trimmedId) {
      setErrorMessage('Facility ID is required.');
      return;
    }
    if (password.length < 4) {
      setErrorMessage('Security token must be at least 4 characters.');
      return;
    }
    setErrorMessage('');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center p-4">
      <main className="max-w-md w-full glass-card p-8 relative border border-cyan-500/30">
        <div className="text-center mb-6">
          <div className="inline-flex p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 mb-3">
            <ShieldAlert className="w-10 h-10" aria-hidden="true" />
          </div>
          <h1 className="text-2xl font-black tracking-wider text-[var(--text-primary)]">SANRAKSHAK</h1>
          <p className="text-xs uppercase tracking-widest text-cyan-600 dark:text-cyan-400 font-bold mt-1">
            Industrial Hazard Prediction & Early Warning
          </p>
          <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border border-[var(--border-main)]">
            SIH Problem Statement 26191
          </span>
        </div>

        {errorMessage && (
          <div
            className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs font-semibold"
            role="alert"
          >
            {errorMessage}
          </div>
        )}

        {/* Role Quick Selector */}
        <fieldset className="mb-6 space-y-2 border-0 p-0 m-0">
          <legend className="text-xs text-[var(--text-secondary)] font-semibold block uppercase tracking-wider mb-2">
            Select Operational Persona
          </legend>
          <div className="space-y-1.5">
            {roles.map((r) => (
              <button
                key={r.title}
                type="button"
                onClick={() => setSelectedRole(r.title)}
                className={`w-full p-2.5 rounded-lg border text-left text-xs transition-all cursor-pointer flex items-center justify-between focus-visible:outline-2 focus-visible:outline-cyan-500 ${
                  selectedRole === r.title
                    ? 'bg-cyan-500/20 border-cyan-500 text-cyan-600 dark:text-cyan-300 font-bold'
                    : 'bg-[var(--bg-card-subtle)] border-[var(--border-main)] text-[var(--text-secondary)] hover:border-[var(--border-highlight)]'
                }`}
                aria-pressed={selectedRole === r.title}
              >
                <div>
                  <div className="text-[var(--text-primary)] font-semibold">{r.title}</div>
                  <div className="text-[10px] text-[var(--text-muted)]">{r.desc}</div>
                </div>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--bg-tertiary)] text-[var(--text-secondary)] font-mono">
                  {r.badge}
                </span>
              </button>
            ))}
          </div>
        </fieldset>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4" noValidate>
          <div>
            <label htmlFor="facility-id" className="text-xs text-[var(--text-primary)] font-semibold block mb-1">
              Industrial Facility ID
            </label>
            <input
              id="facility-id"
              type="text"
              required
              value={industryId}
              onChange={(e) => setIndustryId(e.target.value)}
              className="w-full bg-[var(--bg-secondary)] border border-[var(--border-main)] rounded-lg px-3 py-2 text-xs text-[var(--text-primary)] focus:outline-none focus:border-cyan-500 font-mono"
              placeholder="e.g. IND-CHEM-ALPHA-01"
              aria-label="Industrial Facility ID"
            />
          </div>

          <div>
            <label htmlFor="auth-token" className="text-xs text-[var(--text-primary)] font-semibold block mb-1">
              Security Authorization Token
            </label>
            <div className="relative">
              <input
                id="auth-token"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[var(--bg-secondary)] border border-[var(--border-main)] rounded-lg px-3 py-2 text-xs text-[var(--text-primary)] focus:outline-none focus:border-cyan-500 font-mono pr-10"
                aria-label="Security Authorization Token"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)] p-1 rounded"
                aria-label={showPassword ? 'Hide token' : 'Show token'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-cyan-600/30 flex items-center justify-center gap-2 mt-4 focus-visible:outline-2 focus-visible:outline-cyan-500"
          >
            <span>Access Command Portal</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </form>
      </main>
    </div>
  );
}
