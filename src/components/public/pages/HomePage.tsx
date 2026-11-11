import React from 'react';
import { HeroSection } from '../HeroSection';
import { ImpactSection } from '../ImpactSection';
import { ProgramsSection } from '../ProgramsSection';
import { SshLabSection } from '../SshLabSection';
import { InteractiveMapSection } from '../InteractiveMapSection';
import { AboutSection } from '../AboutSection';
import { GovernanceSection } from '../GovernanceSection';
import { ContactSection } from '../ContactSection';
import { useApp } from '../../../context/AppContext';
import { ArrowRight, ShieldCheck, HeartHandshake, FileText, Droplets, Sun, Sparkles, BookOpen } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { setPublicPage, openDonateModal, openFeedbackModal } = useApp();

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <HeroSection />

      {/* Quick Access Pillar Navigation Strip */}
      <section className="bg-[#060a12] border-b border-slate-800 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-[11px] uppercase tracking-wider font-bold text-slate-400 mb-3 flex items-center justify-between">
            <span>Explore Dedicated Full Program Pages:</span>
            <span className="text-amber-400">4 Core Pillars + SSH-LAB</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            <button
              onClick={() => setPublicPage('wash')}
              className="p-3 rounded-xl bg-blue-950/20 hover:bg-blue-950/40 border border-blue-500/30 hover:border-blue-400 transition-all text-left group cursor-pointer"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-[10px] font-mono font-bold text-blue-400 uppercase">01 · WASH</span>
              </div>
              <div className="text-xs font-bold text-white group-hover:text-blue-300 transition-colors">
                Clean Water & Sanitation
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">142K L/day solar boreholes</div>
            </button>

            <button
              onClick={() => setPublicPage('livelihoods')}
              className="p-3 rounded-xl bg-emerald-950/20 hover:bg-emerald-950/40 border border-emerald-500/30 hover:border-emerald-400 transition-all text-left group cursor-pointer"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase">02 · Livelihoods</span>
              </div>
              <div className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                Women VSLAs & Agribusiness
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">18 women-led savings groups</div>
            </button>

            <button
              onClick={() => setPublicPage('energy')}
              className="p-3 rounded-xl bg-amber-950/20 hover:bg-amber-950/40 border border-amber-500/30 hover:border-amber-400 transition-all text-left group cursor-pointer"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span className="text-[10px] font-mono font-bold text-amber-400 uppercase">03 · Energy</span>
              </div>
              <div className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                Solar & Climate Resilience
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">Bio-briquettes & 8,400 trees</div>
            </button>

            <button
              onClick={() => setPublicPage('education')}
              className="p-3 rounded-xl bg-rose-950/20 hover:bg-rose-950/40 border border-rose-500/30 hover:border-rose-400 transition-all text-left group cursor-pointer"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                <span className="text-[10px] font-mono font-bold text-rose-400 uppercase">04 · Education</span>
              </div>
              <div className="text-xs font-bold text-white group-hover:text-rose-300 transition-colors">
                Youth Learning & Bridge Care
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">War-disrupted curriculum aid</div>
            </button>

            <button
              onClick={() => setPublicPage('ssh_lab')}
              className="col-span-2 sm:col-span-1 p-3 rounded-xl bg-yellow-950/25 hover:bg-yellow-950/40 border border-amber-500/50 hover:border-amber-400 transition-all text-left group cursor-pointer"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-yellow-400" />
                <span className="text-[10px] font-mono font-bold text-amber-300 uppercase">SSH-LAB</span>
              </div>
              <div className="text-xs font-bold text-amber-300 group-hover:text-amber-200 transition-colors">
                Tech, Coding & Peace
              </div>
              <div className="text-[10px] text-slate-300 mt-0.5">Youth problem-solvers hub</div>
            </button>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <ImpactSection />

      {/* Programs Overview Section */}
      <ProgramsSection />

      {/* SSH-LAB Innovation Section */}
      <SshLabSection />

      {/* Settlement Operations Map Section */}
      <InteractiveMapSection />

      {/* About Narrative Section */}
      <AboutSection />

      {/* Governance & Policies Section */}
      <GovernanceSection />

      {/* Contact & Complaints Desk Section */}
      <ContactSection />
    </div>
  );
};
