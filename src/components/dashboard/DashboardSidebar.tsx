import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  FolderKanban,
  MapPin,
  Map,
  Users,
  MessageSquare,
  ShieldAlert,
  Coins,
  HeartHandshake,
  TrendingUp,
  FileText,
  Settings,
  History,
  Code2,
  Lock,
  Palette,
} from 'lucide-react';

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  alertBadge?: string;
  isHighlight?: boolean;
}

interface SidebarGroup {
  group: string;
  items: SidebarItem[];
}

export const DashboardSidebar: React.FC = () => {
  const { dashboardTab, setDashboardTab, feedbackCases, beneficiaries } = useApp();

  const openFeedbackCount = feedbackCases.filter((c) => c.status === 'Open' || c.status === 'Investigating').length;

  const navItems: SidebarGroup[] = [
    {
      group: 'STRATEGIC MANAGEMENT',
      items: [
        { id: 'overview', label: 'Executive Dashboard', icon: LayoutDashboard },
        { id: 'projects', label: 'Programs & Projects', icon: FolderKanban },
      ],
    },
    {
      group: 'COMMUNITY & ENGAGEMENT (CEM)',
      items: [
        { id: 'communities', label: 'Settlement Communities', icon: MapPin },
        { id: 'gis_map', label: 'GIS Operations Map', icon: Map },
        {
          id: 'beneficiaries',
          label: 'Beneficiary Registry',
          icon: Users,
          badge: beneficiaries.length.toString(),
        },
        { id: 'engagements', label: 'Field Sessions & Dialogues', icon: MessageSquare },
        {
          id: 'feedback',
          label: 'Feedback & Safeguarding',
          icon: ShieldAlert,
          alertBadge: openFeedbackCount > 0 ? openFeedbackCount.toString() : undefined,
        },
      ],
    },
    {
      group: 'PARTNERSHIPS & MEAL',
      items: [
        { id: 'donors_partners', label: 'Donors & Partner MoUs', icon: Coins },
        { id: 'volunteers', label: 'Volunteers & Members', icon: HeartHandshake },
        { id: 'meal', label: 'MEAL / Impact Matrix', icon: TrendingUp },
      ],
    },
    {
      group: 'GOVERNANCE & PLATFORM',
      items: [
        { id: 'documents', label: 'Documents & PSEA Policies', icon: FileText },
        { id: 'cms', label: 'CMS Website Content', icon: Settings },
        { id: 'theme', label: 'Theme & Brand Engine', icon: Palette },
        { id: 'audit_logs', label: 'Audit & Accountability Trail', icon: History },
        {
          id: 'architecture',
          label: 'Hostinger & Laravel Hub',
          icon: Code2,
          isHighlight: true,
        },
      ],
    },
  ];

  return (
    <aside className="w-64 bg-[#060a12] border-r border-slate-800 flex flex-col shrink-0 text-slate-300 select-none">
      <div className="p-4 border-b border-slate-800 bg-[#080d18]">
        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block mb-1">
          OPERATIONAL JURISDICTION
        </span>
        <div className="text-xs font-bold text-white flex items-center justify-between">
          <span>Kiryandongo Hub & Region</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="Active Connection" />
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-3 space-y-6">
        {navItems.map((group, idx) => (
          <div key={idx} className="space-y-1">
            <div className="px-3 text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2">
              {group.group}
            </div>
            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive = dashboardTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setDashboardTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer text-left ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-bold shadow-md'
                      : item.isHighlight
                      ? 'text-amber-300 hover:bg-[#0f172a] border border-amber-500/40 bg-amber-500/5'
                      : 'text-slate-300 hover:bg-[#0f172a] hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon
                      className={`w-4 h-4 shrink-0 ${
                        isActive
                          ? 'text-slate-950'
                          : item.isHighlight
                          ? 'text-amber-400'
                          : 'text-slate-400'
                      }`}
                    />
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.alertBadge && (
                    <span className="bg-rose-600 text-white font-mono text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow">
                      {item.alertBadge}
                    </span>
                  )}
                  {item.badge && !item.alertBadge && (
                    <span
                      className={`font-mono text-[10px] px-1.5 py-0.5 rounded ${
                        isActive
                          ? 'bg-slate-900 text-amber-300 font-bold'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Security footnote */}
      <div className="p-3 border-t border-slate-800 bg-[#060a12] text-[10px] text-slate-400 flex items-center justify-between">
        <div className="flex items-center gap-1.5 truncate">
          <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
          <span className="truncate">Data Protection: Masked</span>
        </div>
        <div className="flex gap-1 shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
        </div>
      </div>
    </aside>
  );
};
