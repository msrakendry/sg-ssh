import React from 'react';
import { useApp } from '../../../context/AppContext';
import { Breadcrumbs } from '../Breadcrumbs';
import { Sun, Leaf, Flame, ArrowRight, Heart, Sparkles, CheckCircle2 } from 'lucide-react';

export const EnergyPillarPage: React.FC = () => {
  const { setPublicPage, openDonateModal, projects } = useApp();
  const energyProjects = projects.filter((p) => p.programPillar === 'energy_climate');

  return (
    <div className="bg-[#070b14] text-slate-100 min-h-screen pb-24">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Programs & Pillars', page: 'programs' },
          { label: '03 · Energy & Climate Resilience', isCurrent: true },
        ]}
        pillarColor="gold"
      />

      {/* Header */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800 bg-gradient-to-b from-[#1a1409] via-[#120e06] to-[#070b14] overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-amber-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-950/80 border border-amber-500/40 text-xs uppercase tracking-wider font-semibold text-amber-300 mb-4">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span>03 · PILLAR THREE — OFFICIAL TOP-RIGHT GOLD PETAL</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-4xl [text-wrap:balance]">
            Renewable Energy & Climate Resilience
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Severe deforestation and fuel poverty threaten both refugee safety and host community relations.
            SSH pioneers smokeless agricultural bio-briquettes, community solar kiosks, and aggressive
            agroforestry reforestation across Kiryandongo.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={() => openDonateModal('energy_climate')}
              className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2"
            >
              <Heart className="w-4 h-4 fill-slate-950" />
              <span>Plant Agroforestry Trees ($5/tree)</span>
            </button>
            <button
              onClick={() => setPublicPage('ssh_lab')}
              className="px-6 py-3 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors cursor-pointer"
            >
              Explore SSH-LAB Solar Repairs
            </button>
          </div>
        </div>
      </section>

      {/* Real-time Indicator Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-6 rounded-2xl bg-[#161006] border border-amber-500/30">
            <div className="text-3xl font-extrabold text-amber-400 font-mono">8,400</div>
            <div className="text-xs font-bold text-white mt-1">Trees Planted & Monitored</div>
            <div className="text-[11px] text-slate-400 mt-1">Indigenous acacia, moringa, and fruit trees</div>
          </div>

          <div className="p-6 rounded-2xl bg-[#161006] border border-amber-500/30">
            <div className="text-3xl font-extrabold text-amber-400 font-mono">1,250</div>
            <div className="text-xs font-bold text-white mt-1">Households Using Bio-Briquettes</div>
            <div className="text-[11px] text-slate-400 mt-1">Replacing toxic charcoal & hazardous firewood</div>
          </div>

          <div className="p-6 rounded-2xl bg-[#161006] border border-amber-500/30">
            <div className="text-3xl font-extrabold text-amber-400 font-mono">3</div>
            <div className="text-xs font-bold text-white mt-1">Communal Solar Charging Kiosks</div>
            <div className="text-[11px] text-slate-400 mt-1">Powering phones, lanterns, and medical nebulizers</div>
          </div>

          <div className="p-6 rounded-2xl bg-[#161006] border border-amber-500/30">
            <div className="text-3xl font-extrabold text-amber-400 font-mono">68%</div>
            <div className="text-xs font-bold text-white mt-1">Firewood Collection Reduction</div>
            <div className="text-[11px] text-slate-400 mt-1">Significantly decreasing protection risks for women</div>
          </div>
        </div>
      </div>

      {/* Narrative & Projects */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-6 text-slate-300 text-sm leading-relaxed">
            <h2 className="text-2xl font-bold text-white">Clean Energy as a Protection Shield</h2>
            <p>
              In refugee settlements, cooking energy is rarely provided by aid agencies. Displaced women are
              forced to walk 8 to 15 kilometers into unpatrolled bush areas to collect firewood. This exposes
              them to extreme gender-based violence (GBV), snakebites, and conflicts with local host
              landowners.
            </p>
            <p>
              SSH turns agricultural waste (maize cobs, groundnut shells, and bagasse) into dense, smokeless
              carbonized bio-briquettes. Manufactured by youth-led cooperatives in Kiryandongo, these
              briquettes burn longer and hotter than traditional charcoal at half the cost.
            </p>

            <h3 className="text-lg font-bold text-white pt-2">Community Agroforestry Nurseries</h3>
            <p>
              To heal depleted settlement soils and rebuild tree canopy, SSH operates two community tree
              nurseries producing moringa, fruit trees (mango, papaya, avocado), and indigenous timber. Every
              household that adopts a tree nursery plot receives continuous agricultural extension guidance
              from SSH field agronomists.
            </p>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-lg font-bold text-white">Active Energy & Climate Projects ({energyProjects.length})</h3>
            <div className="space-y-4">
              {energyProjects.map((prj) => (
                <div key={prj.id} className="p-5 rounded-2xl bg-[#120e06] border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-amber-400">{prj.code}</span>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
                      {prj.status}
                    </span>
                  </div>
                  <h4 className="font-bold text-white text-sm">{prj.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{prj.summary}</p>
                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-400">Target: <strong className="text-white">{prj.targetBeneficiaries.toLocaleString()} people</strong></span>
                    <span className="font-mono text-emerald-400 font-bold">${prj.budgetUSD.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
