import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const InvestorComments = ({ comments = [] }) => {
  const [showAll, setShowAll] = useState(false);
  const displayedComments = showAll ? comments : comments?.slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="MessageSquare" size={24} color="var(--color-primary)" />
          Commentaires des Investisseurs
        </h3>
        <span className="text-sm text-muted-foreground">
          {comments?.length} commentaire{comments?.length > 1 ? 's' : ''}
        </span>
      </div>
      <div className="space-y-4">
        {displayedComments?.map((comment, index) => (
          <div key={index} className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-all">
            <div className="flex items-start gap-4">
              <Image
                src={comment?.avatar}
                alt={comment?.avatarAlt}
                className="w-12 h-12 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-foreground">{comment?.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      Investisseur • {comment?.investmentAmount?.toLocaleString('fr-FR')} CFA
                    </p>
                  </div>
                  <span className="text-sm text-muted-foreground whitespace-nowrap ml-4">
                    {new Date(comment.date)?.toLocaleDateString('fr-FR', { 
                      day: '2-digit', 
                      month: 'short' 
                    })}
                  </span>
                </div>
                <p className="text-muted-foreground leading-relaxed">{comment?.content}</p>
                <div className="flex items-center gap-4 mt-3">
                  <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
                    <Icon name="ThumbsUp" size={16} />
                    <span>{comment?.likes}</span>
                  </button>
                  <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
                    <Icon name="MessageCircle" size={16} />
                    <span>Répondre</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {comments?.length > 3 && (
        <Button
          variant="outline"
          fullWidth
          iconName={showAll ? 'ChevronUp' : 'ChevronDown'}
          iconPosition="right"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? 'Voir moins' : `Voir tous les commentaires (${comments?.length})`}
        </Button>
      )}
    </div>
  );
};

export default InvestorComments;