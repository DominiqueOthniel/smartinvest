import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyState = ({ onClearFilters }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
        <Icon name="SearchX" size={48} color="var(--color-muted-foreground)" />
      </div>
      
      <h3 className="text-xl font-semibold text-foreground mb-2">
        Aucun projet trouvé
      </h3>
      
      <p className="text-sm text-muted-foreground text-center max-w-md mb-6">
        Nous n'avons trouvé aucun projet correspondant à vos critères de recherche. Essayez d'ajuster vos filtres pour voir plus d'opportunités d'investissement.
      </p>

      <Button
        variant="outline"
        onClick={onClearFilters}
        iconName="RotateCcw"
        iconPosition="left"
      >
        Réinitialiser les filtres
      </Button>
    </div>
  );
};

export default EmptyState;