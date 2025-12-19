import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityBadgesComponent = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      title: 'Cryptage SSL 256-bit',
      description: 'Connexion sécurisée'
    },
    {
      icon: 'Lock',
      title: 'Paiement Sécurisé',
      description: 'Certifié PCI DSS'
    },
    {
      icon: 'CheckCircle2',
      title: 'Conformité BCEAO',
      description: 'Régulation bancaire'
    },
    {
      icon: 'FileCheck',
      title: 'Contrats Légaux',
      description: 'Documents vérifiés'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center gap-2 mb-6">
        <Icon name="ShieldCheck" size={24} color="var(--color-success)" />
        <h3 className="text-lg font-semibold text-foreground">Sécurité & Conformité</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {securityFeatures?.map((feature, index) => (
          <div key={index} className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center flex-shrink-0">
              <Icon name={feature?.icon} size={20} color="var(--color-success)" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground mb-0.5">{feature?.title}</p>
              <p className="text-xs text-muted-foreground">{feature?.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-start gap-3">
          <Icon name="Info" size={18} color="var(--color-primary)" />
          <div>
            <p className="text-sm font-semibold text-foreground mb-1">Protection des Investisseurs</p>
            <p className="text-xs text-muted-foreground">
              Tous les investissements sont couverts par notre garantie de sécurité et conformes aux régulations de la BCEAO. 
              Vos fonds sont protégés et vos transactions sont auditées régulièrement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const SecurityBadges = SecurityBadgesComponent;

export default SecurityBadges;
