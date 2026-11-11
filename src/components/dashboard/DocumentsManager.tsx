import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DocumentRecord } from '../../types';
import { FileText, Shield, Eye, EyeOff, Download, Plus, CheckCircle2 } from 'lucide-react';

export const DocumentsManager: React.FC = () => {
  const { documents, toggleDocumentDisclosure, activeRole } = useApp();

  return (
    <div className="space-y-6 text-stone-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-800">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-400" />
            <span>Institutional Document Management & PSEA Policies</span>
          </h2>
          <p className="text-xs text-stone-400 mt-0.5">
            Internal repository of certified financial audits, safeguarding protocols, and donor agreements
          </p>
        </div>

        <span className="text-xs font-mono text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded border border-emerald-900">
          GOVERNANCE REPOSITORY
        </span>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="p-6 rounded-xl bg-stone-900 border border-stone-800 space-y-4 hover:border-stone-700 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase bg-stone-950 text-amber-400 px-2 py-0.5 rounded border border-stone-800">
                  {doc.category}
                </span>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                    doc.isPubliclyDisclosed
                      ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                      : 'bg-stone-950 text-stone-400 border-stone-800'
                  }`}
                >
                  {doc.isPubliclyDisclosed ? 'Publicly Disclosed' : 'Internal Confidential'}
                </span>
              </div>

              <h3 className="text-base font-bold text-white leading-snug">{doc.title}</h3>

              <p className="text-xs text-stone-300 leading-relaxed">{doc.summary}</p>

              <div className="p-3 rounded-lg bg-stone-950 border border-stone-800 text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-stone-400">Version:</span>
                  <span className="font-mono text-stone-200">{doc.version}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Approved By:</span>
                  <span className="text-stone-200">{doc.approvedBy}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">File Size:</span>
                  <span className="font-mono text-stone-300">{doc.fileSize}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-stone-800/80 flex items-center justify-between gap-3">
              <span className="text-[11px] text-stone-500 font-mono">Updated: {doc.lastUpdated}</span>

              {activeRole === 'super_admin' || activeRole === 'executive_director' ? (
                <button
                  onClick={() => toggleDocumentDisclosure(doc.id)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded border transition-colors cursor-pointer flex items-center gap-1.5 ${
                    doc.isPubliclyDisclosed
                      ? 'bg-stone-800 hover:bg-stone-750 text-stone-300 border-stone-700'
                      : 'bg-amber-400 text-stone-950 border-amber-400 font-bold'
                  }`}
                >
                  {doc.isPubliclyDisclosed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  <span>{doc.isPubliclyDisclosed ? 'Revoke Disclosure' : 'Disclose to Public'}</span>
                </button>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
