import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Donor, Partner } from '../../types';
import { Coins, HeartHandshake, Plus, Calendar, Mail, FileCheck, CheckCircle2 } from 'lucide-react';

export const DonorsPartnersManager: React.FC = () => {
  const { donors, partners, addDonor, addPartner, activeRole } = useApp();

  const [activeTab, setActiveTab] = useState<'donors' | 'partners'>('donors');
  const [isDonorModalOpen, setIsDonorModalOpen] = useState(false);
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);

  // New Donor Form
  const [dName, setDName] = useState('');
  const [dType, setDType] = useState<Donor['organizationType']>('Foundation');
  const [dCountry, setDCountry] = useState('Regional');
  const [dFocal, setDFocal] = useState('');
  const [dEmail, setDEmail] = useState('');
  const [dCommitted, setDCommitted] = useState('50000');
  const [dDeadline, setDDeadline] = useState('2026-06-30');

  // New Partner Form
  const [pName, setPName] = useState('');
  const [pType, setPType] = useState<Partner['type']>('Refugee-Led Organization (RLO)');
  const [pSettlement, setPSettlement] = useState('Kiryandongo Refugee Settlement');
  const [pContact, setPContact] = useState('');
  const [pEmail, setPEmail] = useState('');

  const handleCreateDonor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dName || !dEmail) return;

    addDonor({
      name: dName,
      organizationType: dType,
      country: dCountry,
      focalPerson: dFocal || 'Grants Officer',
      email: dEmail,
      totalCommittedUSD: parseFloat(dCommitted) || 25000,
      totalDisbursedUSD: 0,
      fundedProjects: ['SSH-WASH-2025-01'],
      partnershipStage: 'Active Grantee',
      nextReportingDeadline: dDeadline,
    });

    setIsDonorModalOpen(false);
    setDName('');
    setDEmail('');
  };

  const handleCreatePartner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pName || !pContact) return;

    addPartner({
      name: pName,
      type: pType,
      country: 'Uganda',
      settlement: pSettlement,
      primaryContact: pContact,
      email: pEmail || 'contact@partner.org',
      mouStatus: 'Signed Active',
      jointInitiatives: ['Community outreach & verification'],
    });

    setIsPartnerModalOpen(false);
    setPName('');
    setPContact('');
  };

  return (
    <div className="space-y-6 text-stone-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-800">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Coins className="w-5 h-5 text-amber-400" />
            <span>Donor CRM & Strategic Institutional Partners</span>
          </h2>
          <p className="text-xs text-stone-400 mt-0.5">
            Managing grant agreements, reporting deadlines, and Refugee-Led Organization (RLO) MoUs
          </p>
        </div>

        {activeRole !== 'auditor' && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsDonorModalOpen(true)}
              className="px-3 py-1.5 text-xs font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Record Donor Grant</span>
            </button>
            <button
              onClick={() => setIsPartnerModalOpen(true)}
              className="px-3 py-1.5 text-xs font-semibold text-stone-200 hover:text-white bg-stone-800 hover:bg-stone-700 rounded border border-stone-700 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Register Partner MoU</span>
            </button>
          </div>
        )}
      </div>

      {/* Switch Tab (Donors vs Partners) */}
      <div className="flex gap-2 border-b border-stone-800 pb-2">
        <button
          onClick={() => setActiveTab('donors')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'donors'
              ? 'bg-amber-400 text-stone-950'
              : 'text-stone-400 hover:text-white hover:bg-stone-900'
          }`}
        >
          <Coins className="w-4 h-4" />
          <span>Institutional Donors & Grants ({donors.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('partners')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'partners'
              ? 'bg-amber-400 text-stone-950'
              : 'text-stone-400 hover:text-white hover:bg-stone-900'
          }`}
        >
          <HeartHandshake className="w-4 h-4" />
          <span>Partners & Refugee-Led Alliances ({partners.length})</span>
        </button>
      </div>

      {/* Content */}
      {activeTab === 'donors' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {donors.map((d) => (
            <div
              key={d.id}
              className="p-5 rounded-xl bg-stone-900 border border-stone-800 space-y-4 hover:border-stone-700 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase bg-amber-950 text-amber-400 px-2 py-0.5 rounded border border-amber-800">
                    {d.organizationType}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-900">
                    {d.partnershipStage}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white">{d.name}</h3>

                <div className="text-xs text-stone-400">
                  Focal: <span className="text-stone-200 font-semibold">{d.focalPerson}</span> ({d.country})
                </div>

                {/* Financial overview */}
                <div className="p-3 rounded-lg bg-stone-950 border border-stone-800 text-xs space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-stone-400">Total Committed:</span>
                    <span className="font-mono font-bold text-white">${d.totalCommittedUSD.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">Disbursed to Date:</span>
                    <span className="font-mono font-bold text-emerald-400">${d.totalDisbursedUSD.toLocaleString()}</span>
                  </div>
                </div>

                <div className="text-[11px] text-stone-400 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-stone-500" />
                  <span className="font-mono">{d.email}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-800 text-[11px] text-amber-400/90 flex items-center justify-between font-mono">
                <span>Next Report:</span>
                <span className="font-bold">{d.nextReportingDeadline}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {partners.map((p) => (
            <div
              key={p.id}
              className="p-5 rounded-xl bg-stone-900 border border-stone-800 space-y-4 hover:border-stone-700 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase bg-sky-950 text-sky-400 px-2 py-0.5 rounded border border-sky-800">
                    {p.type}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-900">
                    {p.mouStatus}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white">{p.name}</h3>

                <div className="text-xs text-stone-400">
                  Contact: <span className="text-stone-200 font-semibold">{p.primaryContact}</span>
                </div>

                <div className="space-y-1 pt-1">
                  <span className="text-[10px] uppercase font-bold text-stone-500">Joint Scope:</span>
                  <div className="space-y-1">
                    {p.jointInitiatives.map((init, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-xs text-stone-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{init}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-800 text-[11px] text-stone-400 font-mono">
                Jurisdiction: {p.settlement}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Donor Modal */}
      {isDonorModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-stone-900 border border-stone-800 rounded-xl max-w-lg w-full p-6 shadow-2xl relative my-8 text-stone-100 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-white mb-4">Record Institutional Donor & Grant</h3>
            <form onSubmit={handleCreateDonor} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-stone-400 mb-1">Donor Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Nordic Peace & Resilience Foundation"
                  value={dName}
                  onChange={(e) => setDName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-400 mb-1">Organization Type</label>
                  <select
                    value={dType}
                    onChange={(e) => setDType(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded text-white"
                  >
                    <option value="Foundation">Foundation</option>
                    <option value="Institutional / UN">Institutional / UN</option>
                    <option value="Bilateral">Bilateral</option>
                    <option value="Diaspora Network">Diaspora Network</option>
                    <option value="Private Philanthropy">Private Philanthropy</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-400 mb-1">Country / HQ</label>
                  <input
                    type="text"
                    value={dCountry}
                    onChange={(e) => setDCountry(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-400 mb-1">Focal Person</label>
                  <input
                    type="text"
                    placeholder="e.g. Sarah Jenkins (Grants Manager)"
                    value={dFocal}
                    onChange={(e) => setDFocal(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-400 mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={dEmail}
                    onChange={(e) => setDEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-400 mb-1">Committed Amount (USD)</label>
                  <input
                    type="number"
                    value={dCommitted}
                    onChange={(e) => setDCommitted(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-400 mb-1">Reporting Deadline</label>
                  <input
                    type="date"
                    value={dDeadline}
                    onChange={(e) => setDDeadline(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded text-white font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-800">
                <button
                  type="button"
                  onClick={() => setIsDonorModalOpen(false)}
                  className="px-4 py-2 text-xs text-stone-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded cursor-pointer"
                >
                  Save Donor Agreement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Partner Modal */}
      {isPartnerModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-stone-900 border border-stone-800 rounded-xl max-w-lg w-full p-6 shadow-2xl relative my-8 text-stone-100 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-white mb-4">Register Strategic Partner / RLO MoU</h3>
            <form onSubmit={handleCreatePartner} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-stone-400 mb-1">Partner Organization *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sudanese Refugee Youth Alliance"
                  value={pName}
                  onChange={(e) => setPName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-400 mb-1">Partner Classification</label>
                  <select
                    value={pType}
                    onChange={(e) => setPType(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded text-white"
                  >
                    <option value="Refugee-Led Organization (RLO)">Refugee-Led Organization (RLO)</option>
                    <option value="Local CBO">Local CBO</option>
                    <option value="Government Liaison">Government Liaison (OPM/Host)</option>
                    <option value="Technical / Academic">Technical / Academic</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-400 mb-1">Operating Location</label>
                  <input
                    type="text"
                    value={pSettlement}
                    onChange={(e) => setPSettlement(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-400 mb-1">Primary Liaison Contact *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Maryam K."
                    value={pContact}
                    onChange={(e) => setPContact(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-400 mb-1">Official Email</label>
                  <input
                    type="email"
                    value={pEmail}
                    onChange={(e) => setPEmail(e.target.value)}
                    placeholder="partner@org.net"
                    className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded text-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-800">
                <button
                  type="button"
                  onClick={() => setIsPartnerModalOpen(false)}
                  className="px-4 py-2 text-xs text-stone-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded cursor-pointer"
                >
                  Commit Partner MoU
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
