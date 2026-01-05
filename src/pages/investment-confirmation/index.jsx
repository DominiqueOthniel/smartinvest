import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import MobileBottomNav from '../../components/ui/MobileBottomNav';
import InvestmentSummaryCard from './components/InvestmentSummaryCard';
import PaymentMethodSection from './components/PaymentMethodSection';
import ConfirmationActions from './components/ConfirmationActions';
import Icon from '../../components/AppIcon';

const InvestmentConfirmation = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');
  const [isAgreementsComplete, setIsAgreementsComplete] = useState(false);

  const investmentData = {
    projectName: "Résidence Luxe Abidjan",
    investmentAmount: 50000,
    shareQuantity: 10,
    sharePrice: 5000,
    estimatedReturn: 15,
    processingFee: 500,
    currency: "CFA"
  };

  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethod(method);
  };

  const handleAgreementChange = (allComplete) => {
    setIsAgreementsComplete(allComplete);
  };

  return (
    <>
      <Helmet>
        <title>Confirmation d'Investissement - SmartInvest Africa</title>
        <meta name="description" content="Confirmez votre investissement de manière sécurisée sur SmartInvest Africa. Paiement crypté SSL et conforme aux régulations BCEAO." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />

        <main className="content-wrapper">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Icon name="ShieldCheck" size={28} color="var(--color-primary)" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-1">Confirmation d'Investissement</h1>
                <p className="text-base text-muted-foreground">
                  Vérifiez les détails et finalisez votre investissement en toute sécurité
                </p>
              </div>
            </div>


            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <InvestmentSummaryCard {...investmentData} />
                
                <PaymentMethodSection onPaymentMethodChange={handlePaymentMethodChange} />
              </div>

              <div className="space-y-6">
                <div className="lg:sticky lg:top-24 space-y-6">
                  <ConfirmationActions 
                    isAgreementsComplete={true}
                    investmentAmount={investmentData?.investmentAmount + investmentData?.processingFee}
                    currency={investmentData?.currency}
                  />

                  <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <Icon name="HelpCircle" size={20} color="var(--color-primary)" />
                      <h3 className="text-base font-semibold text-foreground">Besoin d'Aide ?</h3>
                    </div>
                    
                    <div className="space-y-3">
                      <a 
                        href="mailto:support@smartinvest.africa" 
                        className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors group"
                      >
                        <Icon name="Mail" size={18} color="var(--color-muted-foreground)" />
                        <div>
                          <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                            Email Support
                          </p>
                          <p className="text-xs text-muted-foreground">support@smartinvest.africa</p>
                        </div>
                      </a>

                      <a 
                        href="tel:+2250707070707" 
                        className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors group"
                      >
                        <Icon name="Phone" size={18} color="var(--color-muted-foreground)" />
                        <div>
                          <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                            Téléphone
                          </p>
                          <p className="text-xs text-muted-foreground">+225 07 07 07 07 07</p>
                        </div>
                      </a>

                      <a 
                        href="https://wa.me/2250707070707" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors group"
                      >
                        <Icon name="MessageCircle" size={18} color="var(--color-muted-foreground)" />
                        <div>
                          <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                            WhatsApp
                          </p>
                          <p className="text-xs text-muted-foreground">Chat en direct</p>
                        </div>
                      </a>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <p className="text-xs text-muted-foreground text-center">
                        Support disponible 24/7
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-start gap-4">
                <Icon name="Shield" size={24} color="var(--color-success)" />
                <div>
                  <h3 className="text-base font-semibold text-foreground mb-2">Garantie de Sécurité</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    SmartInvest Africa s'engage à protéger vos investissements et vos données personnelles. 
                    Nous sommes conformes aux régulations de la BCEAO et nos processus sont régulièrement audités.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2">
                      <Icon name="CheckCircle2" size={16} color="var(--color-success)" />
                      <span className="text-xs text-muted-foreground">Cryptage SSL 256-bit</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="CheckCircle2" size={16} color="var(--color-success)" />
                      <span className="text-xs text-muted-foreground">Conformité PCI DSS</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="CheckCircle2" size={16} color="var(--color-success)" />
                      <span className="text-xs text-muted-foreground">Audits réguliers</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <MobileBottomNav />
      </div>
    </>
  );
};

export default InvestmentConfirmation;