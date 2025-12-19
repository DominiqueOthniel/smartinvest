import React from 'react';

const FundingProgressBar = ({ current, goal, currency = 'CFA' }) => {
  const percentage = Math.min((current / goal) * 100, 100);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Progression du financement</span>
        <span className="font-bold text-primary font-data">{percentage?.toFixed(1)}%</span>
      </div>
      <div className="relative w-full h-3 bg-muted rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-primary/80 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse" />
        </div>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-foreground font-medium font-data">
          {current?.toLocaleString('fr-FR')} {currency}
        </span>
        <span className="text-muted-foreground">
          sur {goal?.toLocaleString('fr-FR')} {currency}
        </span>
      </div>
    </div>
  );
};

export default FundingProgressBar;