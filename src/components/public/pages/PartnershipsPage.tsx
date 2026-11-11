import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Breadcrumbs } from '../Breadcrumbs';
import { Handshake, Heart, CheckCircle2, FileText, ArrowRight, ShieldCheck, Mail, Send } from 'lucide-react';

export const PartnershipsPage: React.FC = () => {
  const { setPublicPage, openDonateModal, partners, donors, addVolunteer } = useApp();
  const [submittedVolunteer, setSubmittedVolunteer] = useState(false);
  const [volForm, setVolForm] = useState({
    name: '',
    gender: 'Female' as 'Female' | 'Male',
    community: 'Kiryandongo Ranch 1',
    role: 'Community Facilitator',
    pillarInterest: 'wash' as any,
    skills: 'Community mobilization, Arabic/English translation',
    availability: 'Part-time' as any,
  });

  const handleVolunteerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!volForm.name) return;
    addVolunteer({
      name: volForm.name,
      gender: volForm.gender,
      community: volForm.community,
      role: volForm.role,
      pillarInterest: volForm.pillarInterest,
      skills: volForm.skills.split(',').map((s) => s.trim()),
      availability: volForm.availability,
      status: 'Applicant',
      hoursLogged: 0,
      joinDate: new Date().toISOString().split('T')[0],
    });
    setSubmittedVolunteer(true);
  };

  return (
    <div className="bg-[#070b14] text-slate-100 min-h-screen pb-24">
      <Breadcrumbs
        items={[{ label: 'Partnerships & Volunteering', isCurrent: true }]}
        pillarColor="gold"
      />

      {/* Header */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800 bg-gradient-to-b from-[#141208] to-[#070b14]">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-950/80 border border-amber-500/40 text-xs uppercase tracking-wider font-semibold text-amber-300 mb-4">
            <Handshake className="w-3.5 h-3.5" />
            <span>INSTITUTIONAL COLLABORATION, DONOR RELATIONS & COMMUNITY VOLUNTEERING</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-4xl [text-wrap:balance]">
            Partner with Sudan Sustainability Hub
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            As a registered refugee-led organization (RLO) in Uganda, SSH partners with international
            humanitarian donors, UN liaisons, academic research institutions, and grassroots diaspora
            initiatives to deliver measurable, dignified community solutions.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={() => openDonateModal()}
              className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2"
            >
              <Heart className="w-4 h-4 fill-slate-950" />
              <span>Donate Directly to Program Grants</span>
            </button>
            <a
              href="#volunteer"
              className="px-6 py-3 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors cursor-pointer"
            >
              Apply as Community Volunteer
            </a>
          </div>
        </div>
      </section>

      {/* Active Institutional Partners */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-2xl font-bold text-white">Active Partners & Signed MoUs</h2>
              <p className="text-xs text-slate-400 mt-1">
                Collaborative framework agreements across refugee coordination, solar engineering, and health.
              </p>
            </div>
            <span className="text-xs font-mono text-amber-400 font-bold bg-amber-500/10 px-3 py-1.5 rounded-lg border border-amber-500/30">
              {partners.length} Formal MoUs
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partners.map((pt) => (
              <div
                key={pt.id}
                className="p-6 rounded-2xl bg-[#090e1a] border border-slate-800 space-y-4 shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-blue-500/15 text-blue-300 border border-blue-500/30">
                      {pt.type}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-emerald-400">
                      {pt.mouStatus}
                    </span>
                  </div>
                  <h3 className="font-bold text-white text-base leading-snug">{pt.name}</h3>
                  <div className="text-xs text-slate-400">Contact: {pt.primaryContact} ({pt.email})</div>
                </div>

                <div className="pt-3 border-t border-slate-800">
                  <div className="text-[11px] text-slate-500 font-semibold mb-1">Joint Focus Areas:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {pt.jointInitiatives.map((init, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700"
                      >
                        {init}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Volunteer Application Form */}
        <section id="volunteer" className="p-8 sm:p-12 rounded-3xl bg-[#09101f] border border-slate-800">
          <div className="max-w-3xl mb-8">
            <h2 className="text-2xl font-bold text-white">Join as an SSH Community Volunteer</h2>
            <p className="text-xs text-slate-400 mt-1">
              Displaced youth, students, and professionals: volunteer your skills in WASH monitoring,
              digital lab tutoring, women cooperative facilitation, or medical translation.
            </p>
          </div>

          {submittedVolunteer ? (
            <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/50 text-emerald-300 space-y-2 text-center">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
              <h4 className="font-bold text-white text-base">Volunteer Application Received</h4>
              <p className="text-xs text-slate-300">
                Thank you! Your application has been logged into the SSH HR & Volunteer registry. Our
                coordinator in Kiryandongo will review your profile and reach out shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleVolunteerSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Full Name</label>
                <input
                  type="text"
                  required
                  value={volForm.name}
                  onChange={(e) => setVolForm({ ...volForm, name: e.target.value })}
                  placeholder="e.g. Tarig Omer"
                  className="w-full bg-[#060a12] border border-slate-700 rounded-lg p-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Gender</label>
                <select
                  value={volForm.gender}
                  onChange={(e) => setVolForm({ ...volForm, gender: e.target.value as any })}
                  className="w-full bg-[#060a12] border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Community / Settlement Zone</label>
                <input
                  type="text"
                  required
                  value={volForm.community}
                  onChange={(e) => setVolForm({ ...volForm, community: e.target.value })}
                  placeholder="e.g. Kiryandongo Ranch 37"
                  className="w-full bg-[#060a12] border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Pillar of Interest</label>
                <select
                  value={volForm.pillarInterest}
                  onChange={(e) => setVolForm({ ...volForm, pillarInterest: e.target.value as any })}
                  className="w-full bg-[#060a12] border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="wash">01 · WASH & Clean Water</option>
                  <option value="livelihoods">02 · Livelihoods & Women VSLAs</option>
                  <option value="energy_climate">03 · Clean Energy & Trees</option>
                  <option value="education">04 · Accelerated Education</option>
                  <option value="ssh_lab">05 · SSH-LAB Tech & Coding</option>
                </select>
              </div>

              <div className="md:col-span-2 space-y-1">
                <label className="font-semibold text-slate-300">Skills & Previous Experience</label>
                <input
                  type="text"
                  value={volForm.skills}
                  onChange={(e) => setVolForm({ ...volForm, skills: e.target.value })}
                  placeholder="e.g. Solar panel maintenance, English tutoring, youth sports"
                  className="w-full bg-[#060a12] border border-slate-700 rounded-lg p-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 rounded-lg shadow-md transition-all cursor-pointer flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Volunteer Application</span>
                </button>
              </div>
            </form>
          )}
        </section>
      </div>
    </div>
  );
};
