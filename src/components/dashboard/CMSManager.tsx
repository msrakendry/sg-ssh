import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Settings, Save, CheckCircle2, Globe, Bell, Share2, ShieldCheck, ExternalLink, Plus } from 'lucide-react';

export const CMSManager: React.FC = () => {
  const {
    cmsContent,
    updateCMSContent,
    activeRole,
    socialChannels,
    toggleSocialChannel,
    openSocialManageModal,
  } = useApp();

  const [headlineEn, setHeadlineEn] = useState(cmsContent.headlineEn);
  const [headlineAr, setHeadlineAr] = useState(cmsContent.headlineAr);
  const [heroSubEn, setHeroSubEn] = useState(cmsContent.heroSubEn);
  const [heroSubAr, setHeroSubAr] = useState(cmsContent.heroSubAr);
  const [statPeopleSupported, setStatPeopleSupported] = useState(cmsContent.statPeopleSupported.toString());
  const [statFemaleLeadershipPct, setStatFemaleLeadershipPct] = useState(cmsContent.statFemaleLeadershipPct.toString());
  const [statWaterDailyLitres, setStatWaterDailyLitres] = useState(cmsContent.statWaterDailyLitres.toString());
  const [statYouthCertified, setStatYouthCertified] = useState(cmsContent.statYouthCertified.toString());

  const [alertActive, setAlertActive] = useState(cmsContent.emergencyAlert.active);
  const [alertTextEn, setAlertTextEn] = useState(cmsContent.emergencyAlert.textEn);
  const [alertTextAr, setAlertTextAr] = useState(cmsContent.emergencyAlert.textAr);

  const [contactEmail, setContactEmail] = useState(cmsContent.contactEmail);
  const [contactPhone, setContactPhone] = useState(cmsContent.contactPhone);
  const [primaryOffice, setPrimaryOffice] = useState(cmsContent.primaryOffice);

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    updateCMSContent({
      headlineEn,
      headlineAr,
      heroSubEn,
      heroSubAr,
      statPeopleSupported: parseInt(statPeopleSupported, 10) || 25000,
      statFemaleLeadershipPct: parseInt(statFemaleLeadershipPct, 10) || 70,
      statWaterDailyLitres: parseInt(statWaterDailyLitres, 10) || 140000,
      statYouthCertified: parseInt(statYouthCertified, 10) || 400,
      emergencyAlert: {
        active: alertActive,
        textEn: alertTextEn,
        textAr: alertTextAr,
      },
      contactEmail,
      contactPhone,
      primaryOffice,
    });

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 text-stone-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-800">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Settings className="w-5 h-5 text-amber-400" />
            <span>Public Website CMS Content Manager</span>
          </h2>
          <p className="text-xs text-stone-400 mt-0.5">
            Modify verified impact metrics, emergency banners, and bilingual headlines without developer assistance
          </p>
        </div>

        {savedSuccess && (
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950 px-3 py-1.5 rounded border border-emerald-800 font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            <span>Published Live to Public Site!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: Emergency Field Banner */}
        <div className="p-6 rounded-xl bg-stone-900 border border-stone-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-800">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-bold text-white">Emergency Field Operations Banner</h3>
            </div>
            <label className="flex items-center gap-2 text-xs cursor-pointer">
              <span className="text-stone-300 font-semibold">Display on Public Site:</span>
              <input
                type="checkbox"
                checked={alertActive}
                onChange={(e) => setAlertActive(e.target.checked)}
                className="w-4 h-4 text-amber-500 rounded bg-stone-800 border-stone-700 focus:ring-amber-400"
              />
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-stone-400 mb-1">Banner Text (English)</label>
              <textarea
                rows={2}
                value={alertTextEn}
                onChange={(e) => setAlertTextEn(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-stone-400 mb-1">Banner Text (العربية)</label>
              <textarea
                rows={2}
                dir="rtl"
                value={alertTextAr}
                onChange={(e) => setAlertTextAr(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded text-white font-arabic"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Verified Impact Statistics */}
        <div className="p-6 rounded-xl bg-stone-900 border border-stone-800 space-y-4">
          <div className="pb-3 border-b border-stone-800">
            <h3 className="text-sm font-bold text-white">Verified Impact Statistics (Public Ribbon)</h3>
            <p className="text-xs text-stone-400">Must reflect verified MEAL logbooks</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-medium text-stone-400 mb-1">People Supported Count</label>
              <input
                type="number"
                value={statPeopleSupported}
                onChange={(e) => setStatPeopleSupported(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-400 mb-1">Female Leadership %</label>
              <input
                type="number"
                value={statFemaleLeadershipPct}
                onChange={(e) => setStatFemaleLeadershipPct(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-400 mb-1">Safe Water Liters / Day</label>
              <input
                type="number"
                value={statWaterDailyLitres}
                onChange={(e) => setStatWaterDailyLitres(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-400 mb-1">Youth Certified in SSH-LAB</label>
              <input
                type="number"
                value={statYouthCertified}
                onChange={(e) => setStatYouthCertified(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded text-white font-mono"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Bilingual Hero Headlines */}
        <div className="p-6 rounded-xl bg-stone-900 border border-stone-800 space-y-4">
          <div className="pb-3 border-b border-stone-800 flex items-center gap-2">
            <Globe className="w-4 h-4 text-sky-400" />
            <h3 className="text-sm font-bold text-white">Bilingual Homepage Messaging</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-stone-400 mb-1">Hero Main Title (EN)</label>
                <input
                  type="text"
                  value={headlineEn}
                  onChange={(e) => setHeadlineEn(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded text-white font-bold"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-400 mb-1">Hero Sub-narrative (EN)</label>
                <textarea
                  rows={3}
                  value={heroSubEn}
                  onChange={(e) => setHeroSubEn(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded text-white"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-stone-400 mb-1">عنوان الواجهة (العربية)</label>
                <input
                  type="text"
                  dir="rtl"
                  value={headlineAr}
                  onChange={(e) => setHeadlineAr(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded text-white font-bold font-arabic"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-400 mb-1">السرد التعريفي (العربية)</label>
                <textarea
                  rows={3}
                  dir="rtl"
                  value={heroSubAr}
                  onChange={(e) => setHeroSubAr(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded text-white font-arabic"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Contact & Office Coordinates */}
        <div className="p-6 rounded-xl bg-stone-900 border border-stone-800 space-y-4">
          <div className="pb-3 border-b border-stone-800">
            <h3 className="text-sm font-bold text-white">Institutional Contact Information</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-stone-400 mb-1">Official Contact Email</label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded text-white font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-stone-400 mb-1">Field Coordination Phone</label>
              <input
                type="text"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded text-white font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-400 mb-1">Headquarters Location Description</label>
            <input
              type="text"
              value={primaryOffice}
              onChange={(e) => setPrimaryOffice(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded text-white"
            />
          </div>
        </div>

        {/* Section 5: Controlled Social Media Gateway */}
        <div className="p-6 rounded-xl bg-stone-900 border border-stone-800 space-y-4">
          <div className="pb-3 border-b border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Share2 className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-bold text-white">Controlled Social Media Gateway</h3>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30 font-bold">
                Live in Public Footer
              </span>
            </div>
            <button
              type="button"
              onClick={openSocialManageModal}
              className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Configure Channels</span>
            </button>
          </div>

          <p className="text-xs text-stone-400">
            Control which verified accounts are published in the footer. Protects community members and
            partners against impersonation scams.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {socialChannels.map((chan) => (
              <div
                key={chan.id}
                className={`p-3 rounded-xl border flex items-center justify-between gap-3 ${
                  chan.enabled
                    ? 'bg-stone-950/80 border-stone-700'
                    : 'bg-stone-950/40 border-stone-800/60 opacity-60'
                }`}
              >
                <div className="space-y-0.5 min-w-0">
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="text-xs font-bold text-white truncate">{chan.name}</span>
                    {chan.verified && (
                      <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0" />
                    )}
                  </div>
                  <div className="text-[10px] font-mono text-amber-400 truncate">{chan.handle}</div>
                  <div className="text-[10px] text-stone-400 truncate">{chan.purpose}</div>
                </div>

                <button
                  type="button"
                  onClick={() => toggleSocialChannel(chan.id)}
                  className={`px-2 py-1 rounded text-[10px] font-bold cursor-pointer shrink-0 transition-colors ${
                    chan.enabled
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-stone-800 text-stone-400 border border-stone-700'
                  }`}
                >
                  {chan.enabled ? 'Active' : 'Off'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Save CTA */}
        {activeRole !== 'auditor' && (
          <div className="flex items-center justify-end">
            <button
              type="submit"
              className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-stone-950 bg-amber-400 hover:bg-amber-300 rounded transition-colors flex items-center gap-2 cursor-pointer shadow-md"
            >
              <Save className="w-4 h-4" />
              <span>Publish Changes to Public Website</span>
            </button>
          </div>
        )}
      </form>
    </div>
  );
};
