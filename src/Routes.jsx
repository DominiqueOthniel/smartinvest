import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import InvestmentHistory from './pages/investment-history';
import AccountSettings from './pages/account-settings';
import InvestmentDashboard from './pages/investment-dashboard';
import InvestmentConfirmation from './pages/investment-confirmation';
import ProjectDetails from './pages/project-details';
import InvestmentOpportunities from './pages/investment-opportunity';
import CommunityChatPage from './pages/community-chat';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<InvestmentOpportunities />} />
        <Route path="/investment-history" element={<InvestmentHistory />} />
        <Route path="/account-settings" element={<AccountSettings />} />
        <Route path="/investment-dashboard" element={<InvestmentDashboard />} />
        <Route path="/investment-confirmation" element={<InvestmentConfirmation />} />
        <Route path="/project-details" element={<ProjectDetails />} />
        <Route path="/investment-opportunities" element={<InvestmentOpportunities />} />
        <Route path="/community-chat" element={<CommunityChatPage />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
