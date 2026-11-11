import React from 'react';
import { useApp } from '../../context/AppContext';
import { SocialMediaCmsManager } from '../dashboard/SocialMediaCmsManager';
import { X, Radio } from 'lucide-react';

export const SocialManageModal: React.FC = () => {
  const { isSocialManageModalOpen, closeSocialManageModal } = useApp();

  if (!isSocialManageModalOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in">
      <div className="bg-[#070b14] border border-slate-700 rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Top Bar */}
        <div className="p-4 sm:p-6 border-b border-slate-800 bg-[#090f1e] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center border border-blue-500/30">
              <Radio className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-base sm:text-lg text-white">
                Controlled Social Media Gateway
              </h2>
              <p className="text-xs text-slate-400">
                Authorize official accounts, emergency dispatch channels, and public handles published in the footer.
              </p>
            </div>
          </div>

          <button
            onClick={closeSocialManageModal}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          <SocialMediaCmsManager />
        </div>
      </div>
    </div>
  );
};
