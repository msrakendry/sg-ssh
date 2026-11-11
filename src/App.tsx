import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { PublicNavbar } from './components/public/PublicNavbar';
import { HeroSection } from './components/public/HeroSection';
import { ImpactSection } from './components/public/ImpactSection';
import { ProgramsSection } from './components/public/ProgramsSection';
import { SshLabSection } from './components/public/SshLabSection';
import { InteractiveMapSection } from './components/public/InteractiveMapSection';
import { AboutSection } from './components/public/AboutSection';
import { GovernanceSection } from './components/public/GovernanceSection';
import { ContactSection } from './components/public/ContactSection';
import { Footer } from './components/public/Footer';

// Full Page Components
import { HomePage } from './components/public/pages/HomePage';
import { AboutPage } from './components/public/pages/AboutPage';
import { ProgramsPage } from './components/public/pages/ProgramsPage';
import { WashPillarPage } from './components/public/pages/WashPillarPage';
import { LivelihoodsPillarPage } from './components/public/pages/LivelihoodsPillarPage';
import { EnergyPillarPage } from './components/public/pages/EnergyPillarPage';
import { EducationPillarPage } from './components/public/pages/EducationPillarPage';
import { SshLabPage } from './components/public/pages/SshLabPage';
import { FieldMapPage } from './components/public/pages/FieldMapPage';
import { MealPage } from './components/public/pages/MealPage';
import { GovernancePage } from './components/public/pages/GovernancePage';
import { PartnershipsPage } from './components/public/pages/PartnershipsPage';
import { ContactPage } from './components/public/pages/ContactPage';

// Modals
import { DonateModal } from './components/public/DonateModal';
import { FeedbackSubmitModal } from './components/public/FeedbackSubmitModal';
import { ProgramDetailModal } from './components/public/ProgramDetailModal';
import { SocialManageModal } from './components/public/SocialManageModal';
import { HeaderCmsModal } from './components/public/HeaderCmsModal';

// Dashboard Components
import { DashboardHeader } from './components/dashboard/DashboardHeader';
import { DashboardSidebar } from './components/dashboard/DashboardSidebar';
import { ExecutiveOverview } from './components/dashboard/ExecutiveOverview';
import { ProjectsManager } from './components/dashboard/ProjectsManager';
import { CommunitiesManager } from './components/dashboard/CommunitiesManager';
import { GISMapViewer } from './components/dashboard/GISMapViewer';
import { BeneficiaryRegistry } from './components/dashboard/BeneficiaryRegistry';
import { EngagementsManager } from './components/dashboard/EngagementsManager';
import { FeedbackTriage } from './components/dashboard/FeedbackTriage';
import { DonorsPartnersManager } from './components/dashboard/DonorsPartnersManager';
import { VolunteersManager } from './components/dashboard/VolunteersManager';
import { MEALManager } from './components/dashboard/MEALManager';
import { DocumentsManager } from './components/dashboard/DocumentsManager';
import { CMSManager } from './components/dashboard/CMSManager';
import { AuditLogViewer } from './components/dashboard/AuditLogViewer';
import { ArchitectureBlueprint } from './components/dashboard/ArchitectureBlueprint';
import { ThemeManager } from './components/dashboard/ThemeManager';
import { HeaderCmsManager } from './components/dashboard/HeaderCmsManager';

const MainLayout: React.FC = () => {
  const { currentView, dashboardTab, publicPage } = useApp();

  return (
    <div className="min-h-screen bg-stone-950 font-sans text-stone-100 flex flex-col">
      {currentView === 'public' ? (
        <>
          <PublicNavbar />
          <main className="flex-1">
            {publicPage === 'home' && <HomePage />}
            {publicPage === 'about' && <AboutPage />}
            {publicPage === 'programs' && <ProgramsPage />}
            {publicPage === 'wash' && <WashPillarPage />}
            {publicPage === 'livelihoods' && <LivelihoodsPillarPage />}
            {publicPage === 'energy' && <EnergyPillarPage />}
            {publicPage === 'education' && <EducationPillarPage />}
            {publicPage === 'ssh_lab' && <SshLabPage />}
            {publicPage === 'map' && <FieldMapPage />}
            {publicPage === 'meal' && <MealPage />}
            {publicPage === 'governance' && <GovernancePage />}
            {publicPage === 'partnerships' && <PartnershipsPage />}
            {publicPage === 'contact' && <ContactPage />}
          </main>
          <Footer />
        </>
      ) : (
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          <DashboardHeader />
          <div className="flex-1 flex overflow-hidden">
            <DashboardSidebar />
            <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-stone-950">
              <div className="max-w-7xl mx-auto">
                {dashboardTab === 'overview' && <ExecutiveOverview />}
                {dashboardTab === 'projects' && <ProjectsManager />}
                {dashboardTab === 'communities' && <CommunitiesManager />}
                {dashboardTab === 'gis_map' && <GISMapViewer />}
                {dashboardTab === 'beneficiaries' && <BeneficiaryRegistry />}
                {dashboardTab === 'engagements' && <EngagementsManager />}
                {dashboardTab === 'feedback' && <FeedbackTriage />}
                {dashboardTab === 'donors_partners' && <DonorsPartnersManager />}
                {dashboardTab === 'volunteers' && <VolunteersManager />}
                {dashboardTab === 'meal' && <MEALManager />}
                {dashboardTab === 'documents' && <DocumentsManager />}
                {dashboardTab === 'cms' && <CMSManager />}
                {dashboardTab === 'header_cms' && <HeaderCmsManager />}
                {dashboardTab === 'theme' && <ThemeManager />}
                {dashboardTab === 'audit_logs' && <AuditLogViewer />}
                {dashboardTab === 'architecture' && <ArchitectureBlueprint />}
              </div>
            </main>
          </div>
        </div>
      )}

      {/* Global Interactive Modals */}
      <DonateModal />
      <FeedbackSubmitModal />
      <ProgramDetailModal />
      <SocialManageModal />
      <HeaderCmsModal />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}

export default App;
