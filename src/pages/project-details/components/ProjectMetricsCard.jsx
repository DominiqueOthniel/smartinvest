import React from 'react';
import Icon from '../../../components/AppIcon';

const ProjectMetricsCard = ({ icon, label, value, subValue, trend, iconColor = 'var(--color-primary)' }) => {
  return (
    <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name={icon} size={24} color={iconColor} />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-sm font-medium ${
            trend > 0 ? 'text-success' : 'text-error'
          }`}>
            <Icon name={trend > 0 ? 'TrendingUp' : 'TrendingDown'} size={16} />
            <span>{Math.abs(trend)}%</span>
          </div>
        )}
      </div>
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-2xl font-bold text-foreground font-data">{value}</p>
        {subValue && (
          <p className="text-sm text-muted-foreground">{subValue}</p>
        )}
      </div>
    </div>
  );
};

export default ProjectMetricsCard;