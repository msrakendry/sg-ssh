import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CommunityEngagement, ProgramPillar } from '../../types';
import { MessageSquare, Plus, Users, Calendar, MapPin, CheckCircle, ArrowRight } from 'lucide-react';

export const EngagementsManager: React.FC = () => {
  const { engagements, addEngagement, communities, activeRole } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [type, setType] = useState<CommunityEngagement['type']>('Community Dialogue');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [location, setLocation] = useState('Ranch 1 Community Center');
  const [communityName, setCommunityName] = useState(communities[0]?.name || '');
  const [facilitator, setFacilitator] = useState('Deng Majok & Nawal Yousif');
  const [pillar, setPillar] = useState<ProgramPillar>('wash');
  const [participantsCount, setParticipantsCount] = useState('80');
  const [femalePct, setFemalePct] = useState('65');
  const [objectives, setObjectives] = useState('');
  const [keyOutcomes, setKeyOutcomes] = useState('');
  const [followUp, setFollowUp] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !objectives || !keyOutcomes) return;

    addEngagement({
      title,
      type,
      date,
      location,
      communityName: communityName || communities[0].name,
      facilitator,
      programPillar: pillar,
      participantsCount: parseInt(participantsCount, 10) || 50,
      femaleParticipantsPercentage: parseInt(femalePct, 10) || 60,
      objectives,
      keyOutcomes,
      followUpActions: followUp ? [followUp] : ['Commence action follow-up with RWC'],
    });

    setIsModalOpen(false);
    setTitle('');
    setObjectives('');
    setKeyOutcomes('');
    setFollowUp('');
  };

  return (
    <div className="space-y-6 text-stone-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-800">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-amber-400" />
            <span>Community Consultations & Engagement Ledger</span>
          </h2>
          <p className="text-xs text-stone-400 mt-0.5">
            Documenting town hall assemblies, women circles, WASH committee elections, and youth peace forums
          </p>
        </div>

        {activeRole !== 'auditor' && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 text-xs font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Record Field Engagement</span>
          </button>
        )}
      </div>

      {/* Engagements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {engagements.map((eng) => (
          <div
            key={eng.id}
            className="p-6 rounded-xl bg-stone-900 border border-stone-800 space-y-4 hover:border-stone-700 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-amber-400 font-bold uppercase bg-stone-950 px-2 py-0.5 rounded border border-stone-800">
                  {eng.type}
                </span>
                <span className="text-xs text-stone-400 font-mono flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-stone-500" />
                  <span>{eng.date}</span>
                </span>
              </div>

              <h3 className="text-base font-bold text-white">{eng.title}</h3>

              <div className="text-xs text-stone-400 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                <span>{eng.location} ({eng.communityName})</span>
              </div>

              {/* Attendance metrics */}
              <div className="grid grid-cols-2 gap-3 p-3 rounded-lg bg-stone-950 border border-stone-800 text-xs">
                <div>
                  <span className="text-[11px] text-stone-500 block">Participants:</span>
                  <span className="font-mono font-bold text-white">{eng.participantsCount} persons</span>
                </div>
                <div>
                  <span className="text-[11px] text-stone-500 block">Female Representation:</span>
                  <span className="font-mono font-bold text-emerald-400">{eng.femaleParticipantsPercentage}%</span>
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <span className="font-semibold text-stone-300 block">Session Objectives:</span>
                <p className="text-stone-400 leading-relaxed">{eng.objectives}</p>
              </div>

              <div className="space-y-1 text-xs">
                <span className="font-semibold text-stone-300 block">Key Consensus & Decisions:</span>
                <p className="text-stone-300 leading-relaxed bg-stone-950/80 p-2.5 rounded border border-stone-800">
                  {eng.keyOutcomes}
                </p>
              </div>

              {/* Follow-up actions */}
              <div className="space-y-1 pt-1">
                <span className="text-[10px] uppercase font-bold text-stone-500">Committed Follow-Up:</span>
                {eng.followUpActions.map((act, i) => (
                  <div key={i} className="flex items-start gap-1.5 text-xs text-stone-300">
                    <CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>{act}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-stone-800/80 text-[11px] text-stone-500">
              Facilitated by: <span className="text-stone-300 font-semibold">{eng.facilitator}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Engagement Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-stone-900 border border-stone-800 rounded-xl max-w-lg w-full p-6 shadow-2xl relative my-8 text-stone-100 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-white mb-4">Record Community Engagement Session</h3>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-stone-400 mb-1">Session Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ranch 37 Women Water Tariff Dialogue"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-400 mb-1">Type of Engagement</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded text-white"
                  >
                    <option value="Community Dialogue">Community Dialogue</option>
                    <option value="WASH Committee">WASH Committee Meeting</option>
                    <option value="Women Circle">Women Circle</option>
                    <option value="Youth Peace Workshop">Youth Peace Workshop</option>
                    <option value="Training Session">Technical Training Session</option>
                    <option value="Focus Group Discussion">Focus Group Discussion</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-400 mb-1">Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-400 mb-1">Settlement Cluster</label>
                  <select
                    value={communityName}
                    onChange={(e) => setCommunityName(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded text-white"
                  >
                    {communities.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-400 mb-1">Specific Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-400 mb-1">Participants</label>
                  <input
                    type="number"
                    value={participantsCount}
                    onChange={(e) => setParticipantsCount(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-400 mb-1">Female %</label>
                  <input
                    type="number"
                    value={femalePct}
                    onChange={(e) => setFemalePct(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-400 mb-1">Pillar</label>
                  <select
                    value={pillar}
                    onChange={(e) => setPillar(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded text-white"
                  >
                    <option value="wash">WASH</option>
                    <option value="livelihoods">Livelihoods</option>
                    <option value="energy_climate">Energy</option>
                    <option value="education">Education</option>
                    <option value="ssh_lab">SSH-LAB</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-400 mb-1">Session Objectives *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="What was the purpose of this community meeting?"
                  value={objectives}
                  onChange={(e) => setObjectives(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-400 mb-1">Decisions & Outcomes *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Record agreements, tariff rates, or elected committee members..."
                  value={keyOutcomes}
                  onChange={(e) => setKeyOutcomes(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-400 mb-1">Immediate Follow-Up Action</label>
                <input
                  type="text"
                  placeholder="Action item assigned to field officer or RWC..."
                  value={followUp}
                  onChange={(e) => setFollowUp(e.target.value)}
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
                  Save Engagement to CEM
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
