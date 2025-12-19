import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ProjectTabContent = ({ activeTab, projectData }) => {
  if (activeTab === 'overview') {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-foreground mb-4">Description du Projet</h3>
          <div className="prose prose-invert max-w-none">
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {projectData?.description}
            </p>
          </div>
        </div>
        <div className="bg-muted/30 border border-border rounded-xl p-6">
          <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Icon name="Target" size={20} color="var(--color-primary)" />
            Objectifs du Projet
          </h4>
          <ul className="space-y-3">
            {projectData?.objectives?.map((objective, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon name="Check" size={14} color="var(--color-primary)" />
                </div>
                <span className="text-muted-foreground">{objective}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Icon name="MapPin" size={20} color="var(--color-primary)" />
            Localisation
          </h4>
          <p className="text-muted-foreground mb-4">{projectData?.location}</p>
          <div className="w-full h-64 rounded-xl overflow-hidden border border-border">
            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              title={projectData?.title}
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${projectData?.coordinates?.lat},${projectData?.coordinates?.lng}&z=14&output=embed`}
            />
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === 'team') {
    return (
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-foreground mb-4">Équipe du Projet</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projectData?.team?.map((member, index) => (
            <div key={index} className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-all">
              <div className="flex items-start gap-4">
                <Image
                  src={member?.avatar}
                  alt={member?.avatarAlt}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-foreground">{member?.name}</h4>
                  <p className="text-sm text-primary mb-2">{member?.role}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{member?.bio}</p>
                  <div className="flex items-center gap-3 mt-3">
                    <a href={member?.linkedin} className="text-muted-foreground hover:text-primary transition-colors" aria-label="LinkedIn">
                      <Icon name="Linkedin" size={18} />
                    </a>
                    <a href={member?.email} className="text-muted-foreground hover:text-primary transition-colors" aria-label="Email">
                      <Icon name="Mail" size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (activeTab === 'financials') {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-foreground mb-4">Projections Financières</h3>
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {projectData?.financials?.projections?.map((projection, index) => (
                <div key={index} className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">{projection?.label}</p>
                  <p className="text-2xl font-bold text-primary font-data">{projection?.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Icon name="AlertTriangle" size={20} color="var(--color-warning)" />
            Évaluation des Risques
          </h4>
          <div className="space-y-4">
            {projectData?.financials?.risks?.map((risk, index) => (
              <div key={index} className="bg-muted/30 border border-border rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    risk?.level === 'high' ? 'bg-error/20' : risk?.level === 'medium' ? 'bg-warning/20' : 'bg-success/20'
                  }`}>
                    <Icon 
                      name="AlertCircle" 
                      size={18} 
                      color={risk?.level === 'high' ? 'var(--color-error)' : risk?.level === 'medium' ? 'var(--color-warning)' : 'var(--color-success)'}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-semibold text-foreground">{risk?.title}</h5>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        risk?.level === 'high' ? 'bg-error/20 text-error' : 
                        risk?.level === 'medium'? 'bg-warning/20 text-warning' : 'bg-success/20 text-success'
                      }`}>
                        {risk?.level === 'high' ? 'Élevé' : risk?.level === 'medium' ? 'Moyen' : 'Faible'}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{risk?.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-warning/10 border border-warning/30 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <Icon name="Info" size={20} color="var(--color-warning)" className="flex-shrink-0 mt-0.5" />
            <div>
              <h5 className="font-semibold text-foreground mb-2">Avertissement Important</h5>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Tout investissement comporte des risques. Les performances passées ne garantissent pas les résultats futurs. 
                Veuillez lire attentivement tous les documents juridiques avant d'investir.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === 'updates') {
    return (
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-foreground mb-4">Mises à Jour du Projet</h3>
        <div className="space-y-4">
          {projectData?.updates?.map((update, index) => (
            <div key={index} className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon name="Bell" size={20} color="var(--color-primary)" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-lg font-semibold text-foreground">{update?.title}</h4>
                    <span className="text-sm text-muted-foreground whitespace-nowrap ml-4">
                      {new Date(update.date)?.toLocaleDateString('fr-FR', { 
                        day: '2-digit', 
                        month: 'short', 
                        year: 'numeric' 
                      })}
                    </span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{update?.content}</p>
                  {update?.attachments && update?.attachments?.length > 0 && (
                    <div className="flex items-center gap-2 mt-4">
                      <Icon name="Paperclip" size={16} color="var(--color-muted-foreground)" />
                      <span className="text-sm text-muted-foreground">
                        {update?.attachments?.length} pièce(s) jointe(s)
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

export default ProjectTabContent;