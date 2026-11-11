import React from 'react';
import { useApp } from '../../context/AppContext';
import { HeaderCmsManager } from '../dashboard/HeaderCmsManager';
import { X, LayoutTemplate } from 'lucide-react';

export const HeaderCmsModal: React.FC = () => {
  const { isHeaderManageModalOpen, closeHeaderManageModal } = useApp();

  if (!isHeaderManageModalOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in">
      <div className="bg-[#070b14] border border-slate-700 rounded-3xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Top Bar */}
        <div className="p-4 sm:p-6 border-b border-slate-800 bg-[#090f1e] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <LayoutTemplate className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-base sm:text-lg text-white">
                Live Header & Sub-Menu Customization Engine
              </h2>
              <p className="text-xs text-slate-400">
                Add, edit, delete, enable/disable, and reorder public navigation menus and sub-menus in real time.
              </p>
            </div>
          </div>

          <button
            onClick={closeHeaderManageModal}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Close CMS Window"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          <HeaderCmsManager />
        </div>
      </div>
    </div>
  );
};
