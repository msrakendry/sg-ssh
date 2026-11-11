import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, ShieldAlert, CheckCircle2, Lock, Send, AlertTriangle } from 'lucide-react';
import { FeedbackCategory, FeedbackPriority } from '../../types';

export const FeedbackSubmitModal: React.FC = () => {
  const { isFeedbackModalOpen, closeFeedbackModal, addFeedbackCase, communities } = useApp();

  const [isAnonymous, setIsAnonymous] = useState(false);
  const [complainantName, setComplainantName] = useState('');
  const [complainantContact, setComplainantContact] = useState('');
  const [communityName, setCommunityName] = useState(communities[0]?.name || 'Kiryandongo Settlement — Ranch 1');
  const [category, setCategory] = useState<FeedbackCategory>('Water System Breakdown');
  const [subject, setSubject] = useState('');
  const [details, setDetails] = useState('');
  const [generatedCaseCode, setGeneratedCaseCode] = useState<string | null>(null);

  if (!isFeedbackModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !details) return;

    // Automatic priority assessment based on humanitarian category
    let priority: FeedbackPriority = 'Medium';
    if (category === 'Safeguarding Concern') priority = 'Critical Safeguarding';
    else if (category === 'Water System Breakdown') priority = 'High';
    else if (category === 'Fraud Concern' || category === 'Staff Conduct') priority = 'High';
    else if (category === 'Suggestion') priority = 'Low';

    const code = addFeedbackCase({
      isAnonymous,
      complainantName: isAnonymous ? undefined : complainantName || 'Community Member',
      complainantContact: isAnonymous ? undefined : complainantContact,
      communityName,
      category,
      priority,
      status: 'Open',
      subject,
      details,
      assignedOfficer:
        priority === 'Critical Safeguarding'
          ? 'Amina Al-Hassan (ED Safeguarding Desk)'
          : 'Deng Majok (CEM Desk)',
      targetResolutionDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    });

    setGeneratedCaseCode(code);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#05080f]/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#0f172a] border border-slate-800 rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative my-8 text-slate-100">
        {/* Close Button */}
        <button
          onClick={closeFeedbackModal}
          className="absolute top-4 right-4 p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {generatedCaseCode ? (
          <div className="text-center py-6 space-y-5">
            <div className="w-14 h-14 rounded-full bg-emerald-950 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-800 shadow">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-white">Case Registered in Accountability Ledger</h3>
              <p className="text-xs text-slate-300 mt-1 max-w-md mx-auto">
                Your report has been securely registered in the SSH CEM management desk. A case officer
                has been automatically assigned.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#070b14] border border-slate-800 font-mono text-center shadow-inner">
              <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Your Unique Case Tracking Code:</div>
              <div className="text-2xl font-extrabold text-amber-400 tracking-wider">{generatedCaseCode}</div>
              <div className="text-[11px] text-slate-500 mt-2">
                Keep this code to follow up at any SSH community consultation or field desk.
              </div>
            </div>

            <button
              onClick={() => {
                setGeneratedCaseCode(null);
                closeFeedbackModal();
              }}
              className="px-6 py-2.5 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 rounded-lg cursor-pointer shadow"
            >
              Done & Return
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-amber-400 mb-1">
                <ShieldAlert className="w-4 h-4 text-emerald-400" />
                <span>Humanitarian Accountability & Safeguarding</span>
              </div>
              <h3 className="text-xl font-bold text-white">
                Community Feedback & Complaints Mechanism
              </h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                SSH enforces a zero-tolerance policy for abuse, fraud, or negligence. Community voices
                shape every decision we make.
              </p>
            </div>

            {/* Anonymous Toggle */}
            <div className="p-3.5 rounded-xl bg-[#070b14] border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Lock className="w-4 h-4 text-amber-400" />
                <div>
                  <div className="text-xs font-bold text-white">Submit Anonymously</div>
                  <div className="text-[11px] text-slate-400">
                    Your name and contact details will not be recorded.
                  </div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="w-4 h-4 text-amber-500 rounded bg-slate-800 border-slate-700 focus:ring-amber-400 cursor-pointer"
              />
            </div>

            {/* Category selection */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Nature of Submission *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as FeedbackCategory)}
                className="w-full px-3.5 py-2.5 text-xs bg-[#070b14] border border-slate-800 rounded-lg text-white focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                <option value="Water System Breakdown">Water System Breakdown / Tap Failure (WASH)</option>
                <option value="Suggestion">Community Suggestion for Improvement</option>
                <option value="Service Feedback">Program Service Quality Feedback</option>
                <option value="Request for Assistance">Request for Assistance</option>
                <option value="Safeguarding Concern">Safeguarding / Protection Concern (Confidential)</option>
                <option value="Staff Conduct">Staff Conduct / Behavioral Issue</option>
                <option value="Fraud Concern">Financial or Resource Diversion Concern</option>
                <option value="Other">Other Community Matter</option>
              </select>
            </div>

            {/* Community Zone */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Settlement Cluster / Zone *
              </label>
              <select
                value={communityName}
                onChange={(e) => setCommunityName(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-[#070b14] border border-slate-800 rounded-lg text-white focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                {communities.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name} ({c.zone})
                  </option>
                ))}
              </select>
            </div>

            {/* Complainant Name & Contact if NOT anonymous */}
            {!isAnonymous && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">
                    Your Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={complainantName}
                    onChange={(e) => setComplainantName(e.target.value)}
                    placeholder="e.g. John Deng"
                    className="w-full px-3.5 py-2 text-xs bg-[#070b14] border border-slate-800 rounded-lg text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">
                    Phone / WhatsApp (for follow-up)
                  </label>
                  <input
                    type="text"
                    value={complainantContact}
                    onChange={(e) => setComplainantContact(e.target.value)}
                    placeholder="+256 7..."
                    className="w-full px-3.5 py-2 text-xs bg-[#070b14] border border-slate-800 rounded-lg text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            )}

            {/* Subject */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Summary / Subject Line *
              </label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Water tap leaking near Ranch 1 clinic tap stand"
                className="w-full px-3.5 py-2 text-xs bg-[#070b14] border border-slate-800 rounded-lg text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Details */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Specific Details, Date & Location *
              </label>
              <textarea
                rows={4}
                required
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Please describe what happened, the specific location, and what action you recommend..."
                className="w-full px-3.5 py-2 text-xs bg-[#070b14] border border-slate-800 rounded-lg text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            {category === 'Safeguarding Concern' && (
              <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-800/40 text-rose-200 text-xs flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>
                  Safeguarding reports are encrypted and routed directly to the Executive Director and
                  Survivor Assistance Liaison. No field staff have access.
                </span>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3.5 text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Report to Accountability Desk</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
