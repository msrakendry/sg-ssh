import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, CheckCircle, ArrowRight, Heart, Users, Target, ShieldCheck } from 'lucide-react';

export const ProgramDetailModal: React.FC = () => {
  const { selectedProgramModal, closeProgramModal, programs, projects, openDonateModal, language } = useApp();

  if (!selectedProgramModal) return null;

  const program = programs.find((p) => p.pillar === selectedProgramModal);
  if (!program) return null;

  const relatedProjects = projects.filter((prj) => prj.programPillar === program.pillar);
  const isAr = language === 'ar';

  const getPillarPillColor = (pillar: string) => {
    switch (pillar) {
      case 'wash':
        return 'text-blue-400 bg-blue-950/60 border-blue-500/40';
      case 'livelihoods':
        return 'text-emerald-400 bg-emerald-950/60 border-emerald-500/40';
      case 'energy_climate':
        return 'text-amber-400 bg-amber-950/60 border-amber-500/40';
      case 'education':
        return 'text-rose-400 bg-rose-950/60 border-rose-500/40';
      default:
        return 'text-amber-400 bg-amber-950/60 border-amber-500/40';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#05080f]/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#0f172a] border border-slate-800 rounded-2xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative my-8 text-slate-100 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={closeProgramModal}
          className="absolute top-4 right-4 p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Program Header */}
        <div className="border-b border-slate-800 pb-6 mb-6">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase font-bold mb-2">
            <span className={`px-2.5 py-0.5 rounded border ${getPillarPillColor(program.pillar)}`}>
              PILLAR: {program.pillar.toUpperCase()}
            </span>
            <span className="text-slate-500">·</span>
            <span className="text-slate-400">OFFICIAL DOSSIER</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            {isAr ? program.titleAr : program.title}
          </h2>
          <p className="text-sm text-amber-400 font-medium mt-1">
            {isAr ? program.subtitleAr : program.subtitle}
          </p>
        </div>

        <div className="space-y-6 text-sm text-slate-300">
          {/* Problem Statement & SSH Localized Approach */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#070b14] border border-rose-500/30 shadow-inner">
              <h4 className="text-xs font-bold uppercase tracking-wider mb-2 text-rose-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                <span>The Displaced Community Challenge</span>
              </h4>
              <p className="text-xs leading-relaxed text-slate-300">
                Protracted conflict in Sudan has severed essential infrastructure. Displaced families in
                refugee settlements encounter acute water deficits, gender-based risks during fuel gathering,
                educational disruption, and economic exhaustion.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#070b14] border border-emerald-500/30 shadow-inner">
              <h4 className="text-xs font-bold uppercase tracking-wider mb-2 text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>The SSH Localized Approach</span>
              </h4>
              <p className="text-xs leading-relaxed text-slate-300">
                Rather than perpetual short-term relief, SSH constructs permanent, community-owned assets:
                solar water reticulation, women-managed revolving funds, renewable briquettes, and refugee
                youth technology leadership.
              </p>
            </div>
          </div>

          {/* Core Objectives */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3 flex items-center gap-1.5">
              <Target className="w-4 h-4" />
              <span>Institutional Program Objectives</span>
            </h4>
            <div className="space-y-2">
              {program.objectives.map((obj, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{obj}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Indicators */}
          <div className="p-4 rounded-xl bg-[#070b14] border border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
              MEAL Indicators & Verification Matrix
            </h4>
            <div className="space-y-2">
              {program.keyIndicators.map((ind, i) => (
                <div key={i} className="flex items-center justify-between text-xs py-1.5 border-b border-slate-800/80 last:border-0">
                  <span className="text-slate-300">{ind}</span>
                  <span className="text-emerald-400 font-mono text-[11px] font-semibold">Active Monitoring</span>
                </div>
              ))}
            </div>
          </div>

          {/* Active Projects under this Program */}
          {relatedProjects.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
                Active Field Projects Under This Pillar ({relatedProjects.length})
              </h4>
              <div className="space-y-3">
                {relatedProjects.map((prj) => (
                  <div key={prj.id} className="p-4 rounded-xl bg-[#070b14] border border-slate-800 space-y-2 shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono text-amber-400 font-bold">{prj.code}</span>
                      <span className="text-[11px] font-mono text-emerald-400 uppercase bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40 font-bold">
                        {prj.status}
                      </span>
                    </div>
                    <h5 className="text-sm font-bold text-white">{prj.title}</h5>
                    <p className="text-xs text-slate-400">{prj.summary}</p>
                    <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
                      <span>Target: {prj.targetBeneficiaries.toLocaleString()} beneficiaries</span>
                      <span className="font-mono text-slate-300">Budget: ${prj.budgetUSD.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer CTAs */}
          <div className="pt-6 border-t border-slate-800 flex items-center justify-between gap-4">
            <div className="text-xs text-slate-400">
              Lead Focal Point: <span className="text-white font-semibold">{program.leadName}</span>
            </div>

            <button
              onClick={() => {
                closeProgramModal();
                openDonateModal(program.pillar);
              }}
              className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-amber-500/20"
            >
              <Heart className="w-3.5 h-3.5 fill-slate-950" />
              <span>Direct Support to This Pillar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
