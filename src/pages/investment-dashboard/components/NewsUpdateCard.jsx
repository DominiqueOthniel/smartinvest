import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const NewsUpdateCardComponent = ({ update }) => {
  const getTypeIcon = (type) => {
    const icons = {
      'announcement': 'Megaphone',
      'update': 'Bell',
      'success': 'CheckCircle',
      'alert': 'AlertCircle'
    };
    return icons?.[type] || 'Info';
  };

  const getTypeColor = (type) => {
    const colors = {
      'announcement': 'text-primary',
      'update': 'text-blue-500',
      'success': 'text-success',
      'alert': 'text-warning'
    };
    return colors?.[type] || 'text-muted-foreground';
  };

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Il y a quelques minutes';
    if (diffInHours < 24) return `Il y a ${diffInHours}h`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `Il y a ${diffInDays}j`;
    return date?.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
  };

  return (
    <div className="bg-card border border-border rounded-xl p-4 hover:border-primary/30 transition-all duration-300 group cursor-pointer">
      <div className="flex items-start gap-4">
        {update?.image && (
          <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
            <Image 
              src={update?.image} 
              alt={update?.imageAlt}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <Icon name={getTypeIcon(update?.type)} size={16} className={getTypeColor(update?.type)} />
              <span className="text-xs font-medium text-muted-foreground">{update?.category}</span>
            </div>
            <span className="text-xs text-muted-foreground flex-shrink-0">{formatTimeAgo(update?.date)}</span>
          </div>
          <h4 className="font-semibold text-foreground mb-1 line-clamp-2 group-hover:text-primary transition-colors">
            {update?.title}
          </h4>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
            {update?.description}
          </p>
          {update?.projectName && (
            <div className="flex items-center gap-2 text-xs">
              <span className="px-2 py-1 rounded-md bg-primary/10 text-primary font-medium">
                {update?.projectName}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const NewsUpdateCard = NewsUpdateCardComponent;

export default NewsUpdateCard;
