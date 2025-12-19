import React from 'react';
import Icon from '../../../components/AppIcon';


const QuickActionCard = ({ action, onClick }) => {
  const getActionColor = (type) => {
    const colors = {
      'invest': 'from-primary/20 to-primary/5 border-primary/30',
      'withdraw': 'from-success/20 to-success/5 border-success/30',
      'explore': 'from-blue-500/20 to-blue-500/5 border-blue-500/30',
      'settings': 'from-muted to-muted/50 border-border'
    };
    return colors?.[type] || colors?.['settings'];
  };

  return (
    <div className={`bg-gradient-to-br ${getActionColor(action?.type)} border rounded-xl p-6 hover:scale-105 transition-all duration-300 cursor-pointer group`} onClick={onClick}>
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${action?.type === 'invest' ? 'bg-primary/20' : action?.type === 'withdraw' ? 'bg-success/20' : action?.type === 'explore' ? 'bg-blue-500/20' : 'bg-muted'}`}>
          <Icon name={action?.icon} size={24} color={action?.type === 'invest' ? 'var(--color-primary)' : action?.type === 'withdraw' ? 'var(--color-success)' : action?.type === 'explore' ? '#3b82f6' : 'var(--color-muted-foreground)'} />
        </div>
        <Icon name="ArrowRight" size={20} color="var(--color-muted-foreground)" className="group-hover:translate-x-1 transition-transform" />
      </div>
      <h3 className="font-bold text-foreground mb-2">{action?.title}</h3>
      <p className="text-sm text-muted-foreground mb-4">{action?.description}</p>
      {action?.badge && (
        <span className="inline-block px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-semibold">
          {action?.badge}
        </span>
      )}
    </div>
  );
};

export default QuickActionCard;