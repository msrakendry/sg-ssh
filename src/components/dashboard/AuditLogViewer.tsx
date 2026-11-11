import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { History, Shield, Filter, Download, Search, CheckCircle2, Lock } from 'lucide-react';

export const AuditLogViewer: React.FC = () => {
  const { auditLogs } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModule, setSelectedModule] = useState('all');

  const filteredLogs = auditLogs.filter((log) => {
    if (selectedModule !== 'all' && !log.module.toLowerCase().includes(selectedModule.toLowerCase())) {
      return false;
    }
    if (
      searchQuery &&
      !log.userName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !log.action.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !log.recordIdentifier.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !log.details.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const handleExportAuditCSV = () => {
    const headers = ['Timestamp', 'User', 'Role', 'Action', 'Module', 'Record', 'Details', 'IP'];
    const rows = filteredLogs.map((l) => [
      l.timestamp,
      `"${l.userName}"`,
      l.userRole,
      `"${l.action}"`,
      `"${l.module}"`,
      `"${l.recordIdentifier}"`,
      `"${l.details.replace(/"/g, '""')}"`,
      l.ipAddress,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `SSH_Immutable_Audit_Ledger_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 text-stone-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-800">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <History className="w-5 h-5 text-amber-400" />
            <span>Immutable Institutional Audit & Accountability Ledger</span>
          </h2>
          <p className="text-xs text-stone-400 mt-0.5">
            Cryptographically sealed and tamper-evident logging of all administrative and data access operations
          </p>
        </div>

        <button
          onClick={handleExportAuditCSV}
          className="px-3.5 py-2 text-xs font-semibold text-stone-300 hover:text-white bg-stone-900 hover:bg-stone-850 rounded border border-stone-800 transition-colors flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
        >
          <Download className="w-3.5 h-3.5 text-amber-400" />
          <span>Export Certified Audit CSV</span>
        </button>
      </div>

      {/* Control bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-3 rounded-lg bg-stone-900 border border-stone-800 text-xs">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-stone-500" />
            <input
              type="text"
              placeholder="Search user, action, or record ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs bg-stone-950 border border-stone-800 rounded text-white focus:outline-none focus:border-amber-400 w-56 sm:w-64"
            />
          </div>

          <select
            value={selectedModule}
            onChange={(e) => setSelectedModule(e.target.value)}
            className="px-2.5 py-1.5 bg-stone-950 border border-stone-800 rounded text-stone-300 cursor-pointer"
          >
            <option value="all">All Modules</option>
            <option value="Security">Security & RBAC</option>
            <option value="Projects">Projects</option>
            <option value="CEM">CEM & Communities</option>
            <option value="Data Protection">Data Protection</option>
            <option value="Accountability">Accountability / Feedback</option>
            <option value="M&E">M&E / Impact</option>
            <option value="Governance">Governance & Documents</option>
          </select>
        </div>

        <div className="flex items-center gap-2 font-mono text-[11px] text-stone-400">
          <Lock className="w-3.5 h-3.5 text-emerald-400" />
          <span>Showing {filteredLogs.length} immutable events</span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-stone-900 rounded-xl border border-stone-800 overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-950 text-stone-400 font-mono text-[11px] uppercase border-b border-stone-800">
              <tr>
                <th className="p-3.5">Timestamp</th>
                <th className="p-3.5">User & Active Role</th>
                <th className="p-3.5">Action Executed</th>
                <th className="p-3.5">Module Scope</th>
                <th className="p-3.5">Target Record</th>
                <th className="p-3.5">Operational Details</th>
                <th className="p-3.5 text-right">IP Origin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/80 font-mono text-[11px]">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-stone-850 transition-colors">
                  <td className="p-3.5 text-stone-400 whitespace-nowrap">
                    {log.timestamp}
                  </td>

                  <td className="p-3.5 text-white whitespace-nowrap">
                    <span className="font-bold">{log.userName}</span>
                    <span className="text-stone-500 block text-[10px] uppercase">
                      {log.userRole.replace('_', ' ')}
                    </span>
                  </td>

                  <td className="p-3.5 whitespace-nowrap">
                    <span className="text-amber-400 font-bold bg-amber-950/60 px-2 py-0.5 rounded border border-amber-900/60">
                      {log.action}
                    </span>
                  </td>

                  <td className="p-3.5 text-stone-300 whitespace-nowrap font-sans">
                    {log.module}
                  </td>

                  <td className="p-3.5 text-sky-400 font-semibold whitespace-nowrap">
                    {log.recordIdentifier}
                  </td>

                  <td className="p-3.5 text-stone-300 font-sans max-w-sm">
                    {log.details}
                  </td>

                  <td className="p-3.5 text-right text-stone-500 whitespace-nowrap">
                    {log.ipAddress}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
