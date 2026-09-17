import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Sun,
  Moon,
  FileDown,
  ChevronDown,
  Sliders,
  Check,
  Menu,
  Shield,
  LayoutDashboard,
  Radio,
  TrendingUp,
  Map,
  Bell,
  AlertTriangle,
  Settings
} from 'lucide-react';
import { NAV_ITEMS } from './Sidebar';

export default function Header({
  currentStage,
  selectedUnit = 'Unit A — Petrochem',
  onSelectUnit,
  onOpenReportModal,
  isSimulationOpen,
  onToggleSimulation,
  onToggleMobileNav
}) {
  const [theme, setTheme] = useState(() => localStorage.getItem('sentinel_theme') || 'light');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScreenMenuOpen, setIsScreenMenuOpen] = useState(false);
  const [secondsAgo, setSecondsAgo] = useState(12);
  const dropdownRef = useRef(null);
  const screenMenuRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();

  const currentNav = NAV_ITEMS.find(item => item.path === location.pathname) || NAV_ITEMS[0];

  const units = [
    'Tank Farm T-04',
    'Unit A — Petrochem',
    'Unit B — Refineries & Cracker',
    'Zone C — Polymer Synthesis'
  ];

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('sentinel_theme', theme);
  }, [theme]);

  // Live timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsAgo(prev => (prev >= 59 ? 5 : prev + 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
      if (screenMenuRef.current && !screenMenuRef.current.contains(e.target)) {
        setIsScreenMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const toggleTheme = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'));

  // ---- Inline style tokens for brevity ----
  const btnBase = {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 12px',
    borderRadius: '10px',
    fontSize: '12px',
    fontWeight: '600',
    border: '1px solid var(--border-main)',
    background: 'var(--bg-secondary)',
    color: 'var(--text-secondary)',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    whiteSpace: 'nowrap'
  };

  const iconBtnBase = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '36px',
    height: '36px',
    borderRadius: '10px',
    border: '1px solid var(--border-main)',
    background: 'var(--bg-secondary)',
    color: 'var(--text-secondary)',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    flexShrink: 0
  };

  return (
    <header
      style={{
        height: '64px',
        padding: '0 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid var(--border-main)',
        background: 'var(--bg-header)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        position: 'sticky',
        top: 0,
        zIndex: 30,
        gap: '12px',
        transition: 'background-color 0.3s ease'
      }}
    >
      {/* ── Left Area ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
        {/* Mobile hamburger */}
        <button
          onClick={onToggleMobileNav}
          className="lg:hidden"
          aria-label="Open navigation menu"
          style={{
            ...iconBtnBase,
            color: 'var(--text-primary)'
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-tertiary)'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--bg-secondary)'}
        >
          <Menu style={{ width: '18px', height: '18px' }} />
        </button>

        {/* Mobile screen switcher */}
        <div className="lg:hidden" ref={screenMenuRef} style={{ position: 'relative' }}>
          <button
            onClick={() => setIsScreenMenuOpen(!isScreenMenuOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 10px',
              borderRadius: '10px',
              border: '1px solid rgba(225,29,72,0.25)',
              background: 'rgba(225,29,72,0.06)',
              color: 'var(--color-accent-red)',
              fontSize: '12px',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.15s'
            }}
          >
            <currentNav.icon style={{ width: '14px', height: '14px' }} />
            <span>{currentNav.label}</span>
            <ChevronDown
              style={{
                width: '12px',
                height: '12px',
                transition: 'transform 0.2s',
                transform: isScreenMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)'
              }}
            />
          </button>

          {isScreenMenuOpen && (
            <div
              className="animate-slide-in-down"
              style={{
                position: 'absolute',
                left: 0,
                top: 'calc(100% + 8px)',
                width: '220px',
                borderRadius: '14px',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-main)',
                boxShadow: 'var(--shadow-elevated)',
                padding: '6px',
                zIndex: 50
              }}
            >
              <div
                style={{
                  padding: '4px 8px 8px',
                  fontSize: '10px',
                  fontWeight: '700',
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em'
                }}
              >
                Switch Screen
              </div>
              {NAV_ITEMS.map(item => {
                const Icon = item.icon;
                const isCurrent = location.pathname === item.path;
                return (
                  <button
                    key={item.path}
                    onClick={() => { navigate(item.path); setIsScreenMenuOpen(false); }}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '9px 10px',
                      borderRadius: '9px',
                      border: 'none',
                      background: isCurrent ? 'rgba(225,29,72,0.08)' : 'transparent',
                      color: isCurrent ? 'var(--color-accent-red)' : 'var(--text-secondary)',
                      fontSize: '13px',
                      fontWeight: isCurrent ? '700' : '500',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'background 0.1s'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Icon style={{ width: '14px', height: '14px' }} />
                      <span>{item.label}</span>
                    </div>
                    {isCurrent && <Check style={{ width: '13px', height: '13px' }} />}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Desktop title */}
        <div className="hidden lg:flex" style={{ flexDirection: 'column', justifyContent: 'center' }}>
          <h1
            style={{
              fontSize: '16px',
              fontWeight: '800',
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
              lineHeight: '1.2'
            }}
          >
            Monitoring Dashboard
          </h1>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              marginTop: '2px',
              fontSize: '11px',
              fontWeight: '500',
              color: 'var(--text-secondary)'
            }}
          >
            <span
              style={{
                position: 'relative',
                display: 'inline-flex',
                width: '8px',
                height: '8px'
              }}
            >
              <span
                className="animate-ping"
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  background: '#22c55e',
                  opacity: 0.7
                }}
              />
              <span
                style={{
                  position: 'relative',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#22c55e'
                }}
              />
            </span>
            <span style={{ color: '#16a34a', fontWeight: '700' }}>Live</span>
            <span style={{ color: 'var(--border-highlight)' }}>·</span>
            <span>Kandla Industrial Cluster</span>
            <span style={{ color: 'var(--border-highlight)' }}>·</span>
            <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '10px' }}>
              {secondsAgo}s ago
            </span>
          </div>
        </div>
      </div>

      {/* ── Right Controls ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
        {/* Simulation Toggle */}
        <button
          onClick={onToggleSimulation}
          title="Toggle Simulation Scenario Controller"
          style={{
            ...btnBase,
            background: isSimulationOpen ? '#e11d48' : 'var(--bg-secondary)',
            color: isSimulationOpen ? 'white' : 'var(--text-secondary)',
            borderColor: isSimulationOpen ? '#e11d48' : 'var(--border-main)',
            boxShadow: isSimulationOpen ? '0 4px 14px rgba(225,29,72,0.35)' : 'none'
          }}
        >
          <Sliders style={{ width: '13px', height: '13px' }} />
          <span className="hidden sm:inline">Stage {currentStage?.stage ?? 4}</span>
        </button>

        {/* Unit Selector */}
        <div className="hidden md:block" ref={dropdownRef} style={{ position: 'relative' }}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            style={{
              ...btnBase,
              color: 'var(--text-primary)',
              maxWidth: '180px'
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-highlight)'}
            onMouseLeave={e => { if (!isDropdownOpen) e.currentTarget.style.borderColor = 'var(--border-main)'; }}
          >
            <span
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
            >
              {selectedUnit}
            </span>
            <ChevronDown
              style={{
                width: '13px',
                height: '13px',
                flexShrink: 0,
                color: 'var(--text-muted)',
                transition: 'transform 0.2s',
                transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)'
              }}
            />
          </button>

          {isDropdownOpen && (
            <div
              className="animate-slide-in-down"
              style={{
                position: 'absolute',
                right: 0,
                top: 'calc(100% + 8px)',
                width: '240px',
                borderRadius: '14px',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-main)',
                boxShadow: 'var(--shadow-elevated)',
                padding: '6px',
                zIndex: 50
              }}
            >
              <div
                style={{
                  padding: '4px 8px 8px',
                  fontSize: '10px',
                  fontWeight: '700',
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em'
                }}
              >
                Select Industrial Unit
              </div>
              {units.map(u => (
                <button
                  key={u}
                  onClick={() => { if (onSelectUnit) onSelectUnit(u); setIsDropdownOpen(false); }}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '9px 10px',
                    borderRadius: '9px',
                    border: 'none',
                    background: selectedUnit === u ? 'rgba(225,29,72,0.08)' : 'transparent',
                    color: selectedUnit === u ? 'var(--color-accent-red)' : 'var(--text-secondary)',
                    fontSize: '12px',
                    fontWeight: selectedUnit === u ? '700' : '500',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'background 0.1s'
                  }}
                >
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {u}
                  </span>
                  {selectedUnit === u && <Check style={{ width: '13px', height: '13px', flexShrink: 0 }} />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Report Button */}
        <button
          onClick={onOpenReportModal}
          title="Generate Compliance Report"
          className="hidden sm:flex"
          style={{
            ...btnBase,
            color: 'var(--text-primary)'
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-highlight)'}
          onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-main)'}
        >
          <FileDown style={{ width: '13px', height: '13px', color: 'var(--text-muted)' }} />
          <span>Report</span>
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          aria-label="Toggle Theme"
          style={iconBtnBase}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'var(--bg-tertiary)';
            e.currentTarget.style.color = 'var(--text-primary)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'var(--bg-secondary)';
            e.currentTarget.style.color = 'var(--text-secondary)';
          }}
        >
          {theme === 'dark' ? (
            <Sun style={{ width: '16px', height: '16px', color: '#f59e0b' }} />
          ) : (
            <Moon style={{ width: '16px', height: '16px' }} />
          )}
        </button>
      </div>
    </header>
  );
}
