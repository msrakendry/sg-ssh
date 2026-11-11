import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { TRANSLATIONS } from '../../translations';
import { PublicPageId, HeaderNavItem, HeaderSubMenuItem } from '../../types';
import {
  Shield,
  Menu,
  X,
  ArrowUpRight,
  Globe,
  Lock,
  Palette,
  ChevronDown,
  Droplets,
  Coins,
  Sun,
  BookOpen,
  Sparkles,
  MapPin,
  TrendingUp,
  FileText,
  HeartHandshake,
  Mail,
  ShieldCheck,
  CheckCircle2,
  Share2,
  Terminal,
  Wrench,
  Compass,
  Map,
  Activity,
  Phone,
  MessageSquare,
  Users,
  Heart,
  FolderKanban,
  Settings,
  Scale,
  ShieldAlert,
  Sliders,
} from 'lucide-react';
import { SSH_THEME_PRESET_LIST, ThemePresetId } from '../../utils/theme';

export const PublicNavbar: React.FC = () => {
  const {
    language,
    setLanguage,
    setCurrentView,
    publicPage,
    setPublicPage,
    openDonateModal,
    openFeedbackModal,
    openSocialManageModal,
    openHeaderManageModal,
    headerConfig,
    themePreset,
    setThemePreset,
  } = useApp();
  const t = TRANSLATIONS[language];

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpandedNavId, setMobileExpandedNavId] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const cyclePreset = () => {
    const currentIndex = SSH_THEME_PRESET_LIST.findIndex((p) => p.id === themePreset);
    const nextPreset = SSH_THEME_PRESET_LIST[(currentIndex + 1) % SSH_THEME_PRESET_LIST.length];
    setThemePreset(nextPreset.id as ThemePresetId);
  };

  const currentPresetMeta =
    SSH_THEME_PRESET_LIST.find((p) => p.id === themePreset) || SSH_THEME_PRESET_LIST[0];

  const handleNavClick = (page: PublicPageId, subHash?: string) => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    setPublicPage(page, subHash);
  };

  const handleCtaClick = () => {
    if (headerConfig.ctaButtonAction === 'donate') {
      openDonateModal();
    } else if (headerConfig.ctaButtonAction === 'feedback') {
      openFeedbackModal();
    } else if (headerConfig.ctaButtonAction === 'contact') {
      setPublicPage('contact');
    } else {
      openDonateModal();
    }
  };

  // Helper to render icon by name
  const renderIcon = (name?: string, className = 'w-4 h-4') => {
    switch (name) {
      case 'Droplets':
        return <Droplets className={className} />;
      case 'Coins':
        return <Coins className={className} />;
      case 'Sun':
        return <Sun className={className} />;
      case 'BookOpen':
        return <BookOpen className={className} />;
      case 'Sparkles':
        return <Sparkles className={className} />;
      case 'Terminal':
        return <Terminal className={className} />;
      case 'Wrench':
        return <Wrench className={className} />;
      case 'Compass':
        return <Compass className={className} />;
      case 'Map':
        return <Map className={className} />;
      case 'TrendingUp':
        return <TrendingUp className={className} />;
      case 'Activity':
        return <Activity className={className} />;
      case 'Lock':
        return <Lock className={className} />;
      case 'ShieldAlert':
        return <ShieldAlert className={className} />;
      case 'FileText':
        return <FileText className={className} />;
      case 'Phone':
        return <Phone className={className} />;
      case 'MessageSquare':
        return <MessageSquare className={className} />;
      case 'HeartHandshake':
        return <HeartHandshake className={className} />;
      case 'Users':
        return <Users className={className} />;
      case 'Heart':
        return <Heart className={className} />;
      case 'MapPin':
        return <MapPin className={className} />;
      case 'FolderKanban':
        return <FolderKanban className={className} />;
      default:
        return <Sparkles className={className} />;
    }
  };

  const getBadgeColorClass = (color?: string) => {
    switch (color) {
      case 'blue':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
      case 'green':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'red':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      case 'purple':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
      case 'gold':
      default:
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
    }
  };

  // Filter only enabled navigation items
  const visibleNavItems = headerConfig.navItems
    .filter((item) => item.enabled)
    .sort((a, b) => a.order - b.order);

  return (
    <header className="sticky top-0 z-50 bg-[#070b14]/95 backdrop-blur-md border-b border-slate-800 text-slate-100 select-none">
      {/* 4-Color Heraldic Stripe matching SSH Logo (Blue, Gold, Green, Red) */}
      <div className="h-1 w-full bg-gradient-to-r from-blue-700 via-amber-500 via-emerald-600 to-red-600" />

      {/* Top micro banner if enabled in CMS */}
      {headerConfig.topBarEnabled && (
        <div className="bg-[#05080f] border-b border-slate-800/80 text-slate-300 text-xs font-semibold py-1.5 px-4 tracking-wide">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-blue-500" title="WASH" />
                <span className="w-2 h-2 rounded-full bg-amber-500" title="Energy" />
                <span className="w-2 h-2 rounded-full bg-emerald-500" title="Livelihoods" />
                <span className="w-2 h-2 rounded-full bg-red-500" title="Education" />
              </span>
              <span className="text-amber-400 font-bold">
                {language === 'ar' ? headerConfig.topBarTextAr : headerConfig.topBarTextEn}
              </span>
            </div>

            <div className="flex items-center gap-3 text-[11px]">
              <button
                onClick={() => setPublicPage('meal', 'indicators')}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer hidden sm:inline"
              >
                Live Indicators
              </button>
              <span className="text-slate-700 hidden sm:inline">·</span>
              <button
                onClick={openSocialManageModal}
                className="text-slate-400 hover:text-amber-300 transition-colors cursor-pointer flex items-center gap-1 hidden sm:flex"
              >
                <Share2 className="w-3 h-3 text-amber-400" />
                <span>Controlled Channels</span>
              </button>
              <span className="text-slate-700 hidden sm:inline">·</span>
              <button
                onClick={openFeedbackModal}
                className="text-rose-400 hover:text-rose-300 cursor-pointer font-bold inline-flex items-center gap-1"
              >
                <Shield className="w-3 h-3" />
                <span>Humanitarian Complaints Desk</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Top Bar */}
      <div
        ref={dropdownRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6"
      >
        {/* Zone 1: Logo & Institutional Wordmark */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 shrink-0 group cursor-pointer text-left"
          title="Sudan Sustainability Hub — Home"
        >
          <img
            src="/assets/aistudio/SSH_LOGO_a17090d7.png"
            alt="Sudan Sustainability Hub Logo"
            className="w-12 h-12 object-contain drop-shadow transition-transform group-hover:scale-105"
          />
          <div className="flex flex-col">
            <span className="font-extrabold text-sm sm:text-base tracking-tight text-white group-hover:text-amber-400 transition-colors">
              Sudan Sustainability Hub
            </span>
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-semibold">
              <span className="text-blue-400">Water</span>
              <span className="text-slate-600">·</span>
              <span className="text-emerald-400">Livelihoods</span>
              <span className="text-slate-600">·</span>
              <span className="text-amber-400">Energy</span>
              <span className="text-slate-600">·</span>
              <span className="text-red-400">Education</span>
            </div>
          </div>
        </button>

        {/* Zone 2: CMS-Controlled Navigation with Multi-Level Dropdowns */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs font-semibold text-slate-300">
          {visibleNavItems.map((item) => {
            const hasSub = item.subItems && item.subItems.some((s) => s.enabled);
            const isCurrentPage = item.page === publicPage;
            const isOpen = activeDropdown === item.id;
            const label = language === 'ar' && item.labelAr ? item.labelAr : item.labelEn;

            if (!hasSub) {
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.page || 'home', item.hash)}
                  className={`px-3 py-2 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                    isCurrentPage
                      ? 'text-amber-400 bg-slate-800/60 font-bold'
                      : item.highlight
                      ? 'text-amber-300 hover:text-white bg-amber-500/10 border border-amber-500/30'
                      : 'hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  <span>{label}</span>
                  {item.badge && (
                    <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded border ${getBadgeColorClass(item.badgeColor)}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            }

            // Item with Dropdown / Sub-Menu
            const visibleSubs = (item.subItems || [])
              .filter((s) => s.enabled)
              .sort((a, b) => a.order - b.order);

            return (
              <div key={item.id} className="relative">
                <button
                  onClick={() => setActiveDropdown(isOpen ? null : item.id)}
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                    isCurrentPage || isOpen
                      ? 'text-amber-400 bg-slate-800/60 font-bold'
                      : item.highlight
                      ? 'text-amber-300 hover:text-white bg-amber-500/10 border border-amber-500/30'
                      : 'hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  <span>{label}</span>
                  {item.badge && (
                    <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded border ${getBadgeColorClass(item.badgeColor)}`}>
                      {item.badge}
                    </span>
                  )}
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-amber-400' : 'text-slate-500'
                    }`}
                  />
                </button>

                {isOpen && (
                  <div
                    className={`absolute left-0 top-full mt-2 p-3 rounded-2xl bg-[#090f1e] border border-slate-700 shadow-2xl z-50 animate-fade-in space-y-1 ${
                      visibleSubs.length > 4 ? 'w-96' : 'w-80'
                    }`}
                  >
                    {visibleSubs.map((sub) => {
                      const subLabel = language === 'ar' && sub.labelAr ? sub.labelAr : sub.labelEn;
                      const subtext = language === 'ar' && sub.subtextAr ? sub.subtextAr : sub.subtextEn;

                      return (
                        <button
                          key={sub.id}
                          onClick={() => handleNavClick(sub.page, sub.hash)}
                          className="w-full text-left p-2.5 rounded-xl hover:bg-slate-800/80 transition-colors group cursor-pointer flex items-start gap-3"
                        >
                          <div className="p-1.5 rounded-lg bg-slate-800/80 group-hover:bg-amber-400/20 text-slate-400 group-hover:text-amber-400 transition-colors shrink-0 mt-0.5">
                            {renderIcon(sub.iconName, 'w-3.5 h-3.5')}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-bold text-white text-xs group-hover:text-amber-300 flex items-center justify-between gap-2">
                              <span className="truncate">{subLabel}</span>
                              {sub.badge && (
                                <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded border shrink-0 ${getBadgeColorClass(sub.badgeColor)}`}>
                                  {sub.badge}
                                </span>
                              )}
                            </div>
                            {subtext && (
                              <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                                {subtext}
                              </div>
                            )}
                          </div>
                        </button>
                      );
                    })}

                    {item.page && (
                      <div className="pt-2 border-t border-slate-800/80">
                        <button
                          onClick={() => handleNavClick(item.page!)}
                          className="w-full py-1.5 text-center text-xs text-amber-400 hover:text-amber-300 font-bold cursor-pointer"
                        >
                          Open Full {item.labelEn} Page →
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Zone 3: Actions + CMS Customizer + Theme + Language + Portal + CTA */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Quick Header CMS Customizer Button */}
          <button
            onClick={openHeaderManageModal}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-amber-300 hover:text-white bg-amber-500/10 hover:bg-amber-500/20 rounded-lg border border-amber-500/40 transition-colors whitespace-nowrap cursor-pointer shadow-sm"
            title="Open Live Header & Sub-Menus Customizer (CMS)"
          >
            <Sliders className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden xl:inline text-[11px]">Header CMS</span>
          </button>

          {/* Theme Preset Cycler */}
          {headerConfig.showThemeCycler && (
            <button
              onClick={cyclePreset}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-slate-200 hover:text-white bg-slate-850 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap cursor-pointer border border-slate-700 shadow-sm"
              title={`Active Theme: ${currentPresetMeta.name}. Click to cycle.`}
            >
              <Palette className="w-3.5 h-3.5 text-amber-400" />
              <div className="flex items-center gap-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-ssh-blue" />
                <span className="w-1.5 h-1.5 rounded-full bg-ssh-gold" />
                <span className="w-1.5 h-1.5 rounded-full bg-ssh-green" />
                <span className="w-1.5 h-1.5 rounded-full bg-ssh-red" />
              </div>
            </button>
          )}

          {/* Language Switcher */}
          {headerConfig.showLanguageSwitcher && (
            <button
              onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-slate-200 hover:text-white bg-slate-800/90 hover:bg-slate-750 rounded-lg transition-colors whitespace-nowrap cursor-pointer border border-slate-700"
              title="Switch Language / تغيير اللغة"
            >
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span>{language === 'en' ? 'عربي' : 'EN'}</span>
            </button>
          )}

          {/* Secure Management Portal Button */}
          {headerConfig.showPortalButton && (
            <button
              onClick={() => setCurrentView('dashboard')}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:text-white bg-blue-950/70 hover:bg-blue-900/80 rounded-lg border border-blue-800/60 transition-colors whitespace-nowrap cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>
                {language === 'ar'
                  ? headerConfig.portalButtonTextAr
                  : headerConfig.portalButtonTextEn}
              </span>
            </button>
          )}

          {/* Primary CTA Button */}
          {headerConfig.showCtaButton && (
            <button
              onClick={handleCtaClick}
              className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 rounded-lg transition-all shadow-md hover:shadow-lg whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1"
            >
              <span>
                {language === 'ar' ? headerConfig.ctaButtonTextAr : headerConfig.ctaButtonTextEn}
              </span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-400 hover:text-white focus:outline-none cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer with Accordion Sub-Menus */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#070b14] border-b border-slate-800 px-6 py-6 space-y-4 max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col space-y-2">
            {visibleNavItems.map((item) => {
              const hasSub = item.subItems && item.subItems.some((s) => s.enabled);
              const isExpanded = mobileExpandedNavId === item.id;
              const label = language === 'ar' && item.labelAr ? item.labelAr : item.labelEn;

              if (!hasSub) {
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.page || 'home', item.hash)}
                    className="text-left py-2 px-3 rounded-lg text-sm font-semibold text-slate-200 hover:text-amber-400 hover:bg-slate-900 transition-colors flex items-center justify-between"
                  >
                    <span>{label}</span>
                    {item.badge && (
                      <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded border ${getBadgeColorClass(item.badgeColor)}`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              }

              const visibleSubs = (item.subItems || [])
                .filter((s) => s.enabled)
                .sort((a, b) => a.order - b.order);

              return (
                <div key={item.id} className="border-b border-slate-800/60 pb-2">
                  <button
                    onClick={() => setMobileExpandedNavId(isExpanded ? null : item.id)}
                    className="w-full text-left py-2 px-3 rounded-lg text-sm font-bold text-slate-200 hover:text-amber-400 hover:bg-slate-900 transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <span>{label}</span>
                      {item.badge && (
                        <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded border ${getBadgeColorClass(item.badgeColor)}`}>
                          {item.badge}
                        </span>
                      )}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isExpanded ? 'rotate-180 text-amber-400' : 'text-slate-500'
                      }`}
                    />
                  </button>

                  {isExpanded && (
                    <div className="pl-4 pr-2 py-2 space-y-1 bg-slate-950/60 rounded-xl my-1 border border-slate-800/80">
                      {visibleSubs.map((sub) => {
                        const subLabel = language === 'ar' && sub.labelAr ? sub.labelAr : sub.labelEn;
                        return (
                          <button
                            key={sub.id}
                            onClick={() => handleNavClick(sub.page, sub.hash)}
                            className="w-full text-left py-2 px-2.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-amber-300 hover:bg-slate-900 transition-colors flex items-center justify-between"
                          >
                            <div className="flex items-center gap-2">
                              {renderIcon(sub.iconName, 'w-3.5 h-3.5 text-amber-400')}
                              <span>{subLabel}</span>
                            </div>
                            {sub.badge && (
                              <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded border ${getBadgeColorClass(sub.badgeColor)}`}>
                                {sub.badge}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-800 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openHeaderManageModal();
              }}
              className="w-full py-2.5 px-4 text-xs font-semibold text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 rounded-lg text-center flex items-center justify-center gap-2 border border-amber-500/40 cursor-pointer"
            >
              <Sliders className="w-4 h-4" />
              <span>Customize Header Navigation (CMS)</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setCurrentView('dashboard');
              }}
              className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-lg text-center flex items-center justify-center gap-2 border border-slate-700 cursor-pointer"
            >
              <Lock className="w-4 h-4 text-emerald-400" />
              <span>Management Portal</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openFeedbackModal();
              }}
              className="w-full py-2.5 px-4 text-xs font-semibold text-rose-300 bg-rose-950/40 rounded-lg text-center border border-rose-500/40 cursor-pointer"
            >
              Humanitarian Complaints Desk
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
