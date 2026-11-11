import React from 'react';
import { useApp } from '../../context/AppContext';
import { TRANSLATIONS } from '../../translations';
import { ArrowRight, Droplets, Sun, Sparkles, BookOpen, ShieldCheck, HeartHandshake, FileText } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { language, openDonateModal, openFeedbackModal, openProgramModal, cmsContent } = useApp();
  const t = TRANSLATIONS[language];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative bg-gradient-to-b from-[#070b14] via-[#0c1322] to-[#070b14] text-white overflow-hidden pt-12 pb-20 border-b border-slate-800">
      {/* Background architectural pattern with 4-color ambient glows reflecting the 4 logo petals */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Emergency Alert Strip if active */}
        {cmsContent.emergencyAlert.active && (
          <div className="mb-8 p-3.5 rounded-lg bg-amber-950/70 border border-amber-500/40 text-amber-200 text-xs flex items-center justify-between gap-4 backdrop-blur-sm shadow-md">
            <div className="flex items-center gap-2">
              <span className="font-bold uppercase tracking-wider text-amber-300">Field Update:</span>
              <span>{language === 'ar' ? cmsContent.emergencyAlert.textAr : cmsContent.emergencyAlert.textEn}</span>
            </div>
            <button
              onClick={() => scrollTo('programs')}
              className="whitespace-nowrap text-amber-300 hover:text-white font-semibold underline text-xs cursor-pointer"
            >
              View WASH Response →
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Editorial Content Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* 4-Color Institutional Kicker Bar */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs uppercase tracking-wider font-semibold">
              <span className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-blue-500" title="01 WASH" />
                <span className="w-2 h-2 rounded-full bg-emerald-500" title="02 Livelihoods" />
                <span className="w-2 h-2 rounded-full bg-amber-400" title="03 Renewable Energy" />
                <span className="w-2 h-2 rounded-full bg-rose-500" title="04 Youth Education" />
              </span>
              <span className="text-amber-400 font-bold">Refugee-Led</span>
              <span className="text-slate-600">·</span>
              <span className="text-emerald-400 font-bold">70% Women-Led</span>
              <span className="text-slate-600">·</span>
              <span className="text-blue-400">Kiryandongo, Uganda</span>
            </div>

            {/* Primary Headline with balance wrapping */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight [text-wrap:balance]">
              {language === 'ar' ? cmsContent.headlineAr : cmsContent.headlineEn}
            </h1>

            {/* Sub-headline 4 programmatic pillars reflecting logo petals */}
            <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base font-bold">
              <span className="inline-flex items-center gap-1.5 text-blue-400">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                Water (WASH)
              </span>
              <span className="text-slate-600">·</span>
              <span className="inline-flex items-center gap-1.5 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Livelihoods
              </span>
              <span className="text-slate-600">·</span>
              <span className="inline-flex items-center gap-1.5 text-amber-400">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                Renewable Energy
              </span>
              <span className="text-slate-600">·</span>
              <span className="inline-flex items-center gap-1.5 text-rose-400">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                Youth Education
              </span>
            </div>

            {/* Descriptive Body */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
              {language === 'ar' ? cmsContent.heroSubAr : cmsContent.heroSubEn}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => openDonateModal()}
                className="px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 rounded-lg transition-all shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 flex items-center gap-2 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>{t.hero.btnSupport}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => scrollTo('programs')}
                className="px-6 py-3.5 text-sm font-semibold text-white bg-slate-900/90 hover:bg-slate-800 rounded-lg border border-blue-500/40 hover:border-blue-400 transition-colors cursor-pointer flex items-center gap-2 shadow-sm"
              >
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                <span>{t.hero.btnExplore}</span>
              </button>

              <button
                onClick={() => scrollTo('contact')}
                className="px-5 py-3.5 text-sm font-semibold text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/40 rounded-lg border border-emerald-500/30 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <HeartHandshake className="w-4 h-4" />
                <span>{t.hero.btnPartner}</span>
              </button>
            </div>

            {/* Accountability and Do No Harm Guarantee */}
            <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Zero-Tolerance PSEA & Safeguarding</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-400" />
                <span>Independently Audited Financials</span>
              </div>
              <button
                onClick={openFeedbackModal}
                className="text-amber-400 hover:text-amber-300 hover:underline cursor-pointer font-medium"
              >
                Community Feedback Portal →
              </button>
            </div>
          </div>

          {/* Focal Visual Card & 4 Logo Color Pillar Launchers */}
          <div className="lg:col-span-5">
            <div className="bg-[#0e172a]/95 rounded-2xl border border-slate-800 p-6 sm:p-7 shadow-2xl relative backdrop-blur-md">
              {/* Emblem Badge and Location Tag */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <img
                    src="/assets/aistudio/SSH_LOGO_a17090d7.png"
                    alt="SSH Official Emblem"
                    className="w-14 h-14 object-contain drop-shadow"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-white tracking-wide">
                      Sudan Sustainability Hub
                    </h3>
                    <p className="text-xs text-slate-400">
                      Refugee-Led Humanitarian Institution
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-mono bg-gradient-to-r from-amber-500/20 to-yellow-500/10 text-amber-300 px-2.5 py-1 rounded border border-amber-500/40 font-bold">
                  EST. KIRYANDONGO
                </span>
              </div>

              {/* 4 Pillars Aligned with Logo Petals */}
              <div className="mt-5 space-y-3">
                <p className="text-xs uppercase font-semibold text-slate-400 tracking-wider">
                  Select a Program Pillar for Deep-Dive:
                </p>

                {/* Pillar 01: WASH (Blue - Top-Left Petal) */}
                <button
                  onClick={() => openProgramModal('wash')}
                  className="w-full text-left p-3 rounded-lg bg-blue-950/30 hover:bg-blue-950/50 border border-blue-500/40 hover:border-blue-400 transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/40">
                      <Droplets className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white group-hover:text-blue-300 transition-colors flex items-center gap-1.5">
                        <span className="text-blue-400 font-mono">01 ·</span> WASH & Solar Water Networks
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        142,000L safe water daily across Kiryandongo zones
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-blue-300 group-hover:translate-x-1 transition-all" />
                </button>

                {/* Pillar 02: Livelihoods (Emerald Green - Bottom-Left Petal) */}
                <button
                  onClick={() => openProgramModal('livelihoods')}
                  className="w-full text-left p-3 rounded-lg bg-emerald-950/30 hover:bg-emerald-950/50 border border-emerald-500/40 hover:border-emerald-400 transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40">
                      <HeartHandshake className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors flex items-center gap-1.5">
                        <span className="text-emerald-400 font-mono">02 ·</span> Women Economic Cooperatives
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        18 VSLAs and micro-agribusiness seed capital
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-300 group-hover:translate-x-1 transition-all" />
                </button>

                {/* Pillar 03: Energy & Climate (Gold - Top-Right Petal) */}
                <button
                  onClick={() => openProgramModal('energy_climate')}
                  className="w-full text-left p-3 rounded-lg bg-amber-950/30 hover:bg-amber-950/50 border border-amber-500/40 hover:border-amber-400 transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-600/20 text-amber-400 flex items-center justify-center border border-amber-500/40">
                      <Sun className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors flex items-center gap-1.5">
                        <span className="text-amber-400 font-mono">03 ·</span> Clean Energy & Reforestation
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        Bio-briquettes and 8,400 planted agroforestry trees
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-300 group-hover:translate-x-1 transition-all" />
                </button>

                {/* Pillar 04: Education (Crimson Red - Bottom-Right Petal) */}
                <button
                  onClick={() => openProgramModal('education')}
                  className="w-full text-left p-3 rounded-lg bg-rose-950/30 hover:bg-rose-950/50 border border-rose-500/40 hover:border-rose-400 transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-rose-600/20 text-rose-400 flex items-center justify-center border border-rose-500/40">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white group-hover:text-rose-300 transition-colors flex items-center gap-1.5">
                        <span className="text-rose-400 font-mono">04 ·</span> Accelerated Education & Bridge Care
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        Bridging war-disrupted schooling for Sudanese youth
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-rose-300 group-hover:translate-x-1 transition-all" />
                </button>

                {/* SSH-LAB: Center 3D Gold Hub */}
                <button
                  onClick={() => openProgramModal('ssh_lab')}
                  className="w-full text-left p-3.5 rounded-lg bg-gradient-to-r from-amber-950/60 via-slate-900 to-blue-950/40 hover:from-amber-950/80 hover:to-blue-950/60 border border-amber-500/60 transition-all flex items-center justify-between group cursor-pointer shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-yellow-500 text-slate-950 flex items-center justify-center font-bold shadow">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                        <span>SSH-LAB: Innovation, Tech & Peace</span>
                        <span className="text-[9px] uppercase font-mono px-1.5 py-0.2 bg-amber-400/20 text-amber-300 rounded border border-amber-400/30">
                          Youth Hub
                        </span>
                      </h4>
                      <p className="text-[11px] text-slate-300">
                        Youth coding, solar repairs & anti-conflict mediation
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-all" />
                </button>
              </div>

              {/* Verified Attribution Note */}
              <div className="mt-5 pt-3 border-t border-slate-800 text-[11px] text-slate-400 text-center flex items-center justify-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Refugee leadership with global humanitarian standards</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
