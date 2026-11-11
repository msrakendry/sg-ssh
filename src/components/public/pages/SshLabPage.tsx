import React from 'react';
import { useApp } from '../../../context/AppContext';
import { Breadcrumbs } from '../Breadcrumbs';
import { Sparkles, Terminal, Wrench, Shield, Compass, Heart, ArrowRight, CheckCircle2 } from 'lucide-react';

export const SshLabPage: React.FC = () => {
  const { setPublicPage, openDonateModal, openFeedbackModal } = useApp();

  return (
    <div className="bg-[#070b14] text-slate-100 min-h-screen pb-24">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[{ label: 'SSH-LAB Innovation & Peace', isCurrent: true }]}
        pillarColor="center-gold"
      />

      {/* Header */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800 bg-gradient-to-b from-[#1c1606] via-[#120e06] to-[#070b14] overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-950/80 border border-amber-500/50 text-xs uppercase tracking-wider font-semibold text-amber-300 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>YOUTH INNOVATION, TECH & POST-WAR RECONSTRUCTION PREPAREDNESS</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-4xl [text-wrap:balance]">
            SSH-LAB: Displaced Youth as Problem-Solvers
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            SSH-LAB is the innovation and technology engine of Sudan Sustainability Hub. Displaced youth
            are equipped with digital coding skills, hardware and solar repair expertise, anti-conflict
            mediation training, and skills to prepare for future post-conflict reconstruction.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={() => openDonateModal('ssh_lab')}
              className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2"
            >
              <Heart className="w-4 h-4 fill-slate-950" />
              <span>Sponsor a Youth Innovator ($40/month)</span>
            </button>
            <button
              onClick={() => setPublicPage('governance')}
              className="px-6 py-3 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors cursor-pointer"
            >
              Hostinger & Open Source Blueprint
            </button>
          </div>
        </div>
      </section>

      {/* 4 Lab Tracks Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Track 1: Youth Coding & Digital Livelihoods */}
          <div id="coding" className="p-8 rounded-3xl bg-[#090f1d] border border-blue-500/30 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
              <Terminal className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">01 · Youth Coding & Web Development</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              War displaced university students across computer science and engineering faculties. SSH-LAB
              provides laptops, offline learning caches, and fiber-connected coding bootcamps teaching
              full-stack web development (PHP, Laravel, TypeScript, Tailwind) to enable displaced youth to
              earn remote income.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-blue-400 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>430 youth certified across 3 Kiryandongo cohorts</span>
            </div>
          </div>

          {/* Track 2: Green Fabrication & Solar Maintenance */}
          <div id="fabrication" className="p-8 rounded-3xl bg-[#091512] border border-emerald-500/30 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <Wrench className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">02 · Green Tech & Solar Hardware Lab</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Solar pumps and inverters break down when settlements lack spare parts technicians. SSH-LAB
              trains young female and male mechanics in multimeter diagnostics, lithium battery re-celling,
              and submersed helical pump maintenance, keeping our 8 water boreholes at 100% operational uptime.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-emerald-400 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Zero diesel reliance — 100% solar maintained by youth</span>
            </div>
          </div>

          {/* Track 3: Youth Peacebuilding & Anti-Conflict Mediation */}
          <div id="peacebuilding" className="p-8 rounded-3xl bg-[#181108] border border-amber-500/30 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-600/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">03 · Youth Peacebuilding & Anti-Conflict</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Trauma and resource scarcity can fuel inter-communal friction between diverse Sudanese ethnic
              groups and host communities. SSH youth peace ambassadors lead regular campfire dialogues,
              football-for-peace tournaments, and collaborative community service projects.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-amber-400 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>32 verified field community engagement sessions conducted</span>
            </div>
          </div>

          {/* Track 4: Sudan Reconstruction Preparedness */}
          <div id="reconstruction" className="p-8 rounded-3xl bg-[#170a0e] border border-rose-500/30 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-600/20 text-rose-400 flex items-center justify-center border border-rose-500/30">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">04 · Sudan Reconstruction Taskforce</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              When the war in Sudan ends, our country will need young leaders ready to rebuild destroyed water
              grids, municipal services, local cooperatives, and transparent digital public administration.
              SSH-LAB documents every engineering blueprint to be open-sourced and replicable upon return.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-rose-400 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Open-source Hostinger & Laravel architecture for rapid deployment</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
