import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FeedbackCase, FeedbackStatus, FeedbackPriority } from '../../types';
import { ShieldAlert, AlertTriangle, CheckCircle2, Clock, UserCheck, MessageSquare, Filter } from 'lucide-react';

export const FeedbackTriage: React.FC = () => {
  const { feedbackCases, updateFeedbackCase, activeRole } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [activeCaseModal, setActiveCaseModal] = useState<FeedbackCase | null>(null);

  // Modal resolution form
  const [statusUpdate, setStatusUpdate] = useState<FeedbackStatus>('Open');
  const [assignedOfficerUpdate, setAssignedOfficerUpdate] = useState('');
  const [resolutionNotes, setResolutionNotes] = useState('');

  const filteredCases = feedbackCases.filter((c) => {
    if (selectedCategory !== 'all' && c.category !== selectedCategory) return false;
    if (selectedPriority !== 'all' && c.priority !== selectedPriority) return false;
    return true;
  });

  const handleOpenCase = (c: FeedbackCase) => {
    setActiveCaseModal(c);
    setStatusUpdate(c.status);
    setAssignedOfficerUpdate(c.assignedOfficer);
    setResolutionNotes(c.resolutionNotes || '');
  };

  const handleSaveResolution = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeCaseModal) return;

    updateFeedbackCase(activeCaseModal.id, {
      status: statusUpdate,
      assignedOfficer: assignedOfficerUpdate,
      resolutionNotes,
    });

    setActiveCaseModal(null);
  };

  const getPriorityBadge = (priority: FeedbackPriority) => {
    switch (priority) {
      case 'Critical Safeguarding':
        return (
          <span className="text-[10px] font-mono font-bold uppercase bg-red-950 text-red-300 px-2 py-0.5 rounded border border-red-800 flex items-center gap-1">
            <AlertTriangle className="w-3 h-3 text-red-400" />
            <span>CRITICAL SAFEGUARDING</span>
          </span>
        );
      case 'High':
        return (
          <span className="text-[10px] font-mono font-bold uppercase bg-amber-950 text-amber-300 px-2 py-0.5 rounded border border-amber-800">
            HIGH PRIORITY
          </span>
        );
      case 'Medium':
        return (
          <span className="text-[10px] font-mono font-medium uppercase bg-stone-800 text-stone-300 px-2 py-0.5 rounded">
            MEDIUM
          </span>
        );
      case 'Low':
        return (
          <span className="text-[10px] font-mono font-medium uppercase bg-stone-900 text-stone-400 px-2 py-0.5 rounded">
            ROUTINE
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 text-stone-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-800">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-red-400" />
            <span>Accountability & Safeguarding Feedback Desk</span>
          </h2>
          <p className="text-xs text-stone-400 mt-0.5">
            Managing community feedback, water infrastructure failure alerts, and confidential protection cases
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-stone-400">Total Cases:</span>
          <span className="font-mono font-bold text-amber-400">{feedbackCases.length}</span>
          <span className="text-stone-600">·</span>
          <span className="text-emerald-400 font-semibold">
            {feedbackCases.filter((c) => c.status === 'Resolved' || c.status === 'Closed').length} Closed
          </span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-3 rounded-lg bg-stone-900 border border-stone-800 text-xs">
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-stone-500" />
          <span className="text-stone-400 font-medium">Filter Category:</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-2 py-1 bg-stone-950 border border-stone-800 rounded text-stone-200 cursor-pointer"
          >
            <option value="all">All Categories</option>
            <option value="Safeguarding Concern">Safeguarding Concern</option>
            <option value="Water System Breakdown">Water System Breakdown</option>
            <option value="Suggestion">Suggestion</option>
            <option value="Service Feedback">Service Feedback</option>
            <option value="Staff Conduct">Staff Conduct</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-stone-400 font-medium">Priority:</span>
          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="px-2 py-1 bg-stone-950 border border-stone-800 rounded text-stone-200 cursor-pointer"
          >
            <option value="all">All Priorities</option>
            <option value="Critical Safeguarding">Critical Safeguarding</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      {/* Cases Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCases.map((c) => (
          <div
            key={c.id}
            className={`p-5 rounded-xl border flex flex-col justify-between transition-all ${
              c.priority === 'Critical Safeguarding'
                ? 'bg-red-950/20 border-red-800/60'
                : 'bg-stone-900 border-stone-800'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-400">{c.caseCode}</span>
                {getPriorityBadge(c.priority)}
              </div>

              <div className="text-xs text-stone-400">
                <span className="font-semibold text-stone-300">{c.category}</span> · {c.communityName}
              </div>

              <h4 className="text-sm font-bold text-white leading-snug">{c.subject}</h4>

              <p className="text-xs text-stone-300 leading-relaxed line-clamp-3">{c.details}</p>

              {c.resolutionNotes && (
                <div className="p-2.5 rounded bg-stone-950 border border-stone-800/80 text-[11px] text-emerald-300">
                  <span className="font-semibold text-stone-400 block mb-0.5">Action Record:</span>
                  {c.resolutionNotes}
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-stone-800/80 mt-4 space-y-2">
              <div className="flex items-center justify-between text-[11px] text-stone-400 font-mono">
                <span>Status: <b className="text-stone-200 uppercase">{c.status}</b></span>
                <span>Officer: {c.assignedOfficer.split(' ')[0]}</span>
              </div>

              <button
                onClick={() => handleOpenCase(c)}
                className="w-full py-2 text-xs font-semibold text-stone-200 hover:text-white bg-stone-800 hover:bg-stone-750 rounded border border-stone-700 transition-colors cursor-pointer text-center"
              >
                Triage & Update Resolution →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Case Action Modal */}
      {activeCaseModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-stone-900 border border-stone-800 rounded-xl max-w-lg w-full p-6 shadow-2xl relative my-8 text-stone-100 max-h-[90vh] overflow-y-auto">
            <h3 className="text-base font-bold text-white mb-1">
              Case Triage: {activeCaseModal.caseCode}
            </h3>
            <p className="text-xs text-stone-400 mb-4">{activeCaseModal.category} · {activeCaseModal.communityName}</p>

            <form onSubmit={handleSaveResolution} className="space-y-4">
              <div className="p-3 rounded bg-stone-950 border border-stone-800 text-xs space-y-1">
                <span className="font-bold text-stone-300">Subject: {activeCaseModal.subject}</span>
                <p className="text-stone-400">{activeCaseModal.details}</p>
                <div className="pt-2 text-[11px] text-stone-500 font-mono">
                  Submitted: {activeCaseModal.submissionDate} · Complainant: {activeCaseModal.isAnonymous ? 'Anonymous' : activeCaseModal.complainantName}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-400 mb-1">Update Status</label>
                  <select
                    value={statusUpdate}
                    onChange={(e) => setStatusUpdate(e.target.value as FeedbackStatus)}
                    className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded text-white cursor-pointer"
                  >
                    <option value="Open">Open</option>
                    <option value="Investigating">Under Field Investigation</option>
                    <option value="Action Taken">Action Taken / Maintenance Dispatched</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-400 mb-1">Assigned Focal Officer</label>
                  <input
                    type="text"
                    value={assignedOfficerUpdate}
                    onChange={(e) => setAssignedOfficerUpdate(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-400 mb-1">
                  Investigation & Resolution Record *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Record what technical or safeguarding actions were undertaken, community consultation feedback, and date of resolution..."
                  value={resolutionNotes}
                  onChange={(e) => setResolutionNotes(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-800">
                <button
                  type="button"
                  onClick={() => setActiveCaseModal(null)}
                  className="px-4 py-2 text-xs text-stone-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded cursor-pointer"
                >
                  Update & Commit to Audit Log
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
