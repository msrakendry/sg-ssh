import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TRANSLATIONS } from '../../translations';
import {
  Lock,
  Heart,
  Shield,
  ArrowUp,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Settings,
  Radio,
  Share2,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const {
    language,
    cmsContent,
    setCurrentView,
    setPublicPage,
    openDonateModal,
    openFeedbackModal,
    socialChannels,
    openSocialManageModal,
  } = useApp();
  const t = TRANSLATIONS[language];
  const [activeSocialTab, setActiveSocialTab] = useState<'all' | 'emergency' | 'partners'>('all');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const enabledChannels = socialChannels.filter((c) => c.enabled);
  const filteredChannels = enabledChannels.filter((c) => {
    if (activeSocialTab === 'emergency') return c.isEmergencyChannel;
    if (activeSocialTab === 'partners') return !c.isEmergencyChannel;
    return true;
  });

  return (
    <footer className="bg-[#04070d] text-slate-400 border-t border-slate-800 text-xs relative">
      {/* 4-Color Logo Petal Top Accent Strip */}
      <div className="h-1 w-full bg-gradient-to-r from-blue-600 via-amber-500 via-emerald-600 to-rose-600" />

      {/* Controlled Social Media Gateway Section */}
      <div className="bg-[#070c17] border-b border-slate-800/80 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/30">
                <Share2 className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-sm text-white tracking-wide">
                    Controlled & Verified Social Media Channels
                  </h3>
                  <span className="flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30 font-bold">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Official SSH Gateway</span>
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Protecting communities from disinformation. Only communications issued via these
                  verified channels represent Sudan Sustainability Hub.
                </p>
              </div>
            </div>

            {/* Filter buttons & Admin control trigger */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center bg-[#090f1d] p-1 rounded-lg border border-slate-800 text-[11px]">
                <button
                  onClick={() => setActiveSocialTab('all')}
                  className={`px-2.5 py-1 rounded font-semibold transition-colors cursor-pointer ${
                    activeSocialTab === 'all'
                      ? 'bg-amber-400 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  All ({enabledChannels.length})
                </button>
                <button
                  onClick={() => setActiveSocialTab('emergency')}
                  className={`px-2.5 py-1 rounded font-semibold transition-colors cursor-pointer flex items-center gap-1 ${
                    activeSocialTab === 'emergency'
                      ? 'bg-amber-400 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Radio className="w-3 h-3 text-rose-400" />
                  <span>Field Alerts</span>
                </button>
                <button
                  onClick={() => setActiveSocialTab('partners')}
                  className={`px-2.5 py-1 rounded font-semibold transition-colors cursor-pointer ${
                    activeSocialTab === 'partners'
                      ? 'bg-amber-400 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Institutional
                </button>
              </div>

              {/* Staff / Admin Controlled Channel Management Button */}
              <button
                onClick={openSocialManageModal}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-850 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition-colors cursor-pointer shadow-sm"
                title="Configure social media channels in the CMS"
              >
                <Settings className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Manage Channels</span>
              </button>
            </div>
          </div>

          {/* Social Channels Badges Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {filteredChannels.map((channel) => (
              <a
                key={channel.id}
                href={channel.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl bg-[#0a1120] hover:bg-[#0e172a] border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between group shadow-sm"
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-xs group-hover:text-amber-400 transition-colors flex items-center gap-1.5">
                      <span>{channel.name}</span>
                      <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </span>
                    {channel.isEmergencyChannel ? (
                      <span className="flex items-center gap-1 text-[9px] font-bold text-rose-300 bg-rose-500/15 px-1.5 py-0.5 rounded border border-rose-500/30">
                        <Radio className="w-2.5 h-2.5 animate-pulse text-rose-400" />
                        <span>Field Alert</span>
                      </span>
                    ) : (
                      <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/30">
                        Verified
                      </span>
                    )}
                  </div>
                  <div className="font-mono text-[11px] text-amber-400 font-semibold truncate">
                    {channel.handle}
                  </div>
                  <div className="text-[10px] text-slate-400 line-clamp-1">
                    {channel.purpose}
                  </div>
                </div>

                <div className="pt-2 mt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500">
                  <span>{channel.followersOrMembers || 'Official Desk'}</span>
                  <span className="text-slate-400 group-hover:text-white transition-colors">
                    Open Channel →
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1 & 2: Organization Profile */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/aistudio/SSH_LOGO_a17090d7.png"
                alt="SSH Logo"
                className="w-11 h-11 object-contain drop-shadow"
              />
              <div>
                <span className="font-extrabold text-sm text-white block">
                  Sudan Sustainability Hub
                </span>
                <span className="text-[11px] text-amber-400 font-semibold uppercase tracking-wider">
                  Refugee-Led Humanitarian Institution
                </span>
              </div>
            </div>

            <p className="text-slate-300 leading-relaxed text-xs">
              {t.footer.aboutText}
            </p>

            <div className="p-3.5 rounded-xl bg-[#0b101c] border border-slate-800 text-[11px] text-slate-400 shadow-sm">
              <div className="font-semibold text-slate-200 mb-0.5">Headquarters & Operations:</div>
              <div>{cmsContent.primaryOffice}</div>
              <div className="mt-1 font-mono text-amber-400 font-semibold">{cmsContent.contactEmail}</div>
            </div>
          </div>

          {/* Col 3: Full Page Navigation */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
              Full Pages
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setPublicPage('about')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  About SSH & Leadership
                </button>
              </li>
              <li>
                <button
                  onClick={() => setPublicPage('programs')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Programs & Projects Directory
                </button>
              </li>
              <li>
                <button
                  onClick={() => setPublicPage('ssh_lab')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  SSH-LAB: Tech & Peace
                </button>
              </li>
              <li>
                <button
                  onClick={() => setPublicPage('map')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  GIS Operations Map
                </button>
              </li>
              <li>
                <button
                  onClick={() => setPublicPage('meal')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  MEAL & Impact Matrix
                </button>
              </li>
              <li>
                <button
                  onClick={() => setPublicPage('governance')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Governance & PSEA
                </button>
              </li>
              <li>
                <button
                  onClick={() => setPublicPage('partnerships')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Partnerships & Volunteer
                </button>
              </li>
              <li>
                <button
                  onClick={() => setPublicPage('contact')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Contact & Complaints Desk
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Four Pillars with 4 Logo Colors */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
              Pillars & Dedicated Pages
            </h4>
            <ul className="space-y-2.5 text-slate-300">
              <li>
                <button
                  onClick={() => setPublicPage('wash')}
                  className="flex items-center gap-2 hover:text-blue-300 transition-colors text-left cursor-pointer group"
                >
                  <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0 group-hover:scale-125 transition-transform" />
                  <span>01 · Water & Sanitation (WASH)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setPublicPage('livelihoods')}
                  className="flex items-center gap-2 hover:text-emerald-300 transition-colors text-left cursor-pointer group"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 group-hover:scale-125 transition-transform" />
                  <span>02 · Livelihoods & Micro-Savings</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setPublicPage('energy')}
                  className="flex items-center gap-2 hover:text-amber-300 transition-colors text-left cursor-pointer group"
                >
                  <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0 group-hover:scale-125 transition-transform" />
                  <span>03 · Renewable Energy & Climate</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setPublicPage('education')}
                  className="flex items-center gap-2 hover:text-rose-300 transition-colors text-left cursor-pointer group"
                >
                  <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0 group-hover:scale-125 transition-transform" />
                  <span>04 · Accelerated Education</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setPublicPage('ssh_lab')}
                  className="flex items-center gap-2 hover:text-yellow-300 transition-colors text-left cursor-pointer group"
                >
                  <span className="w-2 h-2 rounded-full bg-yellow-400 shrink-0 group-hover:scale-125 transition-transform" />
                  <span className="text-amber-300 font-semibold">05 · SSH-LAB: Tech & Peace</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Accountability & Portal */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
              Accountability & Staff
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={openFeedbackModal}
                  className="text-amber-400 hover:text-amber-300 font-semibold cursor-pointer text-left"
                >
                  Humanitarian Complaints Desk
                </button>
              </li>
              <li>
                <button
                  onClick={() => setPublicPage('governance', 'psea')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  PSEA Zero-Tolerance Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => setPublicPage('meal', 'accountability')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Beneficiary Privacy Charter
                </button>
              </li>
              <li className="pt-2">
                <button
                  onClick={() => setCurrentView('dashboard')}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-200 bg-[#0f172a] hover:bg-slate-800 rounded-lg border border-slate-700 transition-colors cursor-pointer w-full justify-center shadow-sm"
                >
                  <Lock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Management Dashboard</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright and Confidentiality */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} Sudan Sustainability Hub (SSH). {t.footer.rights}
          </div>

          <div className="flex items-center gap-4">
            <span className="text-slate-400">{t.footer.confidentialityNotice}</span>
            <button
              onClick={scrollToTop}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Return to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
