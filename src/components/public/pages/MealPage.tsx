import React from 'react';
import { useApp } from '../../../context/AppContext';
import { Breadcrumbs } from '../Breadcrumbs';
import { TrendingUp, ShieldCheck, CheckCircle2, FileText, Download, Lock, Activity } from 'lucide-react';

export const MealPage: React.FC = () => {
  const { setPublicPage, mealIndicators, documents } = useApp();
  const mealDocs = documents.filter((d) => d.category === 'M&E Report' || d.category === 'Financial & Audit');

  return (
    <div className="bg-[#070b14] text-slate-100 min-h-screen pb-24">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[{ label: 'MEAL & Impact Matrix', isCurrent: true }]}
        pillarColor="gold"
      />

      {/* Header */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800 bg-gradient-to-b from-[#141208] to-[#070b14]">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-950/80 border border-amber-500/40 text-xs uppercase tracking-wider font-semibold text-amber-300 mb-4">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>MONITORING, EVALUATION, ACCOUNTABILITY & LEARNING (MEAL)</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-4xl [text-wrap:balance]">
            Verifiable Impact & Humanitarian Accountability
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            In humanitarian response, trust is earned through verifiable data. SSH tracks every project
            against global Sphere standards with independent means of verification, transparent beneficiary
            feedback loops, and strict privacy safeguards.
          </p>
        </div>
      </section>

      {/* Indicator Matrix Table */}
      <div id="indicators" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-white">Live MEAL Indicator Matrix</h2>
            <p className="text-xs text-slate-400 mt-1">
              Real-time progress tracked against donor-approved targets and Sphere humanitarian standards.
            </p>
          </div>
          <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/30">
            {mealIndicators.length} Verifiable Metrics
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mealIndicators.map((ind) => {
            const pct = Math.min(100, Math.round((ind.actualAchieved / ind.targetValue) * 100));
            const pillarColor = {
              wash: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
              livelihoods: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
              energy_climate: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
              education: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
              ssh_lab: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30',
              peacebuilding: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
            }[ind.pillar];

            return (
              <div
                key={ind.id}
                className="p-6 rounded-2xl bg-[#090e1a] border border-slate-800 space-y-4 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-slate-400">{ind.code}</span>
                  <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${pillarColor}`}>
                    {ind.pillar.replace('_', ' ')}
                  </span>
                </div>

                <h3 className="font-bold text-white text-sm leading-snug">{ind.indicatorText}</h3>

                {/* Progress bar */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Progress:</span>
                    <span className="font-mono font-bold text-white">
                      {ind.actualAchieved.toLocaleString()} / {ind.targetValue.toLocaleString()} {ind.unit} ({pct}%)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Verification: <strong className="text-slate-300">{ind.meansOfVerification}</strong></span>
                  <span className="text-slate-500">{ind.frequency}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Beneficiary Privacy Protection Charter */}
      <div id="accountability" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="p-8 rounded-3xl bg-[#09101f] border border-slate-800 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Beneficiary Privacy & Informed Consent Charter</h3>
              <p className="text-xs text-slate-400">
                Adhering to strict do-no-harm principles and international data privacy protection.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-300 leading-relaxed">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="font-bold text-white block">Automatic PII Masking</span>
              <p className="text-slate-400">
                All beneficiary full names, phone numbers, and exact shelter addresses are encrypted and
                auto-masked with unique alphanumeric tokens (e.g., KYR-BEN-8921).
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="font-bold text-white block">Informed Written / Oral Assent</span>
              <p className="text-slate-400">
                Assistance is never conditional on photographic or biometric consent. Beneficiaries retain
                full rights to opt out of media and impact case studies at any time.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="font-bold text-white block">Hostinger Sovereign Data Residency</span>
              <p className="text-slate-400">
                Data is housed in encrypted MariaDB/MySQL databases with role-based policies (RBAC) and
                immutable audit logs for every query or export.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
