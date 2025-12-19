import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';

const SecuritySection = () => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordErrors, setPasswordErrors] = useState({});
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const loginHistory = [
    {
      id: 1,
      device: "Chrome sur Windows",
      location: "Abidjan, Côte d'Ivoire",
      ipAddress: "41.202.xxx.xxx",
      timestamp: "19/12/2025 à 09:45",
      status: "success"
    },
    {
      id: 2,
      device: "Safari sur iPhone",
      location: "Abidjan, Côte d'Ivoire",
      ipAddress: "41.202.xxx.xxx",
      timestamp: "18/12/2025 à 18:30",
      status: "success"
    },
    {
      id: 3,
      device: "Firefox sur Windows",
      location: "Dakar, Sénégal",
      ipAddress: "41.82.xxx.xxx",
      timestamp: "17/12/2025 à 14:20",
      status: "failed"
    },
    {
      id: 4,
      device: "Chrome sur Android",
      location: "Abidjan, Côte d'Ivoire",
      ipAddress: "41.202.xxx.xxx",
      timestamp: "16/12/2025 à 22:15",
      status: "success"
    }
  ];

  const activeDevices = [
    {
      id: 1,
      device: "Chrome sur Windows",
      location: "Abidjan, Côte d'Ivoire",
      lastActive: "Actif maintenant",
      isCurrent: true
    },
    {
      id: 2,
      device: "Safari sur iPhone 13",
      location: "Abidjan, Côte d'Ivoire",
      lastActive: "Il y a 2 heures",
      isCurrent: false
    }
  ];

  const handlePasswordInputChange = (e) => {
    const { name, value } = e?.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
    if (passwordErrors?.[name]) {
      setPasswordErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validatePasswordForm = () => {
    const newErrors = {};

    if (!passwordData?.currentPassword) {
      newErrors.currentPassword = 'Le mot de passe actuel est requis';
    }

    if (!passwordData?.newPassword) {
      newErrors.newPassword = 'Le nouveau mot de passe est requis';
    } else if (passwordData?.newPassword?.length < 8) {
      newErrors.newPassword = 'Le mot de passe doit contenir au moins 8 caractères';
    }

    if (!passwordData?.confirmPassword) {
      newErrors.confirmPassword = 'Veuillez confirmer le nouveau mot de passe';
    } else if (passwordData?.newPassword !== passwordData?.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }

    setPasswordErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handlePasswordChange = async () => {
    if (!validatePasswordForm()) {
      return;
    }

    setIsChangingPassword(true);

    setTimeout(() => {
      setIsChangingPassword(false);
      setShowPasswordForm(false);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    }, 1500);
  };

  const handleToggle2FA = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
  };

  const handleRevokeDevice = (deviceId) => {
    console.log('Revoking device:', deviceId);
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-xl p-6 lg:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon name="Lock" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Mot de passe</h3>
            <p className="text-sm text-muted-foreground">Modifiez votre mot de passe de connexion</p>
          </div>
        </div>

        {!showPasswordForm ? (
          <Button
            variant="outline"
            iconName="Key"
            iconPosition="left"
            onClick={() => setShowPasswordForm(true)}
          >
            Changer le mot de passe
          </Button>
        ) : (
          <div className="space-y-4">
            <Input
              label="Mot de passe actuel"
              type="password"
              name="currentPassword"
              value={passwordData?.currentPassword}
              onChange={handlePasswordInputChange}
              error={passwordErrors?.currentPassword}
              required
            />

            <Input
              label="Nouveau mot de passe"
              type="password"
              name="newPassword"
              value={passwordData?.newPassword}
              onChange={handlePasswordInputChange}
              error={passwordErrors?.newPassword}
              description="Minimum 8 caractères avec lettres et chiffres"
              required
            />

            <Input
              label="Confirmer le nouveau mot de passe"
              type="password"
              name="confirmPassword"
              value={passwordData?.confirmPassword}
              onChange={handlePasswordInputChange}
              error={passwordErrors?.confirmPassword}
              required
            />

            <div className="flex items-center gap-3 pt-2">
              <Button
                variant="default"
                loading={isChangingPassword}
                iconName="Save"
                iconPosition="left"
                onClick={handlePasswordChange}
              >
                Enregistrer
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowPasswordForm(false);
                  setPasswordData({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                  });
                  setPasswordErrors({});
                }}
                disabled={isChangingPassword}
              >
                Annuler
              </Button>
            </div>
          </div>
        )}
      </div>
      <div className="bg-card border border-border rounded-xl p-6 lg:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon name="Shield" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Authentification à deux facteurs</h3>
            <p className="text-sm text-muted-foreground">Ajoutez une couche de sécurité supplémentaire</p>
          </div>
        </div>

        <div className="flex items-start justify-between p-4 bg-muted/50 rounded-lg">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h4 className="text-sm font-semibold text-foreground">Authentification 2FA</h4>
              {twoFactorEnabled && (
                <span className="px-2 py-0.5 text-xs font-medium bg-success/10 text-success rounded">
                  Activé
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              {twoFactorEnabled 
                ? "Votre compte est protégé par l'authentification à deux facteurs"
                : "Activez l'authentification à deux facteurs pour sécuriser votre compte"}
            </p>
          </div>
          <Checkbox
            checked={twoFactorEnabled}
            onChange={(e) => handleToggle2FA()}
            className="mt-1"
          />
        </div>
      </div>
      <div className="bg-card border border-border rounded-xl p-6 lg:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon name="Smartphone" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Appareils connectés</h3>
            <p className="text-sm text-muted-foreground">Gérez les appareils ayant accès à votre compte</p>
          </div>
        </div>

        <div className="space-y-3">
          {activeDevices?.map((device) => (
            <div
              key={device?.id}
              className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center">
                  <Icon name="Monitor" size={20} color="var(--color-muted-foreground)" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm font-semibold text-foreground">{device?.device}</h4>
                    {device?.isCurrent && (
                      <span className="px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded">
                        Cet appareil
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{device?.location}</p>
                  <p className="text-xs text-muted-foreground mt-1">{device?.lastActive}</p>
                </div>
              </div>
              {!device?.isCurrent && (
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="X"
                  onClick={() => handleRevokeDevice(device?.id)}
                >
                  Révoquer
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="bg-card border border-border rounded-xl p-6 lg:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon name="History" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Historique de connexion</h3>
            <p className="text-sm text-muted-foreground">Consultez l'activité récente de votre compte</p>
          </div>
        </div>

        <div className="space-y-3">
          {loginHistory?.map((entry) => (
            <div
              key={entry?.id}
              className="flex items-start justify-between p-4 bg-muted/50 rounded-lg"
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  entry?.status === 'success' ? 'bg-success/10' : 'bg-error/10'
                }`}>
                  <Icon 
                    name={entry?.status === 'success' ? 'CheckCircle' : 'XCircle'} 
                    size={20} 
                    color={entry?.status === 'success' ? 'var(--color-success)' : 'var(--color-error)'} 
                  />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-1">{entry?.device}</h4>
                  <p className="text-xs text-muted-foreground">{entry?.location}</p>
                  <p className="text-xs text-muted-foreground mt-1">IP: {entry?.ipAddress}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">{entry?.timestamp}</p>
                <span className={`inline-block mt-1 px-2 py-0.5 text-xs font-medium rounded ${
                  entry?.status === 'success' ?'bg-success/10 text-success' :'bg-error/10 text-error'
                }`}>
                  {entry?.status === 'success' ? 'Réussi' : 'Échoué'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SecuritySection;