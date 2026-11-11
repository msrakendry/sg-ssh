import React from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { Globe, ArrowLeft, Shield, Bell, Search, UserCheck, Palette } from 'lucide-react';
import { SSH_THEME_PRESET_LIST } from '../../utils/theme';

export const DashboardHeader: React.FC = () => {
  const {
    currentUser,
    activeRole,
    setActiveRole,
    setCurrentView,
    language,
    setLanguage,
    feedbackCases,
    setDashboardTab,
    themePreset,
    setThemePreset,
  } = useApp();

  const openCasesCount = feedbackCases.filter((c) => c.status === 'Open' || c.status === 'Investigating').length;

  const roleLabels: Record<UserRole, string> = {
    executive_director: 'Executive Director (Strategic / PSEA Desk)',
    program_manager: 'Program Manager (Operations)',
    me_officer: 'MEAL Officer (Impact & Verification)',
    cem_officer: 'CEM Officer (Community & Dialogues)',
    field_officer: 'Field Officer (Kiryandongo Hub)',
    finance_officer: 'Finance & Grants Officer',
    auditor: 'Auditor (Read-Only Independent)',
    super_admin: 'Super Administrator (Full System)',
  };

  return (
    <header className="h-16 bg-[#0a0f1d] border-b border-slate-800 px-4 sm:px-6 flex items-center justify-between gap-4 text-slate-100 z-30 relative">
      {/* 4-Color Logo Petal Top Accent Strip */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-amber-500 via-emerald-600 to-rose-600" />

      {/* Left: Branding & Layer Tag */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setCurrentView('public')}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors cursor-pointer shadow-sm"
          title="Return to Public Website"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden sm:inline">Public Site</span>
        </button>

        <div className="h-5 w-px bg-slate-800 hidden sm:block" />

        <div className="flex items-center gap-2.5">
          <img
            src="/assets/aistudio/SSH_LOGO_a17090d7.png"
            alt="SSH"
            className="w-8 h-8 object-contain drop-shadow"
          />
          <div className="flex flex-col">
            <span className="font-extrabold text-xs sm:text-sm text-white tracking-tight flex items-center gap-1.5">
              <span>Sudan Sustainability Hub</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </span>
            <span className="text-[10px] uppercase font-mono text-amber-400 font-bold hidden md:block">
              Hostinger / Laravel Management & CEM
            </span>
          </div>
        </div>
      </div>

      {/* Right Controls: Role Switcher, Urgent Alerts, Language & Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Role Switcher (RBAC Simulator) */}
        <div className="flex items-center gap-1.5 bg-[#0f172a] px-2.5 py-1 rounded-lg border border-slate-700/80 shadow-sm">
          <UserCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <div className="flex flex-col">
            <span className="text-[9px] uppercase font-bold text-slate-400 leading-none">
              Active Role:
            </span>
            <select
              value={activeRole}
              onChange={(e) => setActiveRole(e.target.value as UserRole)}
              className="bg-transparent text-xs text-amber-300 font-bold focus:outline-none cursor-pointer max-w-[130px] sm:max-w-[180px] truncate"
            >
              <option value="executive_director" className="bg-[#0f172a] text-white">
                Executive Director
              </option>
              <option value="program_manager" className="bg-[#0f172a] text-white">
                Program Manager
              </option>
              <option value="me_officer" className="bg-[#0f172a] text-white">
                MEAL Officer
              </option>
              <option value="cem_officer" className="bg-[#0f172a] text-white">
                CEM Officer
              </option>
              <option value="field_officer" className="bg-[#0f172a] text-white">
                Field Officer
              </option>
              <option value="finance_officer" className="bg-[#0f172a] text-white">
                Finance Officer
              </option>
              <option value="auditor" className="bg-[#0f172a] text-white">
                Auditor (Read-Only)
              </option>
              <option value="super_admin" className="bg-[#0f172a] text-white">
                Super Administrator
              </option>
            </select>
          </div>
        </div>

        {/* Theme Engine Quick Selector */}
        <div className="flex items-center gap-1.5 bg-[#0f172a] px-2 py-1 rounded-lg border border-slate-700/80 shadow-sm">
          <button
            onClick={() => setDashboardTab('theme')}
            title="Open Theme & Brand Engine"
            className="text-amber-400 hover:text-amber-300 transition-colors p-0.5"
          >
            <Palette className="w-3.5 h-3.5" />
          </button>
          <select
            value={themePreset}
            onChange={(e) => setThemePreset(e.target.value as any)}
            className="bg-transparent text-[11px] text-slate-200 font-semibold focus:outline-none cursor-pointer max-w-[100px] truncate"
            title="Quick switch logo color theme preset"
          >
            {SSH_THEME_PRESET_LIST.map((preset) => (
              <option key={preset.id} value={preset.id} className="bg-[#0f172a] text-white">
                {preset.name}
              </option>
            ))}
          </select>
        </div>

        {/* Notifications / Feedback Cases Bell */}
        <button
          onClick={() => setDashboardTab('feedback')}
          className="relative p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer border border-slate-700"
          title={`${openCasesCount} Open Feedback / Safeguarding cases`}
        >
          <Bell className="w-4 h-4 text-amber-400" />
          {openCasesCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow">
              {openCasesCount}
            </span>
          )}
        </button>

        {/* Language switch */}
        <button
          onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
          className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-colors cursor-pointer text-xs font-bold border border-slate-700"
          title="Switch Language"
        >
          {language === 'en' ? 'عربي' : 'EN'}
        </button>

        {/* Current user badge */}
        <div className="hidden lg:flex items-center gap-2 pl-2 border-l border-slate-800">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 text-slate-950 flex items-center justify-center font-bold text-xs shadow">
            {currentUser.name.charAt(0)}
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs font-bold text-white truncate max-w-[120px]">
              {currentUser.name}
            </span>
            <span className="text-[10px] text-slate-400 truncate max-w-[120px]">
              {currentUser.department}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
