import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import EmergencyModal from './components/EmergencyModal';
import ReportModal from './components/ReportModal';

// Pages
import Dashboard from './pages/Dashboard';
import Monitoring from './pages/Monitoring';
import RiskDetection from './pages/RiskDetection';
import HazardMapping from './pages/HazardMapping';
import CarryingCapacity from './pages/CarryingCapacity';
import Relocation from './pages/Relocation';
import CommandCenter from './pages/CommandCenter';
import Sensors from './pages/Sensors';
import Analytics from './pages/Analytics';
import Reports from './pages/Reports';
import SystemHealth from './pages/SystemHealth';
import Login from './pages/Login';

// Mock Data & Simulation State
import { INITIAL_SENSORS, POPULATION_ZONES, INITIAL_ALERTS, SIMULATION_STAGES } from './data/mockData';

export default function App() {
  const [currentStageIndex, setCurrentStageIndex] = useState(4);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isSimulationOpen, setIsSimulationOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState('Tank Farm T-04');
  const [alerts, setAlerts] = useState(INITIAL_ALERTS);

  const currentStage = SIMULATION_STAGES[currentStageIndex];

  // Auto-play simulation loop
  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStageIndex((prev) => {
          if (prev < SIMULATION_STAGES.length - 1) {
            const next = prev + 1;
            if (next === 4 || next === 5) {
              setAlerts((prevAlerts) => [
                {
                  id: `ALT-${Date.now()}`,
                  timestamp: 'Just now',
                  type: 'CRITICAL_HAZARD',
                  severity: 'CRITICAL',
                  message: `STAGE ${next}: Red Zone active in Zone A. Immediate relocation required.`
                },
                ...prevAlerts
              ]);
            }
            return next;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, 3500);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleSelectStage = (idx) => {
    setCurrentStageIndex(idx);
    setIsPlaying(false);
  };

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setCurrentStageIndex(0);
    setIsPlaying(false);
  };

  const handleEmergencyConfirm = (options) => {
    setAlerts((prev) => [
      {
        id: `ALT-EMG-${Date.now()}`,
        timestamp: 'Just now',
        type: 'EMERGENCY_BROADCAST',
        severity: 'CRITICAL',
        message: 'Level-3 Emergency SOP Executed: Community Siren Active, SMS sent to 3,400 devices, NDRF deployed.'
      },
      ...prev
    ]);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Protected / Main App Shell */}
        <Route
          path="/*"
          element={
            <div
              style={{
                display: 'flex',
                height: '100vh',
                overflow: 'hidden',
                background: 'var(--bg-primary)',
                color: 'var(--text-primary)'
              }}
            >
              {/* Responsive Sidebar */}
              <Sidebar
                isOpenMobile={isMobileNavOpen}
                onCloseMobile={() => setIsMobileNavOpen(false)}
                onOpenEmergencyModal={() => setIsEmergencyModalOpen(true)}
              />

              {/* Main Content Area */}
              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100vh',
                  overflowY: 'auto',
                  minWidth: 0
                }}
              >
                <Header
                  currentStage={currentStage}
                  onResetSimulation={handleReset}
                  selectedUnit={selectedUnit}
                  onSelectUnit={setSelectedUnit}
                  onOpenReportModal={() => setIsReportModalOpen(true)}
                  isSimulationOpen={isSimulationOpen}
                  onToggleSimulation={() => setIsSimulationOpen(!isSimulationOpen)}
                  onToggleMobileNav={() => setIsMobileNavOpen(!isMobileNavOpen)}
                />

                <main
                  style={{
                    flex: 1,
                    padding: '32px 24px',
                    overflowX: 'hidden'
                  }}
                >
                  <Routes>
                    <Route
                      path="/"
                      element={
                        <Dashboard
                          currentStage={currentStage}
                          currentStageIndex={currentStageIndex}
                          onSelectStage={handleSelectStage}
                          isPlaying={isPlaying}
                          onTogglePlay={handleTogglePlay}
                          onReset={handleReset}
                          sensors={INITIAL_SENSORS}
                          zones={POPULATION_ZONES}
                          alerts={alerts}
                          onOpenEmergencyModal={() => setIsEmergencyModalOpen(true)}
                          isSimulationOpen={isSimulationOpen}
                        />
                      }
                    />
                    <Route
                      path="/sensors"
                      element={<Sensors sensors={INITIAL_SENSORS} currentStage={currentStage} />}
                    />
                    <Route
                      path="/monitoring"
                      element={<Monitoring sensors={INITIAL_SENSORS} currentStage={currentStage} />}
                    />
                    <Route
                      path="/risk-detection"
                      element={<RiskDetection currentStage={currentStage} />}
                    />
                    <Route
                      path="/hazard-mapping"
                      element={<HazardMapping zones={POPULATION_ZONES} currentStage={currentStage} />}
                    />
                    <Route
                      path="/carrying-capacity"
                      element={<CarryingCapacity zones={POPULATION_ZONES} currentStage={currentStage} />}
                    />
                    <Route
                      path="/relocation"
                      element={
                        <Relocation
                          zones={POPULATION_ZONES}
                          currentStage={currentStage}
                          onTriggerEvacuation={() => setIsEmergencyModalOpen(true)}
                        />
                      }
                    />
                    <Route
                      path="/command-center"
                      element={
                        <CommandCenter
                          currentStage={currentStage}
                          onOpenEmergencyModal={() => setIsEmergencyModalOpen(true)}
                        />
                      }
                    />
                    <Route
                      path="/analytics"
                      element={<Analytics currentStage={currentStage} />}
                    />
                    <Route
                      path="/reports"
                      element={
                        <Reports
                          currentStage={currentStage}
                          zones={POPULATION_ZONES}
                          sensors={INITIAL_SENSORS}
                        />
                      }
                    />
                    <Route
                      path="/system-health"
                      element={<SystemHealth />}
                    />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </main>
              </div>

              {/* Global Emergency Modal */}
              <EmergencyModal
                isOpen={isEmergencyModalOpen}
                onClose={() => setIsEmergencyModalOpen(false)}
                onConfirm={handleEmergencyConfirm}
                currentStage={currentStage}
              />

              {/* Global Report Modal */}
              <ReportModal
                isOpen={isReportModalOpen}
                onClose={() => setIsReportModalOpen(false)}
                currentStage={currentStage}
                unitName={selectedUnit}
              />
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
