import React from 'react';
import { useApp } from '../../../context/AppContext';
import { Breadcrumbs } from '../Breadcrumbs';
import { Users, TrendingUp, Coins, CheckCircle2, ArrowRight, Heart, Sparkles } from 'lucide-react';

export const LivelihoodsPillarPage: React.FC = () => {
  const { setPublicPage, openDonateModal, projects } = useApp();
  const livelihoodsProjects = projects.filter((p) => p.programPillar === 'livelihoods');

  return (
    <div className="bg-[#070b14] text-slate-100 min-h-screen pb-24">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Programs & Pillars', page: 'programs' },
          { label: '02 · Livelihoods & Women VSLAs', isCurrent: true },
        ]}
        pillarColor="green"
      />

      {/* Header */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800 bg-gradient-to-b from-[#091a14] via-[#081310] to-[#070b14] overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-xs uppercase tracking-wider font-semibold text-emerald-300 mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>02 · PILLAR TWO — OFFICIAL BOTTOM-LEFT GREEN PETAL</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-4xl [text-wrap:balance]">
            Livelihoods & Economic Empowerment
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Dignity requires an income. SSH operates 18 Village Savings and Loan Associations (VSLAs),
            provides revolving seed-capital grants, and trains displaced women and youth in high-demand
            micro-enterprises to build lasting financial independence.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={() => openDonateModal('livelihoods')}
              className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 hover:from-emerald-300 hover:to-teal-300 rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2"
            >
              <Heart className="w-4 h-4 fill-slate-950" />
              <span>Fund a Women’s VSLA Cooperative</span>
            </button>
            <button
              onClick={() => setPublicPage('meal')}
              className="px-6 py-3 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors cursor-pointer"
            >
              View Verified MEAL Indicators
            </button>
          </div>
        </div>
      </section>

      {/* Real-time Indicator Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-6 rounded-2xl bg-[#081812] border border-emerald-500/30">
            <div className="text-3xl font-extrabold text-emerald-400 font-mono">18</div>
            <div className="text-xs font-bold text-white mt-1">Active Women VSLAs</div>
            <div className="text-[11px] text-slate-400 mt-1">Self-managed savings groups with dual-key passboxes</div>
          </div>

          <div className="p-6 rounded-2xl bg-[#081812] border border-emerald-500/30">
            <div className="text-3xl font-extrabold text-emerald-400 font-mono">$42,500</div>
            <div className="text-xs font-bold text-white mt-1">Revolving Seed Capital</div>
            <div className="text-[11px] text-slate-400 mt-1">Total accumulated savings & loan fund in circulation</div>
          </div>

          <div className="p-6 rounded-2xl bg-[#081812] border border-emerald-500/30">
            <div className="text-3xl font-extrabold text-emerald-400 font-mono">98.4%</div>
            <div className="text-xs font-bold text-white mt-1">On-Time Loan Repayment</div>
            <div className="text-[11px] text-slate-400 mt-1">Peer accountability & social solidarity guarantee</div>
          </div>

          <div className="p-6 rounded-2xl bg-[#081812] border border-emerald-500/30">
            <div className="text-3xl font-extrabold text-emerald-400 font-mono">480+</div>
            <div className="text-xs font-bold text-white mt-1">Women Micro-Entrepreneurs</div>
            <div className="text-[11px] text-slate-400 mt-1">Soap-making, tailoring, food kiosks, and horticulture</div>
          </div>
        </div>
      </div>

      {/* Narrative & Projects */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-6 text-slate-300 text-sm leading-relaxed">
            <h2 className="text-2xl font-bold text-white">From Rations to Financial Autonomy</h2>
            <p>
              Food rations provided in displacement settlements decline over time due to global humanitarian
              budget cuts. Without access to formal bank accounts or collateral, displaced women are locked
              out of commercial credit.
            </p>
            <p>
              SSH solves this through community-owned Village Savings and Loan Associations (VSLAs). Each
              group of 25–30 women meets weekly to save shares, purchase emergency social insurance, and
              issue small loans for income-generating activities.
            </p>

            <h3 className="text-lg font-bold text-white pt-2">Integrated Micro-Agribusiness Value Chains</h3>
            <p>
              In Bweyale and Ranch 1, SSH negotiated access to communal farming land plots where women grow
              drought-tolerant legumes, sesame, and vegetables. By connecting producers directly to Bweyale
              central market, middlemen are eliminated, increasing net family incomes by 140%.
            </p>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-lg font-bold text-white">Active Livelihoods Projects ({livelihoodsProjects.length})</h3>
            <div className="space-y-4">
              {livelihoodsProjects.map((prj) => (
                <div key={prj.id} className="p-5 rounded-2xl bg-[#081410] border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-emerald-400">{prj.code}</span>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                      {prj.status}
                    </span>
                  </div>
                  <h4 className="font-bold text-white text-sm">{prj.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{prj.summary}</p>
                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-400">Target: <strong className="text-white">{prj.targetBeneficiaries.toLocaleString()} beneficiaries</strong></span>
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
