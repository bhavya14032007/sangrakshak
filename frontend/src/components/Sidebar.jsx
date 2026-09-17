import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Radio, 
  TrendingUp, 
  Map, 
  Bell, 
  AlertTriangle, 
  Settings,
  Shield,
  RotateCw,
  MessageSquare,
  X
} from 'lucide-react';

export const NAV_ITEMS = [
  { path: '/',               label: 'Dashboard',    icon: LayoutDashboard },
  { path: '/sensors',        label: 'Live Sensors', icon: Radio },
  { path: '/risk-detection', label: 'Risk Analysis',icon: TrendingUp },
  { path: '/hazard-mapping', label: 'Impact Zones', icon: Map },
  { path: '/analytics',      label: 'Alerts',       icon: Bell, badge: '3' },
  { path: '/relocation',     label: 'Evacuation',   icon: AlertTriangle },
  { path: '/system-health',  label: 'Settings',     icon: Settings },
];

export default function Sidebar({ isOpenMobile, onCloseMobile }) {
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);

  const sidebarContent = (
    <div className="flex flex-col h-full" style={{ background: 'var(--bg-sidebar)' }}>
      {/* ── Brand Header ── */}
      <div
        style={{
          padding: '24px 20px 20px',
          borderBottom: '1px solid var(--border-main)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Logo mark with gradient */}
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #e11d48 0%, #9f1239 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 4px 12px rgba(225,29,72,0.35)'
            }}
          >
            <Shield style={{ width: '20px', height: '20px', color: 'white' }} />
          </div>

          <div>
            <div
              style={{
                fontSize: '15px',
                fontWeight: '800',
                letterSpacing: '-0.02em',
                color: 'var(--text-primary)',
                lineHeight: '1.2'
              }}
            >
              Sangrakshak
            </div>
            <div
              style={{
                fontSize: '11px',
                fontWeight: '600',
                color: 'var(--text-muted)',
                marginTop: '1px',
                letterSpacing: '0.02em'
              }}
            >
              Hazard Watch · AI
            </div>
          </div>
        </div>

        {/* Mobile close button */}
        <button
          onClick={onCloseMobile}
          className="lg:hidden"
          aria-label="Close navigation"
          style={{
            padding: '6px',
            borderRadius: '8px',
            color: 'var(--text-secondary)',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.15s'
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-tertiary)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          <X style={{ width: '18px', height: '18px' }} />
        </button>
      </div>

      {/* ── Navigation ── */}
      <nav
        style={{ padding: '16px 12px', flex: 1, overflowY: 'auto' }}
        aria-label="Main Navigation"
      >
        <div
          style={{
            fontSize: '10px',
            fontWeight: '700',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            padding: '0 8px',
            marginBottom: '8px'
          }}
        >
          Navigation
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `nav-link-item ${isActive ? 'nav-link-active' : ''}`
                }
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 12px',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  fontSize: '13px',
                  fontWeight: isActive ? '700' : '500',
                  color: isActive ? 'var(--color-accent-red)' : 'var(--text-secondary)',
                  background: isActive
                    ? 'rgba(225,29,72,0.08)'
                    : 'transparent',
                  border: isActive
                    ? '1px solid rgba(225,29,72,0.15)'
                    : '1px solid transparent',
                  transition: 'all 0.15s ease',
                  position: 'relative'
                })}
              >
                {({ isActive }) => (
                  <>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Icon
                        style={{
                          width: '16px',
                          height: '16px',
                          flexShrink: 0,
                          color: isActive ? 'var(--color-accent-red)' : 'var(--text-muted)'
                        }}
                      />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span
                        style={{
                          padding: '2px 7px',
                          borderRadius: '999px',
                          fontSize: '10px',
                          fontWeight: '800',
                          background: 'var(--color-accent-red)',
                          color: 'white',
                          lineHeight: '1.4'
                        }}
                      >
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* ── Bottom Controls ── */}
      <div style={{ padding: '12px', borderTop: '1px solid var(--border-main)' }}>
        {/* Toggle controls card */}
        <div
          style={{
            background: 'var(--bg-card-subtle)',
            border: '1px solid var(--border-main)',
            borderRadius: '12px',
            padding: '12px 14px',
            marginBottom: '10px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}
        >
          {/* Auto-refresh */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
              <RotateCw style={{ width: '13px', height: '13px', color: 'var(--text-muted)' }} />
              <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-primary)' }}>
                Auto-refresh
              </span>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={autoRefresh}
                onChange={e => setAutoRefresh(e.target.checked)}
                aria-label="Toggle auto refresh"
              />
              <span className="slider" />
            </label>
          </div>

          {/* SMS Alerts */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
              <MessageSquare style={{ width: '13px', height: '13px', color: 'var(--text-muted)' }} />
              <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-primary)' }}>
                SMS Alerts
              </span>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={smsAlerts}
                onChange={e => setSmsAlerts(e.target.checked)}
                aria-label="Toggle SMS alerts"
              />
              <span className="slider" />
            </label>
          </div>
        </div>

        {/* GitHub Link */}
        <a
          href="https://github.com/bhavya14032007/SIH-final2026"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '9px 12px',
            borderRadius: '10px',
            fontSize: '12px',
            fontWeight: '600',
            color: 'var(--text-secondary)',
            textDecoration: 'none',
            border: '1px solid var(--border-main)',
            background: 'var(--bg-card-subtle)',
            transition: 'all 0.15s ease'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.color = 'var(--text-primary)';
            e.currentTarget.style.borderColor = 'var(--border-highlight)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.color = 'var(--text-secondary)';
            e.currentTarget.style.borderColor = 'var(--border-main)';
          }}
          title="View Public GitHub Repository"
          aria-label="GitHub Repository"
        >
          <svg style={{ width: '14px', height: '14px', flexShrink: 0, fill: 'currentColor' }} viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          <span>View on GitHub</span>
        </a>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (always visible) */}
      <aside
        className="hidden lg:flex"
        style={{
          width: '240px',
          flexDirection: 'column',
          height: '100vh',
          position: 'sticky',
          top: 0,
          zIndex: 40,
          borderRight: '1px solid var(--border-main)',
          flexShrink: 0,
          transition: 'background-color 0.3s ease'
        }}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {isOpenMobile && (
        <div
          className="lg:hidden"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 50,
            display: 'flex'
          }}
        >
          {/* Backdrop */}
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.65)',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)'
            }}
            onClick={onCloseMobile}
          />
          {/* Drawer Panel */}
          <div
            className="animate-slide-in-down"
            style={{
              position: 'relative',
              width: '260px',
              maxWidth: '80vw',
              height: '100%',
              zIndex: 10,
              borderRight: '1px solid var(--border-main)',
              boxShadow: 'var(--shadow-elevated)'
            }}
          >
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
