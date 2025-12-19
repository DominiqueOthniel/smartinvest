import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import MobileBottomNav from '../../components/ui/MobileBottomNav';
import Icon from '../../components/AppIcon';
import ProjectImageGallery from './components/ProjectImageGallery';
import ProjectMetricsCard from './components/ProjectMetricsCard';
import FundingProgressBar from './components/FundingProgressBar';
import ProjectTabContent from './components/ProjectTabContent';
import InvestmentPanel from './components/InvestmentPanel';
import InvestorComments from './components/InvestorComments';

const ProjectDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileInvestmentOpen, setIsMobileInvestmentOpen] = useState(false);

  const projectData = location?.state?.project || {
    id: 1,
    title: "Complexe Résidentiel Moderne - Abidjan Plateau",
    sector: "Immobilier",
    sectorIcon: "Building2",
    description: `Ce projet ambitieux vise à construire un complexe résidentiel de luxe au cœur du Plateau à Abidjan, offrant 120 appartements haut de gamme avec des équipements modernes.\n\nLe complexe comprendra des espaces verts, une piscine communautaire, une salle de sport, et un parking sécurisé. Chaque appartement sera équipé de finitions premium et de technologies intelligentes pour le confort des résidents.\n\nLa localisation stratégique au Plateau garantit une forte demande locative et une appréciation constante de la valeur immobilière. Le projet bénéficie déjà de toutes les autorisations nécessaires et la construction débutera dans 3 mois.`,
    fundingGoal: 500000000,
    currentFunding: 325000000,
    remainingAmount: 175000000,
    minimumInvestment: 1000000,
    sharePrice: 10000,
    estimatedReturn: 18,
    duration: "36 mois",
    investorCount: 247,
    location: "Plateau, Abidjan, Côte d'Ivoire",
    coordinates: { lat: 5.3167, lng: -4.0167 },
    images: [
    {
      url: "https://img.rocket.new/generatedImages/rocket_gen_img_1b6d5c626-1765064011199.png",
      alt: "Vue extérieure du complexe résidentiel moderne avec architecture contemporaine, façade en verre et balcons spacieux dans le quartier du Plateau à Abidjan"
    },
    {
      url: "https://img.rocket.new/generatedImages/rocket_gen_img_1f998bd74-1764661904247.png",
      alt: "Intérieur luxueux d'un appartement avec salon spacieux, grandes fenêtres, mobilier moderne et finitions premium"
    },
    {
      url: "https://images.unsplash.com/photo-1635586009738-b03884201f77",
      alt: "Espace piscine communautaire entouré de palmiers avec transats et zone de détente pour les résidents"
    }],

    objectives: [
    "Construire 120 appartements de luxe avec finitions premium",
    "Créer des espaces communs modernes (piscine, gym, espaces verts)",
    "Assurer un rendement locatif attractif de 18% par an",
    "Livraison complète du projet dans 36 mois",
    "Valorisation patrimoniale à long terme pour les investisseurs"],

    team: [
    {
      name: "Amadou Diallo",
      role: "Directeur de Projet",
      bio: "15 ans d'expérience dans le développement immobilier en Afrique de l'Ouest. A dirigé plus de 20 projets résidentiels réussis.",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1fd3ace57-1763294869088.png",
      avatarAlt: "Portrait professionnel d'Amadou Diallo, homme africain en costume sombre avec cravate dorée, sourire confiant",
      linkedin: "https://linkedin.com",
      email: "mailto:amadou.diallo@smartinvest.com"
    },
    {
      name: "Fatou Koné",
      role: "Architecte en Chef",
      bio: "Architecte primée spécialisée dans les projets résidentiels durables. Diplômée de l'École d'Architecture de Paris.",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1dea6fda5-1763300699243.png",
      avatarAlt: "Portrait professionnel de Fatou Koné, femme africaine élégante en tailleur noir, lunettes modernes, expression professionnelle",
      linkedin: "https://linkedin.com",
      email: "mailto:fatou.kone@smartinvest.com"
    },
    {
      name: "Jean-Baptiste Mensah",
      role: "Directeur Financier",
      bio: "Expert en finance immobilière avec 12 ans d'expérience. Ancien analyste chez une grande banque d'investissement.",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_181d31720-1763299053647.png",
      avatarAlt: "Portrait professionnel de Jean-Baptiste Mensah, homme africain en chemise blanche et veste grise, regard sérieux et professionnel",
      linkedin: "https://linkedin.com",
      email: "mailto:jb.mensah@smartinvest.com"
    },
    {
      name: "Aïcha Traoré",
      role: "Responsable Marketing",
      bio: "Spécialiste en marketing immobilier avec un track record prouvé dans la commercialisation de projets premium.",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1cff5f542-1763293871575.png",
      avatarAlt: "Portrait professionnel d'Aïcha Traoré, femme africaine souriante en blazer bordeaux, coiffure professionnelle, fond neutre",
      linkedin: "https://linkedin.com",
      email: "mailto:aicha.traore@smartinvest.com"
    }],

    financials: {
      projections: [
      { label: "Retour Annuel", value: "18%" },
      { label: "Durée", value: "36 mois" },
      { label: "Valeur Totale", value: "750M CFA" }],

      risks: [
      {
        title: "Risque de Construction",
        description: "Retards possibles dus aux conditions météorologiques ou problèmes d'approvisionnement en matériaux.",
        level: "medium"
      },
      {
        title: "Risque de Marché",
        description: "Fluctuations du marché immobilier pouvant affecter la demande locative et les prix de vente.",
        level: "low"
      },
      {
        title: "Risque Réglementaire",
        description: "Changements potentiels dans les réglementations urbaines ou fiscales.",
        level: "low"
      }]

    },
    updates: [
    {
      title: "Obtention du Permis de Construire",
      date: "2025-12-15T10:00:00",
      content: "Excellente nouvelle ! Nous avons officiellement reçu le permis de construire de la mairie d'Abidjan. Les travaux de terrassement commenceront la semaine prochaine.\n\nL'équipe de construction est mobilisée et tous les matériaux de première phase sont commandés. Nous restons dans les délais prévus.",
      attachments: ["permis_construire.pdf"]
    },
    {
      title: "Signature du Contrat avec l'Entreprise de Construction",
      date: "2025-12-10T14:30:00",
      content: "Nous avons signé le contrat avec BATCO Construction, une entreprise reconnue avec plus de 25 ans d'expérience dans les projets résidentiels de luxe.\n\nLeur portfolio impressionnant et leur engagement envers la qualité nous donnent confiance pour la réalisation de ce projet ambitieux.",
      attachments: []
    },
    {
      title: "Lancement Officiel du Projet",
      date: "2025-12-01T09:00:00",
      content: "Nous sommes ravis d'annoncer le lancement officiel du Complexe Résidentiel Moderne - Abidjan Plateau !\n\nMerci à tous nos premiers investisseurs pour leur confiance. Ensemble, nous allons créer un lieu de vie exceptionnel au cœur d'Abidjan.",
      attachments: ["presentation_projet.pdf", "plans_architecturaux.pdf"]
    }]

  };

  const investorComments = [
  {
    name: "Kofi Mensah",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1d2cc09b4-1763294485121.png",
    avatarAlt: "Portrait d'investisseur Kofi Mensah, homme africain souriant en chemise bleue, lunettes modernes",
    investmentAmount: 5000000,
    date: "2025-12-18T15:30:00",
    content: "Excellent projet avec une équipe très professionnelle. La localisation au Plateau est stratégique et les rendements prévus sont attractifs. J'ai hâte de voir la construction avancer !",
    likes: 24
  },
  {
    name: "Aminata Sow",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_151484d7a-1766008039797.png",
    avatarAlt: "Portrait d'investisseur Aminata Sow, femme africaine élégante en tailleur rouge, sourire confiant",
    investmentAmount: 3000000,
    date: "2025-12-17T11:20:00",
    content: "Très transparent dans la communication. J'apprécie les mises à jour régulières et la clarté des documents financiers. C'est mon deuxième investissement avec SmartInvest Africa.",
    likes: 18
  },
  {
    name: "Ibrahim Touré",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1da6b14a6-1764682088869.png",
    avatarAlt: "Portrait d'investisseur Ibrahim Touré, homme africain en costume gris, cravate bleue, expression sérieuse",
    investmentAmount: 8000000,
    date: "2025-12-16T09:45:00",
    content: "Le projet répond à un vrai besoin de logements de qualité à Abidjan. L\'équipe a une solide expérience et les garanties sont rassurantes. Je recommande vivement !",
    likes: 31
  },
  {
    name: "Mariam Diop",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1bb2fd956-1763293568388.png",
    avatarAlt: "Portrait d'investisseur Mariam Diop, femme africaine professionnelle en blazer noir, collier doré",
    investmentAmount: 2500000,
    date: "2025-12-15T16:10:00",
    content: "Première fois que j\'investis dans l\'immobilier et l\'expérience est très positive. Le processus est simple et sécurisé. Merci à l\'équipe pour leur accompagnement.",
    likes: 15
  },
  {
    name: "Youssouf Kaba",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_16500708c-1763296256508.png",
    avatarAlt: "Portrait d'investisseur Youssouf Kaba, homme africain en chemise blanche, sourire chaleureux",
    investmentAmount: 4000000,
    date: "2025-12-14T13:25:00",
    content: "Les rendements de 18% sont très compétitifs. J'ai analysé le business plan en détail et tout est cohérent. Bravo pour ce projet ambitieux !",
    likes: 22
  }];


  const tabs = [
  { id: 'overview', label: 'Aperçu du Projet', icon: 'FileText' },
  { id: 'team', label: 'Équipe', icon: 'Users' },
  { id: 'financials', label: 'Financiers', icon: 'TrendingUp' },
  { id: 'updates', label: 'Mises à Jour', icon: 'Bell' }];


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBackClick = () => {
    navigate('/investment-opportunities');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="content-wrapper">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={handleBackClick}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 min-h-[44px]">

            <Icon name="ArrowLeft" size={20} />
            <span>Retour aux opportunités</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <ProjectImageGallery images={projectData?.images} />

              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 bg-primary/20 text-primary text-sm font-medium rounded-full flex items-center gap-2">
                        <Icon name={projectData?.sectorIcon} size={14} />
                        {projectData?.sector}
                      </span>
                      <span className="px-3 py-1 bg-success/20 text-success text-sm font-medium rounded-full flex items-center gap-2">
                        <Icon name="TrendingUp" size={14} />
                        {projectData?.estimatedReturn}% retour
                      </span>
                    </div>
                    <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
                      {projectData?.title}
                    </h1>
                    <p className="text-muted-foreground flex items-center gap-2">
                      <Icon name="MapPin" size={16} />
                      {projectData?.location}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <ProjectMetricsCard
                    icon="Target"
                    label="Objectif"
                    value={`${(projectData?.fundingGoal / 1000000)?.toFixed(0)}M`}
                    subValue="CFA"
                    iconColor="var(--color-primary)" />

                  <ProjectMetricsCard
                    icon="TrendingUp"
                    label="Collecté"
                    value={`${(projectData?.currentFunding / 1000000)?.toFixed(0)}M`}
                    subValue="CFA"
                    trend={12}
                    iconColor="var(--color-success)" />

                  <ProjectMetricsCard
                    icon="Wallet"
                    label="Minimum"
                    value={`${(projectData?.minimumInvestment / 1000000)?.toFixed(1)}M`}
                    subValue="CFA"
                    iconColor="var(--color-primary)" />

                  <ProjectMetricsCard
                    icon="Clock"
                    label="Durée"
                    value={projectData?.duration}
                    subValue=""
                    iconColor="var(--color-primary)" />

                </div>

                <FundingProgressBar
                  current={projectData?.currentFunding}
                  goal={projectData?.fundingGoal}
                  currency="CFA" />

              </div>

              <div className="bg-card border border-border rounded-xl overflow-hidden">
                <div className="flex border-b border-border overflow-x-auto">
                  {tabs?.map((tab) =>
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-all whitespace-nowrap min-h-[56px] ${
                    activeTab === tab?.id ?
                    'text-primary border-b-2 border-primary bg-primary/5' : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'}`
                    }>

                      <Icon name={tab?.icon} size={18} />
                      <span>{tab?.label}</span>
                    </button>
                  )}
                </div>

                <div className="p-6 lg:p-8">
                  <ProjectTabContent activeTab={activeTab} projectData={projectData} />
                </div>
              </div>

              <InvestorComments comments={investorComments} />
            </div>

            <div className="lg:col-span-1">
              <div className="hidden lg:block">
                <InvestmentPanel projectData={projectData} onInvest={() => {}} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:hidden fixed bottom-20 left-0 right-0 p-4 bg-gradient-to-t from-background via-background to-transparent z-50">
        <button
          onClick={() => setIsMobileInvestmentOpen(true)}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg min-h-[56px]">

          <Icon name="TrendingUp" size={20} />
          <span>Investir Maintenant</span>
        </button>
      </div>
      {isMobileInvestmentOpen &&
      <div className="lg:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-[150] flex items-end">
          <div className="bg-card w-full rounded-t-2xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-foreground">Investir</h3>
              <button
              onClick={() => setIsMobileInvestmentOpen(false)}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-muted transition-colors">

                <Icon name="X" size={24} />
              </button>
            </div>
            <InvestmentPanel projectData={projectData} onInvest={() => {}} />
          </div>
        </div>
      }
      <MobileBottomNav />
    </div>);

};

export default ProjectDetails;