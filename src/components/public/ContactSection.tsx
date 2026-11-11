import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TRANSLATIONS } from '../../translations';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { language, cmsContent, addAuditLog, openFeedbackModal } = useApp();
  const t = TRANSLATIONS[language];

  const [formType, setFormType] = useState('Partnership');
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    country: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    addAuditLog(
      'Public Inquiry Received',
      'Public Inquiries / CMS',
      `${formType} (${formData.name})`,
      `Inquiry from ${formData.organization || 'Individual'} (${formData.email})`
    );

    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 bg-[#0a0f1d] text-slate-100 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Contact details & Humanitarian Desk */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-amber-400 mb-2">
                <span className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                </span>
                <span>Connect With Our Team</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
                Partner With Local Leadership
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Whether you are a donor foundation, international NGO, diaspora network, academic
                researcher, or volunteer, we welcome strategic partnerships that advance community dignity.
              </p>
            </div>

            <div className="space-y-4 text-xs text-slate-300">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-[#0f172a] border border-amber-500/30 shadow-md">
                <div className="w-9 h-9 rounded-lg bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-0.5">Operational Headquarters</h4>
                  <p className="text-slate-400">{cmsContent.primaryOffice}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-[#0f172a] border border-blue-500/30 shadow-md">
                <div className="w-9 h-9 rounded-lg bg-blue-500/15 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/30">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-0.5">Official Direct Inquiries</h4>
                  <p className="text-slate-400 font-mono text-blue-300">{cmsContent.contactEmail}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-[#0f172a] border border-emerald-500/30 shadow-md">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-0.5">Field Coordination Lines</h4>
                  <p className="text-slate-400 font-mono text-emerald-300">{cmsContent.contactPhone}</p>
                </div>
              </div>
            </div>

            {/* Humanitarian Complaints Desk Callout */}
            <div className="p-5 rounded-2xl bg-amber-950/40 border border-amber-500/40 text-xs space-y-2 shadow-lg">
              <div className="flex items-center gap-2 font-bold text-amber-300">
                <MessageSquare className="w-4 h-4 text-amber-400" />
                <span>Are you a community member or beneficiary?</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                For service complaints, water point breakdown reports, or confidential safeguarding
                matters, use our dedicated accountability channel.
              </p>
              <button
                onClick={openFeedbackModal}
                className="pt-1 text-amber-400 hover:text-amber-300 font-bold underline cursor-pointer inline-block"
              >
                Open Humanitarian Feedback & Complaints Portal →
              </button>
            </div>
          </div>

          {/* Right Column: Inquiries Form */}
          <div className="lg:col-span-7 bg-[#0f172a] p-8 sm:p-9 rounded-2xl border border-slate-800 shadow-2xl">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-950 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-800">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white">Inquiry Transmitted Successfully</h3>
                <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out to Sudan Sustainability Hub. Your inquiry has been routed to
                  our Partnerships & Executive Coordination desk. We respond within 48 business hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', organization: '', email: '', country: '', message: '' });
                  }}
                  className="px-4 py-2 text-xs font-semibold text-amber-400 hover:underline cursor-pointer"
                >
                  Submit Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-white">Send An Official Message</h3>
                  <p className="text-xs text-slate-400">
                    Select your inquiry category to ensure proper team assignment.
                  </p>
                </div>

                {/* Inquiry Type Segmented Control */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {[
                    'Partnership',
                    'Funding & Grants',
                    'Media Inquiry',
                    'Volunteer Application',
                    'General Inquiry',
                  ].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormType(type)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                        formType === type
                          ? 'bg-amber-400 text-slate-950 font-bold shadow'
                          : 'bg-slate-900 text-slate-300 hover:bg-slate-850 border border-slate-800'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Dr. Malik Osman"
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-900 border border-slate-700/80 rounded-lg text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Organization / Entity
                    </label>
                    <input
                      type="text"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      placeholder="e.g. Global Humanitarian Foundation"
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-900 border border-slate-700/80 rounded-lg text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Official Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@organization.org"
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-900 border border-slate-700/80 rounded-lg text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Country / Location
                    </label>
                    <input
                      type="text"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      placeholder="e.g. Uganda, United Kingdom, USA"
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-900 border border-slate-700/80 rounded-lg text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Message / Collaboration Proposal *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Briefly describe your objectives, intended support pillar, or collaboration scope..."
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-900 border border-slate-700/80 rounded-lg text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Inquiry to SSH Leadership</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
