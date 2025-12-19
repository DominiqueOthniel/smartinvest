import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricCard = ({ 
  title, 
  value, 
  currency = 'CFA',
  change,
  changeType = 'positive',
  icon,
  iconColor = 'var(--color-primary)',
  isLoading = false 
}) => {
  if (isLoading) {
    return (
      <div className="bg-card border border-border rounded-xl p-6 animate-pulse">
        <div className="h-4 bg-muted rounded w-1/2 mb-4"></div>
        <div className="h-8 bg-muted rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-muted rounded w-1/3"></div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <h3 className="text-2xl lg:text-3xl font-bold text-foreground font-data">
            {typeof value === 'number' ? value?.toLocaleString('fr-FR') : value} {currency && <span className="text-lg text-muted-foreground">{currency}</span>}
          </h3>
        </div>
        {icon && (
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Icon name={icon} size={24} color={iconColor} />
          </div>
        )}
      </div>
      {change && (
        <div className={`flex items-center gap-1 text-sm font-medium ${changeType === 'positive' ? 'text-success' : 'text-error'}`}>
          <Icon name={changeType === 'positive' ? 'TrendingUp' : 'TrendingDown'} size={16} />
          <span>{changeType === 'positive' ? '+' : ''}{change}</span>
          <span className="text-muted-foreground text-xs ml-1">ce mois</span>
        </div>
      )}
    </div>
  );
};

export default MetricCard;