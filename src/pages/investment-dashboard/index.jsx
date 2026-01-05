import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import MobileBottomNav from '../../components/ui/MobileBottomNav';
import MetricCard from './components/MetricCard';
import InvestmentTable from './components/InvestmentTable';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const InvestmentDashboard = () => {
  const navigate = useNavigate();
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


  const handleViewDetails = (id) => {
    navigate('/project-details', { state: { projectId: id } });
  };

  const handleInvest = (id) => {
    navigate('/investment-opportunities', { state: { projectId: id } });
  };


  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="content-wrapper">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground">
              Tableau de Bord
            </h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
            {metricsData?.map((metric, index) =>
            <MetricCard key={index} {...metric} isLoading={isLoading} />
            )}
          </div>

          <div className="bg-card border border-border rounded-xl p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground">Mes Investissements</h2>
              <Button
                variant="default"
                size="sm"
                iconName="Plus"
                onClick={() => navigate('/investment-opportunities')}>
                Investir
              </Button>
            </div>
            <InvestmentTable
              investments={investmentsData}
              onViewDetails={handleViewDetails}
              onInvest={handleInvest} />
          </div>
        </div>
      </main>
      <MobileBottomNav />
    </div>);

};

export default InvestmentDashboard;