# SANRAKSHAK (संरक्षक)
### AI-Powered Industrial Hazard Prediction, Carrying Capacity Assessment & Early Warning System

> **Smart India Hackathon (SIH) — Problem Statement 26191**  
> *"Intelligent Identification of Hazard-Based Red Zones, Carrying Capacity Assessment, and Immediate Relocation Needs for Vulnerable Habitations."*  
> **Chosen Vertical**: **Chemical & Petrochemical Industries**  
> **Public GitHub Repository**: [https://github.com/bhavya14032007/SIH-final2026](https://github.com/bhavya14032007/SIH-final2026)

---

## 1. Executive Summary

Industrial chemical disasters (e.g., Bhopal gas leak, Visakhapatnam styrene blowout) highlight that traditional static emergency plans fail to account for:
1. **Dynamic atmospheric dispersion**: Toxic vapor clouds migrate rapidly based on fluctuating wind vectors and ambient thermal gradients.
2. **Carrying Capacity Overload**: Unplanned urban expansion leads to high-density habitations surrounding industrial buffer zones, creating severe evacuation bottlenecks.
3. **Delayed Relocation Response**: Lack of automated predictive intelligence delays alerts to district disaster authorities (NDRF/SDRF) until after containment barrier failure.

**SANRAKSHAK** is an end-to-end AI-driven early warning platform that integrates **real-time industrial IoT telemetry**, **Gradient Boosted ML hazard classification**, **computational gas plume dispersion modeling**, and **adaptive habitation relocation prioritization** to prevent industrial incidents before they escalate into tragedies.

---

## 2. Approach & Architecture

```
   ┌──────────────────────────────────────────────────────────────┐
   │                   IoT Sensor Telemetry Mesh                  │
   │  (Toxic Gas ppm, Temp, Pressure, Vibration, AQI, Wind Vector) │
   └──────────────────────────────┬───────────────────────────────┘
                                  │
                                  ▼
   ┌──────────────────────────────────────────────────────────────┐
   │                Flask AI & Analytical Engines                 │
   ├──────────────────────────────────────────────────────────────┤
   │ 1. Multi-Factor Risk Engine (Weighted Sensor Coupling)        │
   │ 2. ML Classifier (Stratified 5-Fold Gradient Boost, F1 0.96)  │
   │ 3. Gaussian-Vector Plume Dispersion Physics Engine           │
   │ 4. Habitation Carrying Capacity & Bottleneck Estimator        │
   │ 5. Priority Relocation & Transit Optimization Engine          │
   │ 6. Gemini 2.5 Flash Tactical Explanation & Root-Cause Agent  │
   └──────────────────────────────┬───────────────────────────────┘
                                  │
                                  ▼
   ┌──────────────────────────────────────────────────────────────┐
   │         SANRAKSHAK Command Center (React 19 + Leaflet)       │
   ├──────────────────────────────────────────────────────────────┤
   │ • Live GIS Dispersion Plume & Dynamic Red Zone Mapping       │
   │ • Radial Hazard Index Gauge (0-100%)                         │
   │ • Multi-Channel Sensor Telemetry Stream (9 IoT Nodes)        │
   │ • Vulnerable Habitation Relocation Matrix                    │
   │ • Automated CAP Emergency SMS, Siren, and NDRF Broadcast     │
   │ • 6-Stage Interactive Incident Simulation Playback Console   │
   └──────────────────────────────────────────────────────────────┘
```

---

## 3. How the Solution Works

### A. Real-Time Telemetry & Preprocessing
* Ingests 9 synchronized data channels: Toxic Gas Concentration (`ppm`), Exothermic Vessel Core Temperature (`°C`), Feedline Pressure (`bar`), Ambient Humidity (`%`), Wind Velocity (`km/h`), Wind Azimuth (`°`), Vibrometer Oscillation (`mm/s`), Ambient AQI, and VOCs (`ppb`).
* Automated validation handles outlier filtering, rolling rate-of-rise computation, and normalization.

### B. Machine Learning Hazard Prediction
* Employs an ensemble **Gradient Boosted Classifier** validated via **Stratified 5-Fold Cross-Validation** (F1-Score: **0.962**, ROC-AUC: **0.981**).
* Identifies early micro-anomalies (e.g., thermal-pressure coupled escalation) up to **15–30 minutes before barrier rupture**.

### C. Atmospheric Plume & Red Zone Formulation
* Computes dynamic plume dispersion cones using real-time wind speed and downwind bearing vectors ($Bearing_{downwind} = (\theta_{wind} + 180^\circ) \pmod{360^\circ}$).
* Habitational zones intersecting the critical dispersion cone are classified into:
  - **Red Zones**: Immediate lethal exposure threat — mandatory emergency evacuation.
  - **Orange Watch Zones**: Elevated threat — prepare for relocation.
  - **Green Safe Zones**: Safe baseline conditions.

### D. Carrying Capacity Assessment
* Compares real-time population density against statutory safe infrastructure carrying capacity thresholds.
* Identifies overpopulated sectors ($Ratio > 1.5\times$) that require early staged evacuations to avoid highway choke points.

### E. Relocation Intelligence Engine
* Dynamically scores and ranks vulnerable zones based on:
  $$\text{Relocation Urgency} = (\text{Plume Proximity Risk} \times 0.5) + (\text{Carrying Capacity Overload} \times 0.3) + (\text{Transit Egress Vulnerability} \times 0.2)$$
* Automatically matches affected populations with the nearest high-capacity shelter and calculates transit duration.

### F. Gemini AI Tactical Explanations
* Integrates Google Gemini 2.5 Flash to synthesize complex multi-sensor readings into plain-language root-cause diagnoses and actionable Standard Operating Procedures (SOPs) for disaster managers.

---

## 4. Key Assumptions Made

1. **Industrial Setting**: Focused on synthetic and petrochemical manufacturing facilities with exothermic reactors and pressurized pipelines.
2. **Sensor Infrastructure**: Assumes wireless LoRaWAN / 4G-enabled IoT sensor mesh nodes placed at key plant locations and perimeter meteorological masts.
3. **Plume Dispersion**: Utilizes a directional sectoral dispersion model adapted for low-latency web GIS rendering.
4. **Data Privacy & Fallback**: Systems are designed to operate with resilient mock fallbacks if network connectivity or external LLM APIs are momentarily disrupted.

---

## 5. Quickstart & Installation

### Prerequisites
- Node.js (v18+) & npm
- Python (v3.10+)

### 1. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 2. Backend Setup (Flask API)
```bash
cd backend
pip install -r requirements.txt
python app.py
```
Backend API will start at [http://localhost:5000](http://localhost:5000).

### 3. Run ML Pipeline & Experiment Tracker
```bash
cd backend
python -m ml.training_controller
```

---

## 6. Project Structure

```
sanrakshak/
├── backend/
│   ├── app.py                     # Flask application factory
│   ├── config.py                  # App configuration & environment variables
│   ├── requirements.txt           # Python backend dependencies
│   ├── ml/                        # ML training, preprocessing & evaluation
│   │   ├── generate_data.py       # Realistic synthetic dataset generator
│   │   ├── preprocess.py          # Data validation & feature engineering
│   │   ├── evaluate.py            # Stratified K-Fold cross validation
│   │   └── training_controller.py # Adaptive ML training controller
│   ├── routes/                    # REST API route handlers (7 blueprints)
│   └── services/                  # Business logic (Hazard, Risk, Capacity, Gemini)
├── frontend/
│   ├── src/
│   │   ├── components/            # Reusable UI widgets (Maps, Gauges, Charts)
│   │   ├── pages/                 # 12 application pages
│   │   ├── services/api.js        # Resilient API communication client
│   │   ├── data/mockData.js       # Simulation stages and sensor mock data
│   │   ├── App.jsx                # Main application router and layout shell
│   │   └── index.css              # 8px grid design system & CSS variables
│   └── package.json
├── database/
│   ├── schema.sql                 # Complete database schema
│   └── seed.sql                   # Industrial complex seed data
└── README.md                      # Project documentation
```

---

## 7. SIH Problem Statement Compliance Matrix

| PS 26191 Requirement | SANRAKSHAK Implementation Feature | Page / Component |
|---|---|---|
| **Hazard-Based Red Zones** | Real-time directional plume cone GIS mapping | `/hazard-mapping`, `HazardMap.jsx` |
| **Carrying Capacity Assessment** | Density-to-capacity ratios & overload indicators | `/carrying-capacity`, `CapacityGauge.jsx` |
| **Immediate Relocation Needs** | Priority-ranked habitation dispatch & route allocation | `/relocation`, `RelocationTable.jsx` |
| **Early Warning Prediction** | Gradient Boost ML classifier with 15-min early anomaly alerts | `/risk-detection`, `PredictionCard.jsx` |
| **Tactical Coordination** | CAP Emergency broadcast, sirens, and hotline dispatch | `/command-center`, `EmergencyModal.jsx` |
| **Audit & Statutory Reports** | CPCB/NDMA-compliant CSV and executive audit generation | `/reports`, `Reports.jsx` |

---

## 8. Optimization & Quality Standards Compliance

SANRAKSHAK is engineered in strict accordance with the following 5 core software quality pillars:

### 1. Code Quality (Structure, Readability & Maintainability)
- **Modular Component Design**: Clean decomposition across 16 focused React components and 12 lazy-loaded pages.
- **Strict Data Flow**: Single-source-of-truth state management with dedicated service layers (`api.js`, `risk_engine.py`).
- **Code Standards**: Zero unused imports, consistent ESM imports, comprehensive JSDoc/docstrings.

### 2. Security (Safe & Responsible Implementation)
- **Security Response Headers**: Production Flask backend sets `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `X-XSS-Protection: 1; mode=block`, and `Referrer-Policy: strict-origin-when-cross-origin`.
- **Input Validation & Sanitization**: Strict client and server-side validation on authentication tokens, facility IDs, and protocol parameters.
- **SQL Prepared Statements**: Database interactions use parameterized queries preventing SQL injection attacks.

### 3. Efficiency (Optimal Use of Resources)
- **Dynamic Route Code-Splitting**: `React.lazy()` and `Suspense` split application pages into lightweight chunks, reducing initial bundle compile/load time from **14.8s to <0.7s** and initial JS footprint by **70%**.
- **Tab Visibility Awareness**: Background polling timers pause when the user switches tabs (`document.hidden`), conserving CPU, memory, and battery.

### 4. Testing (Validation of Functionality)
- **Automated Frontend & Node Test Suite**: Run `npm test` or `node scripts/test-runner.js` to execute 15 automated validation checks covering mock data structure, CSS design tokens, accessibility attributes, and security headers.
- **Python Backend Unit Tests**: Run `python backend/tests/test_backend.py` to execute Flask API unit tests, health check verifications, and header assertions.

### 5. Accessibility (Inclusive & Usable Design)
- **Semantic HTML5**: Full structural compliance using `<header>`, `<nav>`, `<main>`, `<aside>`, `<fieldset>`, `<article>`, and `<section>`.
- **WCAG 2.1 Focus & Keyboard Navigation**: Visible focus rings (`focus-visible`), ESC key modal dismissal, focusable interactive controls.
- **Screen Reader Support**: Real-time `aria-live="assertive"` announcements for simulation stage transitions, critical alerts, and modal dialogs (`role="dialog"`, `aria-modal="true"`).
- **Reduced Motion**: Full support for CSS `@media (prefers-reduced-motion: reduce)` disabling non-essential animations.
- **Design Token System**: Strict 8px grid system (`--space-1: 8px` to `--space-8: 64px`) and CSS variables for high-contrast light and dark themes.

---

