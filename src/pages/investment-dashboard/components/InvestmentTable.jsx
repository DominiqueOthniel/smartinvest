import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const InvestmentTable = ({ investments = [], onViewDetails, onInvest }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig?.key === key && sortConfig?.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  const sortedInvestments = React.useMemo(() => {
    if (!sortConfig?.key) return investments;
    
    return [...investments]?.sort((a, b) => {
      const aValue = a?.[sortConfig?.key];
      const bValue = b?.[sortConfig?.key];
      
      if (aValue < bValue) return sortConfig?.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig?.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [investments, sortConfig]);

  const getStatusColor = (status) => {
    const colors = {
      'Actif': 'bg-success/10 text-success border-success/20',
      'En cours': 'bg-warning/10 text-warning border-warning/20',
      'Terminé': 'bg-muted text-muted-foreground border-border',
      'Suspendu': 'bg-error/10 text-error border-error/20'
    };
    return colors?.[status] || colors?.['Actif'];
  };

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="text-left p-4 text-sm font-semibold text-foreground">
                <button 
                  onClick={() => handleSort('projectName')}
                  className="flex items-center gap-2 hover:text-primary transition-colors"
                >
                  Projet
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left p-4 text-sm font-semibold text-foreground hidden md:table-cell">Secteur</th>
              <th className="text-right p-4 text-sm font-semibold text-foreground">
                <button 
                  onClick={() => handleSort('investedAmount')}
                  className="flex items-center gap-2 ml-auto hover:text-primary transition-colors"
                >
                  Investi
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-right p-4 text-sm font-semibold text-foreground hidden lg:table-cell">
                <button 
                  onClick={() => handleSort('currentValue')}
                  className="flex items-center gap-2 ml-auto hover:text-primary transition-colors"
                >
                  Valeur Actuelle
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-right p-4 text-sm font-semibold text-foreground">
                <button 
                  onClick={() => handleSort('returnPercent')}
                  className="flex items-center gap-2 ml-auto hover:text-primary transition-colors"
                >
                  Rendement
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-center p-4 text-sm font-semibold text-foreground hidden sm:table-cell">Statut</th>
              <th className="text-right p-4 text-sm font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sortedInvestments?.map((investment) => (
              <tr key={investment?.id} className="hover:bg-muted/30 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                      <Image 
                        src={investment?.projectImage} 
                        alt={investment?.projectImageAlt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-foreground truncate">{investment?.projectName}</p>
                      <p className="text-xs text-muted-foreground hidden sm:block">{investment?.shares} parts</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 hidden md:table-cell">
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium">
                    <Icon name={investment?.sectorIcon} size={12} />
                    {investment?.sector}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <p className="font-semibold text-foreground font-data">{investment?.investedAmount?.toLocaleString('fr-FR')} CFA</p>
                  <p className="text-xs text-muted-foreground">{investment?.investmentDate}</p>
                </td>
                <td className="p-4 text-right hidden lg:table-cell">
                  <p className="font-semibold text-foreground font-data">{investment?.currentValue?.toLocaleString('fr-FR')} CFA</p>
                  <p className={`text-xs font-medium ${investment?.gainLoss >= 0 ? 'text-success' : 'text-error'}`}>
                    {investment?.gainLoss >= 0 ? '+' : ''}{investment?.gainLoss?.toLocaleString('fr-FR')} CFA
                  </p>
                </td>
                <td className="p-4 text-right">
                  <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-md font-semibold text-sm ${investment?.returnPercent >= 0 ? 'bg-success/10 text-success' : 'bg-error/10 text-error'}`}>
                    <Icon name={investment?.returnPercent >= 0 ? 'TrendingUp' : 'TrendingDown'} size={14} />
                    {investment?.returnPercent >= 0 ? '+' : ''}{investment?.returnPercent}%
                  </div>
                </td>
                <td className="p-4 text-center hidden sm:table-cell">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(investment?.status)}`}>
                    {investment?.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      iconName="Eye"
                      onClick={() => onViewDetails(investment?.id)}
                    >
                      <span className="hidden lg:inline">Voir</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      iconName="Plus"
                      onClick={() => onInvest(investment?.id)}
                    >
                      <span className="hidden lg:inline">Investir</span>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvestmentTable;