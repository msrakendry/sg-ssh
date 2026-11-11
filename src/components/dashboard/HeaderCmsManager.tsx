import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { HeaderNavItem, HeaderSubMenuItem, PublicPageId } from '../../types';
import {
  Menu,
  Plus,
  Trash2,
  Edit2,
  Eye,
  EyeOff,
  ArrowUp,
  ArrowDown,
  RotateCcw,
  Check,
  X,
  ChevronDown,
  ChevronRight,
  Sparkles,
  ExternalLink,
  Sliders,
  Settings,
  Link,
  LayoutTemplate,
} from 'lucide-react';

export const HeaderCmsManager: React.FC = () => {
  const {
    headerConfig,
    updateHeaderConfig,
    toggleNavItem,
    toggleSubItem,
    addNavItem,
    updateNavItem,
    deleteNavItem,
    addSubItem,
    updateSubItem,
    deleteSubItem,
    moveNavItem,
    moveSubItem,
    resetHeaderToDefault,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'menus' | 'settings'>('menus');
  const [expandedNavId, setExpandedNavId] = useState<string | null>(null);

  // Modal / Form state for Add/Edit top-level
  const [editingNavItem, setEditingNavItem] = useState<HeaderNavItem | null>(null);
  const [isAddingNav, setIsAddingNav] = useState(false);
  const [navForm, setNavForm] = useState<{
    labelEn: string;
    labelAr: string;
    page: PublicPageId;
    hash?: string;
    badge?: string;
    badgeColor?: 'blue' | 'green' | 'gold' | 'red' | 'purple' | 'slate';
    highlight?: boolean;
    enabled: boolean;
  }>({
    labelEn: '',
    labelAr: '',
    page: 'home',
    hash: '',
    badge: '',
    badgeColor: 'gold',
    highlight: false,
    enabled: true,
  });

  // Modal / Form state for Add/Edit sub-item
  const [editingSubItem, setEditingSubItem] = useState<{
    navId: string;
    item: HeaderSubMenuItem;
  } | null>(null);
  const [addingSubForNavId, setAddingSubForNavId] = useState<string | null>(null);
  const [subForm, setSubForm] = useState<{
    labelEn: string;
    labelAr: string;
    subtextEn: string;
    subtextAr: string;
    page: PublicPageId;
    hash: string;
    badge: string;
    badgeColor: 'blue' | 'green' | 'gold' | 'red' | 'purple' | 'slate';
    iconName: string;
    enabled: boolean;
  }>({
    labelEn: '',
    labelAr: '',
    subtextEn: '',
    subtextAr: '',
    page: 'programs',
    hash: '',
    badge: '',
    badgeColor: 'gold',
    iconName: 'Sparkles',
    enabled: true,
  });

  const availablePages: { id: PublicPageId; label: string }[] = [
    { id: 'home', label: 'Home Page' },
    { id: 'about', label: 'About SSH Page' },
    { id: 'programs', label: 'Programs & Projects Directory' },
    { id: 'wash', label: '01 · WASH & Clean Water Page' },
    { id: 'livelihoods', label: '02 · Livelihoods & VSLAs Page' },
    { id: 'energy', label: '03 · Energy & Climate Page' },
    { id: 'education', label: '04 · Education Page' },
    { id: 'ssh_lab', label: 'SSH-LAB Innovation Page' },
    { id: 'map', label: 'Field Operations & GIS Map Page' },
    { id: 'meal', label: 'MEAL & Impact Matrix Page' },
    { id: 'governance', label: 'Governance & PSEA Page' },
    { id: 'partnerships', label: 'Partnerships & Volunteering Page' },
    { id: 'contact', label: 'Contact & Complaints Desk Page' },
  ];

  const handleOpenAddNav = () => {
    setNavForm({
      labelEn: '',
      labelAr: '',
      page: 'home',
      hash: '',
      badge: '',
      badgeColor: 'gold',
      highlight: false,
      enabled: true,
    });
    setIsAddingNav(true);
    setEditingNavItem(null);
  };

  const handleOpenEditNav = (item: HeaderNavItem) => {
    setEditingNavItem(item);
    setNavForm({
      labelEn: item.labelEn,
      labelAr: item.labelAr,
      page: item.page || 'home',
      hash: item.hash || '',
      badge: item.badge || '',
      badgeColor: item.badgeColor || 'gold',
      highlight: item.highlight || false,
      enabled: item.enabled,
    });
    setIsAddingNav(false);
  };

  const handleSaveNavForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!navForm.labelEn) return;

    if (editingNavItem) {
      updateNavItem(editingNavItem.id, {
        labelEn: navForm.labelEn,
        labelAr: navForm.labelAr,
        page: navForm.page,
        hash: navForm.hash,
        badge: navForm.badge,
        badgeColor: navForm.badgeColor,
        highlight: navForm.highlight,
        enabled: navForm.enabled,
      });
      setEditingNavItem(null);
    } else {
      addNavItem({
        labelEn: navForm.labelEn,
        labelAr: navForm.labelAr,
        page: navForm.page,
        hash: navForm.hash,
        badge: navForm.badge,
        badgeColor: navForm.badgeColor,
        highlight: navForm.highlight,
        enabled: navForm.enabled,
        order: 99,
        subItems: [],
      });
      setIsAddingNav(false);
    }
  };

  const handleOpenAddSub = (navId: string) => {
    setAddingSubForNavId(navId);
    setEditingSubItem(null);
    setSubForm({
      labelEn: '',
      labelAr: '',
      subtextEn: '',
      subtextAr: '',
      page: 'programs',
      hash: '',
      badge: '',
      badgeColor: 'gold',
      iconName: 'Sparkles',
      enabled: true,
    });
  };

  const handleOpenEditSub = (navId: string, sub: HeaderSubMenuItem) => {
    setEditingSubItem({ navId, item: sub });
    setAddingSubForNavId(null);
    setSubForm({
      labelEn: sub.labelEn,
      labelAr: sub.labelAr,
      subtextEn: sub.subtextEn || '',
      subtextAr: sub.subtextAr || '',
      page: sub.page,
      hash: sub.hash || '',
      badge: sub.badge || '',
      badgeColor: sub.badgeColor || 'gold',
      iconName: sub.iconName || 'Sparkles',
      enabled: sub.enabled,
    });
  };

  const handleSaveSubForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subForm.labelEn) return;

    if (editingSubItem) {
      updateSubItem(editingSubItem.navId, editingSubItem.item.id, {
        labelEn: subForm.labelEn,
        labelAr: subForm.labelAr,
        subtextEn: subForm.subtextEn,
        subtextAr: subForm.subtextAr,
        page: subForm.page,
        hash: subForm.hash,
        badge: subForm.badge,
        badgeColor: subForm.badgeColor,
        iconName: subForm.iconName,
        enabled: subForm.enabled,
      });
      setEditingSubItem(null);
    } else if (addingSubForNavId) {
      addSubItem(addingSubForNavId, {
        labelEn: subForm.labelEn,
        labelAr: subForm.labelAr,
        subtextEn: subForm.subtextEn,
        subtextAr: subForm.subtextAr,
        page: subForm.page,
        hash: subForm.hash,
        badge: subForm.badge,
        badgeColor: subForm.badgeColor,
        iconName: subForm.iconName,
        enabled: subForm.enabled,
        order: 99,
      });
      setAddingSubForNavId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-[#090f1d] border border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1 border border-amber-500/30">
            <LayoutTemplate className="w-3.5 h-3.5" />
            <span>CMS NAVIGATION ENGINE</span>
          </div>
          <h2 className="text-xl font-extrabold text-white">Header & Sub-Menu Customization Gateway</h2>
          <p className="text-xs text-slate-400 mt-1">
            Full real-time CRUD control: Add, edit, delete, enable/disable, and reorder navigation items and rich multi-level sub-menus.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (window.confirm('Reset navigation header and sub-menus to default SSH canonical structure?')) {
                resetHeaderToDefault();
              }
            }}
            className="px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Reset to default SSH navigation"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
            <span>Reset to Default</span>
          </button>

          <button
            onClick={handleOpenAddNav}
            className="px-4 py-2 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 rounded-lg shadow transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Navigation Item</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('menus')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'menus'
              ? 'bg-amber-400 text-slate-950 shadow'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Menu className="w-3.5 h-3.5" />
          <span>Navigation & Sub-Menus ({headerConfig.navItems.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'settings'
              ? 'bg-amber-400 text-slate-950 shadow'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Top-Bar & Action Buttons</span>
        </button>
      </div>

      {/* Tab 1: Navigation & Sub-Menus List */}
      {activeTab === 'menus' && (
        <div className="space-y-4">
          {headerConfig.navItems
            .sort((a, b) => a.order - b.order)
            .map((item, idx) => {
              const isExpanded = expandedNavId === item.id;
              const subCount = item.subItems?.length || 0;

              return (
                <div
                  key={item.id}
                  className={`p-4 rounded-xl border transition-all ${
                    item.enabled
                      ? 'bg-[#090f1d] border-slate-800 hover:border-slate-700'
                      : 'bg-[#070b14]/60 border-slate-900 opacity-60'
                  }`}
                >
                  {/* Top-Level Item Header */}
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-3">
                      {/* Expand Sub-items Button */}
                      <button
                        onClick={() => setExpandedNavId(isExpanded ? null : item.id)}
                        className="p-1 text-slate-400 hover:text-white cursor-pointer"
                        title={isExpanded ? 'Collapse sub-menu' : 'Expand sub-menu'}
                      >
                        {isExpanded ? (
                          <ChevronDown className="w-4 h-4 text-amber-400" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                      </button>

                      {/* Order Tag */}
                      <span className="font-mono text-[11px] text-slate-500 font-bold w-5">
                        #{idx + 1}
                      </span>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm">{item.labelEn}</span>
                          <span className="text-xs text-slate-400 font-medium">({item.labelAr})</span>
                          {item.highlight && (
                            <span className="text-[10px] uppercase font-mono font-bold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                              Highlight
                            </span>
                          )}
                          {item.badge && (
                            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-800 text-amber-300 border border-slate-700">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                          <span>Target: <strong className="text-slate-300">/{item.page || 'home'}</strong></span>
                          {item.hash && <span>#{item.hash}</span>}
                          <span>·</span>
                          <span className="text-amber-400 font-semibold">{subCount} Sub-Menu Items</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions: Reorder, Toggle, Edit, Add Sub, Delete */}
                    <div className="flex items-center gap-1.5">
                      {/* Move Up */}
                      <button
                        onClick={() => moveNavItem(item.id, 'up')}
                        disabled={idx === 0}
                        className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                        title="Move Up"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>

                      {/* Move Down */}
                      <button
                        onClick={() => moveNavItem(item.id, 'down')}
                        disabled={idx === headerConfig.navItems.length - 1}
                        className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                        title="Move Down"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>

                      {/* Enable/Disable Toggle */}
                      <button
                        onClick={() => toggleNavItem(item.id)}
                        className={`p-1.5 rounded text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors ${
                          item.enabled
                            ? 'bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25 border border-emerald-500/30'
                            : 'bg-rose-500/15 text-rose-300 hover:bg-rose-500/25 border border-rose-500/30'
                        }`}
                        title={item.enabled ? 'Click to Disable' : 'Click to Enable'}
                      >
                        {item.enabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                        <span className="hidden sm:inline">{item.enabled ? 'Enabled' : 'Disabled'}</span>
                      </button>

                      {/* Edit Button */}
                      <button
                        onClick={() => handleOpenEditNav(item)}
                        className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-amber-400 hover:text-white cursor-pointer"
                        title="Edit Item"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>

                      {/* Add Sub-item shortcut */}
                      <button
                        onClick={() => handleOpenAddSub(item.id)}
                        className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-blue-400 hover:text-white cursor-pointer"
                        title="Add Sub-Menu Item"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete navigation item "${item.labelEn}" and its sub-menus?`)) {
                            deleteNavItem(item.id);
                          }
                        }}
                        className="p-1.5 rounded bg-slate-800 hover:bg-rose-900/60 text-slate-400 hover:text-rose-300 cursor-pointer"
                        title="Delete Item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Expanded Sub-Items List */}
                  {isExpanded && (
                    <div className="mt-4 pt-3 border-t border-slate-800/80 pl-6 sm:pl-8 space-y-2">
                      <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                        <span>Sub-Menu Links under "{item.labelEn}":</span>
                        <button
                          onClick={() => handleOpenAddSub(item.id)}
                          className="text-amber-400 hover:underline cursor-pointer flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Add Sub-Item</span>
                        </button>
                      </div>

                      {item.subItems && item.subItems.length > 0 ? (
                        item.subItems
                          .sort((a, b) => a.order - b.order)
                          .map((sub, subIdx) => (
                            <div
                              key={sub.id}
                              className={`p-3 rounded-lg border flex items-center justify-between gap-3 text-xs ${
                                sub.enabled
                                  ? 'bg-[#060a14] border-slate-800'
                                  : 'bg-[#060a14]/50 border-slate-900 opacity-50'
                              }`}
                            >
                              <div className="flex items-center gap-2.5">
                                <span className="font-mono text-slate-600 text-[10px]">
                                  {subIdx + 1}.
                                </span>
                                <div>
                                  <div className="flex items-center gap-1.5">
                                    <span className="font-bold text-white">{sub.labelEn}</span>
                                    <span className="text-slate-400">({sub.labelAr})</span>
                                    {sub.badge && (
                                      <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-slate-800 text-amber-300 border border-slate-700">
                                        {sub.badge}
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-[10px] text-slate-400 mt-0.5">
                                    <span>Target: <strong className="text-slate-300">/{sub.page}</strong></span>
                                    {sub.hash && <span>#{sub.hash}</span>}
                                    {sub.subtextEn && <span className="text-slate-500"> — {sub.subtextEn}</span>}
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => moveSubItem(item.id, sub.id, 'up')}
                                  disabled={subIdx === 0}
                                  className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 disabled:opacity-20 cursor-pointer"
                                  title="Move Up"
                                >
                                  <ArrowUp className="w-3 h-3" />
                                </button>
                                <button
                                  onClick={() => moveSubItem(item.id, sub.id, 'down')}
                                  disabled={subIdx === item.subItems!.length - 1}
                                  className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 disabled:opacity-20 cursor-pointer"
                                  title="Move Down"
                                >
                                  <ArrowDown className="w-3 h-3" />
                                </button>
                                <button
                                  onClick={() => toggleSubItem(item.id, sub.id)}
                                  className={`p-1 rounded text-[10px] font-bold px-2 cursor-pointer ${
                                    sub.enabled
                                      ? 'bg-emerald-500/15 text-emerald-300'
                                      : 'bg-rose-500/15 text-rose-300'
                                  }`}
                                >
                                  {sub.enabled ? 'Enabled' : 'Disabled'}
                                </button>
                                <button
                                  onClick={() => handleOpenEditSub(item.id, sub)}
                                  className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-amber-400 cursor-pointer"
                                  title="Edit Sub-Item"
                                >
                                  <Edit2 className="w-3 h-3" />
                                </button>
                                <button
                                  onClick={() => {
                                    if (window.confirm(`Delete sub-menu item "${sub.labelEn}"?`)) {
                                      deleteSubItem(item.id, sub.id);
                                    }
                                  }}
                                  className="p-1 rounded bg-slate-800 hover:bg-rose-900/60 text-slate-400 hover:text-rose-300 cursor-pointer"
                                  title="Delete Sub-Item"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          ))
                      ) : (
                        <div className="p-3 text-center text-xs text-slate-500 border border-dashed border-slate-800 rounded-lg">
                          No sub-menu items configured. Click "Add Sub-Item" to create dropdown links.
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      )}

      {/* Tab 2: Top-Bar & Header Action Buttons */}
      {activeTab === 'settings' && (
        <div className="p-6 rounded-2xl bg-[#090f1d] border border-slate-800 space-y-6">
          <h3 className="text-base font-bold text-white">Header Bars & Global Action Settings</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            {/* Top Micro-Banner */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">Top Micro-Banner</span>
                <input
                  type="checkbox"
                  checked={headerConfig.topBarEnabled}
                  onChange={(e) => updateHeaderConfig({ topBarEnabled: e.target.checked })}
                  className="rounded border-slate-700 bg-slate-950 text-amber-500 focus:ring-0 cursor-pointer w-4 h-4"
                />
              </div>
              <div className="space-y-1">
                <label className="text-slate-400 font-semibold">Banner Text (English)</label>
                <input
                  type="text"
                  value={headerConfig.topBarTextEn}
                  onChange={(e) => updateHeaderConfig({ topBarTextEn: e.target.value })}
                  className="w-full bg-[#060a12] border border-slate-700 rounded p-2 text-white"
                />
              </div>
              <div className="space-y-1">
                <label className="text-slate-400 font-semibold">Banner Text (Arabic)</label>
                <input
                  type="text"
                  dir="rtl"
                  value={headerConfig.topBarTextAr}
                  onChange={(e) => updateHeaderConfig({ topBarTextAr: e.target.value })}
                  className="w-full bg-[#060a12] border border-slate-700 rounded p-2 text-white"
                />
              </div>
            </div>

            {/* Controls & Switchers */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
              <span className="font-bold text-white block">Controls Visibility</span>
              <div className="space-y-2">
                <label className="flex items-center justify-between p-2 rounded bg-slate-950/60 border border-slate-800 cursor-pointer">
                  <span className="text-slate-300">Show Theme Preset Cycler Button</span>
                  <input
                    type="checkbox"
                    checked={headerConfig.showThemeCycler}
                    onChange={(e) => updateHeaderConfig({ showThemeCycler: e.target.checked })}
                    className="w-4 h-4 rounded text-amber-500"
                  />
                </label>
                <label className="flex items-center justify-between p-2 rounded bg-slate-950/60 border border-slate-800 cursor-pointer">
                  <span className="text-slate-300">Show Language Switcher (EN / عربي)</span>
                  <input
                    type="checkbox"
                    checked={headerConfig.showLanguageSwitcher}
                    onChange={(e) => updateHeaderConfig({ showLanguageSwitcher: e.target.checked })}
                    className="w-4 h-4 rounded text-amber-500"
                  />
                </label>
              </div>
            </div>

            {/* Management Portal Button */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">Staff Management Portal Button</span>
                <input
                  type="checkbox"
                  checked={headerConfig.showPortalButton}
                  onChange={(e) => updateHeaderConfig({ showPortalButton: e.target.checked })}
                  className="w-4 h-4 rounded text-amber-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-slate-400 font-semibold">Button Label (English)</label>
                <input
                  type="text"
                  value={headerConfig.portalButtonTextEn}
                  onChange={(e) => updateHeaderConfig({ portalButtonTextEn: e.target.value })}
                  className="w-full bg-[#060a12] border border-slate-700 rounded p-2 text-white"
                />
              </div>
              <div className="space-y-1">
                <label className="text-slate-400 font-semibold">Button Label (Arabic)</label>
                <input
                  type="text"
                  dir="rtl"
                  value={headerConfig.portalButtonTextAr}
                  onChange={(e) => updateHeaderConfig({ portalButtonTextAr: e.target.value })}
                  className="w-full bg-[#060a12] border border-slate-700 rounded p-2 text-white"
                />
              </div>
            </div>

            {/* Primary CTA (Donate) Button */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">Primary Action CTA Button</span>
                <input
                  type="checkbox"
                  checked={headerConfig.showCtaButton}
                  onChange={(e) => updateHeaderConfig({ showCtaButton: e.target.checked })}
                  className="w-4 h-4 rounded text-amber-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-slate-400 font-semibold">Button Label (English)</label>
                <input
                  type="text"
                  value={headerConfig.ctaButtonTextEn}
                  onChange={(e) => updateHeaderConfig({ ctaButtonTextEn: e.target.value })}
                  className="w-full bg-[#060a12] border border-slate-700 rounded p-2 text-white"
                />
              </div>
              <div className="space-y-1">
                <label className="text-slate-400 font-semibold">Button Action</label>
                <select
                  value={headerConfig.ctaButtonAction}
                  onChange={(e) => updateHeaderConfig({ ctaButtonAction: e.target.value as any })}
                  className="w-full bg-[#060a12] border border-slate-700 rounded p-2 text-white"
                >
                  <option value="donate">Open Donation Modal</option>
                  <option value="feedback">Open Humanitarian Complaints Desk</option>
                  <option value="contact">Go to Contact Page</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Top-Level Item Add / Edit Modal */}
      {(isAddingNav || editingNavItem) && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0b101c] border border-slate-700 rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base">
                {editingNavItem ? 'Edit Navigation Item' : 'Add Top-Level Navigation Item'}
              </h3>
              <button
                onClick={() => {
                  setIsAddingNav(false);
                  setEditingNavItem(null);
                }}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveNavForm} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Label (English) *</label>
                  <input
                    type="text"
                    required
                    value={navForm.labelEn}
                    onChange={(e) => setNavForm({ ...navForm, labelEn: e.target.value })}
                    className="w-full bg-[#060a12] border border-slate-700 rounded p-2.5 text-white"
                    placeholder="e.g. Programs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Label (Arabic)</label>
                  <input
                    type="text"
                    dir="rtl"
                    value={navForm.labelAr}
                    onChange={(e) => setNavForm({ ...navForm, labelAr: e.target.value })}
                    className="w-full bg-[#060a12] border border-slate-700 rounded p-2.5 text-white"
                    placeholder="e.g. البرامج"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Target Destination Page *</label>
                  <select
                    value={navForm.page}
                    onChange={(e) => setNavForm({ ...navForm, page: e.target.value as PublicPageId })}
                    className="w-full bg-[#060a12] border border-slate-700 rounded p-2.5 text-white"
                  >
                    {availablePages.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.label} (/{p.id})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Sub-hash Anchor (Optional)</label>
                  <input
                    type="text"
                    value={navForm.hash || ''}
                    onChange={(e) => setNavForm({ ...navForm, hash: e.target.value })}
                    className="w-full bg-[#060a12] border border-slate-700 rounded p-2.5 text-white"
                    placeholder="e.g. leadership"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Badge Tag (Optional)</label>
                  <input
                    type="text"
                    value={navForm.badge || ''}
                    onChange={(e) => setNavForm({ ...navForm, badge: e.target.value })}
                    className="w-full bg-[#060a12] border border-slate-700 rounded p-2.5 text-white"
                    placeholder="e.g. 4 Pillars"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Badge Color</label>
                  <select
                    value={navForm.badgeColor || 'gold'}
                    onChange={(e) => setNavForm({ ...navForm, badgeColor: e.target.value as any })}
                    className="w-full bg-[#060a12] border border-slate-700 rounded p-2.5 text-white"
                  >
                    <option value="gold">Warm Gold (Logo Center)</option>
                    <option value="blue">Cobalt Blue (Pillar 01)</option>
                    <option value="green">Emerald Green (Pillar 02)</option>
                    <option value="red">Crimson Red (Pillar 04)</option>
                    <option value="purple">Purple</option>
                    <option value="slate">Slate Neutral</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={navForm.highlight}
                    onChange={(e) => setNavForm({ ...navForm, highlight: e.target.checked })}
                    className="w-4 h-4 rounded text-amber-500"
                  />
                  <span>Highlight Tab (Gold Glow)</span>
                </label>

                <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={navForm.enabled}
                    onChange={(e) => setNavForm({ ...navForm, enabled: e.target.checked })}
                    className="w-4 h-4 rounded text-amber-500"
                  />
                  <span>Active & Enabled</span>
                </label>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingNav(false);
                    setEditingNavItem(null);
                  }}
                  className="px-4 py-2 rounded bg-slate-800 text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded bg-amber-400 text-slate-950 font-bold hover:bg-amber-300"
                >
                  {editingNavItem ? 'Save Changes' : 'Create Navigation Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Sub-Item Add / Edit Modal */}
      {(addingSubForNavId || editingSubItem) && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0b101c] border border-slate-700 rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base">
                {editingSubItem ? 'Edit Sub-Menu Item' : 'Add New Sub-Menu Dropdown Item'}
              </h3>
              <button
                onClick={() => {
                  setAddingSubForNavId(null);
                  setEditingSubItem(null);
                }}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSubForm} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Sub-Item Title (English) *</label>
                  <input
                    type="text"
                    required
                    value={subForm.labelEn}
                    onChange={(e) => setSubForm({ ...subForm, labelEn: e.target.value })}
                    className="w-full bg-[#060a12] border border-slate-700 rounded p-2.5 text-white"
                    placeholder="e.g. 01 · WASH & Clean Water"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Sub-Item Title (Arabic)</label>
                  <input
                    type="text"
                    dir="rtl"
                    value={subForm.labelAr}
                    onChange={(e) => setSubForm({ ...subForm, labelAr: e.target.value })}
                    className="w-full bg-[#060a12] border border-slate-700 rounded p-2.5 text-white"
                    placeholder="e.g. 01 · المياه والإصحاح"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Description / Subtext (English)</label>
                  <input
                    type="text"
                    value={subForm.subtextEn}
                    onChange={(e) => setSubForm({ ...subForm, subtextEn: e.target.value })}
                    className="w-full bg-[#060a12] border border-slate-700 rounded p-2.5 text-white"
                    placeholder="e.g. Solar boreholes & sanitation kits"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Description (Arabic)</label>
                  <input
                    type="text"
                    dir="rtl"
                    value={subForm.subtextAr}
                    onChange={(e) => setSubForm({ ...subForm, subtextAr: e.target.value })}
                    className="w-full bg-[#060a12] border border-slate-700 rounded p-2.5 text-white"
                    placeholder="e.g. مضخات المياه الشمسية"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Target Destination Page *</label>
                  <select
                    value={subForm.page}
                    onChange={(e) => setSubForm({ ...subForm, page: e.target.value as PublicPageId })}
                    className="w-full bg-[#060a12] border border-slate-700 rounded p-2.5 text-white"
                  >
                    {availablePages.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.label} (/{p.id})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Sub-hash Anchor (Optional)</label>
                  <input
                    type="text"
                    value={subForm.hash}
                    onChange={(e) => setSubForm({ ...subForm, hash: e.target.value })}
                    className="w-full bg-[#060a12] border border-slate-700 rounded p-2.5 text-white"
                    placeholder="e.g. mission"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Badge Tag (Optional)</label>
                  <input
                    type="text"
                    value={subForm.badge}
                    onChange={(e) => setSubForm({ ...subForm, badge: e.target.value })}
                    className="w-full bg-[#060a12] border border-slate-700 rounded p-2.5 text-white"
                    placeholder="e.g. 142K L/day"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Badge Color</label>
                  <select
                    value={subForm.badgeColor}
                    onChange={(e) => setSubForm({ ...subForm, badgeColor: e.target.value as any })}
                    className="w-full bg-[#060a12] border border-slate-700 rounded p-2.5 text-white"
                  >
                    <option value="blue">Blue (WASH 01)</option>
                    <option value="green">Green (Livelihoods 02)</option>
                    <option value="gold">Gold (Energy 03)</option>
                    <option value="red">Red (Education 04)</option>
                    <option value="purple">Purple</option>
                    <option value="slate">Slate Neutral</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={subForm.enabled}
                    onChange={(e) => setSubForm({ ...subForm, enabled: e.target.checked })}
                    className="w-4 h-4 rounded text-amber-500"
                  />
                  <span>Active & Enabled in Dropdown</span>
                </label>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setAddingSubForNavId(null);
                    setEditingSubItem(null);
                  }}
                  className="px-4 py-2 rounded bg-slate-800 text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded bg-amber-400 text-slate-950 font-bold hover:bg-amber-300"
                >
                  {editingSubItem ? 'Save Sub-Item' : 'Create Sub-Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
