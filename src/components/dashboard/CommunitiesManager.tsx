import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Community } from '../../types';
import { MapPin, Plus, Users, Droplets, Sun, BookOpen, ExternalLink } from 'lucide-react';

export const CommunitiesManager: React.FC = () => {
  const { communities, addCommunity, setDashboardTab, activeRole } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [code, setCode] = useState(`KYR-Z0${communities.length + 1}`);
  const [name, setName] = useState('');
  const [district, setDistrict] = useState('Kiryandongo District');
  const [settlement, setSettlement] = useState('Kiryandongo Refugee Settlement');
  const [zone, setZone] = useState('');
  const [population, setPopulation] = useState('10000');
  const [lat, setLat] = useState('2.0100');
  const [lng, setLng] = useState('32.1450');
  const [leader, setLeader] = useState('');
  const [waterAccess, setWaterAccess] = useState('50');
  const [notes, setNotes] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !zone) return;

    addCommunity({
      code,
      name,
      country: 'Uganda',
      district,
      settlement,
      zone,
      populationEstimate: parseInt(population, 10) || 5000,
      coordinates: [parseFloat(lat) || 2.01, parseFloat(lng) || 32.14],
      priorityNeeds: ['Clean Water', 'Women VSLA Grants', 'Youth Training'],
      vulnerabilityLevel: 'High',
      waterAccessPercentage: parseInt(waterAccess, 10) || 50,
      educationAccessPercentage: 45,
      cleanEnergyAccessPercentage: 30,
      communityLeaderContact: leader || 'Community Welfare Committee Chair',
      activeProjectsCount: 1,
      notes: notes || 'Recently registered settlement cluster.',
    });

    setIsModalOpen(false);
    setName('');
    setZone('');
  };

  return (
    <div className="space-y-6 text-stone-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-800">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <MapPin className="w-5 h-5 text-amber-400" />
            <span>Community Profiles & Settlement Zones</span>
          </h2>
          <p className="text-xs text-stone-400 mt-0.5">
            Managing localized baseline vulnerabilities, water and energy indices, and refugee leadership councils
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setDashboardTab('gis_map')}
            className="px-3 py-1.5 text-xs font-semibold text-stone-300 hover:text-white bg-stone-900 hover:bg-stone-850 rounded border border-stone-800 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span>Open Full GIS Map</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>

          {activeRole !== 'auditor' && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-1.5 text-xs font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Register Settlement Zone</span>
            </button>
          )}
        </div>
      </div>

      {/* Communities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {communities.map((comm) => (
          <div
            key={comm.id}
            className="p-6 rounded-xl bg-stone-900 border border-stone-800 space-y-4 hover:border-stone-700 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-400">{comm.code}</span>
                <span
                  className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border ${
                    comm.vulnerabilityLevel === 'Severe'
                      ? 'bg-red-950 text-red-300 border-red-800'
                      : 'bg-amber-950 text-amber-300 border-amber-800'
                  }`}
                >
                  {comm.vulnerabilityLevel} Vulnerability
                </span>
              </div>

              <h3 className="text-base font-bold text-white">{comm.name}</h3>

              <div className="text-xs text-stone-400">
                {comm.zone} · {comm.district}, {comm.country}
              </div>

              {/* Demographics & Coordinates */}
              <div className="grid grid-cols-2 gap-3 p-3 rounded-lg bg-stone-950 border border-stone-800/80 text-xs">
                <div>
                  <span className="text-[11px] text-stone-500 block">Population Est:</span>
                  <span className="font-mono font-bold text-stone-200">
                    {comm.populationEstimate.toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-stone-500 block">Coordinates:</span>
                  <span className="font-mono text-stone-300 text-[11px]">
                    {comm.coordinates[0].toFixed(4)}, {comm.coordinates[1].toFixed(4)}
                  </span>
                </div>
              </div>

              {/* Key Access Indicators */}
              <div className="space-y-2 pt-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-stone-400 flex items-center gap-1.5">
                    <Droplets className="w-3.5 h-3.5 text-sky-400" />
                    <span>Clean Water Access:</span>
                  </span>
                  <span className="font-mono font-bold text-white">{comm.waterAccessPercentage}%</span>
                </div>
                <div className="w-full bg-stone-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-sky-500 h-full rounded-full" style={{ width: `${comm.waterAccessPercentage}%` }} />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-stone-400 flex items-center gap-1.5">
                    <Sun className="w-3.5 h-3.5 text-amber-400" />
                    <span>Renewable Energy Access:</span>
                  </span>
                  <span className="font-mono font-bold text-white">{comm.cleanEnergyAccessPercentage}%</span>
                </div>
                <div className="w-full bg-stone-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: `${comm.cleanEnergyAccessPercentage}%` }} />
                </div>
              </div>

              {/* Priority Needs */}
              <div className="space-y-1 pt-2">
                <span className="text-[10px] uppercase font-bold text-stone-500">Priority Needs:</span>
                <div className="flex flex-wrap gap-1.5">
                  {comm.priorityNeeds.map((need, i) => (
                    <span
                      key={i}
                      className="text-[11px] bg-stone-950 text-stone-300 px-2 py-0.5 rounded border border-stone-800"
                    >
                      {need}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-800/80 text-[11px] text-stone-400 flex items-center justify-between">
              <span>Leader: {comm.communityLeaderContact}</span>
              <span className="text-amber-400 font-semibold">{comm.activeProjectsCount} Projects Active</span>
            </div>
          </div>
        ))}
      </div>

      {/* Register Community Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-stone-900 border border-stone-800 rounded-xl max-w-lg w-full p-6 shadow-2xl relative my-8 text-stone-100 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-white mb-4">Register New Settlement Community</h3>

            <form onSubmit={handleCreate} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-400 mb-1">Community Code</label>
                  <input
                    type="text"
                    required
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-400 mb-1">Zone / Sector</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Cluster E, Zone 4"
                    value={zone}
                    onChange={(e) => setZone(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-400 mb-1">Community Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kiryandongo Settlement — Ranch 18"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-400 mb-1">Estimated Population</label>
                  <input
                    type="number"
                    value={population}
                    onChange={(e) => setPopulation(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-400 mb-1">Water Access Index (%)</label>
                  <input
                    type="number"
                    value={waterAccess}
                    onChange={(e) => setWaterAccess(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-400 mb-1">Latitude</label>
                  <input
                    type="text"
                    value={lat}
                    onChange={(e) => setLat(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-400 mb-1">Longitude</label>
                  <input
                    type="text"
                    value={lng}
                    onChange={(e) => setLng(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-400 mb-1">Local Council / Elder Contact</label>
                <input
                  type="text"
                  placeholder="e.g. RWC Chairman / Women Committee Elder"
                  value={leader}
                  onChange={(e) => setLeader(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-400 mb-1">Field Assessment Notes</label>
                <textarea
                  rows={2}
                  placeholder="Context regarding recent displacement inflows, water table depth, or protection concerns..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs text-stone-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded cursor-pointer"
                >
                  Save Settlement Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
