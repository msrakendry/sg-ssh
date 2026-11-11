import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Breadcrumbs } from '../Breadcrumbs';
import { ContactSection } from '../ContactSection';
import { Mail, Phone, MapPin, ShieldAlert, CheckCircle2, MessageSquare, Send, Clock, Globe } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { openFeedbackModal, cmsContent } = useApp();
  const [sentMessage, setSentMessage] = useState(false);
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    organization: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactData.name || !contactData.message) return;
    setSentMessage(true);
  };

  return (
    <div className="bg-[#070b14] text-slate-100 min-h-screen pb-24">
      <Breadcrumbs
        items={[{ label: 'Contact & Complaints Desk', isCurrent: true }]}
        pillarColor="gold"
      />

      {/* Header */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800 bg-gradient-to-b from-[#141208] to-[#070b14]">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-950/80 border border-amber-500/40 text-xs uppercase tracking-wider font-semibold text-amber-300 mb-4">
            <Mail className="w-3.5 h-3.5" />
            <span>COMMUNITY LIAISON, FIELD INQUIRIES & COMPLAINTS DESK</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-4xl [text-wrap:balance]">
            Contact Sudan Sustainability Hub
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Reach out to our field teams in Kiryandongo Settlement or our Kampala Liaison Desk. For
            humanitarian complaints, safeguarding alerts, and PSEA reporting, use our confidential grievance
            desk below.
          </p>
        </div>
      </section>

      {/* Dedicated Complaints Banner */}
      <div id="complaints" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="p-8 rounded-3xl bg-gradient-to-r from-rose-950/40 via-[#0e1220] to-amber-950/30 border border-rose-500/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
              <ShieldAlert className="w-4 h-4" />
              <span>CONFIDENTIAL HUMANITARIAN COMPLAINTS & PSEA DESK</span>
            </div>
            <h3 className="text-xl font-extrabold text-white">Need to report a safeguarding or service concern?</h3>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Every beneficiary, volunteer, and community member has the right to report service issues,
              water shortages, or safeguarding concerns anonymously. All submissions generate an encrypted tracking code.
            </p>
          </div>
          <button
            onClick={openFeedbackModal}
            className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-rose-600 hover:bg-rose-500 rounded-xl shadow-lg hover:shadow-rose-600/30 transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 shrink-0"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Open Confidential Form</span>
          </button>
        </div>
      </div>

      {/* Embedded Contact Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ContactSection />
      </div>
    </div>
  );
};
