import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import MobileBottomNav from '../../components/ui/MobileBottomNav';
import Icon from '../../components/AppIcon';
import PersonalProfileSection from './components/PersonalProfileSection';
import SecuritySection from './components/SecuritySection';
import NotificationsSection from './components/NotificationsSection';
import DocumentsSection from './components/DocumentsSection';
import PaymentMethodsSection from './components/PaymentMethodsSection';
import PrivacySection from './components/PrivacySection';

const AccountSettings = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profil Personnel', icon: 'User' },
    { id: 'security', label: 'Sécurité', icon: 'Lock' },
    { id: 'notifications', label: 'Notifications', icon: 'Bell' },
    { id: 'documents', label: 'Documents', icon: 'FileText' },
    { id: 'payment', label: 'Paiements', icon: 'CreditCard' },
    { id: 'privacy', label: 'Confidentialité', icon: 'Shield' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <PersonalProfileSection />;
      case 'security':
        return <SecuritySection />;
      case 'notifications':
        return <NotificationsSection />;
      case 'documents':
        return <DocumentsSection />;
      case 'payment':
        return <PaymentMethodsSection />;
      case 'privacy':
        return <PrivacySection />;
      default:
        return <PersonalProfileSection />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="content-wrapper">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground">
              Mon Compte
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-3">
              <div className="bg-card border border-border rounded-xl p-4 sticky top-24">
                <nav className="space-y-1">
                  {tabs?.map((tab) => (
                    <button
                      key={tab?.id}
                      onClick={() => setActiveTab(tab?.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                        activeTab === tab?.id
                          ? 'bg-primary/10 text-primary font-medium' :'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                      }`}
                    >
                      <Icon name={tab?.icon} size={20} />
                      <span className="text-sm">{tab?.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            <div className="lg:col-span-9">
              <div className="lg:hidden mb-6">
                <div className="bg-card border border-border rounded-xl p-2">
                  <div className="grid grid-cols-3 gap-2">
                    {tabs?.map((tab) => (
                      <button
                        key={tab?.id}
                        onClick={() => setActiveTab(tab?.id)}
                        className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all ${
                          activeTab === tab?.id
                            ? 'bg-primary/10 text-primary' :'text-muted-foreground'
                        }`}
                      >
                        <Icon name={tab?.icon} size={20} />
                        <span className="text-xs font-medium text-center leading-tight">
                          {tab?.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {renderTabContent()}
            </div>
          </div>
        </div>
      </main>
      <MobileBottomNav />
    </div>
  );
};

export default AccountSettings;