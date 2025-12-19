import React from 'react';
import Icon from '../../../components/AppIcon';

const InvestmentSummaryCard = ({ 
  projectName = "Résidence Luxe Abidjan",
  investmentAmount = 50000,
  shareQuantity = 10,
  sharePrice = 5000,
  estimatedReturn = 15,
  processingFee = 500,
  currency = "CFA"
}) => {
  const totalAmount = investmentAmount + processingFee;
  const estimatedProfit = (investmentAmount * estimatedReturn) / 100;

  return (
    <div className="bg-card border border-border rounded-xl p-6 space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">Récapitulatif de l'Investissement</h3>
          <p className="text-sm text-muted-foreground">Vérifiez les détails avant de confirmer</p>
        </div>
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon name="FileText" size={24} color="var(--color-primary)" />
        </div>
      </div>
      <div className="space-y-4">
        <div className="pb-4 border-b border-border">
          <p className="text-sm text-muted-foreground mb-1">Projet</p>
          <p className="text-base font-semibold text-foreground">{projectName}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Montant Investi</p>
            <p className="text-lg font-bold text-primary font-data">
              {investmentAmount?.toLocaleString('fr-FR')} {currency}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Nombre d'Actions</p>
            <p className="text-lg font-bold text-foreground font-data">{shareQuantity}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Prix par Action</p>
            <p className="text-base font-semibold text-foreground font-data">
              {sharePrice?.toLocaleString('fr-FR')} {currency}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Rendement Estimé</p>
            <p className="text-base font-semibold text-success">{estimatedReturn}% / an</p>
          </div>
        </div>

        <div className="pt-4 border-t border-border space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Montant de l'Investissement</p>
            <p className="text-sm font-semibold text-foreground font-data">
              {investmentAmount?.toLocaleString('fr-FR')} {currency}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Frais de Traitement</p>
            <p className="text-sm font-semibold text-foreground font-data">
              {processingFee?.toLocaleString('fr-FR')} {currency}
            </p>
          </div>
          <div className="flex items-center justify-between pt-3 border-t border-border">
            <p className="text-base font-semibold text-foreground">Montant Total</p>
            <p className="text-xl font-bold text-primary font-data">
              {totalAmount?.toLocaleString('fr-FR')} {currency}
            </p>
          </div>
        </div>

        <div className="bg-success/10 border border-success/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Icon name="TrendingUp" size={20} color="var(--color-success)" />
            <div>
              <p className="text-sm font-semibold text-success mb-1">Profit Estimé (12 mois)</p>
              <p className="text-lg font-bold text-success font-data">
                +{estimatedProfit?.toLocaleString('fr-FR')} {currency}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentSummaryCard;