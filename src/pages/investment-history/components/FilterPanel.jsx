import React from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const FilterPanel = ({ filters, onFilterChange, resultCount }) => {
  const sectorOptions = [
    { value: 'all', label: 'Tous les Secteurs' },
    { value: 'immobilier', label: 'Immobilier' },
    { value: 'restauration', label: 'Restauration' },
    { value: 'technologie', label: 'Technologie' },
    { value: 'agriculture', label: 'Agriculture' }
  ];

  const typeOptions = [
    { value: 'all', label: 'Tous les Types' },
    { value: 'Investissement Initial', label: 'Investissement Initial' },
    { value: 'Réinvestissement', label: 'Réinvestissement' },
    { value: 'Dividende', label: 'Dividende' },
    { value: 'Retrait', label: 'Retrait' }
  ];

  const performanceOptions = [
    { value: 'all', label: 'Toutes Performances' },
    { value: 'positive', label: 'Gains Positifs' },
    { value: 'negative', label: 'Pertes' },
    { value: 'neutral', label: 'Stable' }
  ];

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Icon name="Filter" size={20} color="var(--color-primary)" />
          Filtres Avancés
        </h2>
        <button 
          onClick={() => onFilterChange({ sector: 'all', type: 'all', performance: 'all', dateFrom: '', dateTo: '' })}
          className="text-sm text-primary hover:text-primary/80 transition-colors font-medium flex items-center gap-1"
        >
          <Icon name="RotateCcw" size={16} />
          Réinitialiser
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <Select
          label="Secteur"
          options={sectorOptions}
          value={filters?.sector}
          onChange={(value) => onFilterChange({ ...filters, sector: value })}
        />

        <Select
          label="Type de Transaction"
          options={typeOptions}
          value={filters?.type}
          onChange={(value) => onFilterChange({ ...filters, type: value })}
        />

        <Select
          label="Performance"
          options={performanceOptions}
          value={filters?.performance}
          onChange={(value) => onFilterChange({ ...filters, performance: value })}
        />

        <div className="flex items-end">
          <button className="w-full px-4 py-2.5 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium flex items-center justify-center gap-2">
            <Icon name="Download" size={18} />
            Exporter
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Date de Début"
          type="date"
          value={filters?.dateFrom}
          onChange={(e) => onFilterChange({ ...filters, dateFrom: e?.target?.value })}
        />

        <Input
          label="Date de Fin"
          type="date"
          value={filters?.dateTo}
          onChange={(e) => onFilterChange({ ...filters, dateTo: e?.target?.value })}
        />
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Résultats trouvés</span>
          <span className="font-semibold text-foreground">{resultCount} transaction{resultCount !== 1 ? 's' : ''}</span>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;