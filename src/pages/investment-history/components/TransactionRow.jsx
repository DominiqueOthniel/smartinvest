import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TransactionRow = ({ transaction }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isProfit = transaction?.performance >= 0;

  return (
    <>
      <tr 
        className="border-b border-border hover:bg-muted/50 transition-colors cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <td className="px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
              <Image 
                src={transaction?.projectImage} 
                alt={transaction?.projectImageAlt}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="font-medium text-foreground">{transaction?.projectName}</div>
              <div className="text-sm text-muted-foreground">{transaction?.sector}</div>
            </div>
          </div>
        </td>
        <td className="px-6 py-4 text-foreground">{transaction?.date}</td>
        <td className="px-6 py-4">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
            {transaction?.type}
          </span>
        </td>
        <td className="px-6 py-4 font-data text-foreground">{transaction?.amount?.toLocaleString('fr-FR')} CFA</td>
        <td className="px-6 py-4 text-foreground">{transaction?.shares}</td>
        <td className="px-6 py-4 font-data text-foreground">{transaction?.currentValue?.toLocaleString('fr-FR')} CFA</td>
        <td className="px-6 py-4">
          <div className={`flex items-center gap-1 ${isProfit ? 'text-success' : 'text-error'}`}>
            <Icon name={isProfit ? 'TrendingUp' : 'TrendingDown'} size={16} />
            <span className="font-medium">{isProfit ? '+' : ''}{transaction?.performance}%</span>
          </div>
        </td>
        <td className="px-6 py-4">
          <Icon 
            name={isExpanded ? 'ChevronUp' : 'ChevronDown'} 
            size={20} 
            color="var(--color-muted-foreground)"
          />
        </td>
      </tr>
      {isExpanded && (
        <tr className="bg-muted/30 border-b border-border">
          <td colSpan="8" className="px-6 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Termes d'Investissement</div>
                <div className="text-foreground font-medium">{transaction?.terms}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Statut du Projet</div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${transaction?.projectStatus === 'Actif' ? 'bg-success' : 'bg-warning'}`}></div>
                  <span className="text-foreground font-medium">{transaction?.projectStatus}</span>
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Dividendes Reçus</div>
                <div className="text-foreground font-medium font-data">{transaction?.dividendsReceived?.toLocaleString('fr-FR')} CFA</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Rendement Projeté</div>
                <div className="text-primary font-medium">{transaction?.projectedReturn}%</div>
              </div>
            </div>
            <div className="mt-4 flex gap-3">
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity text-sm font-medium flex items-center gap-2">
                <Icon name="Eye" size={16} />
                Voir Détails
              </button>
              <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors text-sm font-medium flex items-center gap-2">
                <Icon name="TrendingUp" size={16} />
                Réinvestir
              </button>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default TransactionRow;