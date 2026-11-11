import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Breadcrumbs } from '../Breadcrumbs';
import { ProgramPillar } from '../../../types';
import {
  Droplets,
  Coins,
  Sun,
  BookOpen,
  Sparkles,
  Search,
  Filter,
  ArrowRight,
  Heart,
  DollarSign,
  Users,
  MapPin,
} from 'lucide-react';

export const ProgramsPage: React.FC = () => {
  const { setPublicPage, openDonateModal, openProgramModal, projects, programs } = useApp();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = projects.filter((prj) => {
    const matchesPillar = selectedFilter === 'all' || prj.programPillar === selectedFilter;
    const matchesSearch =
      prj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prj.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prj.settlement.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPillar && matchesSearch;
  });

  return (
    <div className="bg-[#070b14] text-slate-100 min-h-screen pb-24">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[{ label: 'Programs & Pillars', isCurrent: true }]}
        pillarColor="gold"
      />

      {/* Header */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800 bg-gradient-to-b from-[#0c1424] to-[#070b14]">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs uppercase tracking-wider font-semibold text-amber-400 mb-4">
            <span>Humanitarian Response & Sustainable Development Architecture</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-4xl [text-wrap:balance]">
            Our Core Programs & Projects Portfolio
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            SSH operates across 4 interconnected pillars grounded in lived refugee experience, plus our
            flagship innovation hub SSH-LAB. Explore detailed project briefs, beneficiary targets, and
            transparent budget allocations below.
          </p>

          {/* 4 Pillar Quick Links */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button
              onClick={() => setPublicPage('wash')}
              className="p-3.5 rounded-xl bg-blue-950/20 hover:bg-blue-950/40 border border-blue-500/40 transition-all text-left cursor-pointer group"
            >
              <div className="flex items-center gap-2 text-xs font-bold text-blue-400">
                <Droplets className="w-4 h-4" />
                <span>01 · WASH</span>
              </div>
              <div className="text-[11px] text-slate-300 mt-1">Solar Boreholes & Kits</div>
            </button>

            <button
              onClick={() => setPublicPage('livelihoods')}
              className="p-3.5 rounded-xl bg-emerald-950/20 hover:bg-emerald-950/40 border border-emerald-500/40 transition-all text-left cursor-pointer group"
            >
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                <Coins className="w-4 h-4" />
                <span>02 · Livelihoods</span>
              </div>
              <div className="text-[11px] text-slate-300 mt-1">18 Women VSLAs & Agribusiness</div>
            </button>

            <button
              onClick={() => setPublicPage('energy')}
              className="p-3.5 rounded-xl bg-amber-950/20 hover:bg-amber-950/40 border border-amber-500/40 transition-all text-left cursor-pointer group"
            >
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                <Sun className="w-4 h-4" />
                <span>03 · Clean Energy</span>
              </div>
              <div className="text-[11px] text-slate-300 mt-1">Bio-Briquettes & Reforestation</div>
            </button>

            <button
              onClick={() => setPublicPage('education')}
              className="p-3.5 rounded-xl bg-rose-950/20 hover:bg-rose-950/40 border border-rose-500/40 transition-all text-left cursor-pointer group"
            >
              <div className="flex items-center gap-2 text-xs font-bold text-rose-400">
                <BookOpen className="w-4 h-4" />
                <span>04 · Education</span>
              </div>
              <div className="text-[11px] text-slate-300 mt-1">Accelerated Learning & Trauma Care</div>
            </button>
          </div>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="p-4 rounded-2xl bg-[#090e1a] border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Pillar Filters */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {[
              { id: 'all', label: 'All Projects' },
              { id: 'wash', label: '01 WASH' },
              { id: 'livelihoods', label: '02 Livelihoods' },
              { id: 'energy_climate', label: '03 Energy' },
              { id: 'education', label: '04 Education' },
              { id: 'ssh_lab', label: 'SSH-LAB' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFilter(f.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  selectedFilter === f.id
                    ? 'bg-amber-400 text-slate-950 font-bold'
                    : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#060a12] border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((prj) => {
            const pillarColorBadge = {
              wash: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
              livelihoods: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
              energy_climate: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
              education: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
              ssh_lab: 'bg-yellow-500/15 text-amber-300 border-yellow-500/30',
              peacebuilding: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
            }[prj.programPillar];

            return (
              <div
                key={prj.id}
                className="p-6 rounded-2xl bg-[#090e1a] border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4 shadow-sm"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs font-bold text-amber-400">{prj.code}</span>
                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${pillarColorBadge}`}>
                      {prj.programPillar.replace('_', ' ')}
                    </span>
                  </div>

                  <h3 className="font-bold text-white text-base leading-snug">{prj.title}</h3>

                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                    {prj.summary}
                  </p>

                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="truncate">{prj.settlement}, {prj.locationDetails}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800/80 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Target Beneficiaries:</span>
                    <span className="font-bold text-white">{prj.targetBeneficiaries.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Budget Allocation:</span>
                    <span className="font-mono font-bold text-emerald-400">${prj.budgetUSD.toLocaleString()}</span>
                  </div>

                  <div className="pt-2 flex items-center gap-2">
                    <button
                      onClick={() => openProgramModal(prj.programPillar)}
                      className="flex-1 py-2 text-center text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-750 rounded-lg border border-slate-700 transition-colors cursor-pointer"
                    >
                      Details & Outputs
                    </button>
                    <button
                      onClick={() => openDonateModal(prj.programPillar)}
                      className="px-3 py-2 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 rounded-lg transition-colors cursor-pointer"
                      title="Fund this project"
                    >
                      Fund
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
