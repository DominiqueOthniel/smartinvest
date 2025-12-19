import React from 'react';
import Icon from '../../../components/AppIcon';

const WithdrawalHistory = ({ withdrawals }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Complété':
        return 'bg-success/10 text-success';
      case 'En Cours':
        return 'bg-warning/10 text-warning';
      case 'En Attente':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Complété':
        return 'CheckCircle2';
      case 'En Cours':
        return 'Clock';
      case 'En Attente':
        return 'AlertCircle';
      default:
        return 'Circle';
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Icon name="ArrowDownToLine" size={20} color="var(--color-primary)" />
          Historique des Retraits
        </h3>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity text-sm font-medium flex items-center gap-2">
          <Icon name="Plus" size={16} />
          Nouveau Retrait
        </button>
      </div>
      <div className="space-y-4">
        {withdrawals?.map((withdrawal) => (
          <div 
            key={withdrawal?.id}
            className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-4 flex-1">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getStatusColor(withdrawal?.status)}`}>
                <Icon name={getStatusIcon(withdrawal?.status)} size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-foreground mb-1">{withdrawal?.method}</div>
                <div className="text-sm text-muted-foreground">{withdrawal?.date}</div>
              </div>
            </div>

            <div className="text-right ml-4">
              <div className="font-data font-semibold text-foreground mb-1">
                {withdrawal?.amount?.toLocaleString('fr-FR')} CFA
              </div>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(withdrawal?.status)}`}>
                {withdrawal?.status}
              </span>
            </div>
          </div>
        ))}
      </div>
      {withdrawals?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Inbox" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
          <p className="text-muted-foreground">Aucun retrait effectué</p>
        </div>
      )}
    </div>
  );
};

export default WithdrawalHistory;