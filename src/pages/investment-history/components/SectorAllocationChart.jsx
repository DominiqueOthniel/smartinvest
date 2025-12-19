import React from 'react';


const SectorAllocationChart = ({ sectors }) => {
  const total = sectors?.reduce((sum, sector) => sum + sector?.value, 0);
  let currentAngle = 0;

  const createArc = (startAngle, endAngle, radius = 100) => {
    const start = polarToCartesian(120, 120, radius, endAngle);
    const end = polarToCartesian(120, 120, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
    return `M ${start?.x} ${start?.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end?.x} ${end?.y} L 120 120`;
  };

  const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians)
    };
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <h3 className="text-lg font-semibold text-foreground mb-6">Allocation par Secteur</h3>
      <div className="flex flex-col lg:flex-row items-center gap-8">
        <div className="w-64 h-64 relative flex-shrink-0">
          <svg width="240" height="240" viewBox="0 0 240 240">
            {sectors?.map((sector, index) => {
              const percentage = (sector?.value / total) * 100;
              const angle = (percentage / 100) * 360;
              const path = createArc(currentAngle, currentAngle + angle);
              currentAngle += angle;

              return (
                <path
                  key={index}
                  d={path}
                  fill={sector?.color}
                  className="hover:opacity-80 transition-opacity cursor-pointer"
                />
              );
            })}
            <circle cx="120" cy="120" r="60" fill="var(--color-background)" />
            <text x="120" y="115" textAnchor="middle" className="text-2xl font-bold fill-foreground">
              {total?.toLocaleString('fr-FR')}
            </text>
            <text x="120" y="135" textAnchor="middle" className="text-sm fill-muted-foreground">
              CFA Total
            </text>
          </svg>
        </div>

        <div className="flex-1 w-full">
          <div className="space-y-4">
            {sectors?.map((sector, index) => {
              const percentage = ((sector?.value / total) * 100)?.toFixed(1);
              return (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div 
                      className="w-4 h-4 rounded-full flex-shrink-0" 
                      style={{ backgroundColor: sector?.color }}
                    ></div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-foreground">{sector?.name}</div>
                      <div className="text-sm text-muted-foreground">{sector?.projects} projet{sector?.projects !== 1 ? 's' : ''}</div>
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <div className="font-data font-semibold text-foreground">{sector?.value?.toLocaleString('fr-FR')} CFA</div>
                    <div className="text-sm text-primary">{percentage}%</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectorAllocationChart;