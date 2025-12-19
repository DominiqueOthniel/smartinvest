import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const NotificationsSection = () => {
  const [emailNotifications, setEmailNotifications] = useState({
    newOpportunities: true,
    projectUpdates: true,
    investmentConfirmations: true,
    monthlyReports: true,
    marketingEmails: false,
    securityAlerts: true
  });

  const [pushNotifications, setPushNotifications] = useState({
    newOpportunities: true,
    projectMilestones: true,
    paymentReminders: true,
    accountActivity: true
  });

  const [smsNotifications, setSmsNotifications] = useState({
    criticalAlerts: true,
    paymentConfirmations: true,
    securityAlerts: true
  });

  const [emailFrequency, setEmailFrequency] = useState('daily');
  const [isSaving, setIsSaving] = useState(false);

  const frequencyOptions = [
    { value: 'realtime', label: 'En temps réel', description: 'Recevoir les notifications immédiatement' },
    { value: 'daily', label: 'Quotidien', description: 'Un résumé quotidien des notifications' },
    { value: 'weekly', label: 'Hebdomadaire', description: 'Un résumé hebdomadaire' },
    { value: 'never', label: 'Jamais', description: 'Désactiver toutes les notifications par email' }
  ];

  const handleEmailToggle = (key) => {
    setEmailNotifications(prev => ({ ...prev, [key]: !prev?.[key] }));
  };

  const handlePushToggle = (key) => {
    setPushNotifications(prev => ({ ...prev, [key]: !prev?.[key] }));
  };

  const handleSmsToggle = (key) => {
    setSmsNotifications(prev => ({ ...prev, [key]: !prev?.[key] }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    setTimeout(() => {
      setIsSaving(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-xl p-6 lg:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon name="Mail" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Notifications par email</h3>
            <p className="text-sm text-muted-foreground">Choisissez les emails que vous souhaitez recevoir</p>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-start justify-between p-4 bg-muted/50 rounded-lg">
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-foreground mb-1">Nouvelles opportunités</h4>
              <p className="text-sm text-muted-foreground">
                Recevez des alertes sur les nouveaux projets d'investissement
              </p>
            </div>
            <Checkbox
              checked={emailNotifications?.newOpportunities}
              onChange={() => handleEmailToggle('newOpportunities')}
              className="mt-1"
            />
          </div>

          <div className="flex items-start justify-between p-4 bg-muted/50 rounded-lg">
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-foreground mb-1">Mises à jour de projets</h4>
              <p className="text-sm text-muted-foreground">
                Notifications sur l'avancement de vos investissements
              </p>
            </div>
            <Checkbox
              checked={emailNotifications?.projectUpdates}
              onChange={() => handleEmailToggle('projectUpdates')}
              className="mt-1"
            />
          </div>

          <div className="flex items-start justify-between p-4 bg-muted/50 rounded-lg">
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-foreground mb-1">Confirmations d'investissement</h4>
              <p className="text-sm text-muted-foreground">
                Reçus et confirmations de vos transactions
              </p>
            </div>
            <Checkbox
              checked={emailNotifications?.investmentConfirmations}
              onChange={() => handleEmailToggle('investmentConfirmations')}
              className="mt-1"
            />
          </div>

          <div className="flex items-start justify-between p-4 bg-muted/50 rounded-lg">
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-foreground mb-1">Rapports mensuels</h4>
              <p className="text-sm text-muted-foreground">
                Résumé mensuel de la performance de votre portefeuille
              </p>
            </div>
            <Checkbox
              checked={emailNotifications?.monthlyReports}
              onChange={() => handleEmailToggle('monthlyReports')}
              className="mt-1"
            />
          </div>

          <div className="flex items-start justify-between p-4 bg-muted/50 rounded-lg">
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-foreground mb-1">Emails marketing</h4>
              <p className="text-sm text-muted-foreground">
                Promotions, conseils d'investissement et actualités
              </p>
            </div>
            <Checkbox
              checked={emailNotifications?.marketingEmails}
              onChange={() => handleEmailToggle('marketingEmails')}
              className="mt-1"
            />
          </div>

          <div className="flex items-start justify-between p-4 bg-muted/50 rounded-lg">
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-foreground mb-1">Alertes de sécurité</h4>
              <p className="text-sm text-muted-foreground">
                Notifications importantes concernant la sécurité de votre compte
              </p>
            </div>
            <Checkbox
              checked={emailNotifications?.securityAlerts}
              onChange={() => handleEmailToggle('securityAlerts')}
              className="mt-1"
            />
          </div>
        </div>

        <Select
          label="Fréquence des emails"
          description="Choisissez à quelle fréquence vous souhaitez recevoir les notifications"
          options={frequencyOptions}
          value={emailFrequency}
          onChange={setEmailFrequency}
        />
      </div>
      <div className="bg-card border border-border rounded-xl p-6 lg:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon name="Bell" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Notifications push</h3>
            <p className="text-sm text-muted-foreground">Gérez les notifications sur votre appareil</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start justify-between p-4 bg-muted/50 rounded-lg">
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-foreground mb-1">Nouvelles opportunités</h4>
              <p className="text-sm text-muted-foreground">
                Alertes instantanées pour les nouveaux projets
              </p>
            </div>
            <Checkbox
              checked={pushNotifications?.newOpportunities}
              onChange={() => handlePushToggle('newOpportunities')}
              className="mt-1"
            />
          </div>

          <div className="flex items-start justify-between p-4 bg-muted/50 rounded-lg">
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-foreground mb-1">Jalons de projets</h4>
              <p className="text-sm text-muted-foreground">
                Notifications lorsque vos projets atteignent des étapes importantes
              </p>
            </div>
            <Checkbox
              checked={pushNotifications?.projectMilestones}
              onChange={() => handlePushToggle('projectMilestones')}
              className="mt-1"
            />
          </div>

          <div className="flex items-start justify-between p-4 bg-muted/50 rounded-lg">
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-foreground mb-1">Rappels de paiement</h4>
              <p className="text-sm text-muted-foreground">
                Rappels pour les paiements à venir ou en retard
              </p>
            </div>
            <Checkbox
              checked={pushNotifications?.paymentReminders}
              onChange={() => handlePushToggle('paymentReminders')}
              className="mt-1"
            />
          </div>

          <div className="flex items-start justify-between p-4 bg-muted/50 rounded-lg">
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-foreground mb-1">Activité du compte</h4>
              <p className="text-sm text-muted-foreground">
                Notifications sur les connexions et modifications du compte
              </p>
            </div>
            <Checkbox
              checked={pushNotifications?.accountActivity}
              onChange={() => handlePushToggle('accountActivity')}
              className="mt-1"
            />
          </div>
        </div>
      </div>
      <div className="bg-card border border-border rounded-xl p-6 lg:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon name="MessageSquare" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Notifications SMS</h3>
            <p className="text-sm text-muted-foreground">Recevez des alertes importantes par SMS</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start justify-between p-4 bg-muted/50 rounded-lg">
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-foreground mb-1">Alertes critiques</h4>
              <p className="text-sm text-muted-foreground">
                Notifications urgentes nécessitant une action immédiate
              </p>
            </div>
            <Checkbox
              checked={smsNotifications?.criticalAlerts}
              onChange={() => handleSmsToggle('criticalAlerts')}
              className="mt-1"
            />
          </div>

          <div className="flex items-start justify-between p-4 bg-muted/50 rounded-lg">
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-foreground mb-1">Confirmations de paiement</h4>
              <p className="text-sm text-muted-foreground">
                SMS de confirmation pour chaque transaction
              </p>
            </div>
            <Checkbox
              checked={smsNotifications?.paymentConfirmations}
              onChange={() => handleSmsToggle('paymentConfirmations')}
              className="mt-1"
            />
          </div>

          <div className="flex items-start justify-between p-4 bg-muted/50 rounded-lg">
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-foreground mb-1">Alertes de sécurité</h4>
              <p className="text-sm text-muted-foreground">
                SMS pour les activités de sécurité importantes
              </p>
            </div>
            <Checkbox
              checked={smsNotifications?.securityAlerts}
              onChange={() => handleSmsToggle('securityAlerts')}
              className="mt-1"
            />
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

export default NotificationsSection;