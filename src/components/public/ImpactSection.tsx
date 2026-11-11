import React from 'react';
import { useApp } from '../../context/AppContext';
import { TRANSLATIONS } from '../../translations';
import { Users, Droplets, HeartHandshake, Laptop, CheckCircle2 } from 'lucide-react';

export const ImpactSection: React.FC = () => {
  const { language, cmsContent, setCurrentView, setDashboardTab } = useApp();
  const t = TRANSLATIONS[language];

  return (
    <section id="impact" className="py-20 bg-[#0a0f1d] border-b border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with 4-Color Accent Strip */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-amber-400 mb-2">
              <span className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              </span>
              <span>Verified Operational Indicators · 2024–2026</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              {t.nav.impact} — Measured Field Achievements
            </h2>
          </div>
          <div className="text-xs text-slate-400 max-w-md">
            All statistics are audited through SSH Monitoring, Evaluation & Learning (MEAL) logbooks
            and community verification assemblies.
          </div>
        </div>

        {/* Impact Cards Grid — 4 Pillars 4 Logo Colors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-12">
          {/* Card 1: People Supported (Royal Blue — Top-Left Petal) */}
          <div className="bg-[#0f172a] p-6 rounded-xl border border-slate-800 border-t-4 border-t-blue-500 flex flex-col justify-between shadow-lg hover:border-slate-700 transition-all">
            <div>
              <div className="w-10 h-10 rounded-lg bg-blue-500/15 text-blue-400 flex items-center justify-center mb-4 border border-blue-500/30">
                <Users className="w-5 h-5" />
              </div>
              <div className="text-4xl font-extrabold text-white font-mono tracking-tight tabular-nums">
                {cmsContent.statPeopleSupported.toLocaleString()}+
              </div>
              <div className="text-sm font-semibold text-blue-300 mt-2">
                {t.stats.reached}
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
              <span>Verified across 4 settlement clusters</span>
            </div>
          </div>

          {/* Card 2: Women in Leadership (Emerald Green — Bottom-Left Petal) */}
          <div className="bg-[#0f172a] p-6 rounded-xl border border-slate-800 border-t-4 border-t-emerald-500 flex flex-col justify-between shadow-lg hover:border-slate-700 transition-all">
            <div>
              <div className="w-10 h-10 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center mb-4 border border-emerald-500/30">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div className="text-4xl font-extrabold text-white font-mono tracking-tight tabular-nums">
                {cmsContent.statFemaleLeadershipPct}%
              </div>
              <div className="text-sm font-semibold text-emerald-300 mt-2">
                {t.stats.womenLead}
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Executive Director & Governance Parity</span>
            </div>
          </div>

          {/* Card 3: Safe Water Per Day (Sun Gold — Top-Right Petal) */}
          <div className="bg-[#0f172a] p-6 rounded-xl border border-slate-800 border-t-4 border-t-amber-400 flex flex-col justify-between shadow-lg hover:border-slate-700 transition-all">
            <div>
              <div className="w-10 h-10 rounded-lg bg-amber-500/15 text-amber-400 flex items-center justify-center mb-4 border border-amber-500/30">
                <Droplets className="w-5 h-5" />
              </div>
              <div className="text-4xl font-extrabold text-white font-mono tracking-tight tabular-nums">
                {(cmsContent.statWaterDailyLitres / 1000).toFixed(0)}k L
              </div>
              <div className="text-sm font-semibold text-amber-300 mt-2">
                {t.stats.waterDay}
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Solar borehole pipe reticulation</span>
            </div>
          </div>

          {/* Card 4: Youth Certified in SSH-LAB (Resilience Crimson Red — Bottom-Right Petal) */}
          <div className="bg-[#0f172a] p-6 rounded-xl border border-slate-800 border-t-4 border-t-rose-500 flex flex-col justify-between shadow-lg hover:border-slate-700 transition-all">
            <div>
              <div className="w-10 h-10 rounded-lg bg-rose-500/15 text-rose-400 flex items-center justify-center mb-4 border border-rose-500/30">
                <Laptop className="w-5 h-5" />
              </div>
              <div className="text-4xl font-extrabold text-white font-mono tracking-tight tabular-nums">
                {cmsContent.statYouthCertified}+
              </div>
              <div className="text-sm font-semibold text-rose-300 mt-2">
                {t.stats.youthLab}
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-rose-400" />
              <span>Solar tech, coding & peace mediation</span>
            </div>
          </div>
        </div>

        {/* Administration Source Note */}
        <div className="mt-10 p-4 rounded-xl bg-[#0f172a] border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-xs text-slate-400">
            <span className="font-semibold text-slate-300">Data Integrity Notice:</span>{' '}
            Metrics are synchronized live from the SSH MEAL database. Administrators can update
            verified counts through the CMS module in the Management Dashboard.
          </div>
          <button
            onClick={() => {
              setCurrentView('dashboard');
              setDashboardTab('cms');
            }}
            className="text-xs text-amber-400 hover:text-amber-300 underline font-semibold whitespace-nowrap cursor-pointer"
          >
            Manage Statistics in CMS →
          </button>
        </div>
      </div>
    </section>
  );
};
