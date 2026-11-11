import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Beneficiary, ProgramPillar, ConsentStatus } from '../../types';
import {
  Shield,
  Eye,
  EyeOff,
  Plus,
  Lock,
  Search,
  CheckCircle2,
  AlertTriangle,
  UserCheck,
  FileText,
} from 'lucide-react';

export const BeneficiaryRegistry: React.FC = () => {
  const {
    beneficiaries,
    addBeneficiary,
    toggleBeneficiaryMask,
    communities,
    projects,
    activeRole,
    addAuditLog,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPillar, setSelectedPillar] = useState<'all' | ProgramPillar>('all');
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  // Registration Form
  const [initials, setInitials] = useState('');
  const [gender, setGender] = useState<'Female' | 'Male' | 'Other'>('Female');
  const [ageRange, setAgeRange] = useState<'15-18' | '19-24' | '25-35' | '36-49' | '50+'>('25-35');
  const [communityId, setCommunityId] = useState(communities[0]?.id || '');
  const [pillar, setPillar] = useState<ProgramPillar>('livelihoods');
  const [projectId, setProjectId] = useState(projects[0]?.id || '');
  const [householdSize, setHouseholdSize] = useState('5');
  const [consentStatus, setConsentStatus] = useState<ConsentStatus>('Verified Written');
  const [serviceReceived, setServiceReceived] = useState('VSLA Passbook & Business Skills Cohort');

  const filteredBeneficiaries = beneficiaries.filter((b) => {
    if (selectedPillar !== 'all' && b.pillar !== selectedPillar) return false;
    if (
      searchQuery &&
      !b.anonymizedId.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !b.communityName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !b.projectTitle.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!initials) return;

    const comm = communities.find((c) => c.id === communityId) || communities[0];
    const prj = projects.find((p) => p.id === projectId) || projects[0];
    const newAnonId = `KYR-BEN-${Math.floor(1000 + Math.random() * 9000)}`;

    addBeneficiary({
      anonymizedId: newAnonId,
      initials,
      gender,
      ageRange,
      communityId: comm.id,
      communityName: comm.name,
      householdSize: parseInt(householdSize, 10) || 4,
      pillar,
      projectId: prj.id,
      projectTitle: prj.title,
      assistanceReceived: [serviceReceived],
      registrationDate: new Date().toISOString().split('T')[0],
      consentStatus,
      vulnerabilityTags: ['Displaced Household', 'Informed Assent Recorded'],
      dataProtectionLevel: 'Standard Protected',
      isMasked: true,
    });

    setIsRegisterModalOpen(false);
    setInitials('');
  };

  const handleExportSensitive = () => {
    if (activeRole !== 'super_admin' && activeRole !== 'executive_director') {
      alert('Access Denied: Exporting beneficiary rosters requires Executive Director authorization.');
      return;
    }

    addAuditLog(
      'Exported Beneficiary Roster',
      'CEM / Data Protection',
      `Roster Count: ${filteredBeneficiaries.length}`,
      'Authorized export with encrypted anonymized identifiers'
    );

    const headers = ['AnonymizedID', 'Initials', 'Gender', 'AgeRange', 'Community', 'Pillar', 'ConsentStatus'];
    const rows = filteredBeneficiaries.map((b) => [
      b.anonymizedId,
      b.isMasked ? '***' : b.initials,
      b.gender,
      b.ageRange,
      `"${b.communityName}"`,
      b.pillar,
      b.consentStatus,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `SSH_Beneficiary_Protected_Export_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 text-stone-100">
      {/* Top Banner with Humanitarian Ethics Charter Notice */}
      <div className="p-5 rounded-xl bg-stone-900 border border-stone-800 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-emerald-400" />
            <h2 className="text-xl font-bold text-white">
              Beneficiary Information Management System (BIMS)
            </h2>
          </div>
          <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
            ENCRYPTED & VEILED BY DEFAULT
          </span>
        </div>
        <p className="text-xs text-stone-400 leading-relaxed">
          In strict compliance with the SSH Humanitarian Data Ethics Charter and Do-No-Harm principles,
          all beneficiary records are pseudonymized. Personally Identifiable Information (PII) is veiled
          unless authorized inspection is explicitly unlocked, which generates an immutable audit record.
        </p>
      </div>

      {/* Control bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Search & Filter */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-stone-500" />
            <input
              type="text"
              placeholder="Search by ID, settlement, or project..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs bg-stone-900 border border-stone-800 rounded text-white focus:outline-none focus:border-amber-400 w-56 sm:w-64"
            />
          </div>

          <select
            value={selectedPillar}
            onChange={(e) => setSelectedPillar(e.target.value as any)}
            className="px-2.5 py-1.5 text-xs bg-stone-900 border border-stone-800 rounded text-stone-300 focus:outline-none focus:border-amber-400 cursor-pointer"
          >
            <option value="all">All Pillars</option>
            <option value="wash">WASH</option>
            <option value="livelihoods">Livelihoods</option>
            <option value="energy_climate">Energy</option>
            <option value="education">Education</option>
            <option value="ssh_lab">SSH-LAB</option>
          </select>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportSensitive}
            className="px-3 py-1.5 text-xs font-semibold text-stone-300 hover:text-white bg-stone-900 hover:bg-stone-800 rounded border border-stone-800 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Lock className="w-3.5 h-3.5 text-amber-400" />
            <span>Authorized Export</span>
          </button>

          {activeRole !== 'auditor' && (
            <button
              onClick={() => setIsRegisterModalOpen(true)}
              className="px-4 py-1.5 text-xs font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Register Beneficiary with Consent</span>
            </button>
          )}
        </div>
      </div>

      {/* Beneficiaries Table */}
      <div className="bg-stone-900 rounded-xl border border-stone-800 overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-950 text-stone-400 font-mono text-[11px] uppercase border-b border-stone-800">
              <tr>
                <th className="p-3.5">Pseudonym ID</th>
                <th className="p-3.5">Identity (Veiled)</th>
                <th className="p-3.5">Demographics</th>
                <th className="p-3.5">Settlement Cluster</th>
                <th className="p-3.5">Project / Services</th>
                <th className="p-3.5">Consent Record</th>
                <th className="p-3.5 text-right">Data Protection</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/80">
              {filteredBeneficiaries.map((b) => (
                <tr key={b.id} className="hover:bg-stone-850 transition-colors">
                  <td className="p-3.5 font-mono font-bold text-amber-400 whitespace-nowrap">
                    {b.anonymizedId}
                  </td>

                  <td className="p-3.5 font-semibold text-white whitespace-nowrap">
                    {b.isMasked ? (
                      <span className="text-stone-500 font-mono tracking-widest">*** (Masked)</span>
                    ) : (
                      <span className="text-emerald-300 font-bold">{b.initials}</span>
                    )}
                  </td>

                  <td className="p-3.5 text-stone-300 whitespace-nowrap">
                    {b.gender} · {b.ageRange} yrs · HH: {b.householdSize}
                  </td>

                  <td className="p-3.5 text-stone-300 whitespace-nowrap">
                    {b.communityName}
                  </td>

                  <td className="p-3.5 space-y-1">
                    <div className="font-semibold text-stone-200">{b.projectTitle}</div>
                    <div className="text-[11px] text-stone-400 truncate max-w-xs">
                      {b.assistanceReceived.join(', ')}
                    </div>
                  </td>

                  <td className="p-3.5 whitespace-nowrap">
                    <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-900 flex items-center gap-1 w-fit">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{b.consentStatus}</span>
                    </span>
                  </td>

                  <td className="p-3.5 text-right whitespace-nowrap">
                    <button
                      onClick={() => toggleBeneficiaryMask(b.id)}
                      className={`px-2.5 py-1 text-xs font-semibold rounded border transition-colors cursor-pointer inline-flex items-center gap-1.5 ${
                        b.isMasked
                          ? 'bg-stone-800 hover:bg-stone-700 text-stone-300 border-stone-700'
                          : 'bg-amber-400/20 text-amber-300 border-amber-400'
                      }`}
                      title={b.isMasked ? 'Authorized Reveal (Logged)' : 'Veil PII'}
                    >
                      {b.isMasked ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      <span>{b.isMasked ? 'Reveal (Audit)' : 'Veil'}</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Registration Modal */}
      {isRegisterModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-stone-900 border border-stone-800 rounded-xl max-w-lg w-full p-6 shadow-2xl relative my-8 text-stone-100 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-white mb-2">Register Beneficiary With Informed Consent</h3>
            <p className="text-xs text-stone-400 mb-4">
              Prior to collecting any data, verify that the participant understands how information is
              used strictly for service delivery.
            </p>

            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-400 mb-1">Initials / Code *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. S. M."
                    value={initials}
                    onChange={(e) => setInitials(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-400 mb-1">Gender</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded text-white"
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-400 mb-1">Age Bracket</label>
                  <select
                    value={ageRange}
                    onChange={(e) => setAgeRange(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded text-white"
                  >
                    <option value="15-18">15-18</option>
                    <option value="19-24">19-24</option>
                    <option value="25-35">25-35</option>
                    <option value="36-49">36-49</option>
                    <option value="50+">50+</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-400 mb-1">Settlement Cluster</label>
                  <select
                    value={communityId}
                    onChange={(e) => setCommunityId(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded text-white"
                  >
                    {communities.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-400 mb-1">Household Size</label>
                  <input
                    type="number"
                    value={householdSize}
                    onChange={(e) => setHouseholdSize(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-400 mb-1">Assigned Project</label>
                <select
                  value={projectId}
                  onChange={(e) => setProjectId(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded text-white"
                >
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.code} · {p.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-400 mb-1">Services / Support Provided</label>
                <input
                  type="text"
                  value={serviceReceived}
                  onChange={(e) => setServiceReceived(e.target.value)}
                  placeholder="e.g. Clean Cookstove, Solar Study Torch, VSLA Passbook"
                  className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded text-white"
                />
              </div>

              <div className="p-3 rounded bg-stone-950 border border-stone-800 space-y-2">
                <label className="block text-xs font-bold text-amber-400">
                  Mandatory Informed Consent Verification *
                </label>
                <select
                  value={consentStatus}
                  onChange={(e) => setConsentStatus(e.target.value as ConsentStatus)}
                  className="w-full px-3 py-1.5 text-xs bg-stone-900 border border-stone-800 rounded text-white"
                >
                  <option value="Verified Written">Verified Written Consent (Signed/Thumbprint)</option>
                  <option value="Oral Assent Witnessed">Oral Assent Witnessed (Community Elder Present)</option>
                  <option value="Pending Update">Pending Written Confirmation</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-800">
                <button
                  type="button"
                  onClick={() => setIsRegisterModalOpen(false)}
                  className="px-4 py-2 text-xs text-stone-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded cursor-pointer"
                >
                  Register Protected Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
