import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TransactionCard = ({ transaction }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isProfit = transaction?.performance >= 0;

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div 
        className="p-4 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start gap-3 mb-4">
          <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
            <Image 
              src={transaction?.projectImage} 
              alt={transaction?.projectImageAlt}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground mb-1">{transaction?.projectName}</h3>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm text-muted-foreground">{transaction?.sector}</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">{transaction?.date}</span>
            </div>
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
              {transaction?.type}
            </span>
          </div>
          <Icon 
            name={isExpanded ? 'ChevronUp' : 'ChevronDown'} 
            size={20} 
            color="var(--color-muted-foreground)"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-xs text-muted-foreground mb-1">Montant Investi</div>
            <div className="font-data font-semibold text-foreground">{transaction?.amount?.toLocaleString('fr-FR')} CFA</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">Valeur Actuelle</div>
            <div className="font-data font-semibold text-foreground">{transaction?.currentValue?.toLocaleString('fr-FR')} CFA</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">Parts</div>
            <div className="font-semibold text-foreground">{transaction?.shares}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">Performance</div>
            <div className={`flex items-center gap-1 font-semibold ${isProfit ? 'text-success' : 'text-error'}`}>
              <Icon name={isProfit ? 'TrendingUp' : 'TrendingDown'} size={14} />
              <span>{isProfit ? '+' : ''}{transaction?.performance}%</span>
            </div>
          </div>
        </div>
      </div>
      {isExpanded && (
        <div className="px-4 pb-4 pt-2 border-t border-border bg-muted/30">
          <div className="space-y-3 mb-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Termes</span>
              <span className="text-sm font-medium text-foreground">{transaction?.terms}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Statut</span>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${transaction?.projectStatus === 'Actif' ? 'bg-success' : 'bg-warning'}`}></div>
                <span className="text-sm font-medium text-foreground">{transaction?.projectStatus}</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Dividendes</span>
              <span className="text-sm font-medium font-data text-foreground">{transaction?.dividendsReceived?.toLocaleString('fr-FR')} CFA</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Rendement Projeté</span>
              <span className="text-sm font-medium text-primary">{transaction?.projectedReturn}%</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity text-sm font-medium flex items-center justify-center gap-2">
              <Icon name="Eye" size={16} />
              Détails
            </button>
            <button className="flex-1 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors text-sm font-medium flex items-center justify-center gap-2">
              <Icon name="TrendingUp" size={16} />
              Réinvestir
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionCard;