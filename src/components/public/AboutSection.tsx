import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Heart, Users, Target, Compass, Sparkles } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { language } = useApp();

  return (
    <section id="about" className="py-24 bg-[#0a0f1d] text-slate-100 border-b border-slate-800">
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
            <span>Institutional Genesis & Narrative</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
            Born from Lived Experience in Kiryandongo
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            The Sudan Sustainability Hub (SSH) was not born in distant conference rooms or abstract
            policy papers. It was established by young displaced Sudanese women and men who survived the
            catastrophic war in Sudan, crossed international borders, and recognized that emergency food
            rations alone will never rebuild our dignity, communities, or future.
          </p>
        </div>

        {/* Narrative Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Story Narrative */}
          <div className="lg:col-span-7 space-y-6 text-slate-300 text-sm leading-relaxed">
            <p>
              Founded within Kiryandongo Refugee Settlement in Uganda, SSH bridges the critical divide
              between immediate emergency survival and long-term socio-economic self-reliance. Our team
              has directly lived through disrupted university educations, destroyed family businesses,
              severe water scarcity, and the psychological weight of forced exile.
            </p>

            <p>
              Rather than waiting for external agencies to determine our fate, we organized as localized
              humanitarian responders. We combined deep community trust, grassroots youth ingenuity, and
              the immense resilience of Sudanese women to create sustainable infrastructure that serves both
              refugee settlements today and prepares our generation for future post-conflict reconstruction.
            </p>

            {/* Women-led Highlight Block */}
            <div className="p-6 rounded-2xl bg-[#0f172a] border border-emerald-500/30 space-y-3 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center font-bold text-sm border border-emerald-500/30">
                  70%
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Proudly Women-Led Humanitarian Leadership</h4>
                  <p className="text-xs text-slate-400">Headed by a young Sudanese woman Executive Director</p>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Sudanese women have borne the heaviest burdens of war and displacement, yet remain the
                primary caretakers and social fabric of our communities. Approximately 70% of SSH leadership,
                field coordination, and board seats are held by women.
              </p>
            </div>

            <p>
              At its core, SSH represents a new generation of localized humanitarian leadership combining
              community trust, youth innovation, gender inclusion, and sustainability.
            </p>
          </div>

          {/* Strategic Values & Principles */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <Compass className="w-5 h-5 text-amber-400" />
              <span>Core Institutional Values</span>
            </h3>

            {/* Value 1: Agency (Emerald Green) */}
            <div className="p-4 rounded-xl bg-[#0f172a] border border-emerald-500/30">
              <div className="flex items-center gap-2.5 text-xs font-bold text-white mb-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-emerald-300">Localized Agency & Dignity</span>
              </div>
              <p className="text-xs text-slate-400">
                Displaced people are not passive recipients; we are skilled leaders, engineers, and stewards of our own recovery.
              </p>
            </div>

            {/* Value 2: Integration (Sun Gold) */}
            <div className="p-4 rounded-xl bg-[#0f172a] border border-amber-500/30">
              <div className="flex items-center gap-2.5 text-xs font-bold text-white mb-1">
                <Target className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-amber-300">Integration Over Isolation</span>
              </div>
              <p className="text-xs text-slate-400">
                Clean water, education, renewable energy, and micro-business must work together to eradicate aid dependency.
              </p>
            </div>

            {/* Value 3: Coexistence (Royal Blue) */}
            <div className="p-4 rounded-xl bg-[#0f172a] border border-blue-500/30">
              <div className="flex items-center gap-2.5 text-xs font-bold text-white mb-1">
                <Users className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="text-blue-300">Host Community Coexistence</span>
              </div>
              <p className="text-xs text-slate-400">
                All infrastructure projects reserve equitable access for Ugandan host communities to nurture peaceful integration.
              </p>
            </div>

            {/* Value 4: Future Sudan Reconstruction (Crimson Red) */}
            <div className="p-4 rounded-xl bg-[#0f172a] border border-rose-500/30">
              <div className="flex items-center gap-2.5 text-xs font-bold text-white mb-1">
                <Sparkles className="w-4 h-4 text-rose-400 shrink-0" />
                <span className="text-rose-300">Future Sudan Reconstruction Preparedness</span>
              </div>
              <p className="text-xs text-slate-400">
                Equipping our engineers, educators, and leaders with the skills necessary to rebuild post-conflict Sudan with green technology.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
