import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Project, ProjectStatus, ProgramPillar } from '../../types';
import { Plus, Filter, Download, ArrowUpRight, FolderKanban, AlertCircle, CheckCircle } from 'lucide-react';

export const ProjectsManager: React.FC = () => {
  const { projects, addProject, updateProject, communities, activeRole } = useApp();

  const [filterPillar, setFilterPillar] = useState<'all' | ProgramPillar>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | ProjectStatus>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form State
  const [formCode, setFormCode] = useState(`SSH-WASH-2026-0${projects.length + 1}`);
  const [formTitle, setFormTitle] = useState('');
  const [formPillar, setFormPillar] = useState<ProgramPillar>('wash');
  const [formSettlement, setFormSettlement] = useState('Kiryandongo Refugee Settlement');
  const [formLocation, setFormLocation] = useState('Ranch 1 Zone B');
  const [formDonor, setFormDonor] = useState('East Africa Resilience Fund');
  const [formPartner, setFormPartner] = useState('Refugee Welfare Council');
  const [formStartDate, setFormStartDate] = useState('2026-01-01');
  const [formEndDate, setFormEndDate] = useState('2026-12-31');
  const [formBudget, setFormBudget] = useState('45000');
  const [formTargetBen, setFormTargetBen] = useState('5000');
  const [formManager, setFormManager] = useState('Nawal Yousif');
  const [formSummary, setFormSummary] = useState('');

  const filteredProjects = projects.filter((p) => {
    if (filterPillar !== 'all' && p.programPillar !== filterPillar) return false;
    if (filterStatus !== 'all' && p.status !== filterStatus) return false;
    return true;
  });

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle || !formSummary) return;

    addProject({
      code: formCode,
      title: formTitle,
      programPillar: formPillar,
      country: 'Uganda',
      settlement: formSettlement,
      locationDetails: formLocation,
      donorName: formDonor,
      partnerName: formPartner,
      startDate: formStartDate,
      endDate: formEndDate,
      budgetUSD: parseFloat(formBudget) || 25000,
      spentUSD: 0,
      status: 'active',
      targetBeneficiaries: parseInt(formTargetBen, 10) || 1000,
      actualBeneficiaries: 0,
      projectManager: formManager,
      summary: formSummary,
      outputs: ['Baseline hydrogeological surveys', 'Community consensus meeting conducted'],
      risks: ['Seasonal access road flooding - Monitored by logistics team'],
    });

    setIsAddModalOpen(false);
    setFormTitle('');
    setFormSummary('');
  };

  const handleExportCSV = () => {
    const headers = ['Code', 'Title', 'Pillar', 'Settlement', 'Status', 'BudgetUSD', 'SpentUSD', 'BeneficiariesTarget', 'BeneficiariesActual'];
    const rows = filteredProjects.map((p) => [
      p.code,
      `"${p.title.replace(/"/g, '""')}"`,
      p.programPillar,
      `"${p.settlement}"`,
      p.status,
      p.budgetUSD,
      p.spentUSD,
      p.targetBeneficiaries,
      p.actualBeneficiaries,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `SSH_Projects_Export_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 text-stone-100">
      {/* Top action strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-800">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FolderKanban className="w-5 h-5 text-amber-400" />
            <span>Programs & Projects Pipeline</span>
          </h2>
          <p className="text-xs text-stone-400 mt-0.5">
            Managing budgets, milestone delivery, and verified beneficiary targets across Uganda and Sudan
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="px-3 py-2 text-xs font-semibold text-stone-300 hover:text-white bg-stone-900 hover:bg-stone-800 rounded border border-stone-800 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>

          {activeRole !== 'auditor' && (
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2 text-xs font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Register New Project</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs & Segmented Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-3 rounded-lg bg-stone-900 border border-stone-800 text-xs">
        {/* Pillar filter */}
        <div className="flex flex-wrap items-center gap-1">
          <span className="text-stone-400 text-[11px] uppercase font-bold mr-1">Pillar:</span>
          {[
            { id: 'all', label: 'All' },
            { id: 'wash', label: 'WASH' },
            { id: 'livelihoods', label: 'Livelihoods' },
            { id: 'energy_climate', label: 'Energy' },
            { id: 'education', label: 'Education' },
            { id: 'ssh_lab', label: 'SSH-LAB' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterPillar(tab.id as any)}
              className={`px-2.5 py-1 rounded font-medium transition-colors cursor-pointer ${
                filterPillar === tab.id
                  ? 'bg-amber-400 text-stone-950 font-bold'
                  : 'text-stone-400 hover:text-white hover:bg-stone-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Status filter */}
        <div className="flex items-center gap-1">
          <span className="text-stone-400 text-[11px] uppercase font-bold mr-1">Status:</span>
          {(['all', 'active', 'completed', 'proposal'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st as any)}
              className={`px-2.5 py-1 rounded capitalize font-medium transition-colors cursor-pointer ${
                filterStatus === st
                  ? 'bg-stone-800 text-amber-300 border border-stone-700'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Projects List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project) => {
          const spendPct = Math.round((project.spentUSD / project.budgetUSD) * 100);
          const benPct = Math.round(
            (project.actualBeneficiaries / project.targetBeneficiaries) * 100
          );

          return (
            <div
              key={project.id}
              className="p-6 rounded-xl bg-stone-900 border border-stone-800 space-y-4 hover:border-stone-700 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-amber-400">
                    {project.code}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800">
                      {project.status}
                    </span>
                    {activeRole === 'executive_director' || activeRole === 'super_admin' ? (
                      <select
                        value={project.status}
                        onChange={(e) =>
                          updateProject(project.id, { status: e.target.value as ProjectStatus })
                        }
                        className="text-[10px] bg-stone-950 border border-stone-800 text-stone-300 rounded px-1.5 py-0.5 cursor-pointer"
                      >
                        <option value="concept">Concept</option>
                        <option value="proposal">Proposal</option>
                        <option value="active">Active</option>
                        <option value="completed">Completed</option>
                        <option value="closed">Closed</option>
                      </select>
                    ) : null}
                  </div>
                </div>

                <h3 className="text-base font-bold text-white leading-snug">
                  {project.title}
                </h3>

                <div className="text-xs text-stone-400">
                  <span className="font-semibold text-stone-300">{project.settlement}</span> ·{' '}
                  {project.locationDetails}
                </div>

                <p className="text-xs text-stone-300 leading-relaxed">
                  {project.summary}
                </p>

                {/* Outputs checklist */}
                <div className="space-y-1.5 pt-2">
                  <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider">
                    Verified Key Outputs:
                  </span>
                  {project.outputs.map((out, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-xs text-stone-300">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{out}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Progress & Financial Bar */}
              <div className="pt-4 border-t border-stone-800/80 space-y-3">
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <div className="text-[11px] text-stone-400 flex justify-between">
                      <span>Budget:</span>
                      <span className="font-mono font-bold text-stone-200">
                        ${project.spentUSD.toLocaleString()} / ${project.budgetUSD.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full bg-stone-800 h-1.5 rounded-full mt-1 overflow-hidden">
                      <div className="bg-sky-500 h-full rounded-full" style={{ width: `${spendPct}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="text-[11px] text-stone-400 flex justify-between">
                      <span>Beneficiaries:</span>
                      <span className="font-mono font-bold text-stone-200">
                        {project.actualBeneficiaries.toLocaleString()} / {project.targetBeneficiaries.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full bg-stone-800 h-1.5 rounded-full mt-1 overflow-hidden">
                      <div className="bg-amber-400 h-full rounded-full" style={{ width: `${benPct}%` }} />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-stone-500 font-mono">
                  <span>Donor: {project.donorName}</span>
                  <span>Lead: {project.projectManager}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Project Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-stone-900 border border-stone-800 rounded-xl max-w-xl w-full p-6 shadow-2xl relative my-8 text-stone-100 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-white mb-4">Register New Humanitarian Project</h3>

            <form onSubmit={handleCreateProject} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-400 mb-1">Project Code</label>
                  <input
                    type="text"
                    required
                    value={formCode}
                    onChange={(e) => setFormCode(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-400 mb-1">Program Pillar</label>
                  <select
                    value={formPillar}
                    onChange={(e) => setFormPillar(e.target.value as ProgramPillar)}
                    className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded text-white cursor-pointer"
                  >
                    <option value="wash">WASH & Water Reticulation</option>
                    <option value="livelihoods">Livelihoods & Micro-Savings</option>
                    <option value="energy_climate">Renewable Energy & Climate</option>
                    <option value="education">Accelerated Education</option>
                    <option value="ssh_lab">SSH-LAB Technology & Peace</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-400 mb-1">Project Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ranch 37 Solar Water Well Expansion"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-400 mb-1">Settlement Zone</label>
                  <input
                    type="text"
                    value={formSettlement}
                    onChange={(e) => setFormSettlement(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-400 mb-1">Specific Location</label>
                  <input
                    type="text"
                    value={formLocation}
                    onChange={(e) => setFormLocation(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-400 mb-1">Budget (USD)</label>
                  <input
                    type="number"
                    value={formBudget}
                    onChange={(e) => setFormBudget(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-400 mb-1">Target Beneficiaries</label>
                  <input
                    type="number"
                    value={formTargetBen}
                    onChange={(e) => setFormTargetBen(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-400 mb-1">Donor Agency / Grant</label>
                  <input
                    type="text"
                    value={formDonor}
                    onChange={(e) => setFormDonor(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-400 mb-1">Project Manager</label>
                  <input
                    type="text"
                    value={formManager}
                    onChange={(e) => setFormManager(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-400 mb-1">Project Summary / Scope *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Summarize project objectives, expected impact, and community governance structure..."
                  value={formSummary}
                  onChange={(e) => setFormSummary(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs text-stone-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded cursor-pointer"
                >
                  Save & Log in Ledger
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
