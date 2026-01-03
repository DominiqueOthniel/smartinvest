import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import MobileBottomNav from '../../components/ui/MobileBottomNav';
import FilterToolbar from './components/FilterToolbar';
import SortControls from './components/SortControls';
import ProjectCard from './components/ProjectCard';
import EmptyState from './components/EmptyState';

const InvestmentOpportunities = () => {
  const [filters, setFilters] = useState({
    sectors: [],
    investmentRange: [0, 10000000],
    returnRange: [0, 50],
    status: 'all'
  });
  const [sortBy, setSortBy] = useState('popularity');
  const [filteredProjects, setFilteredProjects] = useState([]);

  const mockProjects = [
  {
    id: 1,
    title: "Résidence Luxe Abidjan Plateau",
    description: "Investissement dans un complexe résidentiel haut de gamme au cœur du Plateau avec vue panoramique sur la lagune Ébrié",
    sector: "real-estate",
    sectorLabel: "Immobilier",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1e43590e5-1765223536583.png",
    imageAlt: "Modern luxury residential building with glass facade and palm trees in tropical urban setting at sunset",
    minInvestment: 500000,
    estimatedReturn: 18,
    fundingProgress: 67,
    currentFunding: 33500000,
    fundingGoal: 50000000,
    daysRemaining: 45,
    isNew: false
  },
  {
    id: 2,
    title: "Restaurant Gastronomique Cocody",
    description: "Ouverture d\'un restaurant fusion africain-français dans le quartier prisé de Cocody avec terrasse panoramique",
    sector: "restaurant",
    sectorLabel: "Restaurant",
    image: "https://images.unsplash.com/photo-1647695822638-a40e238ddc39",
    imageAlt: "Elegant upscale restaurant interior with modern lighting, wooden tables, and sophisticated dining atmosphere",
    minInvestment: 250000,
    estimatedReturn: 25,
    fundingProgress: 82,
    currentFunding: 16400000,
    fundingGoal: 20000000,
    daysRemaining: 12,
    isNew: false
  },
  {
    id: 3,
    title: "Plateforme E-commerce Afrique de l\'Ouest",
    description: "Développement d\'une marketplace digitale connectant producteurs locaux et consommateurs dans 8 pays de la CEDEAO",
    sector: "technology",
    sectorLabel: "Technologie",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1c7085398-1764660533982.png",
    imageAlt: "Modern tech workspace with multiple computer screens showing e-commerce platform interface and analytics dashboards",
    minInvestment: 100000,
    estimatedReturn: 35,
    fundingProgress: 45,
    currentFunding: 22500000,
    fundingGoal: 50000000,
    daysRemaining: 60,
    isNew: true
  },
  {
    id: 4,
    title: "Centre Commercial Grand-Bassam",
    description: "Construction d\'un centre commercial moderne dans la zone touristique de Grand-Bassam avec 50 boutiques et espaces de loisirs",
    sector: "real-estate",
    sectorLabel: "Immobilier",
    image: "https://images.unsplash.com/photo-1686555594350-c8d5f0d9acaa",
    imageAlt: "Contemporary shopping mall exterior with glass architecture, palm trees, and modern design in coastal setting",
    minInvestment: 750000,
    estimatedReturn: 22,
    fundingProgress: 38,
    currentFunding: 38000000,
    fundingGoal: 100000000,
    daysRemaining: 90,
    isNew: true
  },
  {
    id: 5,
    title: "Chaîne de Cafés Artisanaux",
    description: "Expansion d\'une chaîne de cafés spécialisés dans le café ivoirien premium avec 5 nouvelles ouvertures prévues",
    sector: "restaurant",
    sectorLabel: "Restaurant",
    image: "https://images.unsplash.com/photo-1689475299375-b6b45ca0c56b",
    imageAlt: "Cozy artisan coffee shop interior with wooden furniture, warm lighting, and barista preparing specialty coffee",
    minInvestment: 150000,
    estimatedReturn: 20,
    fundingProgress: 91,
    currentFunding: 9100000,
    fundingGoal: 10000000,
    daysRemaining: 5,
    isNew: false
  },
  {
    id: 6,
    title: "Application Fintech Mobile Money",
    description: "Lancement d'une solution de paiement mobile innovante intégrant intelligence artificielle pour la gestion budgétaire",
    sector: "technology",
    sectorLabel: "Technologie",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_165991d4f-1765268763579.png",
    imageAlt: "Smartphone displaying modern fintech mobile banking app interface with financial charts and payment features",
    minInvestment: 200000,
    estimatedReturn: 40,
    fundingProgress: 55,
    currentFunding: 27500000,
    fundingGoal: 50000000,
    daysRemaining: 30,
    isNew: true
  },
  {
    id: 7,
    title: "Complexe Hôtelier Assinie",
    description: "Développement d\'un resort écologique 4 étoiles sur la côte d\'Assinie avec 80 chambres et centre de bien-être",
    sector: "real-estate",
    sectorLabel: "Immobilier",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_11f3ae9e2-1765661609668.png",
    imageAlt: "Luxury beachfront resort hotel with infinity pool, palm trees, and ocean view at tropical coastal location",
    minInvestment: 1000000,
    estimatedReturn: 28,
    fundingProgress: 72,
    currentFunding: 108000000,
    fundingGoal: 150000000,
    daysRemaining: 75,
    isNew: false
  },
  {
    id: 8,
    title: "Restaurant Fast-Food Local",
    description: "Création d\'une chaîne de restauration rapide valorisant la cuisine ivoirienne traditionnelle avec concept moderne",
    sector: "restaurant",
    sectorLabel: "Restaurant",
    image: "https://images.unsplash.com/photo-1666706450189-12b27c0da67c",
    imageAlt: "Modern fast food restaurant interior with bright colors, contemporary seating, and efficient service counter design",
    minInvestment: 300000,
    estimatedReturn: 30,
    fundingProgress: 48,
    currentFunding: 7200000,
    fundingGoal: 15000000,
    daysRemaining: 40,
    isNew: false
  },
  {
    id: 9,
    title: "Startup AgriTech Drones",
    description: "Technologie de drones pour l\'agriculture de précision aidant les fermiers à optimiser rendements et irrigation",
    sector: "technology",
    sectorLabel: "Technologie",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1b9614dda-1765215262247.png",
    imageAlt: "Agricultural drone flying over green farmland with advanced sensors and camera equipment for precision farming",
    minInvestment: 175000,
    estimatedReturn: 38,
    fundingProgress: 63,
    currentFunding: 18900000,
    fundingGoal: 30000000,
    daysRemaining: 55,
    isNew: true
  },
  {
    id: 10,
    title: "Résidence Étudiante Université",
    description: "Construction d\'une résidence moderne pour étudiants près du campus universitaire avec 200 logements équipés",
    sector: "real-estate",
    sectorLabel: "Immobilier",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_135d6a4ba-1764670076219.png",
    imageAlt: "Modern student residence building with colorful facade, balconies, and contemporary architecture near university campus",
    minInvestment: 400000,
    estimatedReturn: 16,
    fundingProgress: 85,
    currentFunding: 42500000,
    fundingGoal: 50000000,
    daysRemaining: 20,
    isNew: false
  },
  {
    id: 11,
    title: "Boulangerie Artisanale Premium",
    description: "Ouverture d\'une boulangerie-pâtisserie française haut de gamme avec produits bio et espace salon de thé",
    sector: "restaurant",
    sectorLabel: "Restaurant",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1b7dc7bb3-1765466244212.png",
    imageAlt: "Artisan bakery interior with fresh bread display, wooden shelves, and warm ambient lighting showcasing premium pastries",
    minInvestment: 225000,
    estimatedReturn: 24,
    fundingProgress: 76,
    currentFunding: 5700000,
    fundingGoal: 7500000,
    daysRemaining: 15,
    isNew: false
  },
  {
    id: 12,
    title: "Plateforme EdTech Formation",
    description: "Développement d'une plateforme d'apprentissage en ligne offrant formations professionnelles certifiantes en français",
    sector: "technology",
    sectorLabel: "Technologie",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1b4292620-1764671097098.png",
    imageAlt: "Modern e-learning platform interface on laptop screen showing online courses, video lessons, and interactive learning tools",
    minInvestment: 125000,
    estimatedReturn: 32,
    fundingProgress: 52,
    currentFunding: 13000000,
    fundingGoal: 25000000,
    daysRemaining: 50,
    isNew: true
  }];


  const projectCounts = {
    realEstate: mockProjects?.filter((p) => p?.sector === 'real-estate')?.length,
    restaurant: mockProjects?.filter((p) => p?.sector === 'restaurant')?.length,
    technology: mockProjects?.filter((p) => p?.sector === 'technology')?.length
  };

  useEffect(() => {
    let filtered = [...mockProjects];

    if (filters?.sectors?.length > 0) {
      filtered = filtered?.filter((project) => filters?.sectors?.includes(project?.sector));
    }

    filtered = filtered?.filter((project) =>
    project?.minInvestment >= filters?.investmentRange?.[0] &&
    project?.minInvestment <= filters?.investmentRange?.[1]
    );

    filtered = filtered?.filter((project) =>
    project?.estimatedReturn >= filters?.returnRange?.[0] &&
    project?.estimatedReturn <= filters?.returnRange?.[1]
    );

    if (filters?.status === 'active') {
      filtered = filtered?.filter((project) => project?.fundingProgress < 100);
    } else if (filters?.status === 'closing-soon') {
      filtered = filtered?.filter((project) => project?.daysRemaining <= 7);
    } else if (filters?.status === 'new') {
      filtered = filtered?.filter((project) => project?.isNew);
    }

    switch (sortBy) {
      case 'popularity':
        filtered?.sort((a, b) => b?.fundingProgress - a?.fundingProgress);
        break;
      case 'return':
        filtered?.sort((a, b) => b?.estimatedReturn - a?.estimatedReturn);
        break;
      case 'deadline':
        filtered?.sort((a, b) => a?.daysRemaining - b?.daysRemaining);
        break;
      case 'min-investment':
        filtered?.sort((a, b) => a?.minInvestment - b?.minInvestment);
        break;
      default:
        break;
    }

    setFilteredProjects(filtered);
  }, [filters, sortBy]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
  };

  const handleClearFilters = () => {
    setFilters({
      sectors: [],
      investmentRange: [0, 10000000],
      returnRange: [0, 50],
      status: 'all'
    });
  };

  return (
    <>
      <Helmet>
        <title>Opportunités d'Investissement - SmartInvest Africa</title>
        <meta name="description" content="Découvrez les meilleures opportunités d'investissement en Afrique de l'Ouest dans l'immobilier, la restauration et la technologie" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="content-wrapper">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-foreground">
                Opportunités
              </h1>
            </div>

            <FilterToolbar
              onFilterChange={handleFilterChange}
              projectCounts={projectCounts} />


            <SortControls
              sortBy={sortBy}
              onSortChange={handleSortChange}
              totalResults={filteredProjects?.length} />


            {filteredProjects?.length > 0 ?
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects?.map((project) =>
              <ProjectCard key={project?.id} project={project} />
              )}
              </div> :

            <EmptyState onClearFilters={handleClearFilters} />
            }
          </div>
        </main>

        <MobileBottomNav />
      </div>
    </>);

};

export default InvestmentOpportunities;