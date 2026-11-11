import React from 'react';
import { useApp } from '../../../context/AppContext';
import { Breadcrumbs } from '../Breadcrumbs';
import {
  ShieldCheck,
  Users,
  Compass,
  Heart,
  Target,
  Award,
  FileText,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { setPublicPage, openDonateModal, openFeedbackModal } = useApp();

  return (
    <div className="bg-[#070b14] text-slate-100 min-h-screen pb-24">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[{ label: 'About Us', isCurrent: true }]}
        pillarColor="gold"
      />

      {/* Hero Header */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800 bg-gradient-to-b from-[#0c1424] to-[#070b14] overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs uppercase tracking-wider font-semibold text-amber-400 mb-4">
            <span className="flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            </span>
            <span>Refugee-Led & Women-Led Humanitarian Organization</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-4xl [text-wrap:balance]">
            Born from Lived Experience in Kiryandongo Settlement
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Established by young Sudanese women and men who survived war, forced displacement, and
            interrupted education, Sudan Sustainability Hub bridges emergency relief with long-term
            dignity, self-reliance, and future reconstruction.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={() => openDonateModal()}
              className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              Support Our Mission
            </button>
            <button
              onClick={() => setPublicPage('governance')}
              className="px-6 py-3 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors cursor-pointer"
            >
              View Governance & PSEA Policies
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        {/* Story & Lived Experience */}
        <section id="mission" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-slate-300 text-base leading-relaxed">
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Why We Founded Sudan Sustainability Hub
            </h2>
            <p>
              When war broke out across Sudan, millions of civilians saw their neighborhoods bombarded,
              universities closed, businesses shattered, and basic services destroyed overnight. Families
              who had lived self-sufficient, productive lives were suddenly forced across borders into
              humanitarian transit centers and refugee settlements.
            </p>
            <p>
              Arriving in Kiryandongo Refugee Settlement in Mid-Western Uganda, displaced Sudanese youth
              faced an immediate reality: humanitarian food rations and temporary tarpaulins are vital for
              immediate survival, but they cannot restore dignity, build livelihood autonomy, or rebuild a
              country.
            </p>
            <p>
              SSH was founded on the fundamental principle that refugees are not passive beneficiaries to
              be managed. Displaced youth are engineers, agronomists, teachers, software builders, and
              community mediators. By establishing our own registered community institution, we took
              ownership of our community’s resilience.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="p-8 rounded-2xl bg-gradient-to-b from-[#0e172a] to-[#0a0f1d] border border-amber-500/30 space-y-6 shadow-xl">
              <div className="flex items-center gap-3">
                <img
                  src="/assets/aistudio/SSH_LOGO_a17090d7.png"
                  alt="SSH"
                  className="w-14 h-14 object-contain drop-shadow"
                />
                <div>
                  <h3 className="font-extrabold text-white text-base">Sudan Sustainability Hub</h3>
                  <span className="text-xs text-amber-400 font-semibold uppercase tracking-wider block">
                    Core Institutional DNA
                  </span>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-800 text-xs">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Refugee-Led Organization (RLO)</span>
                    <span className="text-slate-400">100% founded and governed by displaced persons</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">70% Women-Led Participation</span>
                    <span className="text-slate-400">Female Executive Director, program managers, and VSLA chairs</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Kiryandongo Settlement Grounding</span>
                    <span className="text-slate-400">Operating across Ranch 1, Ranch 37, Bweyale, and Panyadoli</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Dual-Horizon Impact</span>
                    <span className="text-slate-400">Survival in exile today + Reconstruction skills for tomorrow</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 70% Women-Led Leadership Showcase */}
        <section id="leadership" className="p-8 sm:p-12 rounded-3xl bg-[#090e1a] border border-slate-800">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-emerald-400 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>GENDER EQUALITY & INCLUSION</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              70% Women-Led Leadership Architecture
            </h2>
            <p className="mt-3 text-slate-300 text-sm leading-relaxed">
              In forced displacement, women bear the heaviest burden of family care, water collection, and
              protection risks. SSH rejects tokenism: women hold majority voting power across our
              Executive Directorate, Board of Trustees, and community water management committees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#0e1628] border border-slate-800 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-extrabold text-lg border border-emerald-500/30">
                ED
              </div>
              <div>
                <h4 className="font-bold text-white text-base">Amina Al-Hassan</h4>
                <div className="text-xs text-amber-400 font-semibold">Executive Director</div>
                <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                  Displaced youth civil engineer and community advocate. Leads SSH strategy, donor
                  partnerships, and institutional oversight with deep community roots in Kiryandongo.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#0e1628] border border-slate-800 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-extrabold text-lg border border-blue-500/30">
                PM
              </div>
              <div>
                <h4 className="font-bold text-white text-base">Dr. Fatima Eltahir</h4>
                <div className="text-xs text-blue-400 font-semibold">Operations & Program Director</div>
                <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                  Specialist in public health and solar water infrastructure. Manages the 4 pillar leads
                  and coordinates daily water distribution across 142,000 liters.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#0e1628] border border-slate-800 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-extrabold text-lg border border-amber-500/30">
                VSLA
              </div>
              <div>
                <h4 className="font-bold text-white text-base">Mama Halima Gasmallah</h4>
                <div className="text-xs text-amber-400 font-semibold">Head of Women Cooperatives & CEM</div>
                <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                  Grassroots elder and community leader in Ranch 37. Oversees 18 women savings circles and
                  chairs community feedback mediation dialogues.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4 Pillars Overview Cards */}
        <section className="space-y-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Our 4 Pillars of Sustainable Self-Reliance
            </h2>
            <p className="mt-3 text-slate-400 text-sm">
              Each pillar corresponds directly to one of the 4 petals of our official logo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <button
              onClick={() => setPublicPage('wash')}
              className="p-6 rounded-2xl bg-blue-950/20 hover:bg-blue-950/40 border border-blue-500/40 hover:border-blue-400 transition-all text-left group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-sm mb-4 border border-blue-500/30">
                01
              </div>
              <h3 className="font-bold text-white text-base group-hover:text-blue-300 transition-colors">
                WASH & Clean Water
              </h3>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                Solar deep boreholes, daily water distribution, and dignity sanitation kits.
              </p>
              <div className="mt-4 flex items-center gap-1 text-xs text-blue-400 font-semibold">
                <span>View Full WASH Page</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            <button
              onClick={() => setPublicPage('livelihoods')}
              className="p-6 rounded-2xl bg-emerald-950/20 hover:bg-emerald-950/40 border border-emerald-500/40 hover:border-emerald-400 transition-all text-left group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center font-bold text-sm mb-4 border border-emerald-500/30">
                02
              </div>
              <h3 className="font-bold text-white text-base group-hover:text-emerald-300 transition-colors">
                Livelihoods & VSLAs
              </h3>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                18 women savings cooperatives, micro-grants, and agricultural seed capital.
              </p>
              <div className="mt-4 flex items-center gap-1 text-xs text-emerald-400 font-semibold">
                <span>View Full Livelihoods Page</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            <button
              onClick={() => setPublicPage('energy')}
              className="p-6 rounded-2xl bg-amber-950/20 hover:bg-amber-950/40 border border-amber-500/40 hover:border-amber-400 transition-all text-left group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-600/20 text-amber-400 flex items-center justify-center font-bold text-sm mb-4 border border-amber-500/30">
                03
              </div>
              <h3 className="font-bold text-white text-base group-hover:text-amber-300 transition-colors">
                Energy & Climate
              </h3>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                Clean bio-briquettes, solar kiosks, and 8,400 indigenous agroforestry saplings.
              </p>
              <div className="mt-4 flex items-center gap-1 text-xs text-amber-400 font-semibold">
                <span>View Full Energy Page</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            <button
              onClick={() => setPublicPage('education')}
              className="p-6 rounded-2xl bg-rose-950/20 hover:bg-rose-950/40 border border-rose-500/40 hover:border-rose-400 transition-all text-left group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-rose-600/20 text-rose-400 flex items-center justify-center font-bold text-sm mb-4 border border-rose-500/30">
                04
              </div>
              <h3 className="font-bold text-white text-base group-hover:text-rose-300 transition-colors">
                Youth Education
              </h3>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                Accelerated learning, war-disrupted curriculum bridging, and trauma-informed spaces.
              </p>
              <div className="mt-4 flex items-center gap-1 text-xs text-rose-400 font-semibold">
                <span>View Full Education Page</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>
        </section>

        {/* Kiryandongo Base Map & Location */}
        <section id="kiryandongo" className="p-8 sm:p-12 rounded-3xl bg-[#080d1a] border border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-amber-400">
                <MapPin className="w-4 h-4" />
                <span>FIELD JURISDICTION & BASE</span>
              </div>
              <h2 className="text-3xl font-extrabold text-white tracking-tight">
                Kiryandongo Refugee Settlement & Beyond
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Located in Mid-Western Uganda, Kiryandongo Settlement hosts over 100,000 displaced persons
                from Sudan, South Sudan, the Democratic Republic of Congo, and other conflict zones. SSH
                maintains our primary community headquarters in Bweyale, directly adjacent to the settlement
                corridors.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setPublicPage('map')}
                  className="px-5 py-2.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold transition-colors cursor-pointer flex items-center gap-2"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Open Interactive GIS Infrastructure Map</span>
                </button>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#0c1222] border border-slate-800 space-y-4 text-xs">
              <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
                Operational Coverage Statistics
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-2xl font-extrabold text-amber-400">4</div>
                  <div className="text-slate-400 font-semibold mt-1">Core Settlement Zones</div>
                  <div className="text-[10px] text-slate-500">Ranch 1, Ranch 37, Bweyale, Panyadoli</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-2xl font-extrabold text-emerald-400">28,400+</div>
                  <div className="text-slate-400 font-semibold mt-1">People Reached</div>
                  <div className="text-[10px] text-slate-500">Documented & verified with written consent</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-2xl font-extrabold text-blue-400">142K L</div>
                  <div className="text-slate-400 font-semibold mt-1">Daily Clean Water</div>
                  <div className="text-[10px] text-slate-500">Exceeds Sphere emergency threshold</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-2xl font-extrabold text-rose-400">70%</div>
                  <div className="text-slate-400 font-semibold mt-1">Female Leaders</div>
                  <div className="text-[10px] text-slate-500">Executive & committee representation</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
