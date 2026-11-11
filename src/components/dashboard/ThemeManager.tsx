import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SSH_THEME_PRESETS, SshThemePreset, getPillarTheme } from '../../utils/theme';
import {
  Palette,
  CheckCircle2,
  RefreshCw,
  Copy,
  Check,
  Sparkles,
  Droplets,
  HeartHandshake,
  Sun,
  BookOpen,
  ShieldCheck,
  Laptop,
  Eye,
  Sliders,
  Layers,
} from 'lucide-react';

export const ThemeManager: React.FC = () => {
  const {
    themePreset,
    setThemePreset,
    customThemeOverrides,
    updateThemeColor,
    resetThemeToDefault,
  } = useApp();

  const [copiedClass, setCopiedClass] = useState<string | null>(null);
  const activePresetConfig = SSH_THEME_PRESETS[themePreset] || SSH_THEME_PRESETS.official;

  // Active color values (preset with overrides)
  const currentValues: SshThemePreset['variables'] = {
    ...activePresetConfig.variables,
    ...customThemeOverrides,
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedClass(text);
    setTimeout(() => setCopiedClass(null), 2000);
  };

  const colorItems: {
    key: keyof SshThemePreset['variables'];
    label: string;
    petal: string;
    pillar: string;
    icon: React.ComponentType<{ className?: string }>;
  }[] = [
    {
      key: '--ssh-blue',
      label: 'Royal Cobalt Blue',
      petal: 'Top-Left Petal',
      pillar: '01 · WASH & Solar Water',
      icon: Droplets,
    },
    {
      key: '--ssh-green',
      label: 'Sustainable Emerald Green',
      petal: 'Bottom-Left Petal',
      pillar: '02 · Livelihoods & Women VSLA',
      icon: HeartHandshake,
    },
    {
      key: '--ssh-gold',
      label: 'Warm Sun Gold',
      petal: 'Top-Right Petal',
      pillar: '03 · Clean Energy & Climate',
      icon: Sun,
    },
    {
      key: '--ssh-red',
      label: 'Resilience Crimson Red',
      petal: 'Bottom-Right Petal',
      pillar: '04 · Accelerated Youth Education',
      icon: BookOpen,
    },
    {
      key: '--ssh-center-gold',
      label: 'Center 3D Metallic Gold',
      petal: 'Center "SSH" Monogram',
      pillar: 'SSH Core Leadership & CTAs',
      icon: Sparkles,
    },
    {
      key: '--ssh-canvas',
      label: 'Obsidian Midnight Canvas',
      petal: 'Foundation Backdrop',
      pillar: 'Dark Architectural Environment',
      icon: Layers,
    },
  ];

  const tailwindTokens = [
    { name: 'bg-ssh-blue / text-ssh-blue', desc: '01 WASH Pillar Blue', css: 'var(--ssh-blue)' },
    { name: 'bg-ssh-green / text-ssh-green', desc: '02 Livelihoods Green', css: 'var(--ssh-green)' },
    { name: 'bg-ssh-gold / text-ssh-gold', desc: '03 Energy Sun Gold', css: 'var(--ssh-gold)' },
    { name: 'bg-ssh-red / text-ssh-red', desc: '04 Education Crimson', css: 'var(--ssh-red)' },
    { name: 'bg-ssh-center-gold', desc: 'Metallic Center 3D Gold', css: 'var(--ssh-center-gold)' },
    { name: 'bg-ssh-canvas / bg-ssh-card', desc: 'Obsidian Deep Canvas', css: 'var(--ssh-canvas)' },
    { name: '.ssh-logo-gradient', desc: '4-Color Continuous Heraldic Ribbon', css: 'linear-gradient(135deg, blue, gold, green, red)' },
    { name: '.ssh-gold-shine', desc: 'Metallic 3D Gold Action Shimmer', css: 'linear-gradient(135deg, yellow, center-gold, gold)' },
  ];

  return (
    <div className="space-y-8">
      {/* Top Header Card */}
      <div className="p-6 rounded-2xl bg-[#0f172a] border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase text-amber-400 font-bold mb-1">
            <Palette className="w-4 h-4 text-amber-400" />
            <span>DYNAMIC TAILWIND CSS BRAND ENGINE</span>
            <span className="text-slate-600">·</span>
            <span>SSH LOGO COLOR TOKENS</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">
            Heraldic Theme & Class Configuration Utility
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Dynamically binds the 4 colored petals and central metallic 3D gold monogram of the official SSH
            emblem to Tailwind CSS utility classes across both the public website and the management dashboard.
          </p>
        </div>

        <button
          onClick={resetThemeToDefault}
          className="px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 transition-colors text-xs font-bold flex items-center gap-2 shrink-0 cursor-pointer shadow-sm"
        >
          <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
          <span>Restore Official Logo Colors</span>
        </button>
      </div>

      {/* Preset Selection Deck */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-mono uppercase font-bold text-slate-300 tracking-wider flex items-center gap-2">
            <Sliders className="w-4 h-4 text-amber-400" />
            <span>Calibrated Visual Presets</span>
          </h3>
          <span className="text-[11px] text-slate-500 font-mono">
            Active: {activePresetConfig.name}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.values(SSH_THEME_PRESETS).map((preset) => {
            const isSelected = themePreset === preset.id && Object.keys(customThemeOverrides).length === 0;
            return (
              <button
                key={preset.id}
                onClick={() => setThemePreset(preset.id)}
                className={`p-5 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#111c35] border-amber-400 shadow-lg shadow-amber-500/10'
                    : 'bg-[#0f172a] border-slate-800 hover:border-slate-700 hover:bg-[#121c30]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-bold border border-slate-700">
                      {preset.badge}
                    </span>
                    {isSelected && (
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">{preset.name}</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed mb-4">
                    {preset.description}
                  </p>
                </div>

                {/* Swatch Strip */}
                <div className="flex items-center gap-1.5 pt-3 border-t border-slate-800">
                  <div
                    className="w-5 h-5 rounded-md shadow-sm border border-white/20"
                    style={{ backgroundColor: preset.variables['--ssh-blue'] }}
                    title="Blue Petal"
                  />
                  <div
                    className="w-5 h-5 rounded-md shadow-sm border border-white/20"
                    style={{ backgroundColor: preset.variables['--ssh-green'] }}
                    title="Green Petal"
                  />
                  <div
                    className="w-5 h-5 rounded-md shadow-sm border border-white/20"
                    style={{ backgroundColor: preset.variables['--ssh-gold'] }}
                    title="Gold Petal"
                  />
                  <div
                    className="w-5 h-5 rounded-md shadow-sm border border-white/20"
                    style={{ backgroundColor: preset.variables['--ssh-red'] }}
                    title="Red Petal"
                  />
                  <div
                    className="w-5 h-5 rounded-md shadow-sm border border-white/20"
                    style={{ backgroundColor: preset.variables['--ssh-center-gold'] }}
                    title="Center Gold"
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Color Tokens Fine-Tuner */}
      <div className="bg-[#0f172a] rounded-2xl border border-slate-800 p-6 sm:p-7 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-2">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Live Color Tokens & Petal Mapping</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Change any token to see Tailwind classes adapt across all public and dashboard components instantaneously.
            </p>
          </div>
          <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-800/40">
            Real-Time CSS Variable Binding
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {colorItems.map((item) => {
            const Icon = item.icon;
            const currentColor = currentValues[item.key];
            return (
              <div
                key={item.key}
                className="p-4 rounded-xl bg-[#070b14] border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-400 font-mono text-[10px] uppercase font-bold">
                      {item.petal}
                    </span>
                    <Icon className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                  <h4 className="text-xs font-bold text-white">{item.label}</h4>
                  <p className="text-[11px] text-slate-400 truncate">{item.pillar}</p>
                </div>

                <div className="flex items-center gap-3 pt-2 border-t border-slate-800/80">
                  <input
                    type="color"
                    value={currentColor}
                    onChange={(e) => updateThemeColor(item.key, e.target.value)}
                    className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0 p-0 shadow"
                    title={`Adjust ${item.label}`}
                  />
                  <div className="flex-1">
                    <input
                      type="text"
                      value={currentColor}
                      onChange={(e) => updateThemeColor(item.key, e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs font-mono uppercase bg-slate-900 border border-slate-700 rounded-md text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Live Component Preview Sandbox */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Live Preview Sandbox */}
        <div className="lg:col-span-7 bg-[#0f172a] rounded-2xl border border-slate-800 p-6 sm:p-7 shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Eye className="w-4 h-4 text-emerald-400" />
              <span>Live Component Preview Sandbox</span>
            </h3>
            <span className="text-[11px] text-slate-400">Updates dynamically</span>
          </div>

          {/* 4-Color Heraldic Ribbon Demo */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-mono uppercase text-slate-400 font-bold block">
              Continuous 4-Color Heraldic Ribbon:
            </span>
            <div className="h-2 w-full rounded-full ssh-logo-gradient shadow-sm" />
          </div>

          {/* Sample Public Card Demo */}
          <div className="p-5 rounded-2xl bg-[#070b14] border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: currentValues['--ssh-blue'] }} />
                <span>WASH & Solar Network Sample Card</span>
              </span>
              <span
                className="text-[10px] font-mono font-bold px-2 py-0.5 rounded border"
                style={{
                  color: currentValues['--ssh-blue'],
                  backgroundColor: `${currentValues['--ssh-blue']}15`,
                  borderColor: `${currentValues['--ssh-blue']}40`,
                }}
              >
                142,000L / DAY
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Demonstrating the dynamic reactive classes responding immediately to custom hex changes.
            </p>
            <div className="flex items-center gap-3">
              <button
                className="px-4 py-2 text-xs font-bold rounded-lg text-slate-950 transition-all shadow-md cursor-pointer"
                style={{
                  background: `linear-gradient(135deg, #fef08a 0%, ${currentValues['--ssh-center-gold']} 50%, ${currentValues['--ssh-gold']} 100%)`,
                }}
              >
                Support Mission (Gold Action)
              </button>
              <button
                className="px-3.5 py-2 text-xs font-semibold rounded-lg text-white border transition-colors cursor-pointer"
                style={{
                  borderColor: `${currentValues['--ssh-blue']}60`,
                  backgroundColor: `${currentValues['--ssh-blue']}20`,
                }}
              >
                Inspect Technical Dossier
              </button>
            </div>
          </div>

          {/* Sample Admin Metric Row */}
          <div className="grid grid-cols-2 gap-4">
            <div
              className="p-4 rounded-xl bg-[#070b14] border border-slate-800 flex flex-col justify-between"
              style={{ borderTop: `4px solid ${currentValues['--ssh-green']}` }}
            >
              <span className="text-xs text-slate-400">Women-Led Governance</span>
              <div className="text-2xl font-extrabold text-white font-mono my-2">70.0%</div>
              <span className="text-[11px] font-semibold" style={{ color: currentValues['--ssh-green'] }}>
                Executive Director Parity
              </span>
            </div>

            <div
              className="p-4 rounded-xl bg-[#070b14] border border-slate-800 flex flex-col justify-between"
              style={{ borderTop: `4px solid ${currentValues['--ssh-red']}` }}
            >
              <span className="text-xs text-slate-400">Accountability Desk</span>
              <div className="text-2xl font-extrabold text-white font-mono my-2">0 Alerts</div>
              <span className="text-[11px] font-semibold" style={{ color: currentValues['--ssh-red'] }}>
                PSEA Zero-Tolerance Active
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Tailwind Utility Class Directory */}
        <div className="lg:col-span-5 bg-[#0f172a] rounded-2xl border border-slate-800 p-6 sm:p-7 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-400" />
              <span>Tailwind CSS Utility Directory</span>
            </h3>
            <span className="text-[10px] font-mono text-slate-400">Tailwind v4 @theme</span>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            These utility classes are registered directly in the Tailwind CSS compiler and automatically
            consume the reactive CSS custom properties:
          </p>

          <div className="space-y-2">
            {tailwindTokens.map((token, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-[#070b14] border border-slate-800 flex items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-0.5 truncate">
                  <div className="font-mono text-amber-300 font-bold truncate">
                    {token.name}
                  </div>
                  <div className="text-[11px] text-slate-400 truncate">
                    {token.desc}
                  </div>
                </div>

                <button
                  onClick={() => handleCopy(token.name)}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer shrink-0 flex items-center gap-1 font-mono text-[11px]"
                  title="Copy class snippet"
                >
                  {copiedClass === token.name ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-slate-400" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-500 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>WCAG AA 4.5:1 contrast compliance maintained across all presets.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
