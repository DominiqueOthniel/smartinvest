import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import MobileBottomNav from '../../components/ui/MobileBottomNav';
import CommunityChat from '../../components/ui/CommunityChat';

const CommunityChatPageComponent = () => {
  return (
    <>
      <Helmet>
        <title>Chat Communautaire - SmartInvest Africa</title>
        <meta name="description" content="Rejoignez la communauté d'investisseurs SmartInvest Africa et échangez avec d'autres investisseurs" />
      </Helmet>
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        
        <main className="flex-1 content-wrapper" style={{ marginTop: '64px', padding: 0 }}>
          <div className="max-w-4xl mx-auto h-[calc(100vh-64px-72px)] md:h-[calc(100vh-64px)]">
            <CommunityChat />
          </div>
        </main>

        <MobileBottomNav />
      </div>
    </>
  );
};

const CommunityChatPage = CommunityChatPageComponent;

export default CommunityChatPage;

