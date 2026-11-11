export type Language = 'en' | 'ar';

export type UserRole =
  | 'super_admin'
  | 'executive_director'
  | 'program_manager'
  | 'me_officer'
  | 'cem_officer'
  | 'field_officer'
  | 'finance_officer'
  | 'auditor';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  department: string;
}

export type ProgramPillar = 'wash' | 'livelihoods' | 'energy_climate' | 'education' | 'peacebuilding' | 'ssh_lab';

export interface Program {
  id: string;
  pillar: ProgramPillar;
  title: string;
  titleAr: string;
  subtitle: string;
  subtitleAr: string;
  description: string;
  descriptionAr: string;
  leadName: string;
  activeProjectsCount: number;
  totalBeneficiaries: number;
  budgetUSD: number;
  objectives: string[];
  keyIndicators: string[];
}

export type ProjectStatus =
  | 'concept'
  | 'proposal'
  | 'approved'
  | 'active'
  | 'completed'
  | 'suspended'
  | 'closed';

export interface Project {
  id: string;
  code: string;
  title: string;
  programPillar: ProgramPillar;
  country: string;
  settlement: string;
  locationDetails: string;
  donorName: string;
  partnerName: string;
  startDate: string;
  endDate: string;
  budgetUSD: number;
  spentUSD: number;
  status: ProjectStatus;
  targetBeneficiaries: number;
  actualBeneficiaries: number;
  projectManager: string;
  summary: string;
  outputs: string[];
  risks: string[];
}

export interface Community {
  id: string;
  code: string;
  name: string;
  country: string;
  district: string;
  settlement: string;
  zone: string;
  populationEstimate: number;
  coordinates: [number, number]; // [lat, lng]
  priorityNeeds: string[];
  vulnerabilityLevel: 'High' | 'Moderate' | 'Severe';
  waterAccessPercentage: number;
  educationAccessPercentage: number;
  cleanEnergyAccessPercentage: number;
  communityLeaderContact: string;
  activeProjectsCount: number;
  notes: string;
}

export type ConsentStatus = 'Verified Written' | 'Oral Assent Witnessed' | 'Pending Update';

export interface Beneficiary {
  id: string;
  anonymizedId: string; // e.g. "KYR-BEN-8921"
  initials: string;
  gender: 'Female' | 'Male' | 'Other';
  ageRange: '15-18' | '19-24' | '25-35' | '36-49' | '50+';
  communityId: string;
  communityName: string;
  householdSize: number;
  pillar: ProgramPillar;
  projectId: string;
  projectTitle: string;
  assistanceReceived: string[];
  registrationDate: string;
  consentStatus: ConsentStatus;
  vulnerabilityTags: string[];
  dataProtectionLevel: 'Standard Protected' | 'High Safeguarding Priority';
  isMasked: boolean; // default true
}

export interface CommunityEngagement {
  id: string;
  title: string;
  type:
    | 'Community Dialogue'
    | 'WASH Committee'
    | 'Women Circle'
    | 'Youth Peace Workshop'
    | 'Training Session'
    | 'Focus Group Discussion';
  date: string;
  location: string;
  communityName: string;
  facilitator: string;
  programPillar: ProgramPillar;
  participantsCount: number;
  femaleParticipantsPercentage: number;
  objectives: string;
  keyOutcomes: string;
  followUpActions: string[];
}

export type FeedbackCategory =
  | 'Suggestion'
  | 'Service Feedback'
  | 'Request for Assistance'
  | 'Safeguarding Concern'
  | 'Water System Breakdown'
  | 'Staff Conduct'
  | 'Fraud Concern'
  | 'Other';

export type FeedbackPriority = 'Low' | 'Medium' | 'High' | 'Critical Safeguarding';

export type FeedbackStatus = 'Open' | 'Investigating' | 'Action Taken' | 'Resolved' | 'Closed';

export interface FeedbackCase {
  id: string;
  caseCode: string;
  isAnonymous: boolean;
  complainantName?: string;
  complainantContact?: string;
  communityName: string;
  category: FeedbackCategory;
  priority: FeedbackPriority;
  status: FeedbackStatus;
  subject: string;
  details: string;
  assignedOfficer: string;
  submissionDate: string;
  targetResolutionDate: string;
  resolutionNotes?: string;
}

export interface Donor {
  id: string;
  name: string;
  organizationType: 'Foundation' | 'Institutional / UN' | 'Bilateral' | 'Diaspora Network' | 'Private Philanthropy';
  country: string;
  focalPerson: string;
  email: string;
  totalCommittedUSD: number;
  totalDisbursedUSD: number;
  fundedProjects: string[];
  partnershipStage: 'Prospect' | 'Active Grantee' | 'Strategic Partner';
  nextReportingDeadline: string;
}

export interface Partner {
  id: string;
  name: string;
  type: 'Refugee-Led Organization (RLO)' | 'Local CBO' | 'Government Liaison' | 'Technical / Academic';
  country: string;
  settlement: string;
  primaryContact: string;
  email: string;
  mouStatus: 'Signed Active' | 'Under Review' | 'Drafting';
  jointInitiatives: string[];
}

export interface Volunteer {
  id: string;
  name: string;
  gender: 'Female' | 'Male';
  community: string;
  role: string;
  pillarInterest: ProgramPillar;
  skills: string[];
  availability: 'Full-time' | 'Part-time' | 'On-call Emergency';
  status: 'Active' | 'In Training' | 'Applicant';
  hoursLogged: number;
  joinDate: string;
}

export interface MealIndicator {
  id: string;
  code: string;
  pillar: ProgramPillar;
  indicatorText: string;
  targetValue: number;
  actualAchieved: number;
  unit: string;
  frequency: 'Monthly' | 'Quarterly' | 'Annual';
  meansOfVerification: string;
  lastUpdated: string;
}

export interface DocumentRecord {
  id: string;
  title: string;
  category: 'Policy & Governance' | 'Safeguarding' | 'Financial & Audit' | 'M&E Report' | 'Project Brief';
  version: string;
  approvedBy: string;
  isPubliclyDisclosed: boolean;
  fileSize: string;
  lastUpdated: string;
  summary: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  userName: string;
  userRole: UserRole;
  action: string;
  module: string;
  recordIdentifier: string;
  details: string;
  ipAddress: string;
}

export interface CMSContent {
  headlineEn: string;
  headlineAr: string;
  heroSubEn: string;
  heroSubAr: string;
  statCommunities: number;
  statPeopleSupported: number;
  statFemaleLeadershipPct: number;
  statWaterDailyLitres: number;
  statYouthCertified: number;
  emergencyAlert: {
    active: boolean;
    textEn: string;
    textAr: string;
  };
  contactEmail: string;
  contactPhone: string;
  primaryOffice: string;
}

export type PublicPageId =
  | 'home'
  | 'about'
  | 'programs'
  | 'wash'
  | 'livelihoods'
  | 'energy'
  | 'education'
  | 'ssh_lab'
  | 'map'
  | 'meal'
  | 'governance'
  | 'partnerships'
  | 'contact';

export interface SocialMediaChannel {
  id: string;
  platform: 'x_twitter' | 'linkedin' | 'facebook' | 'youtube' | 'instagram' | 'whatsapp' | 'telegram' | 'github';
  name: string;
  handle: string;
  url: string;
  enabled: boolean;
  verified: boolean;
  followersOrMembers: string;
  purpose: string;
  isEmergencyChannel?: boolean;
}

export interface HeaderSubMenuItem {
  id: string;
  labelEn: string;
  labelAr: string;
  subtextEn?: string;
  subtextAr?: string;
  page: PublicPageId;
  hash?: string;
  externalUrl?: string;
  badge?: string;
  badgeColor?: 'blue' | 'green' | 'gold' | 'red' | 'purple' | 'slate';
  iconName?: string;
  enabled: boolean;
  order: number;
}

export interface HeaderNavItem {
  id: string;
  labelEn: string;
  labelAr: string;
  page?: PublicPageId;
  hash?: string;
  externalUrl?: string;
  enabled: boolean;
  order: number;
  highlight?: boolean;
  badge?: string;
  badgeColor?: 'blue' | 'green' | 'gold' | 'red' | 'purple' | 'slate';
  subItems?: HeaderSubMenuItem[];
}

export interface HeaderCmsConfig {
  topBarEnabled: boolean;
  topBarTextEn: string;
  topBarTextAr: string;
  topBarLinkAction: 'feedback' | 'donate' | 'contact' | 'custom';
  topBarCustomUrl?: string;
  showThemeCycler: boolean;
  showLanguageSwitcher: boolean;
  showPortalButton: boolean;
  portalButtonTextEn: string;
  portalButtonTextAr: string;
  showCtaButton: boolean;
  ctaButtonTextEn: string;
  ctaButtonTextAr: string;
  ctaButtonAction: 'donate' | 'contact' | 'feedback' | 'custom';
  ctaCustomUrl?: string;
  navItems: HeaderNavItem[];
}

