import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import MobileBottomNav from '../../components/ui/MobileBottomNav';
import Icon from '../../components/AppIcon';
import TransactionRow from './components/TransactionRow';
import TransactionCard from './components/TransactionCard';
import FilterPanel from './components/FilterPanel';
import PerformanceChart from './components/PerformanceChart';
import SectorAllocationChart from './components/SectorAllocationChart';
import WithdrawalHistory from './components/WithdrawalHistory';
import SummaryStats from './components/SummaryStats';

const InvestmentHistory = () => {
  const [filters, setFilters] = useState({
    sector: 'all',
    type: 'all',
    performance: 'all',
    dateFrom: '',
    dateTo: ''
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const transactions = [
  {
    id: 1,
    projectName: "Résidence Les Palmiers",
    projectImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1e43590e5-1765223536583.png",
    projectImageAlt: "Luxury residential building with palm trees and modern architecture in tropical setting",
    sector: "Immobilier",
    date: "15/11/2025",
    type: "Investissement Initial",
    amount: 50000,
    shares: 25,
    currentValue: 56250,
    performance: 12.5,
    terms: "12 mois, 15% rendement annuel",
    projectStatus: "Actif",
    dividendsReceived: 6250,
    projectedReturn: 15
  },
  {
    id: 2,
    projectName: "Restaurant Le Baobab",
    projectImage: "https://images.unsplash.com/photo-1610894803089-0c3283d8d059",
    projectImageAlt: "Elegant restaurant interior with wooden tables, warm lighting and African-inspired decor",
    sector: "Restauration",
    date: "03/10/2025",
    type: "Investissement Initial",
    amount: 30000,
    shares: 15,
    currentValue: 33600,
    performance: 12.0,
    terms: "18 mois, 20% rendement annuel",
    projectStatus: "Actif",
    dividendsReceived: 3600,
    projectedReturn: 20
  },
  {
    id: 3,
    projectName: "TechHub Dakar",
    projectImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1e83fa0dc-1764772276072.png",
    projectImageAlt: "Modern tech office space with computers, collaborative workstations and innovative design",
    sector: "Technologie",
    date: "22/09/2025",
    type: "Réinvestissement",
    amount: 25000,
    shares: 20,
    currentValue: 27500,
    performance: 10.0,
    terms: "24 mois, 25% rendement annuel",
    projectStatus: "Actif",
    dividendsReceived: 2500,
    projectedReturn: 25
  },
  {
    id: 4,
    projectName: "Ferme Agro-Bio",
    projectImage: "https://img.rocket.new/generatedImages/rocket_gen_img_10478fc29-1764745289771.png",
    projectImageAlt: "Organic farm with green crops, irrigation systems and sustainable agriculture practices",
    sector: "Agriculture",
    date: "10/08/2025",
    type: "Investissement Initial",
    amount: 20000,
    shares: 10,
    currentValue: 18000,
    performance: -10.0,
    terms: "36 mois, 18% rendement annuel",
    projectStatus: "En Développement",
    dividendsReceived: 0,
    projectedReturn: 18
  }];


  const performanceData = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    value: 125000 + (Math.random() - 0.3) * 15000
  }));

  const sectorData = [
  { name: "Immobilier", value: 56250, projects: 1, color: "#D4AF37" },
  { name: "Restauration", value: 33600, projects: 1, color: "#10B981" },
  { name: "Technologie", value: 27500, projects: 1, color: "#F59E0B" },
  { name: "Agriculture", value: 18000, projects: 1, color: "#EF4444" }];


  const withdrawals = [
  {
    id: 1,
    method: "Virement Bancaire",
    date: "05/12/2025",
    amount: 15000,
    status: "Complété"
  },
  {
    id: 2,
    method: "Mobile Money",
    date: "20/11/2025",
    amount: 8000,
    status: "En Cours"
  }];


  const summaryStats = {
    totalInvested: 125000,
    totalInvestedChange: 8.5,
    currentValue: 135350,
    currentValueChange: 12.3,
    totalGains: 10350,
    totalGainsPercent: 8.3,
    totalDividends: 12350,
    dividendsCount: 4
  };

  const filteredTransactions = transactions?.filter((transaction) => {
    if (filters?.sector !== 'all' && transaction?.sector?.toLowerCase() !== filters?.sector) return false;
    if (filters?.type !== 'all' && transaction?.type !== filters?.type) return false;
    if (filters?.performance === 'positive' && transaction?.performance <= 0) return false;
    if (filters?.performance === 'negative' && transaction?.performance >= 0) return false;
    if (filters?.performance === 'neutral' && transaction?.performance !== 0) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="content-wrapper">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground">Historique</h1>
          </div>

          <SummaryStats stats={summaryStats} />

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PerformanceChart data={performanceData} title="Évolution du Portefeuille" />
            <SectorAllocationChart sectors={sectorData} />
          </div>

          <div className="mt-8">
            <FilterPanel
              filters={filters}
              onFilterChange={setFilters}
              resultCount={filteredTransactions?.length} />

          </div>

          <div className="mt-8">
            {isMobile ?
            <div className="space-y-4">
                {filteredTransactions?.map((transaction) =>
              <TransactionCard key={transaction?.id} transaction={transaction} />
              )}
              </div> :

            <div className="bg-card border border-border rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted/50 border-b border-border">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Projet</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Date</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Type</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Montant</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Parts</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Valeur Actuelle</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Performance</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-foreground"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTransactions?.map((transaction) =>
                    <TransactionRow key={transaction?.id} transaction={transaction} />
                    )}
                    </tbody>
                  </table>
                </div>
              </div>
            }

            {filteredTransactions?.length === 0 &&
            <div className="bg-card border border-border rounded-xl p-12 text-center">
                <Icon name="Inbox" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
                <p className="text-muted-foreground">Aucune transaction trouvée avec les filtres sélectionnés</p>
              </div>
            }
          </div>

          <div className="mt-8">
            <WithdrawalHistory withdrawals={withdrawals} />
          </div>
        </div>
      </div>
      <MobileBottomNav />
    </div>);

};

export default InvestmentHistory;