import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Volunteer, ProgramPillar } from '../../types';
import { HeartHandshake, Plus, Award, Clock, User, CheckCircle2 } from 'lucide-react';

export const VolunteersManager: React.FC = () => {
  const { volunteers, addVolunteer, activeRole } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [gender, setGender] = useState<'Female' | 'Male'>('Female');
  const [community, setCommunity] = useState('Kiryandongo Ranch 1');
  const [role, setRole] = useState('Peer Hygiene Ambassador');
  const [pillar, setPillar] = useState<ProgramPillar>('wash');
  const [skills, setSkills] = useState('First Aid, Arabic / English Translation');
  const [availability, setAvailability] = useState<Volunteer['availability']>('Part-time');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    addVolunteer({
      name,
      gender,
      community,
      role,
      pillarInterest: pillar,
      skills: skills.split(',').map((s) => s.trim()),
      availability,
      status: 'Active',
      hoursLogged: 0,
      joinDate: new Date().toISOString().split('T')[0],
    });

    setIsModalOpen(false);
    setName('');
  };

  return (
    <div className="space-y-6 text-stone-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-800">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <HeartHandshake className="w-5 h-5 text-amber-400" />
            <span>Volunteers & Refugee Member Roster</span>
          </h2>
          <p className="text-xs text-stone-400 mt-0.5">
            Managing community youth mobilization, peer hygiene educators, and tech instructors across settlements
          </p>
        </div>

        {activeRole !== 'auditor' && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 text-xs font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Register Volunteer</span>
          </button>
        )}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {volunteers.map((vol) => (
          <div
            key={vol.id}
            className="p-5 rounded-xl bg-stone-900 border border-stone-800 space-y-3 hover:border-stone-700 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase bg-stone-950 text-amber-400 px-2 py-0.5 rounded border border-stone-800">
                  {vol.pillarInterest.toUpperCase()}
                </span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-900">
                  {vol.status}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-stone-800 text-stone-300 flex items-center justify-center font-bold text-sm">
                  {vol.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{vol.name}</h3>
                  <p className="text-xs text-amber-400/90 font-medium">{vol.role}</p>
                </div>
              </div>

              <div className="text-xs text-stone-400">
                <span>Location: {vol.community}</span> · <span>Commitment: {vol.availability}</span>
              </div>

              {/* Skills tags */}
              <div className="space-y-1 pt-1">
                <span className="text-[10px] uppercase font-bold text-stone-500">Skills & Focus:</span>
                <div className="flex flex-wrap gap-1">
                  {vol.skills.map((sk, i) => (
                    <span
                      key={i}
                      className="text-[11px] bg-stone-950 text-stone-300 px-2 py-0.5 rounded border border-stone-800/80"
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-800 text-[11px] text-stone-400 flex items-center justify-between font-mono">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-stone-500" />
                <span>{vol.hoursLogged} Hours Logged</span>
              </span>
              <span>Joined: {vol.joinDate}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-stone-900 border border-stone-800 rounded-xl max-w-lg w-full p-6 shadow-2xl relative my-8 text-stone-100 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-white mb-4">Register Community Volunteer</h3>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-stone-400 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ibrahim Kabbashi"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-400 mb-1">Gender</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded text-white"
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-400 mb-1">Settlement Cluster</label>
                  <input
                    type="text"
                    value={community}
                    onChange={(e) => setCommunity(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-400 mb-1">Assigned Role</label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-400 mb-1">Pillar Interest</label>
                  <select
                    value={pillar}
                    onChange={(e) => setPillar(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded text-white"
                  >
                    <option value="wash">WASH</option>
                    <option value="livelihoods">Livelihoods</option>
                    <option value="energy_climate">Energy & Climate</option>
                    <option value="education">Education</option>
                    <option value="ssh_lab">SSH-LAB Tech</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-400 mb-1">Skills & Specializations</label>
                <input
                  type="text"
                  placeholder="e.g. Electrical wiring, Solar diagnostic, Arabic literacy"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs text-stone-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded cursor-pointer"
                >
                  Save Volunteer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
