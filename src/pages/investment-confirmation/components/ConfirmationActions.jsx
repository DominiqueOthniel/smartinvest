import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ConfirmationActions = ({ 
  isAgreementsComplete = false,
  investmentAmount = 50000,
  currency = "CFA"
}) => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleConfirmInvestment = async () => {
    if (!isAgreementsComplete) {
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccessModal(true);
      
      // Redirect after success
      setTimeout(() => {
        navigate('/investment-dashboard');
      }, 3000);
    }, 2500);
  };

  const handleCancel = () => {
    navigate('/project-details');
  };

  return (
    <>
      <div className="bg-card border border-border rounded-xl p-6 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-1">Finaliser l'Investissement</h3>
            <p className="text-sm text-muted-foreground">Vérifiez tous les détails avant de confirmer</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground mb-1">Montant Total</p>
            <p className="text-2xl font-bold text-primary font-data">
              {investmentAmount?.toLocaleString('fr-FR')} {currency}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
            <Icon name="Clock" size={18} color="var(--color-muted-foreground)" />
            <div>
              <p className="text-sm font-semibold text-foreground mb-1">Traitement Rapide</p>
              <p className="text-xs text-muted-foreground">
                Votre investissement sera confirmé dans les 2-3 minutes après validation du paiement.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
            <Icon name="Bell" size={18} color="var(--color-muted-foreground)" />
            <div>
              <p className="text-sm font-semibold text-foreground mb-1">Notifications</p>
              <p className="text-xs text-muted-foreground">
                Vous recevrez une confirmation par email et SMS avec les détails de votre investissement.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
          <Button
            variant="outline"
            size="lg"
            fullWidth
            iconName="ArrowLeft"
            iconPosition="left"
            onClick={handleCancel}
            disabled={isProcessing}
          >
            Annuler
          </Button>
          <Button
            variant="default"
            size="lg"
            fullWidth
            iconName="CheckCircle2"
            iconPosition="right"
            onClick={handleConfirmInvestment}
            disabled={!isAgreementsComplete || isProcessing}
            loading={isProcessing}
          >
            {isProcessing ? 'Traitement en cours...' : 'Confirmer l\'Investissement'}
          </Button>
        </div>

        {!isAgreementsComplete && (
          <div className="flex items-start gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <Icon name="AlertCircle" size={18} color="var(--color-destructive)" />
            <p className="text-xs text-destructive">
              Veuillez accepter tous les accords requis avant de confirmer votre investissement.
            </p>
          </div>
        )}
      </div>
      {showSuccessModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-xl p-8 max-w-md w-full text-center space-y-6 animate-in fade-in zoom-in duration-300">
            <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto">
              <Icon name="CheckCircle2" size={48} color="var(--color-success)" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Investissement Confirmé !</h3>
              <p className="text-sm text-muted-foreground">
                Votre investissement de {investmentAmount?.toLocaleString('fr-FR')} {currency} a été traité avec succès.
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Icon name="Mail" size={16} />
                <span>Confirmation envoyée par email</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Icon name="MessageSquare" size={16} />
                <span>Notification SMS envoyée</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Redirection vers votre tableau de bord...
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmationActions;