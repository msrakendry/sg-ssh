import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  FolderKanban,
  Users,
  Coins,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowRight,
  Droplets,
  HeartHandshake,
  TrendingUp,
} from 'lucide-react';

export const ExecutiveOverview: React.FC = () => {
  const {
    projects,
    communities,
    beneficiaries,
    feedbackCases,
    mealIndicators,
    donors,
    auditLogs,
    setDashboardTab,
    activeRole,
  } = useApp();

  const totalBudget = projects.reduce((acc, p) => acc + p.budgetUSD, 0);
  const totalSpent = projects.reduce((acc, p) => acc + p.spentUSD, 0);
  const totalBeneficiaries = projects.reduce((acc, p) => acc + p.actualBeneficiaries, 0);
  const openCases = feedbackCases.filter((c) => c.status === 'Open' || c.status === 'Investigating');
  const criticalSafeguarding = feedbackCases.filter(
    (c) => c.priority === 'Critical Safeguarding' && c.status !== 'Closed'
  );

  return (
    <div className="space-y-8">
      {/* Executive Welcome & Traffic Light Compliance Alert */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-[#0f172a] border border-slate-800 shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-amber-400 font-bold mb-1">
            <span className="flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            </span>
            <span>INSTITUTIONAL PERFORMANCE DASHBOARD</span>
            <span aria-hidden="true">·</span>
            <span>JURISDICTION: KIRYANDONGO REFUGEE SETTLEMENT</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">
            Operational Overview & Strategic Indicators
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Monitoring active humanitarian-development nexus across WASH, Livelihoods, Energy & Youth Education.
          </p>
        </div>

        {/* Traffic Light Compliance Status */}
        <div className="flex items-center gap-3 p-3 rounded-xl bg-[#070b14] border border-slate-800 shrink-0 shadow-inner">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" title="Programs On-Track" />
            <span className="text-xs font-bold text-white">System: ON-TRACK</span>
          </div>
          <span className="text-slate-700">|</span>
          <div className="text-[11px] text-slate-400">
            {criticalSafeguarding.length > 0 ? (
              <span className="text-rose-400 font-bold">{criticalSafeguarding.length} Safeguarding Alert</span>
            ) : (
              <span className="text-emerald-400 font-semibold">0 Critical Alerts</span>
            )}
          </div>
        </div>
      </div>

      {/* Top 4 Primary KPI Metric Cards — 4 Logo Colors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* KPI 1: Active Field Projects (Royal Blue) */}
        <div className="p-6 rounded-2xl bg-[#0f172a] border border-slate-800 border-t-4 border-t-blue-500 flex flex-col justify-between shadow-lg hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold text-slate-300">Active Field Projects</span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/15 text-blue-400 flex items-center justify-center border border-blue-500/30">
              <FolderKanban className="w-4 h-4" />
            </div>
          </div>
          <div className="my-3">
            <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tabular-nums">
              {projects.filter((p) => p.status === 'active').length}
            </div>
            <div className="text-xs text-blue-300 mt-1 font-medium">
              Out of {projects.length} total registered
            </div>
          </div>
          <button
            onClick={() => setDashboardTab('projects')}
            className="text-xs text-blue-400 hover:text-blue-300 hover:underline font-semibold flex items-center gap-1 cursor-pointer pt-2 border-t border-slate-800"
          >
            <span>View Projects Pipeline</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* KPI 2: Verified Beneficiaries (Emerald Green) */}
        <div className="p-6 rounded-2xl bg-[#0f172a] border border-slate-800 border-t-4 border-t-emerald-500 flex flex-col justify-between shadow-lg hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold text-slate-300">Verified Beneficiaries</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="my-3">
            <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tabular-nums">
              {totalBeneficiaries.toLocaleString()}
            </div>
            <div className="text-xs text-emerald-300 mt-1 font-medium">
              71.4% female participation
            </div>
          </div>
          <button
            onClick={() => setDashboardTab('beneficiaries')}
            className="text-xs text-emerald-400 hover:text-emerald-300 hover:underline font-semibold flex items-center gap-1 cursor-pointer pt-2 border-t border-slate-800"
          >
            <span>Inspect Protected Registry</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* KPI 3: Program Budget & Expenditure (Sun Gold) */}
        <div className="p-6 rounded-2xl bg-[#0f172a] border border-slate-800 border-t-4 border-t-amber-400 flex flex-col justify-between shadow-lg hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold text-slate-300">Budget Execution</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/15 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <Coins className="w-4 h-4" />
            </div>
          </div>
          <div className="my-3">
            <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tabular-nums">
              ${(totalSpent / 1000).toFixed(0)}k
            </div>
            <div className="text-xs text-amber-300 mt-1 font-medium">
              of ${totalBudget.toLocaleString()} approved ({((totalSpent / totalBudget) * 100).toFixed(0)}%)
            </div>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mt-1">
            <div
              className="bg-gradient-to-r from-amber-400 to-yellow-400 h-full rounded-full"
              style={{ width: `${(totalSpent / totalBudget) * 100}%` }}
            />
          </div>
        </div>

        {/* KPI 4: Community Feedback / Complaints (Crimson Red) */}
        <div className="p-6 rounded-2xl bg-[#0f172a] border border-slate-800 border-t-4 border-t-rose-500 flex flex-col justify-between shadow-lg hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold text-slate-300">Accountability Desk</span>
            <div className="w-8 h-8 rounded-lg bg-rose-500/15 text-rose-400 flex items-center justify-center border border-rose-500/30">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <div className="my-3">
            <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tabular-nums">
              {openCases.length}
            </div>
            <div className="text-xs mt-1">
              {criticalSafeguarding.length > 0 ? (
                <span className="text-rose-400 font-bold">{criticalSafeguarding.length} Critical Safeguarding</span>
              ) : (
                <span className="text-slate-400">Under routine field investigation</span>
              )}
            </div>
          </div>
          <button
            onClick={() => setDashboardTab('feedback')}
            className="text-xs text-rose-400 hover:text-rose-300 hover:underline font-semibold flex items-center gap-1 cursor-pointer pt-2 border-t border-slate-800"
          >
            <span>Triage Community Cases</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Program Performance vs MEAL Targets Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Key Active Projects Matrix */}
        <div className="lg:col-span-7 bg-[#0f172a] rounded-2xl border border-slate-800 p-6 sm:p-7 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-sm font-bold text-white">Active Operational Projects</h3>
              <p className="text-xs text-slate-400">Current progress against verified beneficiary targets</p>
            </div>
            <button
              onClick={() => setDashboardTab('projects')}
              className="text-xs text-amber-400 hover:text-amber-300 hover:underline font-semibold cursor-pointer"
            >
              All Projects ({projects.length}) →
            </button>
          </div>

          <div className="space-y-3">
            {projects.slice(0, 4).map((project) => {
              const pct = Math.min(
                100,
                Math.round((project.actualBeneficiaries / project.targetBeneficiaries) * 100)
              );
              return (
                <div key={project.id} className="p-4 rounded-xl bg-[#070b14] border border-slate-800/80 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-amber-400 font-bold">{project.code}</span>
                    <span className="text-[11px] font-mono text-emerald-400 uppercase bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-900 font-bold">
                      {project.status}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-white">{project.title}</h4>

                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>Manager: {project.projectManager}</span>
                    <span className="font-mono text-slate-300">
                      {project.actualBeneficiaries.toLocaleString()} / {project.targetBeneficiaries.toLocaleString()} beneficiaries ({pct}%)
                    </span>
                  </div>

                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-500 via-emerald-500 to-amber-400 h-full rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Key MEAL Indicators & Recent Audit Trail */}
        <div className="lg:col-span-5 space-y-6">
          {/* MEAL Quick Overview */}
          <div className="bg-[#0f172a] rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span>Strategic MEAL Indicators</span>
              </h3>
              <button
                onClick={() => setDashboardTab('meal')}
                className="text-xs text-amber-400 hover:text-amber-300 hover:underline font-semibold cursor-pointer"
              >
                Full Matrix →
              </button>
            </div>

            <div className="space-y-3">
              {mealIndicators.slice(0, 3).map((ind) => (
                <div key={ind.id} className="p-3.5 rounded-xl bg-[#070b14] border border-slate-800 text-xs space-y-1">
                  <div className="flex items-center justify-between font-mono text-[11px]">
                    <span className="text-amber-400 font-bold">{ind.code}</span>
                    <span className="text-slate-200 font-bold">
                      {ind.actualAchieved} / {ind.targetValue} {ind.unit}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-tight truncate">
                    {ind.indicatorText}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Real-time Audit Trail Preview */}
          <div className="bg-[#0f172a] rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white">Recent Immutable Audit Trail</h3>
              <button
                onClick={() => setDashboardTab('audit_logs')}
                className="text-xs text-amber-400 hover:text-amber-300 hover:underline font-semibold cursor-pointer"
              >
                All Logs →
              </button>
            </div>

            <div className="space-y-2">
              {auditLogs.slice(0, 3).map((log) => (
                <div key={log.id} className="text-xs p-2.5 rounded-lg bg-[#070b14] border border-slate-800 space-y-0.5">
                  <div className="flex items-center justify-between font-mono text-[10px] text-slate-400">
                    <span className="text-amber-400 font-bold">{log.action}</span>
                    <span>{log.timestamp.split(' ')[1]}</span>
                  </div>
                  <div className="text-[11px] text-slate-300 truncate">
                    <span className="font-semibold text-white">{log.userName}:</span> {log.details}
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
