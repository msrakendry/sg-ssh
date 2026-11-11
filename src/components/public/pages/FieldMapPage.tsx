import React from 'react';
import { useApp } from '../../../context/AppContext';
import { Breadcrumbs } from '../Breadcrumbs';
import { InteractiveMapSection } from '../InteractiveMapSection';
import { MapPin, Users, Droplets, AlertTriangle, CheckCircle2, Phone } from 'lucide-react';

export const FieldMapPage: React.FC = () => {
  const { setPublicPage, communities, engagements } = useApp();

  return (
    <div className="bg-[#070b14] text-slate-100 min-h-screen pb-24">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[{ label: 'Field Operations & GIS Map', isCurrent: true }]}
        pillarColor="green"
      />

      {/* Header */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800 bg-gradient-to-b from-[#09151c] to-[#070b14]">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs uppercase tracking-wider font-semibold text-emerald-400 mb-4">
            <MapPin className="w-3.5 h-3.5" />
            <span>GEO-REFERENCED FIELD INFRASTRUCTURE & SETTLEMENT COMMUNITIES</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-4xl [text-wrap:balance]">
            Kiryandongo Settlement GIS Operations Map
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            SSH maintains active field operations across 4 primary zones in Kiryandongo District, Uganda.
            Explore verified water access percentages, community vulnerability levels, and active field
            dialogue sessions.
          </p>
        </div>
      </section>

      {/* Interactive Map Component */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <InteractiveMapSection />
      </div>

      {/* Community Directory Grid */}
      <div id="communities" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-white">Settlement Communities Directory</h2>
            <p className="text-xs text-slate-400 mt-1">
              Field operational data with vulnerability classification and local leadership contacts.
            </p>
          </div>
          <span className="text-xs font-mono text-amber-400 font-bold bg-amber-500/10 px-3 py-1.5 rounded-lg border border-amber-500/30">
            {communities.length} Active Zones
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {communities.map((comm) => (
            <div
              key={comm.id}
              className="p-6 rounded-2xl bg-[#090f1d] border border-slate-800 space-y-4 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-mono text-xs font-bold text-amber-400">{comm.code}</span>
                  <h3 className="font-bold text-white text-base mt-0.5">{comm.name}</h3>
                </div>
                <span
                  className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${
                    comm.vulnerabilityLevel === 'Severe'
                      ? 'bg-rose-500/15 text-rose-300 border-rose-500/30'
                      : comm.vulnerabilityLevel === 'High'
                      ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                      : 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                  }`}
                >
                  {comm.vulnerabilityLevel} Vulnerability
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-slate-400 text-[10px]">Population</div>
                  <div className="font-bold text-white mt-0.5">{comm.populationEstimate.toLocaleString()}</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-slate-400 text-[10px]">Water Access</div>
                  <div className="font-bold text-blue-400 mt-0.5">{comm.waterAccessPercentage}%</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-slate-400 text-[10px]">Clean Energy</div>
                  <div className="font-bold text-amber-400 mt-0.5">{comm.cleanEnergyAccessPercentage}%</div>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span className="text-slate-400">GPS:</span>
                  <span className="font-mono text-slate-200">
                    {comm.coordinates[0].toFixed(4)}, {comm.coordinates[1].toFixed(4)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span className="text-slate-400">Leadership Contact:</span>
                  <span className="text-slate-200 font-medium">{comm.communityLeaderContact}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800">
                <div className="text-[11px] text-slate-400 font-semibold mb-1">Priority Community Needs:</div>
                <div className="flex flex-wrap gap-1.5">
                  {comm.priorityNeeds.map((need, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700"
                    >
                      {need}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
