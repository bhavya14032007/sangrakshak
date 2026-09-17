import React, { useState, useEffect } from 'react';
import { 
  MapContainer, 
  TileLayer, 
  Circle, 
  Marker, 
  Popup, 
  Tooltip,
  useMap
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { PLANT_ORIGIN } from '../data/mockData';

// Fix for default Leaflet marker icons in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Center coordinate for Kandla / Plant cluster
const center = [PLANT_ORIGIN.lat, PLANT_ORIGIN.lng];

// Custom Plant Pin
const plantIcon = new L.DivIcon({
  className: 'custom-plant-pin',
  html: `<div style="background:#dc2626;width:16px;height:16px;border-radius:50%;border:3px solid #ffffff;box-shadow:0 0 10px rgba(220,38,38,0.6);margin-left:-8px;margin-top:-8px;"></div>`,
  iconSize: [16, 16],
  iconAnchor: [8, 8]
});

// Helper component to handle theme tile updates
function TileLayerWithTheme() {
  const [isDark, setIsDark] = useState(() => {
    return document.documentElement.getAttribute('data-theme') === 'dark';
  });

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.getAttribute('data-theme') === 'dark');
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  const url = isDark
    ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
    : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

  return (
    <TileLayer
      attribution='&copy; <a href="https://carto.com/">CARTO</a>'
      url={url}
    />
  );
}

export default function HazardMap({ 
  compact = false, 
  dangerRadius = 1.2, 
  warningRadius = 0.6,
  zones = [],
  currentStage
}) {
  return (
    <div className={`w-full ${compact ? 'h-[240px]' : 'h-[500px]'} relative rounded-xl overflow-hidden`}>
      <MapContainer
        center={center}
        zoom={compact ? 13 : 14}
        scrollWheelZoom={false}
        zoomControl={!compact}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayerWithTheme />

        {/* Warning Zone Circle (0.6 km) */}
        <Circle
          center={center}
          radius={(warningRadius || 0.6) * 1000}
          pathOptions={{
            color: '#ea580c',
            fillColor: '#f97316',
            fillOpacity: 0.2,
            weight: 1.5
          }}
        />

        {/* Danger Zone Circle (1.2 km) */}
        <Circle
          center={center}
          radius={(dangerRadius || 1.2) * 1000}
          pathOptions={{
            color: '#dc2626',
            fillColor: '#ef4444',
            fillOpacity: 0.25,
            weight: 2
          }}
        />

        {/* Plant Origin Marker */}
        <Marker position={center} icon={plantIcon}>
          <Popup>
            <div className="text-xs font-sans">
              <strong className="text-red-600 block">{PLANT_ORIGIN.name}</strong>
              <span className="text-gray-500">Hazard Origin Node</span>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
