import React from 'react';
import { useApp } from '../../context/AppContext';
import { TRANSLATIONS } from '../../translations';
import { Shield, FileCheck, Download, Lock, CheckCircle, ExternalLink, AlertCircle } from 'lucide-react';

export const GovernanceSection: React.FC = () => {
  const { language, documents, openFeedbackModal } = useApp();
  const t = TRANSLATIONS[language];

  // Only publicly disclosed documents
  const publicDocs = documents.filter((d) => d.isPubliclyDisclosed);

  const handleSimulatedDownload = (title: string) => {
    // Generate a clean text file representing the verified institutional brief
    const blob = new Blob(
      [
        `========================================================================\n` +
        `SUDAN SUSTAINABILITY HUB (SSH) — OFFICIAL INSTITUTIONAL DOCUMENT\n` +
        `Title: ${title}\n` +
        `Status: Verified Public Disclosure\n` +
        `Governance: Refugee-Led Humanitarian Operations, Kiryandongo Settlement\n` +
        `Date of Verification: ${new Date().toISOString().split('T')[0]}\n` +
        `Audit Standard: Zero-Tolerance PSEA, Independent Financial Oversight\n` +
        `========================================================================\n\n` +
        `This certified document affirms the adherence of Sudan Sustainability Hub (SSH)\n` +
        `to international humanitarian accountability frameworks (Core Humanitarian Standard),\n` +
        `unqualified annual financial audits, and strict beneficiary data privacy charters.\n\n` +
        `For compliance verifications, contact: compliance@sudansustainabilityhub.org\n`
      ],
      { type: 'text/plain;charset=utf-8' }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="governance" className="py-24 bg-[#070b14] text-slate-100 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-amber-400 mb-2">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>Integrity, Safeguarding & Accountability</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
            {t.transparency.title}
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            {t.transparency.sub}
          </p>
        </div>

        {/* 3 Pillars of Governance Cards — Blue, Green, Gold */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Pillar 1: Independent Financial Audits (Blue) */}
          <div className="p-6 rounded-2xl bg-[#0f172a] border border-blue-500/30 space-y-3 shadow-lg">
            <div className="w-10 h-10 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center border border-blue-500/30">
              <FileCheck className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white">Independent Annual Financial Audits</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Every dollar received from individual donors, foundations, and institutional partners is
              audited by certified independent accountants with public summaries disclosed annually.
            </p>
            <div className="text-[11px] text-blue-400 flex items-center gap-1 font-semibold">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Clean Unqualified Audit Opinion</span>
            </div>
          </div>

          {/* Pillar 2: PSEA Safeguarding (Green) */}
          <div className="p-6 rounded-2xl bg-[#0f172a] border border-emerald-500/30 space-y-3 shadow-lg">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white">Zero-Tolerance PSEA & Safeguarding</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Mandatory Protection from Sexual Exploitation and Abuse (PSEA) compliance signed by all staff,
              contractors, and volunteers, overseen by a dedicated survivor-centered reporting desk.
            </p>
            <div className="text-[11px] text-emerald-400 flex items-center gap-1 font-semibold">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Dedicated Survivor Protection Protocol</span>
            </div>
          </div>

          {/* Pillar 3: Data Protection & Consent (Gold) */}
          <div className="p-6 rounded-2xl bg-[#0f172a] border border-amber-500/30 space-y-3 shadow-lg">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white">Humanitarian Data Protection & Consent</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Refugee identities and protection cases are strictly masked. PII is encrypted and never shared
              with armed actors, commercial entities, or unauthorized external databases.
            </p>
            <div className="text-[11px] text-amber-400 flex items-center gap-1 font-semibold">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Strict Data Minimization Standard</span>
            </div>
          </div>
        </div>

        {/* Public Disclosures Documents Table */}
        <div className="bg-[#0f172a] rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
          <div className="p-5 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-bold text-white">Official Disclosed Institutional Records</h4>
              <p className="text-xs text-slate-400">Download audited statements and governance policies</p>
            </div>
            <button
              onClick={openFeedbackModal}
              className="text-xs text-rose-400 hover:text-rose-300 font-semibold underline flex items-center gap-1.5 cursor-pointer"
            >
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Report Compliance / Safeguarding Concern</span>
            </button>
          </div>

          <div className="divide-y divide-slate-800">
            {publicDocs.map((doc) => (
              <div
                key={doc.id}
                className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-850/50 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-mono uppercase text-amber-400 font-bold">
                      {doc.category}
                    </span>
                    <span className="text-slate-600 text-xs">·</span>
                    <span className="text-xs text-slate-400 font-mono">{doc.version}</span>
                    <span className="text-slate-600 text-xs">·</span>
                    <span className="text-xs text-slate-400">{doc.fileSize}</span>
                  </div>
                  <h5 className="text-sm font-bold text-white">{doc.title}</h5>
                  <p className="text-xs text-slate-400 max-w-2xl">{doc.summary}</p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() => handleSimulatedDownload(doc.title)}
                    className="px-3.5 py-1.5 text-xs font-semibold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-amber-400" />
                    <span>Download Report</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
