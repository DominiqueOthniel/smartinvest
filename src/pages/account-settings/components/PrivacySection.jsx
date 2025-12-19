import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';

const PrivacySection = () => {
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: true,
    investmentHistory: false,
    portfolioSharing: false,
    activityTracking: true,
    analyticsData: true,
    thirdPartySharing: false,
    marketingCommunications: false,
    researchParticipation: true
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);

  const handleToggle = (key) => {
    setPrivacySettings(prev => ({ ...prev, [key]: !prev?.[key] }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    setTimeout(() => {
      setIsSaving(false);
    }, 1500);
  };

  const handleExportData = () => {
    console.log('Exporting user data...');
  };

  const handleDeleteAccount = () => {
    setIsDeletingAccount(true);
    
    setTimeout(() => {
      setIsDeletingAccount(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-xl p-6 lg:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon name="Eye" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Visibilité du profil</h3>
            <p className="text-sm text-muted-foreground">Contrôlez qui peut voir vos informations</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start justify-between p-4 bg-muted/50 rounded-lg">
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-foreground mb-1">Profil public</h4>
              <p className="text-sm text-muted-foreground">
                Permettre aux autres investisseurs de voir votre profil de base
              </p>
            </div>
            <Checkbox
              checked={privacySettings?.profileVisibility}
              onChange={() => handleToggle('profileVisibility')}
              className="mt-1"
            />
          </div>

          <div className="flex items-start justify-between p-4 bg-muted/50 rounded-lg">
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-foreground mb-1">Historique d'investissement</h4>
              <p className="text-sm text-muted-foreground">
                Afficher vos investissements passés sur votre profil public
              </p>
            </div>
            <Checkbox
              checked={privacySettings?.investmentHistory}
              onChange={() => handleToggle('investmentHistory')}
              className="mt-1"
            />
          </div>

          <div className="flex items-start justify-between p-4 bg-muted/50 rounded-lg">
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-foreground mb-1">Partage de portefeuille</h4>
              <p className="text-sm text-muted-foreground">
                Permettre le partage de statistiques anonymisées de votre portefeuille
              </p>
            </div>
            <Checkbox
              checked={privacySettings?.portfolioSharing}
              onChange={() => handleToggle('portfolioSharing')}
              className="mt-1"
            />
          </div>
        </div>
      </div>
      <div className="bg-card border border-border rounded-xl p-6 lg:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon name="Database" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Utilisation des données</h3>
            <p className="text-sm text-muted-foreground">Gérez comment vos données sont utilisées</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start justify-between p-4 bg-muted/50 rounded-lg">
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-foreground mb-1">Suivi d'activité</h4>
              <p className="text-sm text-muted-foreground">
                Permettre le suivi de votre activité pour améliorer votre expérience
              </p>
            </div>
            <Checkbox
              checked={privacySettings?.activityTracking}
              onChange={() => handleToggle('activityTracking')}
              className="mt-1"
            />
          </div>

          <div className="flex items-start justify-between p-4 bg-muted/50 rounded-lg">
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-foreground mb-1">Données analytiques</h4>
              <p className="text-sm text-muted-foreground">
                Partager des données anonymisées pour l'analyse et l'amélioration de la plateforme
              </p>
            </div>
            <Checkbox
              checked={privacySettings?.analyticsData}
              onChange={() => handleToggle('analyticsData')}
              className="mt-1"
            />
          </div>

          <div className="flex items-start justify-between p-4 bg-muted/50 rounded-lg">
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-foreground mb-1">Partage avec des tiers</h4>
              <p className="text-sm text-muted-foreground">
                Autoriser le partage de données avec des partenaires de confiance
              </p>
            </div>
            <Checkbox
              checked={privacySettings?.thirdPartySharing}
              onChange={() => handleToggle('thirdPartySharing')}
              className="mt-1"
            />
          </div>
        </div>
      </div>
      <div className="bg-card border border-border rounded-xl p-6 lg:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon name="Mail" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Communications marketing</h3>
            <p className="text-sm text-muted-foreground">Gérez vos préférences de communication</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start justify-between p-4 bg-muted/50 rounded-lg">
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-foreground mb-1">Communications marketing</h4>
              <p className="text-sm text-muted-foreground">
                Recevoir des offres promotionnelles et des conseils d'investissement
              </p>
            </div>
            <Checkbox
              checked={privacySettings?.marketingCommunications}
              onChange={() => handleToggle('marketingCommunications')}
              className="mt-1"
            />
          </div>

          <div className="flex items-start justify-between p-4 bg-muted/50 rounded-lg">
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-foreground mb-1">Participation à la recherche</h4>
              <p className="text-sm text-muted-foreground">
                Être contacté pour des enquêtes et études de marché
              </p>
            </div>
            <Checkbox
              checked={privacySettings?.researchParticipation}
              onChange={() => handleToggle('researchParticipation')}
              className="mt-1"
            />
          </div>
        </div>
      </div>
      <div className="bg-card border border-border rounded-xl p-6 lg:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon name="Download" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Vos données</h3>
            <p className="text-sm text-muted-foreground">Exportez ou supprimez vos données personnelles</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-1">Exporter mes données</h4>
                <p className="text-sm text-muted-foreground">
                  Téléchargez une copie de toutes vos données personnelles
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              iconPosition="left"
              onClick={handleExportData}
            >
              Exporter les données
            </Button>
          </div>

          <div className="p-4 bg-error/5 border border-error/20 rounded-lg">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="text-sm font-semibold text-error mb-1">Supprimer mon compte</h4>
                <p className="text-sm text-muted-foreground">
                  Suppression permanente de votre compte et de toutes vos données. Cette action est irréversible.
                </p>
              </div>
            </div>
            <Button
              variant="destructive"
              size="sm"
              iconName="Trash2"
              iconPosition="left"
              loading={isDeletingAccount}
              onClick={handleDeleteAccount}
            >
              Supprimer le compte
            </Button>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end">
        <Button
          variant="default"
          loading={isSaving}
          iconName="Save"
          iconPosition="left"
          onClick={handleSave}
        >
          Enregistrer les préférences
        </Button>
      </div>
    </div>
  );
};

export default PrivacySection;