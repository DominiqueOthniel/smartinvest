import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const PortfolioPerformanceWidget = ({ 
  totalValue = 125000,
  currency = 'CFA',
  changePercent = 12.5,
  changeAmount = 13889,
  isLoading = false 
}) => {
  const [chartData, setChartData] = useState([]);
  const isPositive = changePercent >= 0;

  useEffect(() => {
    const mockData = Array.from({ length: 30 }, (_, i) => ({
      day: i + 1,
      value: totalValue * (0.85 + Math.random() * 0.3)
    }));
    setChartData(mockData);
  }, [totalValue]);

  if (isLoading) {
    return (
      <div className="portfolio-widget">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/3 mb-4"></div>
          <div className="h-12 bg-muted rounded w-1/2 mb-2"></div>
          <div className="h-6 bg-muted rounded w-1/4 mb-6"></div>
          <div className="h-64 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="portfolio-widget">
      <div className="portfolio-widget-header">
        <div>
          <h3 className="portfolio-widget-title">Valeur du Portefeuille</h3>
          <div className="portfolio-widget-value">
            {totalValue?.toLocaleString('fr-FR')} {currency}
          </div>
          <div className={`portfolio-widget-change ${isPositive ? 'positive' : 'negative'}`}>
            <Icon name={isPositive ? 'TrendingUp' : 'TrendingDown'} size={16} />
            <span>{isPositive ? '+' : ''}{changePercent}%</span>
            <span className="text-muted-foreground">
              ({isPositive ? '+' : ''}{changeAmount?.toLocaleString('fr-FR')} {currency})
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-muted rounded-lg transition-colors">
            <Icon name="RefreshCw" size={18} color="var(--color-muted-foreground)" />
          </button>
          <button className="p-2 hover:bg-muted rounded-lg transition-colors">
            <Icon name="Download" size={18} color="var(--color-muted-foreground)" />
          </button>
        </div>
      </div>
      <div className="portfolio-widget-chart">
        <svg width="100%" height="100%" viewBox="0 0 800 300" preserveAspectRatio="none">
          <defs>
            <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          {chartData?.length > 0 && (
            <>
              <path
                d={`M 0,${300 - (chartData?.[0]?.value / totalValue) * 200} ${chartData?.map((point, i) => `L ${(i / chartData?.length) * 800},${300 - (point?.value / totalValue) * 200}`)?.join(' ')} L 800,300 L 0,300 Z`}
                fill="url(#chartGradient)"
              />
              <path
                d={`M 0,${300 - (chartData?.[0]?.value / totalValue) * 200} ${chartData?.map((point, i) => `L ${(i / chartData?.length) * 800},${300 - (point?.value / totalValue) * 200}`)?.join(' ')}`}
                fill="none"
                stroke="var(--color-primary)"
                strokeWidth="2"
              />
            </>
          )}
        </svg>
      </div>
      <div className="flex justify-between items-center mt-4 text-sm text-muted-foreground">
        <span>30 derniers jours</span>
        <div className="flex gap-4">
          <button className="hover:text-foreground transition-colors">1M</button>
          <button className="hover:text-foreground transition-colors">3M</button>
          <button className="text-primary">6M</button>
          <button className="hover:text-foreground transition-colors">1A</button>
          <button className="hover:text-foreground transition-colors">Tout</button>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPerformanceWidget;