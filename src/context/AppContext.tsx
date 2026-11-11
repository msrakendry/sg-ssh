import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Language,
  UserRole,
  User,
  Program,
  Project,
  Community,
  Beneficiary,
  CommunityEngagement,
  FeedbackCase,
  Donor,
  Partner,
  Volunteer,
  MealIndicator,
  DocumentRecord,
  AuditLogEntry,
  CMSContent,
  ProgramPillar,
  PublicPageId,
  SocialMediaChannel,
  HeaderCmsConfig,
  HeaderNavItem,
  HeaderSubMenuItem,
} from '../types';
import {
  INITIAL_USERS,
  INITIAL_PROGRAMS,
  INITIAL_PROJECTS,
  INITIAL_COMMUNITIES,
  INITIAL_BENEFICIARIES,
  INITIAL_ENGAGEMENTS,
  INITIAL_FEEDBACK_CASES,
  INITIAL_DONORS,
  INITIAL_PARTNERS,
  INITIAL_VOLUNTEERS,
  INITIAL_MEAL_INDICATORS,
  INITIAL_DOCUMENTS,
  INITIAL_AUDIT_LOGS,
  INITIAL_CMS_CONTENT,
  INITIAL_SOCIAL_CHANNELS,
  INITIAL_HEADER_CMS_CONFIG,
} from '../data/initialData';
import { applyThemePreset, initializeSshTheme, SSH_THEME_PRESETS, SshThemePreset } from '../utils/theme';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  currentView: 'public' | 'dashboard';
  setCurrentView: (view: 'public' | 'dashboard') => void;
  currentUser: User;
  setCurrentUser: (user: User) => void;
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
  dashboardTab: string;
  setDashboardTab: (tab: string) => void;
  publicSection: string;
  setPublicSection: (sec: string) => void;
  publicPage: PublicPageId;
  setPublicPage: (page: PublicPageId, subHash?: string) => void;

  // Domain data & mutators
  programs: Program[];
  projects: Project[];
  communities: Community[];
  beneficiaries: Beneficiary[];
  engagements: CommunityEngagement[];
  feedbackCases: FeedbackCase[];
  donors: Donor[];
  partners: Partner[];
  volunteers: Volunteer[];
  mealIndicators: MealIndicator[];
  documents: DocumentRecord[];
  auditLogs: AuditLogEntry[];
  cmsContent: CMSContent;
  socialChannels: SocialMediaChannel[];

  // Action helpers
  addProject: (prj: Omit<Project, 'id'>) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  addCommunity: (comm: Omit<Community, 'id'>) => void;
  addBeneficiary: (ben: Omit<Beneficiary, 'id'>) => void;
  toggleBeneficiaryMask: (id: string) => void;
  addEngagement: (eng: Omit<CommunityEngagement, 'id'>) => void;
  addFeedbackCase: (fdb: Omit<FeedbackCase, 'id' | 'caseCode' | 'submissionDate'>) => string;
  updateFeedbackCase: (id: string, updates: Partial<FeedbackCase>) => void;
  addDonor: (donor: Omit<Donor, 'id'>) => void;
  addPartner: (partner: Omit<Partner, 'id'>) => void;
  addVolunteer: (volunteer: Omit<Volunteer, 'id'>) => void;
  updateMealIndicator: (id: string, actualAchieved: number) => void;
  toggleDocumentDisclosure: (id: string) => void;
  updateCMSContent: (updates: Partial<CMSContent>) => void;
  addAuditLog: (action: string, module: string, recordIdentifier: string, details: string) => void;

  // Controlled Social Media actions
  updateSocialChannel: (id: string, updates: Partial<SocialMediaChannel>) => void;
  toggleSocialChannel: (id: string) => void;
  addSocialChannel: (channel: Omit<SocialMediaChannel, 'id'>) => void;
  resetSocialChannels: () => void;

  // Theme configuration engine
  themePreset: string;
  setThemePreset: (presetId: string) => void;
  customThemeOverrides: Partial<SshThemePreset['variables']>;
  updateThemeColor: (variableKey: keyof SshThemePreset['variables'], hexValue: string) => void;
  resetThemeToDefault: () => void;

  // Modals
  isDonateModalOpen: boolean;
  openDonateModal: (preferredProgram?: ProgramPillar) => void;
  closeDonateModal: () => void;
  selectedDonationPillar?: ProgramPillar;

  isFeedbackModalOpen: boolean;
  openFeedbackModal: () => void;
  closeFeedbackModal: () => void;

  selectedProgramModal: ProgramPillar | null;
  openProgramModal: (pillar: ProgramPillar) => void;
  closeProgramModal: () => void;

  isSocialManageModalOpen: boolean;
  openSocialManageModal: () => void;
  closeSocialManageModal: () => void;

  // Header Navigation CMS Engine (CRUD, Reorder, Enable/Disable)
  headerConfig: HeaderCmsConfig;
  updateHeaderConfig: (updates: Partial<HeaderCmsConfig>) => void;
  toggleNavItem: (navId: string) => void;
  toggleSubItem: (navId: string, subId: string) => void;
  addNavItem: (item: Omit<HeaderNavItem, 'id'>) => void;
  updateNavItem: (id: string, updates: Partial<HeaderNavItem>) => void;
  deleteNavItem: (id: string) => void;
  addSubItem: (navId: string, subItem: Omit<HeaderSubMenuItem, 'id'>) => void;
  updateSubItem: (navId: string, subId: string, updates: Partial<HeaderSubMenuItem>) => void;
  deleteSubItem: (navId: string, subId: string) => void;
  moveNavItem: (id: string, direction: 'up' | 'down') => void;
  moveSubItem: (navId: string, subId: string, direction: 'up' | 'down') => void;
  resetHeaderToDefault: () => void;
  isHeaderManageModalOpen: boolean;
  openHeaderManageModal: () => void;
  closeHeaderManageModal: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('ssh_lang') as Language) || 'en';
  });

  const [currentView, setCurrentView] = useState<'public' | 'dashboard'>('public');
  const [activeRole, setActiveRoleState] = useState<UserRole>('executive_director');
  const [dashboardTab, setDashboardTab] = useState<string>('overview');
  const [publicSection, setPublicSection] = useState<string>('home');

  // Full page routing state for public website
  const [publicPage, setPublicPageState] = useState<PublicPageId>(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash.replace('#', '').split('/')[0];
      const validPages: PublicPageId[] = [
        'home',
        'about',
        'programs',
        'wash',
        'livelihoods',
        'energy',
        'education',
        'ssh_lab',
        'map',
        'meal',
        'governance',
        'partnerships',
        'contact',
      ];
      if (validPages.includes(hash as PublicPageId)) {
        return hash as PublicPageId;
      }
    }
    return 'home';
  });

  const setPublicPage = (page: PublicPageId, subHash?: string) => {
    setPublicPageState(page);
    setCurrentView('public');
    if (typeof window !== 'undefined') {
      const newHash = subHash ? `#${page}/${subHash}` : `#${page}`;
      window.history.pushState(null, '', newHash);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (subHash) {
        setTimeout(() => {
          const el = document.getElementById(subHash);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 120);
      }
    }
  };

  // Controlled social media channels state
  const [socialChannels, setSocialChannels] = useState<SocialMediaChannel[]>(() => {
    try {
      const saved = localStorage.getItem('ssh_social_channels');
      return saved ? JSON.parse(saved) : INITIAL_SOCIAL_CHANNELS;
    } catch {
      return INITIAL_SOCIAL_CHANNELS;
    }
  });

  const [isSocialManageModalOpen, setIsSocialManageModalOpen] = useState(false);
  const openSocialManageModal = () => setIsSocialManageModalOpen(true);
  const closeSocialManageModal = () => setIsSocialManageModalOpen(false);

  const updateSocialChannel = (id: string, updates: Partial<SocialMediaChannel>) => {
    setSocialChannels((prev) => {
      const next = prev.map((ch) => (ch.id === id ? { ...ch, ...updates } : ch));
      try {
        localStorage.setItem('ssh_social_channels', JSON.stringify(next));
      } catch {}
      return next;
    });
    addAuditLog('Updated Controlled Social Channel', 'Governance / Social Gateway', id, JSON.stringify(updates));
  };

  const toggleSocialChannel = (id: string) => {
    setSocialChannels((prev) => {
      const next = prev.map((ch) => (ch.id === id ? { ...ch, enabled: !ch.enabled } : ch));
      try {
        localStorage.setItem('ssh_social_channels', JSON.stringify(next));
      } catch {}
      return next;
    });
    addAuditLog('Toggled Social Channel Visibility', 'Governance / Social Gateway', id, 'Toggled enabled state');
  };

  const addSocialChannel = (channel: Omit<SocialMediaChannel, 'id'>) => {
    const newChan: SocialMediaChannel = {
      ...channel,
      id: `soc-${Date.now()}`,
    };
    setSocialChannels((prev) => {
      const next = [...prev, newChan];
      try {
        localStorage.setItem('ssh_social_channels', JSON.stringify(next));
      } catch {}
      return next;
    });
    addAuditLog('Added Social Channel', 'Governance / Social Gateway', newChan.id, `Added channel: ${newChan.name} (${newChan.handle})`);
  };

  const resetSocialChannels = () => {
    setSocialChannels(INITIAL_SOCIAL_CHANNELS);
    try {
      localStorage.removeItem('ssh_social_channels');
    } catch {}
    addAuditLog('Reset Social Channels', 'Governance / Social Gateway', 'all', 'Reset channels to verified default list');
  };

  // Theme configuration state
  const [themePreset, setThemePresetState] = useState<string>(() => {
    return initializeSshTheme();
  });
  const [customThemeOverrides, setCustomThemeOverrides] = useState<Partial<SshThemePreset['variables']>>(() => {
    try {
      const saved = localStorage.getItem('ssh_custom_theme_overrides');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Load user corresponding to active role
  const [currentUser, setCurrentUser] = useState<User>(() => {
    return INITIAL_USERS[0];
  });

  // Domain states
  const [programs] = useState<Program[]>(INITIAL_PROGRAMS);
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [communities, setCommunities] = useState<Community[]>(INITIAL_COMMUNITIES);
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>(INITIAL_BENEFICIARIES);
  const [engagements, setEngagements] = useState<CommunityEngagement[]>(INITIAL_ENGAGEMENTS);
  const [feedbackCases, setFeedbackCases] = useState<FeedbackCase[]>(INITIAL_FEEDBACK_CASES);
  const [donors, setDonors] = useState<Donor[]>(INITIAL_DONORS);
  const [partners, setPartners] = useState<Partner[]>(INITIAL_PARTNERS);
  const [volunteers, setVolunteers] = useState<Volunteer[]>(INITIAL_VOLUNTEERS);
  const [mealIndicators, setMealIndicators] = useState<MealIndicator[]>(INITIAL_MEAL_INDICATORS);
  const [documents, setDocuments] = useState<DocumentRecord[]>(INITIAL_DOCUMENTS);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(INITIAL_AUDIT_LOGS);
  const [cmsContent, setCmsContent] = useState<CMSContent>(INITIAL_CMS_CONTENT);

  // Modals state
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);
  const [selectedDonationPillar, setSelectedDonationPillar] = useState<ProgramPillar | undefined>(undefined);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [selectedProgramModal, setSelectedProgramModal] = useState<ProgramPillar | null>(null);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('ssh_lang', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  };

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const setActiveRole = (role: UserRole) => {
    setActiveRoleState(role);
    const matched = INITIAL_USERS.find((u) => u.role === role);
    if (matched) {
      setCurrentUser(matched);
    }
    addAuditLog(
      'Role Switched',
      'Security / RBAC',
      `Role: ${role}`,
      `Auditor or Admin switched active session view to ${role}`
    );
  };

  const addAuditLog = (action: string, module: string, recordIdentifier: string, details: string) => {
    const newEntry: AuditLogEntry = {
      id: `aud-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      userName: currentUser.name,
      userRole: activeRole,
      action,
      module,
      recordIdentifier,
      details,
      ipAddress: '102.68.18.92 (Field Terminal)',
    };
    setAuditLogs((prev) => [newEntry, ...prev]);
  };

  const addProject = (prj: Omit<Project, 'id'>) => {
    const newProject: Project = {
      ...prj,
      id: `prj-${Date.now()}`,
    };
    setProjects((prev) => [newProject, ...prev]);
    addAuditLog('Created Project', 'Projects', newProject.code, `Initiated project: ${newProject.title}`);
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const updated = { ...p, ...updates };
          addAuditLog('Updated Project', 'Projects', updated.code, `Modified fields on project: ${updated.title}`);
          return updated;
        }
        return p;
      })
    );
  };

  const addCommunity = (comm: Omit<Community, 'id'>) => {
    const newComm: Community = {
      ...comm,
      id: `comm-${Date.now()}`,
    };
    setCommunities((prev) => [...prev, newComm]);
    addAuditLog('Registered Community', 'CEM / Communities', newComm.code, `Added settlement profile: ${newComm.name}`);
  };

  const addBeneficiary = (ben: Omit<Beneficiary, 'id'>) => {
    const newBen: Beneficiary = {
      ...ben,
      id: `ben-${Date.now()}`,
    };
    setBeneficiaries((prev) => [newBen, ...prev]);
    addAuditLog(
      'Registered Beneficiary',
      'CEM / Beneficiaries',
      newBen.anonymizedId,
      `Protected record created with consent verification (${newBen.consentStatus})`
    );
  };

  const toggleBeneficiaryMask = (id: string) => {
    setBeneficiaries((prev) =>
      prev.map((b) => {
        if (b.id === id) {
          const nextMask = !b.isMasked;
          addAuditLog(
            nextMask ? 'Masked PII Record' : 'Authorized PII Reveal',
            'CEM / Data Protection',
            b.anonymizedId,
            nextMask
              ? 'Data protection veil re-applied'
              : 'User exercised authorized PII audit-logged inspection'
          );
          return { ...b, isMasked: nextMask };
        }
        return b;
      })
    );
  };

  const addEngagement = (eng: Omit<CommunityEngagement, 'id'>) => {
    const newEng: CommunityEngagement = {
      ...eng,
      id: `eng-${Date.now()}`,
    };
    setEngagements((prev) => [newEng, ...prev]);
    addAuditLog(
      'Recorded Engagement',
      'CEM / Community Sessions',
      newEng.title,
      `Conducted ${newEng.type} at ${newEng.location} with ${newEng.participantsCount} participants`
    );
  };

  const addFeedbackCase = (fdb: Omit<FeedbackCase, 'id' | 'caseCode' | 'submissionDate'>) => {
    const caseNum = Math.floor(100 + Math.random() * 900);
    const caseCode = `SSH-FDB-2025-${caseNum}`;
    const newCase: FeedbackCase = {
      ...fdb,
      id: `case-${Date.now()}`,
      caseCode,
      submissionDate: new Date().toISOString().split('T')[0],
    };
    setFeedbackCases((prev) => [newCase, ...prev]);
    addAuditLog(
      'Logged Feedback / Complaint',
      'Accountability & Safeguarding',
      caseCode,
      `New case logged. Category: ${newCase.category}, Priority: ${newCase.priority}`
    );
    return caseCode;
  };

  const updateFeedbackCase = (id: string, updates: Partial<FeedbackCase>) => {
    setFeedbackCases((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const updated = { ...c, ...updates };
          addAuditLog(
            'Updated Case Resolution',
            'Accountability & Safeguarding',
            updated.caseCode,
            `Case status updated to ${updated.status}. Notes: ${updated.resolutionNotes || 'No notes'}`
          );
          return updated;
        }
        return c;
      })
    );
  };

  const addDonor = (donor: Omit<Donor, 'id'>) => {
    const newDonor: Donor = { ...donor, id: `dnr-${Date.now()}` };
    setDonors((prev) => [newDonor, ...prev]);
    addAuditLog('Added Donor Lead', 'Donors & Grants', newDonor.name, `New ${newDonor.organizationType} partner recorded`);
  };

  const addPartner = (partner: Omit<Partner, 'id'>) => {
    const newPartner: Partner = { ...partner, id: `prt-${Date.now()}` };
    setPartners((prev) => [newPartner, ...prev]);
    addAuditLog('Added Partner MoU', 'Partnerships', newPartner.name, `Partner status: ${newPartner.mouStatus}`);
  };

  const addVolunteer = (vol: Omit<Volunteer, 'id'>) => {
    const newVol: Volunteer = { ...vol, id: `vol-${Date.now()}` };
    setVolunteers((prev) => [newVol, ...prev]);
    addAuditLog('Registered Volunteer', 'Volunteers', newVol.name, `Assigned to ${newVol.pillarInterest} pillar`);
  };

  const updateMealIndicator = (id: string, actualAchieved: number) => {
    setMealIndicators((prev) =>
      prev.map((ind) => {
        if (ind.id === id) {
          const updated = {
            ...ind,
            actualAchieved,
            lastUpdated: new Date().toISOString().split('T')[0],
          };
          addAuditLog(
            'Updated MEAL Metric',
            'M&E Indicators',
            ind.code,
            `Achieved value updated to ${actualAchieved} ${ind.unit}`
          );
          return updated;
        }
        return ind;
      })
    );
  };

  const toggleDocumentDisclosure = (id: string) => {
    setDocuments((prev) =>
      prev.map((doc) => {
        if (doc.id === id) {
          const updated = { ...doc, isPubliclyDisclosed: !doc.isPubliclyDisclosed };
          addAuditLog(
            updated.isPubliclyDisclosed ? 'Disclosed Public Document' : 'Revoked Document Disclosure',
            'Governance & Documents',
            doc.title,
            `Public disclosure status changed to ${updated.isPubliclyDisclosed}`
          );
          return updated;
        }
        return doc;
      })
    );
  };

  const updateCMSContent = (updates: Partial<CMSContent>) => {
    setCmsContent((prev) => {
      const updated = { ...prev, ...updates };
      addAuditLog('Updated Public CMS Content', 'CMS Content Manager', 'Global Site Content', 'Content changes published');
      return updated;
    });
  };

  const setThemePreset = (presetId: string) => {
    setThemePresetState(presetId);
    setCustomThemeOverrides({});
    applyThemePreset(presetId);
    addAuditLog(
      'Theme Preset Activated',
      'Branding & Visual Identity',
      presetId,
      `Applied theme preset: ${SSH_THEME_PRESETS[presetId]?.name || presetId}`
    );
  };

  const updateThemeColor = (variableKey: keyof SshThemePreset['variables'], hexValue: string) => {
    const updated = { ...customThemeOverrides, [variableKey]: hexValue };
    setCustomThemeOverrides(updated);
    applyThemePreset(themePreset, updated);
    addAuditLog(
      'Custom Color Token Updated',
      'Branding & Visual Identity',
      variableKey,
      `Updated CSS variable ${variableKey} to ${hexValue}`
    );
  };

  const resetThemeToDefault = () => {
    setThemePresetState('official');
    setCustomThemeOverrides({});
    applyThemePreset('official');
    addAuditLog(
      'Reset Theme to Official Logo',
      'Branding & Visual Identity',
      'official',
      'Restored canonical 4-petal logo palette'
    );
  };

  const openDonateModal = (pillar?: ProgramPillar) => {
    setSelectedDonationPillar(pillar);
    setIsDonateModalOpen(true);
  };

  const closeDonateModal = () => {
    setIsDonateModalOpen(false);
  };

  const openFeedbackModal = () => {
    setIsFeedbackModalOpen(true);
  };

  const closeFeedbackModal = () => {
    setIsFeedbackModalOpen(false);
  };

  const openProgramModal = (pillar: ProgramPillar) => {
    setSelectedProgramModal(pillar);
  };

  const closeProgramModal = () => {
    setSelectedProgramModal(null);
  };

  // Header Navigation CMS Engine (CRUD, Reorder, Enable/Disable)
  const [headerConfig, setHeaderConfig] = useState<HeaderCmsConfig>(() => {
    try {
      const saved = localStorage.getItem('ssh_header_cms_config');
      return saved ? JSON.parse(saved) : INITIAL_HEADER_CMS_CONFIG;
    } catch {
      return INITIAL_HEADER_CMS_CONFIG;
    }
  });

  const [isHeaderManageModalOpen, setIsHeaderManageModalOpen] = useState(false);
  const openHeaderManageModal = () => setIsHeaderManageModalOpen(true);
  const closeHeaderManageModal = () => setIsHeaderManageModalOpen(false);

  const saveHeaderConfig = (newConfig: HeaderCmsConfig, auditAction: string, details: string) => {
    setHeaderConfig(newConfig);
    try {
      localStorage.setItem('ssh_header_cms_config', JSON.stringify(newConfig));
    } catch {}
    addAuditLog(auditAction, 'CMS / Navigation Header', 'header_config', details);
  };

  const updateHeaderConfig = (updates: Partial<HeaderCmsConfig>) => {
    const updated = { ...headerConfig, ...updates };
    saveHeaderConfig(updated, 'Updated Header CMS Settings', JSON.stringify(updates));
  };

  const toggleNavItem = (navId: string) => {
    const updatedNavItems = headerConfig.navItems.map((item) =>
      item.id === navId ? { ...item, enabled: !item.enabled } : item
    );
    saveHeaderConfig(
      { ...headerConfig, navItems: updatedNavItems },
      'Toggled Nav Item Visibility',
      `Toggled item ${navId}`
    );
  };

  const toggleSubItem = (navId: string, subId: string) => {
    const updatedNavItems = headerConfig.navItems.map((item) => {
      if (item.id !== navId || !item.subItems) return item;
      return {
        ...item,
        subItems: item.subItems.map((sub) =>
          sub.id === subId ? { ...sub, enabled: !sub.enabled } : sub
        ),
      };
    });
    saveHeaderConfig(
      { ...headerConfig, navItems: updatedNavItems },
      'Toggled Sub-Menu Item Visibility',
      `Toggled sub-item ${subId} in ${navId}`
    );
  };

  const addNavItem = (item: Omit<HeaderNavItem, 'id'>) => {
    const newItem: HeaderNavItem = {
      ...item,
      id: `nav-${Date.now()}`,
      order: headerConfig.navItems.length + 1,
    };
    saveHeaderConfig(
      { ...headerConfig, navItems: [...headerConfig.navItems, newItem] },
      'Added Navigation Item',
      `Added top-level item: ${newItem.labelEn}`
    );
  };

  const updateNavItem = (id: string, updates: Partial<HeaderNavItem>) => {
    const updatedNavItems = headerConfig.navItems.map((item) =>
      item.id === id ? { ...item, ...updates } : item
    );
    saveHeaderConfig(
      { ...headerConfig, navItems: updatedNavItems },
      'Updated Navigation Item',
      `Updated item ${id}`
    );
  };

  const deleteNavItem = (id: string) => {
    const updatedNavItems = headerConfig.navItems.filter((item) => item.id !== id);
    saveHeaderConfig(
      { ...headerConfig, navItems: updatedNavItems },
      'Deleted Navigation Item',
      `Deleted item ${id}`
    );
  };

  const addSubItem = (navId: string, subItem: Omit<HeaderSubMenuItem, 'id'>) => {
    const newSub: HeaderSubMenuItem = {
      ...subItem,
      id: `sub-${Date.now()}`,
      order: 99,
    };
    const updatedNavItems = headerConfig.navItems.map((item) => {
      if (item.id !== navId) return item;
      const currentSubs = item.subItems || [];
      return {
        ...item,
        subItems: [...currentSubs, { ...newSub, order: currentSubs.length + 1 }],
      };
    });
    saveHeaderConfig(
      { ...headerConfig, navItems: updatedNavItems },
      'Added Sub-Menu Item',
      `Added sub-item ${newSub.labelEn} to ${navId}`
    );
  };

  const updateSubItem = (navId: string, subId: string, updates: Partial<HeaderSubMenuItem>) => {
    const updatedNavItems = headerConfig.navItems.map((item) => {
      if (item.id !== navId || !item.subItems) return item;
      return {
        ...item,
        subItems: item.subItems.map((sub) =>
          sub.id === subId ? { ...sub, ...updates } : sub
        ),
      };
    });
    saveHeaderConfig(
      { ...headerConfig, navItems: updatedNavItems },
      'Updated Sub-Menu Item',
      `Updated sub-item ${subId} in ${navId}`
    );
  };

  const deleteSubItem = (navId: string, subId: string) => {
    const updatedNavItems = headerConfig.navItems.map((item) => {
      if (item.id !== navId || !item.subItems) return item;
      return {
        ...item,
        subItems: item.subItems.filter((sub) => sub.id !== subId),
      };
    });
    saveHeaderConfig(
      { ...headerConfig, navItems: updatedNavItems },
      'Deleted Sub-Menu Item',
      `Deleted sub-item ${subId} from ${navId}`
    );
  };

  const moveNavItem = (id: string, direction: 'up' | 'down') => {
    const items = [...headerConfig.navItems];
    const index = items.findIndex((i) => i.id === id);
    if (index === -1) return;
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= items.length) return;
    const temp = items[index];
    items[index] = items[targetIndex];
    items[targetIndex] = temp;
    items.forEach((item, idx) => {
      item.order = idx + 1;
    });
    saveHeaderConfig({ ...headerConfig, navItems: items }, 'Reordered Nav Items', `Moved item ${id} ${direction}`);
  };

  const moveSubItem = (navId: string, subId: string, direction: 'up' | 'down') => {
    const updatedNavItems = headerConfig.navItems.map((item) => {
      if (item.id !== navId || !item.subItems) return item;
      const subs = [...item.subItems];
      const index = subs.findIndex((s) => s.id === subId);
      if (index === -1) return item;
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= subs.length) return item;
      const temp = subs[index];
      subs[index] = subs[targetIndex];
      subs[targetIndex] = temp;
      subs.forEach((sub, idx) => {
        sub.order = idx + 1;
      });
      return { ...item, subItems: subs };
    });
    saveHeaderConfig(
      { ...headerConfig, navItems: updatedNavItems },
      'Reordered Sub-Menu Item',
      `Moved sub-item ${subId} in ${navId} ${direction}`
    );
  };

  const resetHeaderToDefault = () => {
    saveHeaderConfig(INITIAL_HEADER_CMS_CONFIG, 'Reset Header Navigation', 'Restored canonical header configuration');
    try {
      localStorage.removeItem('ssh_header_cms_config');
    } catch {}
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        currentView,
        setCurrentView,
        currentUser,
        setCurrentUser,
        activeRole,
        setActiveRole,
        dashboardTab,
        setDashboardTab,
        publicSection,
        setPublicSection,
        publicPage,
        setPublicPage,
        socialChannels,
        updateSocialChannel,
        toggleSocialChannel,
        addSocialChannel,
        resetSocialChannels,
        isSocialManageModalOpen,
        openSocialManageModal,
        closeSocialManageModal,
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
        isHeaderManageModalOpen,
        openHeaderManageModal,
        closeHeaderManageModal,
        themePreset,
        setThemePreset,
        customThemeOverrides,
        updateThemeColor,
        resetThemeToDefault,
        programs,
        projects,
        communities,
        beneficiaries,
        engagements,
        feedbackCases,
        donors,
        partners,
        volunteers,
        mealIndicators,
        documents,
        auditLogs,
        cmsContent,
        addProject,
        updateProject,
        addCommunity,
        addBeneficiary,
        toggleBeneficiaryMask,
        addEngagement,
        addFeedbackCase,
        updateFeedbackCase,
        addDonor,
        addPartner,
        addVolunteer,
        updateMealIndicator,
        toggleDocumentDisclosure,
        updateCMSContent,
        addAuditLog,
        isDonateModalOpen,
        openDonateModal,
        closeDonateModal,
        selectedDonationPillar,
        isFeedbackModalOpen,
        openFeedbackModal,
        closeFeedbackModal,
        selectedProgramModal,
        openProgramModal,
        closeProgramModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
