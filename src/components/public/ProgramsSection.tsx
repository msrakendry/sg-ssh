import React from 'react';
import { useApp } from '../../context/AppContext';
import { TRANSLATIONS } from '../../translations';
import { Droplets, HeartHandshake, Sun, BookOpen, Sparkles, ArrowRight, Check } from 'lucide-react';
import { ProgramPillar } from '../../types';

export const ProgramsSection: React.FC = () => {
  const { language, programs, openProgramModal, openDonateModal } = useApp();
  const t = TRANSLATIONS[language];

  const getPillarConfig = (pillar: ProgramPillar) => {
    switch (pillar) {
      case 'wash':
        return {
          icon: <Droplets className="w-5 h-5 text-blue-400" />,
          borderColor: 'border-blue-500/40 hover:border-blue-400',
          badgeColor: 'text-blue-400 bg-blue-950/60 border-blue-500/30',
          titleColor: 'group-hover:text-blue-300',
          accentColor: 'text-blue-400',
          btnDonate: 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/20',
          dot: 'bg-blue-500',
        };
      case 'livelihoods':
        return {
          icon: <HeartHandshake className="w-5 h-5 text-emerald-400" />,
          borderColor: 'border-emerald-500/40 hover:border-emerald-400',
          badgeColor: 'text-emerald-400 bg-emerald-950/60 border-emerald-500/30',
          titleColor: 'group-hover:text-emerald-300',
          accentColor: 'text-emerald-400',
          btnDonate: 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/20',
          dot: 'bg-emerald-500',
        };
      case 'energy_climate':
        return {
          icon: <Sun className="w-5 h-5 text-amber-400" />,
          borderColor: 'border-amber-500/40 hover:border-amber-400',
          badgeColor: 'text-amber-400 bg-amber-950/60 border-amber-500/30',
          titleColor: 'group-hover:text-amber-300',
          accentColor: 'text-amber-400',
          btnDonate: 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-amber-500/20',
          dot: 'bg-amber-400',
        };
      case 'education':
        return {
          icon: <BookOpen className="w-5 h-5 text-rose-400" />,
          borderColor: 'border-rose-500/40 hover:border-rose-400',
          badgeColor: 'text-rose-400 bg-rose-950/60 border-rose-500/30',
          titleColor: 'group-hover:text-rose-300',
          accentColor: 'text-rose-400',
          btnDonate: 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/20',
          dot: 'bg-rose-500',
        };
      default:
        return {
          icon: <Sparkles className="w-5 h-5 text-amber-400" />,
          borderColor: 'border-amber-500/40 hover:border-amber-400',
          badgeColor: 'text-amber-400 bg-amber-950/60 border-amber-500/30',
          titleColor: 'group-hover:text-amber-300',
          accentColor: 'text-amber-400',
          btnDonate: 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-amber-500/20',
          dot: 'bg-amber-400',
        };
    }
  };

  return (
    <section id="programs" className="py-24 bg-[#070b14] text-slate-100 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-amber-400 mb-2">
            <span className="flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            </span>
            <span>Integrated Humanitarian-Development Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
            {t.pillarsTitle}
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            {t.pillarsSub}
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {programs.map((program, index) => {
            const isAr = language === 'ar';
            const config = getPillarConfig(program.pillar);
            return (
              <div
                key={program.id}
                className={`bg-[#0f172a] rounded-2xl border ${config.borderColor} p-8 flex flex-col justify-between transition-all hover:shadow-xl group relative overflow-hidden`}
              >
                <div>
                  {/* Top metadata strip */}
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center border border-slate-700/80 shadow">
                        {config.icon}
                      </div>
                      <span className={`text-xs font-mono font-bold tracking-wider px-2.5 py-0.5 rounded border ${config.badgeColor}`}>
                        PILLAR 0{index + 1}
                      </span>
                    </div>

                    <div className="text-xs text-slate-400 font-mono">
                      {program.activeProjectsCount} Active Projects
                    </div>
                  </div>

                  {/* Program Title */}
                  <h3 className={`text-xl font-bold text-white ${config.titleColor} transition-colors mb-2`}>
                    {isAr ? program.titleAr : program.title}
                  </h3>

                  {/* Subtitle / Focus deck */}
                  <p className={`text-xs font-semibold ${config.accentColor} mb-4`}>
                    {isAr ? program.subtitleAr : program.subtitle}
                  </p>

                  {/* Program Description */}
                  <p className="text-sm text-slate-300 leading-relaxed mb-6">
                    {isAr ? program.descriptionAr : program.description}
                  </p>

                  {/* Core Objectives List */}
                  <div className="space-y-2 mb-6">
                    <div className="text-xs uppercase tracking-wider font-semibold text-slate-400">
                      Core Strategic Objectives:
                    </div>
                    {program.objectives.map((obj, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                        <span>{obj}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer with beneficiaries, indicators, & CTAs */}
                <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <div>
                      <span className="text-slate-500 block text-[11px]">Beneficiaries:</span>
                      <span className="text-slate-200 font-bold font-mono">
                        {program.totalBeneficiaries.toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[11px]">Budget:</span>
                      <span className="text-slate-200 font-bold font-mono">
                        ${program.budgetUSD.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openProgramModal(program.pillar)}
                      className="px-3.5 py-1.5 text-xs font-semibold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <span>Full Dossier</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => openDonateModal(program.pillar)}
                      className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer shadow ${config.btnDonate}`}
                    >
                      Support Pillar
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
