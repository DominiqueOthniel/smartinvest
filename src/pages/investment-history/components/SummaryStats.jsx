import React from 'react';
import Icon from '../../../components/AppIcon';

const SummaryStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon name="TrendingUp" size={24} color="var(--color-primary)" />
          </div>
          <span className={`text-sm font-medium ${stats?.totalInvestedChange >= 0 ? 'text-success' : 'text-error'}`}>
            {stats?.totalInvestedChange >= 0 ? '+' : ''}{stats?.totalInvestedChange}%
          </span>
        </div>
        <div className="text-sm text-muted-foreground mb-1">Total Investi</div>
        <div className="text-2xl font-bold font-data text-foreground">{stats?.totalInvested?.toLocaleString('fr-FR')} CFA</div>
      </div>
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center">
            <Icon name="Wallet" size={24} color="var(--color-success)" />
          </div>
          <span className={`text-sm font-medium ${stats?.currentValueChange >= 0 ? 'text-success' : 'text-error'}`}>
            {stats?.currentValueChange >= 0 ? '+' : ''}{stats?.currentValueChange}%
          </span>
        </div>
        <div className="text-sm text-muted-foreground mb-1">Valeur Actuelle</div>
        <div className="text-2xl font-bold font-data text-foreground">{stats?.currentValue?.toLocaleString('fr-FR')} CFA</div>
      </div>
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-lg bg-warning/10 flex items-center justify-center">
            <Icon name="PiggyBank" size={24} color="var(--color-warning)" />
          </div>
          <span className="text-sm font-medium text-success">
            +{stats?.totalGainsPercent}%
          </span>
        </div>
        <div className="text-sm text-muted-foreground mb-1">Gains Totaux</div>
        <div className="text-2xl font-bold font-data text-success">{stats?.totalGains?.toLocaleString('fr-FR')} CFA</div>
      </div>
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon name="Coins" size={24} color="var(--color-primary)" />
          </div>
          <span className="text-sm font-medium text-primary">
            {stats?.dividendsCount} paiements
          </span>
        </div>
        <div className="text-sm text-muted-foreground mb-1">Dividendes Reçus</div>
        <div className="text-2xl font-bold font-data text-foreground">{stats?.totalDividends?.toLocaleString('fr-FR')} CFA</div>
      </div>
    </div>
  );
};

export default SummaryStats;