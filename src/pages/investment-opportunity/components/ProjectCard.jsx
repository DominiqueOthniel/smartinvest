import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();

  const getSectorIcon = (sector) => {
    const icons = {
      'real-estate': 'Building2',
      'restaurant': 'UtensilsCrossed',
      'technology': 'Cpu'
    };
    return icons?.[sector] || 'Briefcase';
  };

  const getSectorColor = (sector) => {
    const colors = {
      'real-estate': 'text-blue-400',
      'restaurant': 'text-orange-400',
      'technology': 'text-purple-400'
    };
    return colors?.[sector] || 'text-primary';
  };

  const getStatusBadge = () => {
    if (project?.isNew) {
      return (
        <div className="absolute top-4 right-4 bg-success text-success-foreground px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
          <Icon name="Sparkles" size={12} />
          Nouveau
        </div>
      );
    }
    if (project?.daysRemaining <= 7) {
      return (
        <div className="absolute top-4 right-4 bg-warning text-warning-foreground px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
          <Icon name="Clock" size={12} />
          Clôture bientôt
        </div>
      );
    }
    return null;
  };

  const handleInvestClick = () => {
    navigate('/investment-confirmation', { state: { project } });
  };

  const handleDetailsClick = () => {
    navigate('/project-details', { state: { project } });
  };

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={project?.image}
          alt={project?.imageAlt}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {getStatusBadge()}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className={`absolute bottom-4 left-4 flex items-center gap-2 ${getSectorColor(project?.sector)}`}>
          <Icon name={getSectorIcon(project?.sector)} size={20} />
          <span className="text-white font-semibold text-sm">{project?.sectorLabel}</span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {project?.title}
        </h3>
        
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {project?.description}
        </p>

        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Investissement minimum</span>
            <span className="text-sm font-semibold text-foreground">
              {project?.minInvestment?.toLocaleString('fr-FR')} CFA
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Rendement estimé</span>
            <span className="text-sm font-semibold text-success flex items-center gap-1">
              <Icon name="TrendingUp" size={14} />
              {project?.estimatedReturn}%
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Temps restant</span>
            <span className="text-sm font-semibold text-foreground flex items-center gap-1">
              <Icon name="Clock" size={14} />
              {project?.daysRemaining} jours
            </span>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">Progression du financement</span>
            <span className="text-xs font-semibold text-primary">{project?.fundingProgress}%</span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full transition-all duration-500"
              style={{ width: `${project?.fundingProgress}%` }}
            />
          </div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-xs text-muted-foreground">
              {project?.currentFunding?.toLocaleString('fr-FR')} CFA
            </span>
            <span className="text-xs text-muted-foreground">
              {project?.fundingGoal?.toLocaleString('fr-FR')} CFA
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="default"
            onClick={handleInvestClick}
            iconName="TrendingUp"
            iconPosition="left"
            fullWidth
          >
            Investir
          </Button>
          <Button
            variant="outline"
            onClick={handleDetailsClick}
            iconName="Eye"
            size="icon"
          >
            <span className="sr-only">Voir détails</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;