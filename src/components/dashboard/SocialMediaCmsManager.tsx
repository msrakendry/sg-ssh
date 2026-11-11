import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SocialMediaChannel } from '../../types';
import {
  Share2,
  Plus,
  Trash2,
  Edit2,
  Eye,
  EyeOff,
  RotateCcw,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  X,
  MessageSquare,
  Radio,
} from 'lucide-react';

export const SocialMediaCmsManager: React.FC = () => {
  const {
    socialChannels,
    updateSocialChannel,
    toggleSocialChannel,
    addSocialChannel,
    resetSocialChannels,
  } = useApp();

  const [isAdding, setIsAdding] = useState(false);
  const [editingChannel, setEditingChannel] = useState<SocialMediaChannel | null>(null);

  const [formState, setFormState] = useState<{
    platform: SocialMediaChannel['platform'];
    name: string;
    handle: string;
    url: string;
    followersOrMembers: string;
    purpose: string;
    verified: boolean;
    isEmergencyChannel: boolean;
    enabled: boolean;
  }>({
    platform: 'x_twitter',
    name: '',
    handle: '',
    url: '',
    followersOrMembers: '',
    purpose: '',
    verified: true,
    isEmergencyChannel: false,
    enabled: true,
  });

  const handleOpenAdd = () => {
    setFormState({
      platform: 'x_twitter',
      name: '',
      handle: '',
      url: '',
      followersOrMembers: '',
      purpose: '',
      verified: true,
      isEmergencyChannel: false,
      enabled: true,
    });
    setIsAdding(true);
    setEditingChannel(null);
  };

  const handleOpenEdit = (ch: SocialMediaChannel) => {
    setEditingChannel(ch);
    setFormState({
      platform: ch.platform,
      name: ch.name,
      handle: ch.handle,
      url: ch.url,
      followersOrMembers: ch.followersOrMembers || '',
      purpose: ch.purpose,
      verified: ch.verified,
      isEmergencyChannel: ch.isEmergencyChannel || false,
      enabled: ch.enabled,
    });
    setIsAdding(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.url) return;

    if (editingChannel) {
      updateSocialChannel(editingChannel.id, {
        platform: formState.platform,
        name: formState.name,
        handle: formState.handle,
        url: formState.url,
        followersOrMembers: formState.followersOrMembers,
        purpose: formState.purpose,
        verified: formState.verified,
        isEmergencyChannel: formState.isEmergencyChannel,
        enabled: formState.enabled,
      });
      setEditingChannel(null);
    } else {
      addSocialChannel({
        platform: formState.platform,
        name: formState.name,
        handle: formState.handle,
        url: formState.url,
        followersOrMembers: formState.followersOrMembers,
        purpose: formState.purpose,
        verified: formState.verified,
        isEmergencyChannel: formState.isEmergencyChannel,
        enabled: formState.enabled,
      });
      setIsAdding(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-[#090f1d] border border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-wider mb-1 border border-blue-500/30">
            <Radio className="w-3.5 h-3.5" />
            <span>CONTROLLED SOCIAL GATEWAY</span>
          </div>
          <h2 className="text-xl font-extrabold text-white">Controlled Social Media & Broadcasts Manager</h2>
          <p className="text-xs text-slate-400 mt-1">
            Centrally manage and authorize official public channels in the footer. Protect communities against impersonation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (window.confirm('Reset social channels to canonical verified SSH defaults?')) {
                resetSocialChannels();
              }
            }}
            className="px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
            <span>Reset Defaults</span>
          </button>

          <button
            onClick={handleOpenAdd}
            className="px-4 py-2 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 rounded-lg shadow transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Social Channel</span>
          </button>
        </div>
      </div>

      {/* Channels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {socialChannels.map((ch) => (
          <div
            key={ch.id}
            className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${
              ch.enabled
                ? 'bg-[#090f1d] border-slate-800 hover:border-slate-700'
                : 'bg-[#070b14]/60 border-slate-900 opacity-60'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">{ch.name}</span>
                  {ch.verified && (
                    <span className="flex items-center gap-0.5 text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/30">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Verified</span>
                    </span>
                  )}
                  {ch.isEmergencyChannel && (
                    <span className="text-[10px] text-amber-300 font-bold bg-amber-500/20 px-1.5 py-0.5 rounded border border-amber-500/40">
                      Urgent Alert
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => toggleSocialChannel(ch.id)}
                    className={`p-1.5 rounded text-xs font-semibold cursor-pointer ${
                      ch.enabled
                        ? 'bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25'
                        : 'bg-rose-500/15 text-rose-300 hover:bg-rose-500/25'
                    }`}
                    title={ch.enabled ? 'Click to Disable' : 'Click to Enable'}
                  >
                    {ch.enabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={() => handleOpenEdit(ch)}
                    className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-amber-400 hover:text-white cursor-pointer"
                    title="Edit Channel"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(`Remove social channel "${ch.name}"?`)) {
                        toggleSocialChannel(ch.id); // Or delete
                      }
                    }}
                    className="p-1.5 rounded bg-slate-800 hover:bg-rose-900/60 text-slate-400 hover:text-rose-300 cursor-pointer"
                    title="Delete Channel"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <div className="text-slate-400 font-mono text-[11px] truncate">
                  Handle: <strong className="text-slate-200">{ch.handle}</strong>
                </div>
                <div className="text-slate-400 text-[11px] truncate">
                  URL:{' '}
                  <a
                    href={ch.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-400 hover:underline inline-flex items-center gap-1"
                  >
                    <span className="truncate">{ch.url}</span>
                    <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                  </a>
                </div>
                <div className="text-slate-500 text-[11px]">{ch.purpose}</div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
              <span className="text-slate-500 font-semibold">{ch.followersOrMembers || 'Active Channel'}</span>
              <span className={ch.enabled ? 'text-emerald-400' : 'text-slate-500'}>
                {ch.enabled ? '● Active in Footer' : '○ Hidden from Footer'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Channel Modal */}
      {(isAdding || editingChannel) && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0b101c] border border-slate-700 rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base">
                {editingChannel ? 'Edit Social Channel' : 'Add New Social Media Channel'}
              </h3>
              <button
                onClick={() => {
                  setIsAdding(false);
                  setEditingChannel(null);
                }}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Platform</label>
                  <select
                    value={formState.platform}
                    onChange={(e) => setFormState({ ...formState, platform: e.target.value as any })}
                    className="w-full bg-[#060a12] border border-slate-700 rounded p-2.5 text-white"
                  >
                    <option value="x_twitter">X (formerly Twitter)</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="whatsapp">WhatsApp Community</option>
                    <option value="youtube">YouTube</option>
                    <option value="facebook">Facebook</option>
                    <option value="telegram">Telegram</option>
                    <option value="instagram">Instagram</option>
                    <option value="github">GitHub</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Display Title *</label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full bg-[#060a12] border border-slate-700 rounded p-2.5 text-white"
                    placeholder="e.g. Official X Broadcast"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Handle / Username *</label>
                  <input
                    type="text"
                    required
                    value={formState.handle}
                    onChange={(e) => setFormState({ ...formState, handle: e.target.value })}
                    className="w-full bg-[#060a12] border border-slate-700 rounded p-2.5 text-white"
                    placeholder="@SudanSustainHub"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Followers / Member Tag</label>
                  <input
                    type="text"
                    value={formState.followersOrMembers}
                    onChange={(e) => setFormState({ ...formState, followersOrMembers: e.target.value })}
                    className="w-full bg-[#060a12] border border-slate-700 rounded p-2.5 text-white"
                    placeholder="e.g. 4.8K Followers"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Direct Verified URL *</label>
                <input
                  type="url"
                  required
                  value={formState.url}
                  onChange={(e) => setFormState({ ...formState, url: e.target.value })}
                  className="w-full bg-[#060a12] border border-slate-700 rounded p-2.5 text-white"
                  placeholder="https://..."
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Purpose & Description</label>
                <input
                  type="text"
                  value={formState.purpose}
                  onChange={(e) => setFormState({ ...formState, purpose: e.target.value })}
                  className="w-full bg-[#060a12] border border-slate-700 rounded p-2.5 text-white"
                  placeholder="Official Humanitarian & Emergency Notices"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formState.verified}
                    onChange={(e) => setFormState({ ...formState, verified: e.target.checked })}
                    className="w-4 h-4 rounded text-amber-500"
                  />
                  <span>Verified Official Channel</span>
                </label>

                <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formState.isEmergencyChannel}
                    onChange={(e) => setFormState({ ...formState, isEmergencyChannel: e.target.checked })}
                    className="w-4 h-4 rounded text-amber-500"
                  />
                  <span>Emergency Alert Channel</span>
                </label>

                <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formState.enabled}
                    onChange={(e) => setFormState({ ...formState, enabled: e.target.checked })}
                    className="w-4 h-4 rounded text-amber-500"
                  />
                  <span>Enabled in Footer</span>
                </label>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsAdding(false);
                    setEditingChannel(null);
                  }}
                  className="px-4 py-2 rounded bg-slate-800 text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded bg-amber-400 text-slate-950 font-bold hover:bg-amber-300"
                >
                  {editingChannel ? 'Save Channel' : 'Create Channel'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
