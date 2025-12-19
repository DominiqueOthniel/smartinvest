import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import MobileBottomNav from '../../components/ui/MobileBottomNav';
import PortfolioPerformanceWidget from '../../components/ui/PortfolioPerformanceWidget';
import InvestmentActionModal from '../../components/ui/InvestmentActionModal';
import MetricCard from './components/MetricCard';
import InvestmentTable from './components/InvestmentTable';
import FundedProjectCard from './components/FundedProjectCard';
import NewsUpdateCard from './components/NewsUpdateCard';
import QuickActionCard from './components/QuickActionCard';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const InvestmentDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('investments');
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const metricsData = [
  {
    title: 'Total Investi',
    value: 2450000,
    currency: 'CFA',
    change: '15.2%',
    changeType: 'positive',
    icon: 'Wallet',
    iconColor: 'var(--color-primary)'
  },
  {
    title: 'Valeur du Portefeuille',
    value: 2750000,
    currency: 'CFA',
    change: '12.5%',
    changeType: 'positive',
    icon: 'TrendingUp',
    iconColor: 'var(--color-success)'
  },
  {
    title: 'Parts Détenues',
    value: 847,
    currency: '',
    change: '23',
    changeType: 'positive',
    icon: 'PieChart',
    iconColor: 'var(--color-primary)'
  },
  {
    title: 'Rendement Total',
    value: 300000,
    currency: 'CFA',
    change: '8.7%',
    changeType: 'positive',
    icon: 'DollarSign',
    iconColor: 'var(--color-success)'
  }];


  const investmentsData = [
  {
    id: 1,
    projectName: 'Restaurant Le Baobab',
    projectImage: "https://images.unsplash.com/photo-1552342294-b6cac11f3cec",
    projectImageAlt: 'Modern upscale restaurant interior with elegant wooden tables, ambient lighting, and contemporary African decor',
    sector: 'Restaurant',
    sectorIcon: 'UtensilsCrossed',
    investedAmount: 500000,
    currentValue: 575000,
    gainLoss: 75000,
    returnPercent: 15.0,
    shares: 125,
    status: 'Actif',
    investmentDate: '15/03/2024'
  },
  {
    id: 2,
    projectName: 'Résidence Plateau Premium',
    projectImage: "https://img.rocket.new/generatedImages/rocket_gen_img_196dd5cf5-1764806380137.png",
    projectImageAlt: 'Luxury residential apartment building with modern glass facade and landscaped gardens in urban setting',
    sector: 'Immobilier',
    sectorIcon: 'Building2',
    investedAmount: 1200000,
    currentValue: 1350000,
    gainLoss: 150000,
    returnPercent: 12.5,
    shares: 300,
    status: 'Actif',
    investmentDate: '10/01/2024'
  },
  {
    id: 3,
    projectName: 'TechHub Innovation Center',
    projectImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1fbd9a01b-1765828697210.png",
    projectImageAlt: 'Modern technology workspace with developers working on computers in bright open office environment',
    sector: 'Technologie',
    sectorIcon: 'Laptop',
    investedAmount: 750000,
    currentValue: 825000,
    gainLoss: 75000,
    returnPercent: 10.0,
    shares: 187,
    status: 'Actif',
    investmentDate: '20/02/2024'
  },
  {
    id: 4,
    projectName: 'Café des Arts',
    projectImage: "https://images.unsplash.com/photo-1662461258508-5fcbbd15f7aa",
    projectImageAlt: 'Cozy artistic cafe with exposed brick walls, vintage furniture, and local artwork displayed on walls',
    sector: 'Restaurant',
    sectorIcon: 'Coffee',
    investedAmount: 350000,
    currentValue: 385000,
    gainLoss: 35000,
    returnPercent: 10.0,
    shares: 87,
    status: 'En cours',
    investmentDate: '05/04/2024'
  },
  {
    id: 5,
    projectName: 'Villa Cocody Luxe',
    projectImage: "https://img.rocket.new/generatedImages/rocket_gen_img_126c724c6-1764876554918.png",
    projectImageAlt: 'Luxurious modern villa with white exterior, large windows, swimming pool, and tropical landscaping',
    sector: 'Immobilier',
    sectorIcon: 'Home',
    investedAmount: 800000,
    currentValue: 880000,
    gainLoss: 80000,
    returnPercent: 10.0,
    shares: 200,
    status: 'Actif',
    investmentDate: '12/12/2023'
  }];


  const fundedProjectsData = [
  {
    id: 1,
    name: 'Complexe Commercial Yopougon',
    description: 'Construction d\'un centre commercial moderne avec 50 boutiques, parking souterrain et espaces de restauration dans le quartier dynamique de Yopougon.',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_115f75d78-1764715712431.png",
    imageAlt: 'Modern shopping mall exterior with glass facade, multiple levels, and busy pedestrian plaza',
    sector: 'Immobilier',
    sectorIcon: 'Building2',
    currentFunding: 45000000,
    fundingGoal: 50000000,
    investors: 234,
    estimatedReturn: 18,
    endDate: '2025-03-15'
  },
  {
    id: 2,
    name: 'Plateforme E-commerce Africaine',
    description: 'Développement d\'une plateforme de commerce électronique connectant les artisans locaux aux marchés internationaux avec paiement mobile intégré.',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_177d031cd-1765552528277.png",
    imageAlt: 'Person using smartphone for online shopping with credit card, showing mobile commerce interface',
    sector: 'Technologie',
    sectorIcon: 'ShoppingCart',
    currentFunding: 8500000,
    fundingGoal: 10000000,
    investors: 156,
    estimatedReturn: 25,
    endDate: '2025-02-28'
  },
  {
    id: 3,
    name: 'Chaîne de Restaurants Bio',
    description: 'Expansion d\'une chaîne de restaurants proposant une cuisine africaine bio et locale dans 5 nouvelles villes avec concept farm-to-table.',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1aa19c9f2-1764724468902.png",
    imageAlt: 'Elegant restaurant interior with organic farm-to-table setup, natural wood furniture, and fresh produce display',
    sector: 'Restaurant',
    sectorIcon: 'UtensilsCrossed',
    currentFunding: 12000000,
    fundingGoal: 15000000,
    investors: 189,
    estimatedReturn: 20,
    endDate: '2025-04-30'
  },
  {
    id: 4,
    name: 'Résidence Étudiante Cocody',
    description: 'Construction d\'une résidence moderne pour étudiants avec 120 studios équipés, espaces communs, salle de sport et connexion internet haut débit.',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_135d6a4ba-1764670076219.png",
    imageAlt: 'Modern student residence building with contemporary architecture, balconies, and communal outdoor spaces',
    sector: 'Immobilier',
    sectorIcon: 'GraduationCap',
    currentFunding: 28000000,
    fundingGoal: 30000000,
    investors: 267,
    estimatedReturn: 16,
    endDate: '2025-05-15'
  }];


  const newsUpdatesData = [
  {
    id: 1,
    type: 'success',
    category: 'Dividendes',
    title: 'Distribution de dividendes - Restaurant Le Baobab',
    description: 'Vos dividendes trimestriels de 12,500 CFA ont été crédités sur votre compte. Rendement de 15% ce trimestre.',
    date: '2024-12-18T10:30:00',
    projectName: 'Restaurant Le Baobab',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1f09e6d91-1764715108488.png",
    imageAlt: 'Financial documents showing dividend payment statement with calculator and pen on desk'
  },
  {
    id: 2,
    type: 'announcement',
    category: 'Nouveau Projet',
    title: 'Nouvelle opportunité: Hôtel Boutique Grand-Bassam',
    description: 'Investissez dans la rénovation d\'un hôtel historique en bord de mer. Rendement estimé: 22% annuel. Places limitées.',
    date: '2024-12-18T08:15:00',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_11f3ae9e2-1765661609668.png",
    imageAlt: 'Luxury boutique hotel exterior with colonial architecture, palm trees, and ocean view in background'
  },
  {
    id: 3,
    type: 'update',
    category: 'Mise à jour',
    title: 'TechHub Innovation Center atteint 80% d\'occupation',
    description: 'Le centre d\'innovation a accueilli 15 nouvelles startups ce mois. Augmentation prévue des revenus de 25%.',
    date: '2024-12-17T16:45:00',
    projectName: 'TechHub Innovation',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_156de1f3c-1765438936735.png",
    imageAlt: 'Busy coworking space with entrepreneurs and startup teams collaborating at modern desks'
  },
  {
    id: 4,
    type: 'alert',
    category: 'Action Requise',
    title: 'Assemblée Générale - Résidence Plateau Premium',
    description: 'Vote important sur l\'extension du projet prévu le 25 décembre. Votre participation est essentielle.',
    date: '2024-12-17T14:20:00',
    projectName: 'Résidence Plateau',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_106c6b3a1-1765265243352.png",
    imageAlt: 'Business meeting room with people seated around conference table reviewing documents'
  },
  {
    id: 5,
    type: 'announcement',
    category: 'Communauté',
    title: 'Webinaire: Stratégies d\'investissement immobilier 2025',
    description: 'Rejoignez notre expert le 22 décembre à 18h pour découvrir les meilleures opportunités immobilières de 2025.',
    date: '2024-12-16T11:00:00',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1058e9aaf-1765306384910.png",
    imageAlt: 'Professional presenter giving online webinar presentation with charts and graphs on screen'
  }];


  const quickActionsData = [
  {
    id: 1,
    type: 'invest',
    icon: 'TrendingUp',
    title: 'Nouvel Investissement',
    description: 'Découvrez les opportunités disponibles',
    badge: '12 projets actifs'
  },
  {
    id: 2,
    type: 'withdraw',
    icon: 'Wallet',
    title: 'Retrait de Fonds',
    description: 'Retirez vos gains disponibles',
    badge: '300,000 CFA disponible'
  },
  {
    id: 3,
    type: 'explore',
    icon: 'Search',
    title: 'Explorer les Projets',
    description: 'Parcourez tous les projets financés',
    badge: 'Nouveautés'
  },
  {
    id: 4,
    type: 'settings',
    icon: 'Settings',
    title: 'Paramètres du Compte',
    description: 'Gérez vos préférences',
    badge: null
  }];


  const handleViewDetails = (id) => {
    navigate('/project-details', { state: { projectId: id } });
  };

  const handleInvest = (id) => {
    navigate('/investment-opportunities', { state: { projectId: id } });
  };

  const handleQuickAction = (action) => {
    if (action?.type === 'invest') {
      navigate('/investment-opportunities');
    } else if (action?.type === 'withdraw') {
      setSelectedAction(action);
      setIsActionModalOpen(true);
    } else if (action?.type === 'explore') {
      navigate('/investment-opportunities');
    } else if (action?.type === 'settings') {
      navigate('/account-settings');
    }
  };

  const handleWithdrawalRequest = () => {
    setIsActionModalOpen(false);
    alert('Demande de retrait soumise avec succès. Vous recevrez une confirmation par email.');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="content-wrapper">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
              Tableau de Bord
            </h1>
            <p className="text-muted-foreground">
              Bienvenue, Kofi Mensah. Voici un aperçu de vos investissements.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
            {metricsData?.map((metric, index) =>
            <MetricCard key={index} {...metric} isLoading={isLoading} />
            )}
          </div>

          <div className="mb-8">
            <PortfolioPerformanceWidget
              totalValue={2750000}
              currency="CFA"
              changePercent={12.5}
              changeAmount={300000}
              isLoading={isLoading} />

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-foreground">Mes Investissements</h2>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Download">

                      Exporter
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      iconName="Plus"
                      onClick={() => navigate('/investment-opportunities')}>

                      Investir
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
                  <button
                    onClick={() => setActiveTab('investments')}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all whitespace-nowrap ${
                    activeTab === 'investments' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`
                    }>

                    <div className="flex items-center gap-2">
                      <Icon name="TrendingUp" size={16} />
                      Mes Investissements
                    </div>
                  </button>
                  <button
                    onClick={() => setActiveTab('funded')}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all whitespace-nowrap ${
                    activeTab === 'funded' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`
                    }>

                    <div className="flex items-center gap-2">
                      <Icon name="Target" size={16} />
                      Projets Financés
                    </div>
                  </button>
                  <button
                    onClick={() => setActiveTab('history')}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all whitespace-nowrap ${
                    activeTab === 'history' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`
                    }>

                    <div className="flex items-center gap-2">
                      <Icon name="History" size={16} />
                      Historique
                    </div>
                  </button>
                </div>

                {activeTab === 'investments' &&
                <InvestmentTable
                  investments={investmentsData}
                  onViewDetails={handleViewDetails}
                  onInvest={handleInvest} />

                }

                {activeTab === 'funded' &&
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {fundedProjectsData?.map((project) =>
                  <FundedProjectCard
                    key={project?.id}
                    project={project}
                    onViewDetails={handleViewDetails} />

                  )}
                  </div>
                }

                {activeTab === 'history' &&
                <div className="text-center py-12">
                    <Icon name="History" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">Historique Complet</h3>
                    <p className="text-muted-foreground mb-6">
                      Consultez l'historique détaillé de toutes vos transactions
                    </p>
                    <Button
                    variant="outline"
                    iconName="ArrowRight"
                    iconPosition="right"
                    onClick={() => navigate('/investment-history')}>

                      Voir l'Historique Complet
                    </Button>
                  </div>
                }
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-foreground">Actions Rapides</h2>
                  <Icon name="Zap" size={20} color="var(--color-primary)" />
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {quickActionsData?.map((action) =>
                  <QuickActionCard
                    key={action?.id}
                    action={action}
                    onClick={() => handleQuickAction(action)} />

                  )}
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-foreground">Actualités</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Bell">

                    <span className="hidden sm:inline">Tout voir</span>
                  </Button>
                </div>
                <div className="space-y-4">
                  {newsUpdatesData?.slice(0, 4)?.map((update) =>
                  <NewsUpdateCard key={update?.id} update={update} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <MobileBottomNav />
      <InvestmentActionModal
        isOpen={isActionModalOpen}
        onClose={() => setIsActionModalOpen(false)}
        title="Demande de Retrait">

        <div className="space-y-6">
          <div className="bg-muted/50 border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Montant Disponible</span>
              <span className="text-2xl font-bold text-primary font-data">300,000 CFA</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Gains disponibles pour retrait immédiat
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Montant à Retirer
              </label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="Entrez le montant"
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  max={300000} />

                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                  CFA
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Méthode de Retrait
              </label>
              <select className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                <option>Virement Bancaire</option>
                <option>Mobile Money</option>
                <option>Chèque</option>
              </select>
            </div>

            <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Icon name="AlertCircle" size={20} color="var(--color-warning)" className="flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-warning mb-1">Délai de Traitement</p>
                  <p className="text-xs text-muted-foreground">
                    Les retraits sont traités sous 2-3 jours ouvrables. Des frais de 2% s'appliquent.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              fullWidth
              onClick={() => setIsActionModalOpen(false)}>

              Annuler
            </Button>
            <Button
              variant="default"
              fullWidth
              iconName="Check"
              onClick={handleWithdrawalRequest}>

              Confirmer le Retrait
            </Button>
          </div>
        </div>
      </InvestmentActionModal>
    </div>);

};

export default InvestmentDashboard;