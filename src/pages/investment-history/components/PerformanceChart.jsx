import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const PerformanceChart = ({ data, title }) => {
  const [timeRange, setTimeRange] = useState('6M');
  const maxValue = Math.max(...data?.map(d => d?.value));

  const timeRanges = [
    { label: '1M', value: '1M' },
    { label: '3M', value: '3M' },
    { label: '6M', value: '6M' },
    { label: '1A', value: '1A' },
    { label: 'Tout', value: 'ALL' }
  ];

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <div className="flex gap-2">
          {timeRanges?.map((range) => (
            <button
              key={range?.value}
              onClick={() => setTimeRange(range?.value)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                timeRange === range?.value
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              {range?.label}
            </button>
          ))}
        </div>
      </div>
      <div className="h-64 relative">
        <svg width="100%" height="100%" viewBox="0 0 800 256" preserveAspectRatio="none">
          <defs>
            <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          {data?.length > 0 && (
            <>
              <path
                d={`M 0,${256 - (data?.[0]?.value / maxValue) * 200} ${data?.map((point, i) => `L ${(i / (data?.length - 1)) * 800},${256 - (point?.value / maxValue) * 200}`)?.join(' ')} L 800,256 L 0,256 Z`}
                fill="url(#chartGradient)"
              />
              <path
                d={`M 0,${256 - (data?.[0]?.value / maxValue) * 200} ${data?.map((point, i) => `L ${(i / (data?.length - 1)) * 800},${256 - (point?.value / maxValue) * 200}`)?.join(' ')}`}
                fill="none"
                stroke="var(--color-primary)"
                strokeWidth="2"
              />
              {data?.map((point, i) => (
                <circle
                  key={i}
                  cx={(i / (data?.length - 1)) * 800}
                  cy={256 - (point?.value / maxValue) * 200}
                  r="4"
                  fill="var(--color-primary)"
                  className="hover:r-6 transition-all cursor-pointer"
                />
              ))}
            </>
          )}
        </svg>
      </div>
      <div className="mt-4 flex items-center justify-between text-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary"></div>
            <span className="text-muted-foreground">Valeur du Portefeuille</span>
          </div>
        </div>
        <button className="text-primary hover:text-primary/80 transition-colors font-medium flex items-center gap-1">
          <Icon name="Download" size={16} />
          Télécharger
        </button>
      </div>
    </div>
  );
};

export default PerformanceChart;