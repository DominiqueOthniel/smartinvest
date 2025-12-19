import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilterToolbar = ({ onFilterChange, projectCounts }) => {
  const [selectedSectors, setSelectedSectors] = useState([]);
  const [investmentRange, setInvestmentRange] = useState([0, 10000000]);
  const [returnRange, setReturnRange] = useState([0, 50]);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const sectors = [
    { id: 'real-estate', label: 'Immobilier', icon: 'Building2', count: projectCounts?.realEstate || 0 },
    { id: 'restaurant', label: 'Restaurant', icon: 'UtensilsCrossed', count: projectCounts?.restaurant || 0 },
    { id: 'technology', label: 'Technologie', icon: 'Cpu', count: projectCounts?.technology || 0 }
  ];

  const statusOptions = [
    { id: 'all', label: 'Tous les projets' },
    { id: 'active', label: 'Actifs' },
    { id: 'closing-soon', label: 'Clôture bientôt' },
    { id: 'new', label: 'Nouveaux' }
  ];

  const handleSectorToggle = (sectorId) => {
    const newSectors = selectedSectors?.includes(sectorId)
      ? selectedSectors?.filter(s => s !== sectorId)
      : [...selectedSectors, sectorId];
    setSelectedSectors(newSectors);
    onFilterChange({ sectors: newSectors, investmentRange, returnRange, status: selectedStatus });
  };

  const handleInvestmentRangeChange = (value, index) => {
    const newRange = [...investmentRange];
    newRange[index] = parseInt(value);
    setInvestmentRange(newRange);
    onFilterChange({ sectors: selectedSectors, investmentRange: newRange, returnRange, status: selectedStatus });
  };

  const handleReturnRangeChange = (value, index) => {
    const newRange = [...returnRange];
    newRange[index] = parseInt(value);
    setReturnRange(newRange);
    onFilterChange({ sectors: selectedSectors, investmentRange, returnRange: newRange, status: selectedStatus });
  };

  const handleStatusChange = (statusId) => {
    setSelectedStatus(statusId);
    onFilterChange({ sectors: selectedSectors, investmentRange, returnRange, status: statusId });
  };

  const handleClearFilters = () => {
    setSelectedSectors([]);
    setInvestmentRange([0, 10000000]);
    setReturnRange([0, 50]);
    setSelectedStatus('all');
    onFilterChange({ sectors: [], investmentRange: [0, 10000000], returnRange: [0, 50], status: 'all' });
  };

  const FilterContent = () => (
    <>
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <Icon name="Grid3x3" size={16} />
          Secteurs d'investissement
        </h3>
        <div className="flex flex-wrap gap-2">
          {sectors?.map((sector) => (
            <button
              key={sector?.id}
              onClick={() => handleSectorToggle(sector?.id)}
              className={`px-4 py-2 rounded-lg border transition-all duration-200 flex items-center gap-2 min-h-[44px] ${
                selectedSectors?.includes(sector?.id)
                  ? 'bg-primary/10 border-primary text-primary' :'bg-card border-border text-muted-foreground hover:border-primary/50'
              }`}
            >
              <Icon name={sector?.icon} size={18} />
              <span className="font-medium">{sector?.label}</span>
              <span className="text-xs opacity-70">({sector?.count})</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <Icon name="Wallet" size={16} />
          Montant d'investissement (CFA)
        </h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label className="text-xs text-muted-foreground mb-1 block">Minimum</label>
              <input
                type="range"
                min="0"
                max="10000000"
                step="100000"
                value={investmentRange?.[0]}
                onChange={(e) => handleInvestmentRangeChange(e?.target?.value, 0)}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <span className="text-sm font-medium text-foreground mt-1 block">
                {investmentRange?.[0]?.toLocaleString('fr-FR')} CFA
              </span>
            </div>
            <div className="flex-1">
              <label className="text-xs text-muted-foreground mb-1 block">Maximum</label>
              <input
                type="range"
                min="0"
                max="10000000"
                step="100000"
                value={investmentRange?.[1]}
                onChange={(e) => handleInvestmentRangeChange(e?.target?.value, 1)}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <span className="text-sm font-medium text-foreground mt-1 block">
                {investmentRange?.[1]?.toLocaleString('fr-FR')} CFA
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <Icon name="TrendingUp" size={16} />
          Rendement estimé (%)
        </h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label className="text-xs text-muted-foreground mb-1 block">Minimum</label>
              <input
                type="range"
                min="0"
                max="50"
                step="1"
                value={returnRange?.[0]}
                onChange={(e) => handleReturnRangeChange(e?.target?.value, 0)}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <span className="text-sm font-medium text-foreground mt-1 block">
                {returnRange?.[0]}%
              </span>
            </div>
            <div className="flex-1">
              <label className="text-xs text-muted-foreground mb-1 block">Maximum</label>
              <input
                type="range"
                min="0"
                max="50"
                step="1"
                value={returnRange?.[1]}
                onChange={(e) => handleReturnRangeChange(e?.target?.value, 1)}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <span className="text-sm font-medium text-foreground mt-1 block">
                {returnRange?.[1]}%
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <Icon name="Filter" size={16} />
          Statut du projet
        </h3>
        <div className="flex flex-wrap gap-2">
          {statusOptions?.map((status) => (
            <button
              key={status?.id}
              onClick={() => handleStatusChange(status?.id)}
              className={`px-4 py-2 rounded-lg border transition-all duration-200 min-h-[44px] ${
                selectedStatus === status?.id
                  ? 'bg-primary/10 border-primary text-primary' :'bg-card border-border text-muted-foreground hover:border-primary/50'
              }`}
            >
              <span className="font-medium">{status?.label}</span>
            </button>
          ))}
        </div>
      </div>

      <Button
        variant="outline"
        onClick={handleClearFilters}
        iconName="X"
        iconPosition="left"
        fullWidth
      >
        Réinitialiser les filtres
      </Button>
    </>
  );

  return (
    <>
      {/* Desktop Filter Toolbar */}
      <div className="hidden lg:block bg-card border border-border rounded-xl p-6 mb-6">
        <FilterContent />
      </div>
      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          onClick={() => setIsFilterOpen(true)}
          iconName="SlidersHorizontal"
          iconPosition="left"
          fullWidth
        >
          Filtres ({selectedSectors?.length > 0 ? selectedSectors?.length : 'Aucun'})
        </Button>
      </div>
      {/* Mobile Filter Drawer */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-[200] lg:hidden">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsFilterOpen(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-card border-t border-border rounded-t-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Filtres</h2>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <Icon name="X" size={20} />
              </button>
            </div>
            <div className="p-4">
              <FilterContent />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterToolbar;