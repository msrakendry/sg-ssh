import React from 'react';
import { useApp } from '../../../context/AppContext';
import { Breadcrumbs } from '../Breadcrumbs';
import { BookOpen, GraduationCap, Heart, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

export const EducationPillarPage: React.FC = () => {
  const { setPublicPage, openDonateModal, projects } = useApp();
  const educationProjects = projects.filter((p) => p.programPillar === 'education');

  return (
    <div className="bg-[#070b14] text-slate-100 min-h-screen pb-24">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Programs & Pillars', page: 'programs' },
          { label: '04 · Accelerated Education & Youth', isCurrent: true },
        ]}
        pillarColor="red"
      />

      {/* Header */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800 bg-gradient-to-b from-[#1a0a0d] via-[#120709] to-[#070b14] overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-rose-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-rose-950/80 border border-rose-500/40 text-xs uppercase tracking-wider font-semibold text-rose-300 mb-4">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            <span>04 · PILLAR FOUR — OFFICIAL BOTTOM-RIGHT RED PETAL</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-4xl [text-wrap:balance]">
            Education & Youth Development
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            The war in Sudan abruptly halted millions of student educations. In exile, children lose
            critical development years without language bridging and formal accreditation. SSH provides
            accelerated catch-up curricula, English bridging, and safe spaces for mental recovery.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={() => openDonateModal('education')}
              className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-rose-400 via-pink-400 to-rose-500 hover:from-rose-300 hover:to-pink-300 rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2"
            >
              <Heart className="w-4 h-4 fill-slate-950" />
              <span>Sponsor a Student’s Education</span>
            </button>
            <button
              onClick={() => setPublicPage('ssh_lab')}
              className="px-6 py-3 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors cursor-pointer"
            >
              Explore SSH-LAB Youth Coding
            </button>
          </div>
        </div>
      </section>

      {/* Real-time Indicator Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-6 rounded-2xl bg-[#140609] border border-rose-500/30">
            <div className="text-3xl font-extrabold text-rose-400 font-mono">1,820</div>
            <div className="text-xs font-bold text-white mt-1">Displaced Children Enrolled</div>
            <div className="text-[11px] text-slate-400 mt-1">Accelerated learning & primary transition classes</div>
          </div>

          <div className="p-6 rounded-2xl bg-[#140609] border border-rose-500/30">
            <div className="text-3xl font-extrabold text-rose-400 font-mono">430</div>
            <div className="text-xs font-bold text-white mt-1">Youth Certified in Digital Skills</div>
            <div className="text-[11px] text-slate-400 mt-1">Computer literacy, web foundations, and English</div>
          </div>

          <div className="p-6 rounded-2xl bg-[#140609] border border-rose-500/30">
            <div className="text-3xl font-extrabold text-rose-400 font-mono">68%</div>
            <div className="text-xs font-bold text-white mt-1">Female Student Enrollment</div>
            <div className="text-[11px] text-slate-400 mt-1">Targeted scholarships overcoming family poverty barriers</div>
          </div>

          <div className="p-6 rounded-2xl bg-[#140609] border border-rose-500/30">
            <div className="text-3xl font-extrabold text-rose-400 font-mono">14</div>
            <div className="text-xs font-bold text-white mt-1">Community Classrooms Supported</div>
            <div className="text-[11px] text-slate-400 mt-1">Community-built semi-permanent learning shelters</div>
          </div>
        </div>
      </div>

      {/* Narrative & Projects */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-6 text-slate-300 text-sm leading-relaxed">
            <h2 className="text-2xl font-bold text-white">Saving a Lost Generation of Sudanese Learners</h2>
            <p>
              In Sudan, school systems have been almost completely shuttered in war-torn regions for over
              two years. When refugee children cross into Uganda, the language of instruction changes
              abruptly from Arabic to English, causing severe dropouts and loss of academic confidence.
            </p>
            <p>
              SSH operates the Accelerated Education & Bridge Learning Programme (AEBLP). Using bilingual
              volunteer Sudanese teachers paired with Ugandan certified tutors, students complete intensive
              catch-up coursework and English immersion, enabling them to sit for official national primary
              and secondary exams.
            </p>

            <h3 className="text-lg font-bold text-white pt-2">Trauma-Informed Healing & Child Protection</h3>
            <p>
              War leaves invisible psychological scars. Every SSH learning center incorporates structured
              psychosocial support, art therapy, and sports recreation led by trained trauma counselors to
              help children process displacement memories and build emotional stability.
            </p>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-lg font-bold text-white">Active Education Projects ({educationProjects.length})</h3>
            <div className="space-y-4">
              {educationProjects.map((prj) => (
                <div key={prj.id} className="p-5 rounded-2xl bg-[#100709] border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-rose-400">{prj.code}</span>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-rose-500/15 text-rose-300 border border-rose-500/30">
                      {prj.status}
                    </span>
                  </div>
                  <h4 className="font-bold text-white text-sm">{prj.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{prj.summary}</p>
                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-400">Target: <strong className="text-white">{prj.targetBeneficiaries.toLocaleString()} students</strong></span>
                    <span className="font-mono text-emerald-400 font-bold">${prj.budgetUSD.toLocaleString()}</span>
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
