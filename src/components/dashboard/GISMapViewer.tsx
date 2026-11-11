import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { useApp } from '../../context/AppContext';
import { Map, Layers, Droplets, Sun, HeartHandshake, Sparkles, Filter, Navigation } from 'lucide-react';
import { ProgramPillar } from '../../types';

export const GISMapViewer: React.FC = () => {
  const { communities, projects } = useApp();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const [selectedPillar, setSelectedPillar] = useState<'all' | ProgramPillar>('all');
  const [activeCommunity, setActiveCommunity] = useState<string>(communities[0]?.id || '');

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [2.0084, 32.145],
        zoom: 12,
        scrollWheelZoom: true,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors | SSH Humanitarian Operations',
        maxZoom: 18,
      }).addTo(map);

      markersLayerRef.current = L.layerGroup().addTo(map);
      mapInstanceRef.current = map;
    }

    const markersGroup = markersLayerRef.current;
    if (!markersGroup || !mapInstanceRef.current) return;

    markersGroup.clearLayers();

    // Add community centers
    communities.forEach((c) => {
      const commIcon = L.divIcon({
        className: 'custom-comm-pin',
        html: `<div style="background-color: #0284c7; width: 32px; height: 32px; border-radius: 50%; border: 3px solid #ffffff; box-shadow: 0 4px 6px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; color: white; font-size: 11px; font-weight: bold;">Z</div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      const marker = L.marker(c.coordinates, { icon: commIcon });
      marker.bindPopup(`
        <div style="font-family: sans-serif; padding: 4px; min-width: 200px;">
          <b style="font-size: 13px; color: #1c1917;">${c.name}</b>
          <div style="font-size: 11px; color: #44403c; margin-top: 2px;">Zone: ${c.zone}</div>
          <div style="font-size: 11px; color: #0284c7; margin-top: 4px;">Population: ${c.populationEstimate.toLocaleString()}</div>
          <div style="font-size: 11px; color: #16a34a;">Water Access: ${c.waterAccessPercentage}%</div>
          <div style="font-size: 11px; color: #ca8a04;">Clean Energy: ${c.cleanEnergyAccessPercentage}%</div>
        </div>
      `);
      markersGroup.addLayer(marker);
    });

    // Add simulated operational points
    const operationalPoints = [
      { name: 'Ranch 1 Solar Borehole #01', lat: 2.0084, lng: 32.1382, pillar: 'wash', color: '#0284c7' },
      { name: 'Ranch 1 Solar Borehole #02', lat: 2.012, lng: 32.141, pillar: 'wash', color: '#0284c7' },
      { name: 'Bweyale Women Seed Bank & Nursery', lat: 1.9685, lng: 32.2214, pillar: 'livelihoods', color: '#16a34a' },
      { name: 'SSH-LAB Technology & Peace Hub', lat: 2.0152, lng: 32.1528, pillar: 'ssh_lab', color: '#d97706' },
      { name: 'Ranch 37 Clean Cooking Workshop', lat: 1.9842, lng: 32.1812, pillar: 'energy_climate', color: '#ca8a04' },
      { name: 'Panyadoli Uplands Bridge School', lat: 2.0291, lng: 32.1124, pillar: 'education', color: '#9333ea' },
    ];

    operationalPoints.forEach((p) => {
      if (selectedPillar !== 'all' && p.pillar !== selectedPillar) return;

      const pIcon = L.divIcon({
        className: 'custom-asset-pin',
        html: `<div style="background-color: ${p.color}; width: 22px; height: 22px; border-radius: 4px; border: 2px solid #ffffff; box-shadow: 0 2px 4px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; color: white; font-size: 10px; font-weight: bold;">SSH</div>`,
        iconSize: [22, 22],
        iconAnchor: [11, 11],
      });

      const pMarker = L.marker([p.lat, p.lng], { icon: pIcon });
      pMarker.bindPopup(`
        <div style="font-family: sans-serif; padding: 4px;">
          <b style="font-size: 12px; color: #1c1917;">${p.name}</b>
          <div style="font-size: 11px; color: #78716c; margin-top: 2px;">Operational Asset · Active</div>
        </div>
      `);
      markersGroup.addLayer(pMarker);
    });
  }, [communities, selectedPillar]);

  const zoomToCommunity = (c: typeof communities[0]) => {
    setActiveCommunity(c.id);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView(c.coordinates, 14, { animate: true });
    }
  };

  return (
    <div className="space-y-6 text-stone-100">
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-800">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Map className="w-5 h-5 text-amber-400" />
            <span>GIS Operational Infrastructure & Settlement Boundaries</span>
          </h2>
          <p className="text-xs text-stone-400 mt-0.5">
            Real-time geospatial mapping of boreholes, solar grids, school classrooms, and cooperative plots
          </p>
        </div>

        {/* Pillar Filter */}
        <div className="flex items-center gap-1.5 p-1 rounded-lg bg-stone-900 border border-stone-800 text-xs">
          <button
            onClick={() => setSelectedPillar('all')}
            className={`px-3 py-1 rounded font-semibold transition-colors cursor-pointer ${
              selectedPillar === 'all' ? 'bg-amber-400 text-stone-950' : 'text-stone-400 hover:text-white'
            }`}
          >
            All Layers
          </button>
          <button
            onClick={() => setSelectedPillar('wash')}
            className={`px-2.5 py-1 rounded font-semibold transition-colors cursor-pointer flex items-center gap-1 ${
              selectedPillar === 'wash' ? 'bg-sky-500 text-white' : 'text-stone-400 hover:text-white'
            }`}
          >
            <Droplets className="w-3 h-3" />
            <span>WASH</span>
          </button>
          <button
            onClick={() => setSelectedPillar('livelihoods')}
            className={`px-2.5 py-1 rounded font-semibold transition-colors cursor-pointer flex items-center gap-1 ${
              selectedPillar === 'livelihoods' ? 'bg-emerald-600 text-white' : 'text-stone-400 hover:text-white'
            }`}
          >
            <HeartHandshake className="w-3 h-3" />
            <span>Livelihoods</span>
          </button>
          <button
            onClick={() => setSelectedPillar('ssh_lab')}
            className={`px-2.5 py-1 rounded font-semibold transition-colors cursor-pointer flex items-center gap-1 ${
              selectedPillar === 'ssh_lab' ? 'bg-amber-500 text-stone-950' : 'text-stone-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3 h-3" />
            <span>SSH-LAB</span>
          </button>
        </div>
      </div>

      {/* Map Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Quick Community Teleport List */}
        <div className="lg:col-span-4 bg-stone-900 rounded-xl border border-stone-800 p-4 space-y-3">
          <div className="text-xs uppercase font-bold text-stone-400 tracking-wider">
            Settlement Hubs Navigation
          </div>

          <div className="space-y-2">
            {communities.map((c) => (
              <button
                key={c.id}
                onClick={() => zoomToCommunity(c)}
                className={`w-full text-left p-3 rounded-lg border transition-all cursor-pointer ${
                  activeCommunity === c.id
                    ? 'bg-amber-400/10 border-amber-500/50 text-white'
                    : 'bg-stone-950 border-stone-800 text-stone-300 hover:border-stone-700'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-bold mb-1">
                  <span>{c.name}</span>
                  <Navigation className="w-3.5 h-3.5 text-amber-400" />
                </div>
                <div className="text-[11px] text-stone-400 flex items-center justify-between">
                  <span>Pop: {c.populationEstimate.toLocaleString()}</span>
                  <span>Water: {c.waterAccessPercentage}%</span>
                </div>
              </button>
            ))}
          </div>

          <div className="p-3 rounded bg-stone-950 border border-stone-800 text-[11px] text-stone-400 space-y-1">
            <span className="font-semibold text-stone-300 block">Map Legend:</span>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-sky-500 inline-block" />
              <span>Settlement Cluster Hubs</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-amber-500 inline-block" />
              <span>SSH Fixed Operational Assets</span>
            </div>
          </div>
        </div>

        {/* Right: The Interactive Leaflet Map */}
        <div className="lg:col-span-8 bg-stone-900 rounded-xl border border-stone-800 overflow-hidden shadow-xl min-h-[500px]">
          <div ref={mapContainerRef} className="w-full h-full min-h-[500px]" />
        </div>
      </div>
    </div>
  );
};
