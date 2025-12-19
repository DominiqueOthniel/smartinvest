import React from 'react';
import Icon from '../../../components/AppIcon';

const SortControls = ({ sortBy, onSortChange, totalResults }) => {
  const sortOptions = [
    { id: 'popularity', label: 'Popularité', icon: 'TrendingUp' },
    { id: 'return', label: 'Rendement', icon: 'DollarSign' },
    { id: 'deadline', label: 'Date limite', icon: 'Clock' },
    { id: 'min-investment', label: 'Investissement min.', icon: 'Wallet' }
  ];

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
      <div className="flex items-center gap-2">
        <Icon name="BarChart3" size={20} color="var(--color-muted-foreground)" />
        <span className="text-sm text-muted-foreground">
          {totalResults} {totalResults === 1 ? 'projet trouvé' : 'projets trouvés'}
        </span>
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm text-muted-foreground">Trier par:</span>
        {sortOptions?.map((option) => (
          <button
            key={option?.id}
            onClick={() => onSortChange(option?.id)}
            className={`px-3 py-2 rounded-lg border transition-all duration-200 flex items-center gap-2 text-sm min-h-[44px] ${
              sortBy === option?.id
                ? 'bg-primary/10 border-primary text-primary' :'bg-card border-border text-muted-foreground hover:border-primary/50'
            }`}
          >
            <Icon name={option?.icon} size={16} />
            <span className="font-medium">{option?.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SortControls;