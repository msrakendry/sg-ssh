import React from 'react';
import { useApp } from '../../context/AppContext';
import { PublicPageId } from '../../types';
import { ChevronRight, Home, ArrowLeft } from 'lucide-react';

interface BreadcrumbsProps {
  items: Array<{
    label: string;
    page?: PublicPageId;
    subHash?: string;
    isCurrent?: boolean;
  }>;
  pillarColor?: 'blue' | 'green' | 'gold' | 'red' | 'center-gold';
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, pillarColor }) => {
  const { setPublicPage } = useApp();

  const colorAccentClass = {
    blue: 'border-l-4 border-l-blue-500',
    green: 'border-l-4 border-l-emerald-500',
    gold: 'border-l-4 border-l-amber-500',
    red: 'border-l-4 border-l-rose-500',
    'center-gold': 'border-l-4 border-l-yellow-400',
  }[pillarColor || 'gold'];

  return (
    <nav
      aria-label="Breadcrumb"
      className={`bg-[#0a0f1d]/90 border-y border-slate-800/80 px-4 sm:px-6 lg:px-8 py-3 text-xs text-slate-400 backdrop-blur-sm ${colorAccentClass}`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
        <ol className="flex items-center gap-2 flex-wrap">
          <li>
            <button
              onClick={() => setPublicPage('home')}
              className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer group"
            >
              <Home className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
              <span>Home</span>
            </button>
          </li>

          {items.map((item, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" />
              {item.isCurrent || !item.page ? (
                <span className="font-semibold text-slate-200" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <button
                  onClick={() => setPublicPage(item.page!, item.subHash)}
                  className="hover:text-amber-400 text-slate-400 transition-colors cursor-pointer"
                >
                  {item.label}
                </button>
              )}
            </li>
          ))}
        </ol>

        {/* Back to previous page or Home shortcut */}
        <button
          onClick={() => setPublicPage('home')}
          className="hidden sm:flex items-center gap-1 text-[11px] text-amber-400/90 hover:text-amber-300 font-semibold cursor-pointer"
        >
          <ArrowLeft className="w-3 h-3" />
          <span>Back to Hub Overview</span>
        </button>
      </div>
    </nav>
  );
};
