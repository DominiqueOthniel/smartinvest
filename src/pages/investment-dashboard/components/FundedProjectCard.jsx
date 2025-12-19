import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FundedProjectCard = ({ project, onViewDetails }) => {
  const progressPercent = (project?.currentFunding / project?.fundingGoal) * 100;
  const daysRemaining = Math.ceil((new Date(project.endDate) - new Date()) / (1000 * 60 * 60 * 24));

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/30 transition-all duration-300 group">
      <div className="relative h-48 overflow-hidden bg-muted">
        <Image 
          src={project?.image} 
          alt={project?.imageAlt}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
            <Icon name={project?.sectorIcon} size={12} />
            {project?.sector}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${progressPercent >= 100 ? 'bg-success text-success-foreground' : 'bg-warning text-warning-foreground'}`}>
            {progressPercent >= 100 ? 'Financé' : 'En cours'}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {project?.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {project?.description}
        </p>

        <div className="space-y-4 mb-6">
          <div>
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-muted-foreground">Progression</span>
              <span className="font-semibold text-foreground">{progressPercent?.toFixed(1)}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-primary/80 transition-all duration-500"
                style={{ width: `${Math.min(progressPercent, 100)}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Financé</p>
              <p className="font-bold text-foreground font-data">{project?.currentFunding?.toLocaleString('fr-FR')} CFA</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Objectif</p>
              <p className="font-bold text-foreground font-data">{project?.fundingGoal?.toLocaleString('fr-FR')} CFA</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Icon name="Users" size={16} color="var(--color-muted-foreground)" />
              <div>
                <p className="text-xs text-muted-foreground">Investisseurs</p>
                <p className="font-semibold text-foreground">{project?.investors}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Clock" size={16} color="var(--color-muted-foreground)" />
              <div>
                <p className="text-xs text-muted-foreground">Reste</p>
                <p className="font-semibold text-foreground">{daysRemaining > 0 ? `${daysRemaining}j` : 'Terminé'}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg border border-primary/20">
            <Icon name="TrendingUp" size={16} color="var(--color-primary)" />
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">Rendement estimé</p>
              <p className="font-bold text-primary">{project?.estimatedReturn}% annuel</p>
            </div>
          </div>
        </div>

        <Button 
          variant="outline" 
          fullWidth
          iconName="Eye"
          iconPosition="left"
          onClick={() => onViewDetails(project?.id)}
        >
          Voir les détails
        </Button>
      </div>
    </div>
  );
};

export default FundedProjectCard;