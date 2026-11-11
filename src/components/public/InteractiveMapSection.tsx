import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { useApp } from '../../context/AppContext';
import { TRANSLATIONS } from '../../translations';
import { MapPin, Layers, Droplets, Sun, HeartHandshake, BookOpen, Sparkles, Info } from 'lucide-react';
import { ProgramPillar } from '../../types';

interface MapSite {
  id: string;
  name: string;
  pillar: ProgramPillar;
  type: string;
  settlementZone: string;
  lat: number;
  lng: number;
  beneficiariesCount: number;
  description: string;
}

const PUBLIC_SITES: MapSite[] = [
  {
    id: 'site-1',
    name: 'Ranch 1 Solarized Water Reticulation Hub',
    pillar: 'wash',
    type: 'Solar Deep Borehole & Elevated Reservoir (30kL)',
    settlementZone: 'Kiryandongo Ranch 1, Zone C',
    lat: 2.0084,
    lng: 32.1382,
    beneficiariesCount: 8120,
    description: '12kW photovoltaic array supplying 6 public distribution tap stands and health center.',
  },
  {
    id: 'site-2',
    name: 'Women Agribusiness & Micro-Savings Center',
    pillar: 'livelihoods',
    type: 'VSLA Training & Solar Drip Irrigation Nursery',
    settlementZone: 'Bweyale Commercial Transition Belt',
    lat: 1.9685,
    lng: 32.2214,
    beneficiariesCount: 650,
    description: '18 women producer groups cultivating high-yield vegetables with bulk market access.',
  },
  {
    id: 'site-3',
    name: 'SSH-LAB Technology & Peace Mediation Center',
    pillar: 'ssh_lab',
    type: 'Innovation Lab, Solar Repair & Youth Peace Hub',
    settlementZone: 'Zone A Community Center Compound',
    lat: 2.0152,
    lng: 32.1528,
    beneficiariesCount: 430,
    description: '30 solar-powered laptops, satellite internet, solar inverter diagnostics, and youth council.',
  },
  {
    id: 'site-4',
    name: 'Ranch 37 Clean Cooking & Bio-Briquette Workshop',
    pillar: 'energy_climate',
    type: 'Eco-Friendly Fuel Facility & Community Reforestation Nursery',
    settlementZone: 'Ranch 37 Zone D Buffer',
    lat: 1.9842,
    lng: 32.1812,
    beneficiariesCount: 3450,
    description: 'Agricultural waste recycling producing smoke-free briquettes, protecting women from foraging risks.',
  },
  {
    id: 'site-5',
    name: 'Panyadoli Accelerated Bridge Learning Classrooms',
    pillar: 'education',
    type: 'Ventilated Eco-Classrooms & Trauma Support',
    settlementZone: 'Panyadoli Uplands Sector 2',
    lat: 2.0291,
    lng: 32.1124,
    beneficiariesCount: 1940,
    description: 'Bridge curriculum aiding war-displaced Sudanese children transition into certified schooling.',
  },
];

export const InteractiveMapSection: React.FC = () => {
  const { language } = useApp();
  const t = TRANSLATIONS[language];
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | ProgramPillar>('all');
  const [selectedSite, setSelectedSite] = useState<MapSite | null>(PUBLIC_SITES[0]);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Check if map already initialized
    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [2.005, 32.16],
        zoom: 12,
        scrollWheelZoom: false,
      });

      // Humanitarian / OpenStreetMap tiles with attribution
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors | SSH Field Operations GIS',
        maxZoom: 18,
      }).addTo(map);

      markersLayerRef.current = L.layerGroup().addTo(map);
      mapInstanceRef.current = map;
    }

    const markersGroup = markersLayerRef.current;
    if (!markersGroup || !mapInstanceRef.current) return;

    markersGroup.clearLayers();

    const filteredSites =
      activeFilter === 'all'
        ? PUBLIC_SITES
        : PUBLIC_SITES.filter((s) => s.pillar === activeFilter);

    filteredSites.forEach((site) => {
      // Color coded marker based on the 4 SSH logo petals
      let markerColor = '#d97706'; // gold default
      if (site.pillar === 'wash') markerColor = '#1e40af';           // Royal Blue
      if (site.pillar === 'livelihoods') markerColor = '#15803d';     // Emerald Green
      if (site.pillar === 'energy_climate') markerColor = '#d97706';  // Sun Gold
      if (site.pillar === 'education') markerColor = '#dc2626';       // Crimson Red (Logo Petal)
      if (site.pillar === 'ssh_lab') markerColor = '#eab308';         // Metallic Center Gold

      const customIcon = L.divIcon({
        className: 'custom-leaflet-pin',
        html: `<div style="background-color: ${markerColor}; width: 28px; height: 28px; border-radius: 50%; border: 3px solid #ffffff; box-shadow: 0 4px 10px rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; color: white; font-size: 10px; font-weight: 800; letter-spacing: -0.5px;">SSH</div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });

      const marker = L.marker([site.lat, site.lng], { icon: customIcon });

      marker.on('click', () => {
        setSelectedSite(site);
      });

      marker.bindPopup(`
        <div style="font-family: sans-serif; padding: 6px; min-width: 190px;">
          <b style="font-size: 13px; color: #0f172a;">${site.name}</b>
          <div style="font-size: 11px; color: #475569; margin-top: 3px;">${site.settlementZone}</div>
          <div style="font-size: 11px; color: ${markerColor}; font-weight: 700; margin-top: 5px;">Beneficiaries: ${site.beneficiariesCount.toLocaleString()}</div>
        </div>
      `);

      markersGroup.addLayer(marker);
    });
  }, [activeFilter]);

  return (
    <section id="map-section" className="py-24 bg-[#070b14] text-slate-100 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-amber-400 mb-2">
              <MapPin className="w-4 h-4 text-rose-500" />
              <span>Humanitarian GIS & Operational Footprint</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              {t.mapTitle}
            </h2>
            <p className="text-slate-300 text-sm mt-2 max-w-2xl">
              {t.mapSub}
            </p>
          </div>

          {/* Interactive filter controls styled with Logo Colors */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#0f172a] rounded-xl border border-slate-800 shadow-md">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              All Hubs ({PUBLIC_SITES.length})
            </button>
            <button
              onClick={() => setActiveFilter('wash')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
                activeFilter === 'wash'
                  ? 'bg-blue-600 text-white font-bold shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Droplets className="w-3 h-3 text-blue-400" />
              <span>WASH</span>
            </button>
            <button
              onClick={() => setActiveFilter('livelihoods')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
                activeFilter === 'livelihoods'
                  ? 'bg-emerald-600 text-white font-bold shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <HeartHandshake className="w-3 h-3 text-emerald-400" />
              <span>Livelihoods</span>
            </button>
            <button
              onClick={() => setActiveFilter('education')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
                activeFilter === 'education'
                  ? 'bg-rose-600 text-white font-bold shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <BookOpen className="w-3 h-3 text-rose-400" />
              <span>Education</span>
            </button>
            <button
              onClick={() => setActiveFilter('ssh_lab')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
                activeFilter === 'ssh_lab'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>SSH-LAB</span>
            </button>
          </div>
        </div>

        {/* Map Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Leaflet Map Box */}
          <div className="lg:col-span-8 bg-[#0f172a] rounded-2xl border border-slate-800 overflow-hidden shadow-2xl min-h-[460px] relative">
            <div ref={mapContainerRef} className="w-full h-full min-h-[460px]" />

            {/* Privacy notice overlay at bottom corner */}
            <div className="absolute bottom-3 left-3 z-[400] bg-[#070b14]/90 text-slate-300 text-[11px] px-3 py-1.5 rounded-lg border border-slate-800 backdrop-blur-sm flex items-center gap-1.5 shadow">
              <Info className="w-3.5 h-3.5 text-amber-400" />
              <span>Generalized public coordinates protect beneficiary shelter privacy.</span>
            </div>
          </div>

          {/* Selected Site Details Dossier */}
          <div className="lg:col-span-4 bg-[#0f172a] rounded-2xl border border-slate-800 p-6 sm:p-7 flex flex-col justify-between shadow-xl">
            {selectedSite ? (
              <div className="space-y-5">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-amber-400 font-bold mb-1">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span>{selectedSite.settlementZone}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white leading-snug">
                    {selectedSite.name}
                  </h3>
                  <div className="text-xs font-medium text-slate-400 mt-1">
                    {selectedSite.type}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#070b14] border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Target Beneficiaries:</span>
                    <span className="text-white font-mono font-bold text-sm">
                      {selectedSite.beneficiariesCount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">GPS Coordinates:</span>
                    <span className="text-slate-300 font-mono text-[11px]">
                      {selectedSite.lat.toFixed(4)}, {selectedSite.lng.toFixed(4)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Operational Status:</span>
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                      Active & Monitored
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedSite.description}
                </p>

                <div className="text-xs text-slate-400 pt-3 border-t border-slate-800">
                  <span className="font-semibold text-slate-300">Management:</span> Maintained by local
                  community committees with technical oversight from the SSH Kiryandongo field office.
                </div>
              </div>
            ) : (
              <div className="text-xs text-slate-400 flex items-center justify-center h-full">
                Click any marker on the map to view site indicators.
              </div>
            )}

            <div className="pt-6 border-t border-slate-800 mt-6 flex items-center justify-between">
              <span className="text-xs text-slate-400">Browse all 5 hubs</span>
              <div className="flex items-center gap-1 text-xs">
                {PUBLIC_SITES.map((site) => (
                  <button
                    key={site.id}
                    onClick={() => setSelectedSite(site)}
                    className={`w-7 h-7 rounded-lg text-[11px] font-mono font-bold transition-colors cursor-pointer ${
                      selectedSite?.id === site.id
                        ? 'bg-amber-400 text-slate-950 shadow'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {site.id.replace('site-', '')}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
