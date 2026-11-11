import React from 'react';
import { useApp } from '../../context/AppContext';
import { TRANSLATIONS } from '../../translations';
import { Sparkles, Terminal, Wrench, Users, ArrowUpRight, Award, Lightbulb } from 'lucide-react';

export const SshLabSection: React.FC = () => {
  const { language, openProgramModal, openDonateModal } = useApp();
  const t = TRANSLATIONS[language];

  return (
    <section id="ssh-lab" className="py-24 bg-[#0a0f1d] text-slate-100 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#0c1427] via-[#0f172a] to-[#0c1427] rounded-3xl border border-amber-500/40 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          {/* Subtle 4-color ambient backdrop */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-xs uppercase tracking-widest font-bold text-amber-300">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>{t.sshLab.badge}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                {t.sshLab.title}
              </h2>

              <p className="text-slate-300 text-base leading-relaxed">
                {t.sshLab.desc}
              </p>

              {/* Guiding Philosophy Motto Box */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-amber-500/30 text-xs sm:text-sm text-amber-200/90 italic shadow-inner">
                “Displaced populations must never be viewed solely as beneficiaries of emergency rations.
                We are leaders, innovators, entrepreneurs, and the architects of future Sudan reconstruction.”
              </div>

              {/* 3 Core Tracks Reflecting Logo Colors */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-[#0f172a] border border-amber-500/30 hover:border-amber-400 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/15 text-amber-400 flex items-center justify-center mb-2 border border-amber-500/30">
                    <Wrench className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-white mb-1">
                    Solar Hardware & Circular Repairs
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Refurbishing dead solar inverters, lithium batteries, and water pump sensors.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#0f172a] border border-blue-500/30 hover:border-blue-400 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/15 text-blue-400 flex items-center justify-center mb-2 border border-blue-500/30">
                    <Terminal className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-white mb-1">
                    Digital Skills & Remote Freelance
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Teaching coding, digital translation, and connecting youth to global remote work.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#0f172a] border border-emerald-500/30 hover:border-emerald-400 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center mb-2 border border-emerald-500/30">
                    <Users className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-white mb-1">
                    Youth Peace Mediation Ambassadors
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Early-warning conflict mediation dialogues across multi-ethnic refugee groups.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  onClick={() => openProgramModal('ssh_lab')}
                  className="px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 shadow-lg shadow-amber-500/20"
                >
                  <span>Explore Lab Curriculum & Prototypes</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => openDonateModal('ssh_lab')}
                  className="px-5 py-3 text-xs font-semibold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-750 rounded-lg border border-blue-500/40 hover:border-blue-400 transition-colors cursor-pointer"
                >
                  Sponsor a Youth Scholar ($150)
                </button>
              </div>
            </div>

            {/* Right Column: Lab Spotlight Badge */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-[#0f172a] p-6 sm:p-7 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-xs font-mono uppercase text-amber-400 font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    LAB COHORT 2025/2026
                  </span>
                  <span className="text-[10px] bg-emerald-950 text-emerald-400 font-mono px-2 py-0.5 rounded border border-emerald-800 font-bold">
                    430 Certified
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Female Participation Rate:</span>
                    <span className="text-emerald-400 font-mono font-bold">64.5%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: '64.5%' }} />
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Remote Earning Transition (90 Days):</span>
                    <span className="text-blue-400 font-mono font-bold">78%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full rounded-full" style={{ width: '78%' }} />
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Inter-Communal Disputes Resolved:</span>
                    <span className="text-amber-400 font-mono font-bold">14 Cases</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
                  <Award className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Recognized by East Africa Youth Leadership Forum as a benchmark for localized,
                    refugee-led technological self-reliance.
                  </p>
                </div>
              </div>

              {/* Lab Hardware Kit Callout */}
              <div className="bg-[#090e17] p-4 rounded-xl border border-slate-800 flex items-center justify-between gap-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/15 text-amber-400 flex items-center justify-center border border-amber-500/30">
                    <Lightbulb className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white">Solar Diagnostic Toolkits</h5>
                    <p className="text-[11px] text-slate-400">100% open-source field schematics</p>
                  </div>
                </div>
                <button
                  onClick={() => openProgramModal('ssh_lab')}
                  className="text-xs text-amber-400 hover:text-amber-300 hover:underline font-semibold whitespace-nowrap cursor-pointer"
                >
                  View Blueprint →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
