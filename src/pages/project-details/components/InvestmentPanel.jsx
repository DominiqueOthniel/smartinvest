import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const InvestmentPanel = ({ projectData, onInvest }) => {
  const navigate = useNavigate();
  const [investmentAmount, setInvestmentAmount] = useState(projectData?.minimumInvestment);
  const [error, setError] = useState('');

  const sharePrice = projectData?.sharePrice || 10000;
  const calculatedShares = Math.floor(investmentAmount / sharePrice);
  const estimatedReturn = (investmentAmount * (projectData?.estimatedReturn / 100))?.toFixed(0);

  const handleAmountChange = (e) => {
    const value = parseInt(e?.target?.value) || 0;
    setInvestmentAmount(value);
    
    if (value < projectData?.minimumInvestment) {
      setError(`Le montant minimum est de ${projectData?.minimumInvestment?.toLocaleString('fr-FR')} CFA`);
    } else if (value > projectData?.remainingAmount) {
      setError(`Le montant maximum disponible est de ${projectData?.remainingAmount?.toLocaleString('fr-FR')} CFA`);
    } else {
      setError('');
    }
  };

  const handleInvest = () => {
    if (error) return;
    if (investmentAmount < projectData?.minimumInvestment) {
      setError(`Le montant minimum est de ${projectData?.minimumInvestment?.toLocaleString('fr-FR')} CFA`);
      return;
    }
    navigate('/investment-confirmation', { 
      state: { 
        projectData, 
        investmentAmount, 
        shares: calculatedShares 
      } 
    });
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 sticky top-20">
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-foreground mb-2">Investir dans ce Projet</h3>
          <p className="text-sm text-muted-foreground">
            Devenez actionnaire et participez au succès
          </p>
        </div>

        <div className="space-y-4">
          <Input
            label="Montant de l'Investissement (CFA)"
            type="number"
            value={investmentAmount}
            onChange={handleAmountChange}
            error={error}
            min={projectData?.minimumInvestment}
            max={projectData?.remainingAmount}
            placeholder={`Min: ${projectData?.minimumInvestment?.toLocaleString('fr-FR')}`}
          />

          <div className="bg-muted/30 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Parts acquises</span>
              <span className="text-lg font-bold text-primary font-data">{calculatedShares}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Prix par part</span>
              <span className="text-sm font-medium text-foreground font-data">
                {sharePrice?.toLocaleString('fr-FR')} CFA
              </span>
            </div>
            <div className="h-px bg-border" />
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Retour estimé (annuel)</span>
              <span className="text-lg font-bold text-success font-data">
                +{estimatedReturn?.toLocaleString('fr-FR')} CFA
              </span>
            </div>
          </div>

          <Button
            variant="default"
            fullWidth
            size="lg"
            iconName="TrendingUp"
            iconPosition="right"
            onClick={handleInvest}
            disabled={!!error || investmentAmount < projectData?.minimumInvestment}
          >
            Investir Maintenant
          </Button>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon name="Shield" size={16} color="var(--color-success)" />
              <span>Paiement sécurisé par Stripe</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon name="FileText" size={16} color="var(--color-primary)" />
              <span>Contrat d'investissement inclus</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon name="Users" size={16} color="var(--color-primary)" />
              <span>{projectData?.investorCount} investisseurs</span>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <button 
            className="text-sm text-primary hover:underline flex items-center gap-2"
            onClick={() => window.open('/legal/investment-terms', '_blank')}
          >
            <Icon name="ExternalLink" size={14} />
            Lire les conditions d'investissement
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvestmentPanel;