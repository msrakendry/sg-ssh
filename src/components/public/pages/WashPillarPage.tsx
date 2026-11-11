import React from 'react';
import { useApp } from '../../../context/AppContext';
import { Breadcrumbs } from '../Breadcrumbs';
import { Droplets, CheckCircle2, ShieldCheck, ArrowRight, Gauge, Activity, MapPin, Heart } from 'lucide-react';

export const WashPillarPage: React.FC = () => {
  const { setPublicPage, openDonateModal, openFeedbackModal, projects } = useApp();
  const washProjects = projects.filter((p) => p.programPillar === 'wash');

  return (
    <div className="bg-[#070b14] text-slate-100 min-h-screen pb-24">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Programs & Pillars', page: 'programs' },
          { label: '01 · WASH & Clean Water', isCurrent: true },
        ]}
        pillarColor="blue"
      />

      {/* Header */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800 bg-gradient-to-b from-[#0a1428] via-[#091020] to-[#070b14] overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-950/80 border border-blue-500/40 text-xs uppercase tracking-wider font-semibold text-blue-300 mb-4">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <span>01 · PILLAR ONE — OFFICIAL TOP-LEFT BLUE PETAL</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-4xl [text-wrap:balance]">
            Water, Sanitation & Hygiene (WASH)
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Clean drinking water is the foundation of human survival and dignity. In Kiryandongo Settlement,
            SSH designs, installs, and maintains solar-powered deep boreholes and community sanitation
            infrastructure to end water poverty and reduce waterborne diseases.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={() => openDonateModal('wash')}
              className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-blue-400 via-sky-400 to-blue-500 hover:from-blue-300 hover:to-sky-300 rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2"
            >
              <Heart className="w-4 h-4 fill-slate-950" />
              <span>Fund a Water Point</span>
            </button>
            <button
              onClick={() => setPublicPage('map')}
              className="px-6 py-3 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors cursor-pointer flex items-center gap-2"
            >
              <MapPin className="w-4 h-4 text-blue-400" />
              <span>View Water Points on GIS Map</span>
            </button>
          </div>
        </div>
      </section>

      {/* Real-time Indicator Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-6 rounded-2xl bg-[#0a1224] border border-blue-500/30">
            <div className="text-3xl font-extrabold text-blue-400 font-mono">142,000 L</div>
            <div className="text-xs font-bold text-white mt-1">Daily Clean Water Delivered</div>
            <div className="text-[11px] text-slate-400 mt-1">Pumped via solar arrays into overhead reservoirs</div>
          </div>

          <div className="p-6 rounded-2xl bg-[#0a1224] border border-blue-500/30">
            <div className="text-3xl font-extrabold text-blue-400 font-mono">17.2 L</div>
            <div className="text-xs font-bold text-white mt-1">Per Person Per Day</div>
            <div className="text-[11px] text-slate-400 mt-1">Surpassing Sphere emergency threshold of 15 L</div>
          </div>

          <div className="p-6 rounded-2xl bg-[#0a1224] border border-blue-500/30">
            <div className="text-3xl font-extrabold text-blue-400 font-mono">8</div>
            <div className="text-xs font-bold text-white mt-1">Solar Boreholes Active</div>
            <div className="text-[11px] text-slate-400 mt-1">Zero diesel emissions, 100% solar uptime</div>
          </div>

          <div className="p-6 rounded-2xl bg-[#0a1224] border border-blue-500/30">
            <div className="text-3xl font-extrabold text-blue-400 font-mono">4,200</div>
            <div className="text-xs font-bold text-white mt-1">Dignity Kits Distributed</div>
            <div className="text-[11px] text-slate-400 mt-1">Reusable pads & hygiene supplies for women & girls</div>
          </div>
        </div>
      </div>

      {/* Deep-dive Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-6 text-slate-300 text-sm leading-relaxed">
            <h2 className="text-2xl font-bold text-white">How SSH Solves the Kiryandongo Water Crisis</h2>
            <p>
              When thousands of newly displaced families arrived following the war in Sudan, existing hand
              pumps in Ranch 1 and Ranch 37 broke down under massive queues. Displaced women and young girls
              waited up to six hours at night to fetch a single 20-liter jerrycan, facing severe physical
              exhaustion and protection dangers in unlit corridors.
            </p>
            <p>
              SSH intervened with solar water technology. Instead of relying on expensive, carbon-heavy
              diesel generators that frequently run dry of fuel, our youth engineering team drilled deep
              aquifers, erected galvanized elevated towers, and installed submersed helical solar pumps.
            </p>

            <h3 className="text-lg font-bold text-white pt-2">Community Water Governance Committees</h3>
            <p>
              Hardware alone never lasts without local stewardship. SSH trained 8 localized Water User
              Committees (WUCs), 75% staffed by displaced women. These committees collect micro-tariffs for
              preventative pump maintenance, maintain clean tap stands, and resolve queue disputes
              peacefully.
            </p>

            <div className="p-5 rounded-xl bg-blue-950/20 border border-blue-500/30 space-y-2">
              <div className="text-xs font-bold text-blue-300 uppercase tracking-wider">
                Emergency Influx Response Protocol:
              </div>
              <p className="text-xs text-slate-300">
                SSH maintains mobile ultra-filtration purification trailers ready for immediate deployment
                whenever sudden influx arrivals cause temporary settlement water strain.
              </p>
            </div>
          </div>

          {/* Active Projects in this Pillar */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-lg font-bold text-white">Active WASH Projects ({washProjects.length})</h3>
            <div className="space-y-4">
              {washProjects.map((prj) => (
                <div key={prj.id} className="p-5 rounded-2xl bg-[#091122] border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-blue-400">{prj.code}</span>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-blue-500/15 text-blue-300 border border-blue-500/30">
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
