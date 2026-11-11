/**
 * Sudan Sustainability Hub (SSH) — Theme Configuration Utility
 *
 * Dynamically binds and updates Tailwind CSS utility classes and CSS variables
 * based on the 4 heraldic petals and metallic 3D center emblem of the official SSH logo:
 *
 * 1. Top-Left Petal: Royal Cobalt Blue (#1E40AF)     -> 01 · WASH & Solar Water
 * 2. Top-Right Petal: Warm Sun Gold (#D97706)        -> 03 · Renewable Energy & SSH-LAB
 * 3. Bottom-Left Petal: Emerald Green (#15803D)     -> 02 · Livelihoods & Women VSLA
 * 4. Bottom-Right Petal: Resilience Crimson (#B91C1C) -> 04 · Youth Education & Peace
 * 5. Center Emblem: Metallic 3D Gold (#EAB308)       -> Core SSH Leadership & CTAs
 * 6. Base Foundation: Obsidian Midnight (#070B14)    -> High-contrast dark canvas
 */

import { ProgramPillar, UserRole } from '../types';

export interface SshColorToken {
  hex: string;
  lightHex: string;
  darkHex: string;
  label: string;
  petalPosition: string;
  programMapping: string;
}

export interface SshThemePreset {
  id: string;
  name: string;
  description: string;
  badge: string;
  variables: {
    '--ssh-blue': string;
    '--ssh-blue-light': string;
    '--ssh-gold': string;
    '--ssh-gold-light': string;
    '--ssh-green': string;
    '--ssh-green-light': string;
    '--ssh-red': string;
    '--ssh-red-light': string;
    '--ssh-center-gold': string;
    '--ssh-canvas': string;
    '--ssh-card': string;
    '--ssh-surface': string;
    '--ssh-border': string;
  };
}

export type ThemePresetId = 'official' | 'high_contrast' | 'midnight' | 'ceremonial';

export const SSH_THEME_PRESETS: Record<string, SshThemePreset> = {
  official: {
    id: 'official',
    name: 'Official Emblem (Standard)',
    description: 'Exact chromatic calibration extracted from the official SSH 3D logo emblem.',
    badge: 'Canonical',
    variables: {
      '--ssh-blue': '#1e40af',
      '--ssh-blue-light': '#3b82f6',
      '--ssh-gold': '#d97706',
      '--ssh-gold-light': '#f59e0b',
      '--ssh-green': '#15803d',
      '--ssh-green-light': '#22c55e',
      '--ssh-red': '#b91c1c',
      '--ssh-red-light': '#ef4444',
      '--ssh-center-gold': '#eab308',
      '--ssh-canvas': '#070b14',
      '--ssh-card': '#0f172a',
      '--ssh-surface': '#1e293b',
      '--ssh-border': '#334155',
    },
  },
  high_contrast: {
    id: 'high_contrast',
    name: 'Field High-Contrast (Outdoor)',
    description: 'Elevated luminescence and saturated borders for rugged field tablets in bright Kiryandongo sunlight.',
    badge: 'Field Tablet',
    variables: {
      '--ssh-blue': '#2563eb',
      '--ssh-blue-light': '#60a5fa',
      '--ssh-gold': '#f59e0b',
      '--ssh-gold-light': '#fbbf24',
      '--ssh-green': '#16a34a',
      '--ssh-green-light': '#4ade80',
      '--ssh-red': '#dc2626',
      '--ssh-red-light': '#f87171',
      '--ssh-center-gold': '#facc15',
      '--ssh-canvas': '#030712',
      '--ssh-card': '#111827',
      '--ssh-surface': '#1f2937',
      '--ssh-border': '#4b5563',
    },
  },
  midnight: {
    id: 'midnight',
    name: 'Midnight Operations (Battery Saver)',
    description: 'Ultra-low luminance OLED dark tones for nighttime emergency monitoring and sleep-friendly coordination.',
    badge: 'OLED Night',
    variables: {
      '--ssh-blue': '#1d4ed8',
      '--ssh-blue-light': '#3b82f6',
      '--ssh-gold': '#b45309',
      '--ssh-gold-light': '#d97706',
      '--ssh-green': '#166534',
      '--ssh-green-light': '#15803d',
      '--ssh-red': '#991b1b',
      '--ssh-red-light': '#b91c1c',
      '--ssh-center-gold': '#ca8a04',
      '--ssh-canvas': '#000000',
      '--ssh-card': '#090d16',
      '--ssh-surface': '#0f172a',
      '--ssh-border': '#1e293b',
    },
  },
  ceremonial: {
    id: 'ceremonial',
    name: 'Warm Ceremonial & Donor',
    description: 'Enhanced metallic gold emphasis and jewel-tone saturation for high-level international partner presentations.',
    badge: 'Partner MoU',
    variables: {
      '--ssh-blue': '#1e3a8a',
      '--ssh-blue-light': '#2563eb',
      '--ssh-gold': '#ea580c',
      '--ssh-gold-light': '#f97316',
      '--ssh-green': '#047857',
      '--ssh-green-light': '#10b981',
      '--ssh-red': '#be123c',
      '--ssh-red-light': '#e11d48',
      '--ssh-center-gold': '#eab308',
      '--ssh-canvas': '#0c0a09',
      '--ssh-card': '#1c1917',
      '--ssh-surface': '#292524',
      '--ssh-border': '#44403c',
    },
  },
};

export const SSH_THEME_PRESET_LIST: SshThemePreset[] = Object.values(SSH_THEME_PRESETS);

/**
 * Applies a theme preset or custom variable overrides directly to documentElement.
 * This dynamically updates all Tailwind utility classes that reference these CSS variables!
 */
export const applyThemePreset = (presetId: string, customOverrides?: Partial<SshThemePreset['variables']>): void => {
  if (typeof document === 'undefined') return;

  const preset = SSH_THEME_PRESETS[presetId] || SSH_THEME_PRESETS.official;
  const root = document.documentElement;

  const variablesToApply = {
    ...preset.variables,
    ...(customOverrides || {}),
  };

  Object.entries(variablesToApply).forEach(([cssVar, value]) => {
    root.style.setProperty(cssVar, value);
  });

  try {
    localStorage.setItem('ssh_active_theme_preset', presetId);
    if (customOverrides && Object.keys(customOverrides).length > 0) {
      localStorage.setItem('ssh_custom_theme_overrides', JSON.stringify(customOverrides));
    } else {
      localStorage.removeItem('ssh_custom_theme_overrides');
    }
  } catch {
    // LocalStorage fail-safe
  }
};

/**
 * Initializes the stored theme on application startup
 */
export const initializeSshTheme = (): string => {
  if (typeof window === 'undefined') return 'official';

  try {
    const savedPreset = localStorage.getItem('ssh_active_theme_preset') || 'official';
    const savedOverridesStr = localStorage.getItem('ssh_custom_theme_overrides');
    const savedOverrides = savedOverridesStr ? JSON.parse(savedOverridesStr) : undefined;
    applyThemePreset(savedPreset, savedOverrides);
    return savedPreset;
  } catch {
    applyThemePreset('official');
    return 'official';
  }
};

/**
 * Dynamically returns standardized Tailwind CSS utility classes for any Program Pillar
 * to guarantee 100% visual consistency between public views and management dashboard.
 */
export interface PillarThemeClasses {
  pillar: ProgramPillar;
  colorName: 'blue' | 'green' | 'gold' | 'red';
  hex: string;
  text: string;
  textLight: string;
  bg: string;
  bgSubtle: string;
  border: string;
  hoverBorder: string;
  topBorder: string;
  badge: string;
  btnPrimary: string;
  dot: string;
  ring: string;
  iconContainer: string;
}

export const getPillarTheme = (pillar: ProgramPillar): PillarThemeClasses => {
  switch (pillar) {
    case 'wash':
      return {
        pillar: 'wash',
        colorName: 'blue',
        hex: 'var(--ssh-blue)',
        text: 'text-blue-400',
        textLight: 'text-blue-300',
        bg: 'bg-blue-600',
        bgSubtle: 'bg-blue-950/40',
        border: 'border-blue-500/30',
        hoverBorder: 'hover:border-blue-400',
        topBorder: 'border-t-4 border-t-blue-500',
        badge: 'text-blue-400 bg-blue-950/60 border-blue-500/40',
        btnPrimary: 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20',
        dot: 'bg-blue-500',
        ring: 'focus:ring-blue-400 focus:border-blue-400',
        iconContainer: 'bg-blue-500/15 text-blue-400 border border-blue-500/30',
      };

    case 'livelihoods':
      return {
        pillar: 'livelihoods',
        colorName: 'green',
        hex: 'var(--ssh-green)',
        text: 'text-emerald-400',
        textLight: 'text-emerald-300',
        bg: 'bg-emerald-600',
        bgSubtle: 'bg-emerald-950/40',
        border: 'border-emerald-500/30',
        hoverBorder: 'hover:border-emerald-400',
        topBorder: 'border-t-4 border-t-emerald-500',
        badge: 'text-emerald-400 bg-emerald-950/60 border-emerald-500/40',
        btnPrimary: 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/20',
        dot: 'bg-emerald-500',
        ring: 'focus:ring-emerald-400 focus:border-emerald-400',
        iconContainer: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
      };

    case 'energy_climate':
      return {
        pillar: 'energy_climate',
        colorName: 'gold',
        hex: 'var(--ssh-gold)',
        text: 'text-amber-400',
        textLight: 'text-amber-300',
        bg: 'bg-amber-500',
        bgSubtle: 'bg-amber-950/40',
        border: 'border-amber-500/30',
        hoverBorder: 'hover:border-amber-400',
        topBorder: 'border-t-4 border-t-amber-400',
        badge: 'text-amber-400 bg-amber-950/60 border-amber-500/40',
        btnPrimary: 'bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 text-slate-950 shadow-lg shadow-amber-500/20',
        dot: 'bg-amber-400',
        ring: 'focus:ring-amber-400 focus:border-amber-400',
        iconContainer: 'bg-amber-500/15 text-amber-400 border border-amber-500/30',
      };

    case 'education':
      return {
        pillar: 'education',
        colorName: 'red',
        hex: 'var(--ssh-red)',
        text: 'text-rose-400',
        textLight: 'text-rose-300',
        bg: 'bg-rose-600',
        bgSubtle: 'bg-rose-950/40',
        border: 'border-rose-500/30',
        hoverBorder: 'hover:border-rose-400',
        topBorder: 'border-t-4 border-t-rose-500',
        badge: 'text-rose-400 bg-rose-950/60 border-rose-500/40',
        btnPrimary: 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/20',
        dot: 'bg-rose-500',
        ring: 'focus:ring-rose-400 focus:border-rose-400',
        iconContainer: 'bg-rose-500/15 text-rose-400 border border-rose-500/30',
      };

    case 'ssh_lab':
    case 'peacebuilding':
    default:
      return {
        pillar: 'ssh_lab',
        colorName: 'gold',
        hex: 'var(--ssh-center-gold)',
        text: 'text-amber-300',
        textLight: 'text-yellow-200',
        bg: 'bg-amber-400',
        bgSubtle: 'bg-amber-950/40',
        border: 'border-amber-500/40',
        hoverBorder: 'hover:border-amber-300',
        topBorder: 'border-t-4 border-t-amber-400',
        badge: 'text-amber-300 bg-amber-950/70 border-amber-500/50',
        btnPrimary: 'bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 text-slate-950 shadow-lg shadow-amber-500/20 font-bold',
        dot: 'bg-amber-400',
        ring: 'focus:ring-amber-400 focus:border-amber-400',
        iconContainer: 'bg-amber-500/20 text-amber-300 border border-amber-500/40',
      };
  }
};

/**
 * Returns role-based styling for the RBAC simulator based on the logo heraldry
 */
export const getRoleTheme = (role: UserRole): { badge: string; dot: string; text: string } => {
  switch (role) {
    case 'executive_director':
    case 'super_admin':
      return {
        badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
        dot: 'bg-amber-400',
        text: 'text-amber-300',
      };
    case 'program_manager':
    case 'field_officer':
      return {
        badge: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
        dot: 'bg-blue-400',
        text: 'text-blue-300',
      };
    case 'cem_officer':
    case 'me_officer':
      return {
        badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
        dot: 'bg-emerald-400',
        text: 'text-emerald-300',
      };
    case 'finance_officer':
    case 'auditor':
    default:
      return {
        badge: 'bg-slate-700/50 text-slate-200 border-slate-600',
        dot: 'bg-slate-400',
        text: 'text-slate-300',
      };
  }
};

/**
 * Returns status theme classes for cases, projects, and indicators
 */
export const getStatusBadgeTheme = (status: string): string => {
  const s = status.toLowerCase();
  if (s === 'active' || s === 'completed' || s === 'resolved' || s === 'closed') {
    return 'bg-emerald-950/70 text-emerald-400 border border-emerald-800/60 font-bold';
  }
  if (s === 'open' || s === 'investigating' || s === 'planned' || s === 'pending') {
    return 'bg-amber-950/70 text-amber-400 border border-amber-800/60 font-bold';
  }
  if (s.includes('critical') || s.includes('safeguarding') || s.includes('delayed')) {
    return 'bg-rose-950/80 text-rose-300 border border-rose-800/80 font-bold animate-pulse';
  }
  return 'bg-slate-800 text-slate-300 border border-slate-700';
};
