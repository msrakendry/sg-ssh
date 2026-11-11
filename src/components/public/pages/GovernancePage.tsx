import React from 'react';
import { useApp } from '../../../context/AppContext';
import { Breadcrumbs } from '../Breadcrumbs';
import { GovernanceSection } from '../GovernanceSection';
import { ShieldAlert, FileText, CheckCircle2, Lock, Download, ExternalLink, Code2 } from 'lucide-react';

export const GovernancePage: React.FC = () => {
  const { setPublicPage, openFeedbackModal, documents } = useApp();

  return (
    <div className="bg-[#070b14] text-slate-100 min-h-screen pb-24">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[{ label: 'Governance & Accountability', isCurrent: true }]}
        pillarColor="red"
      />

      {/* Header */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800 bg-gradient-to-b from-[#180a0e] to-[#070b14]">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-rose-950/80 border border-rose-500/40 text-xs uppercase tracking-wider font-semibold text-rose-300 mb-4">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>PSEA SAFEGUARDING, FINANCIAL INTEGRITY & LEGAL GOVERNANCE</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-4xl [text-wrap:balance]">
            Governance, Safeguarding & Policy Framework
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            SSH operates under a zero-tolerance policy for Sexual Exploitation, Abuse, and Harassment (PSEA).
            We are committed to total institutional transparency, independent audit trails, and strict donor
            fiduciary compliance.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={openFeedbackModal}
              className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-white bg-rose-600 hover:bg-rose-500 rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Submit Confidential PSEA / Grievance Report</span>
            </button>
            <button
              onClick={() => setPublicPage('about')}
              className="px-6 py-3 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors cursor-pointer"
            >
              70% Women-Led Leadership Structure
            </button>
          </div>
        </div>
      </section>

      {/* Embedded Governance Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <GovernanceSection />
      </div>

      {/* Disclosed Policies & Documents */}
      <div id="psea" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-white">Public Policy Registry & Disclosures</h2>
            <p className="text-xs text-slate-400 mt-1">
              All active organizational policies, codes of conduct, and audited financial statements.
            </p>
          </div>
          <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/30">
            {documents.length} Disclosed Documents
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="p-6 rounded-2xl bg-[#090e1a] border border-slate-800 space-y-4 shadow-sm flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {doc.category}
                  </span>
                  <span className="text-[10px] font-mono text-amber-400 font-bold">v{doc.version}</span>
                </div>

                <h3 className="font-bold text-white text-base leading-snug">{doc.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{doc.summary}</p>
              </div>

              <div className="pt-4 border-t border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span>Approved By: <strong className="text-slate-300">{doc.approvedBy}</strong></span>
                  <span>{doc.fileSize}</span>
                </div>
                <button
                  onClick={() => {
                    const blob = new Blob([`SSH Official Document: ${doc.title}\n\n${doc.summary}`], {
                      type: 'text/plain',
                    });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `${doc.title.replace(/\s+/g, '_')}.txt`;
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="w-full py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 border border-slate-700 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-amber-400" />
                  <span>Download Verified Document</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
