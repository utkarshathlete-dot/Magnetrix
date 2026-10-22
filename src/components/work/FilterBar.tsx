import React from 'react';
import { Filter, Layers, Building2 } from 'lucide-react';
import { SERVICE_FILTERS, ServiceFilter } from '../../utils/workFilters';

interface FilterBarProps {
  selectedService: string;
  onSelectService: (service: string) => void;
  selectedIndustry: string;
  onSelectIndustry: (industry: string) => void;
  availableIndustries: string[];
  showIndustryFilter: boolean;
  totalFilteredCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  selectedService,
  onSelectService,
  selectedIndustry,
  onSelectIndustry,
  availableIndustries,
  showIndustryFilter,
  totalFilteredCount,
}) => {
  return (
    <div className="space-y-4 mb-10">
      {/* Primary Row: Service Filter Chips */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-white/10">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 mr-1 flex items-center gap-1.5 shrink-0">
            <Filter className="w-3.5 h-3.5 text-indigo-400" />
            <span>Service:</span>
          </span>

          {SERVICE_FILTERS.map((service) => {
            const isActive = selectedService === service;
            return (
              <button
                key={service}
                type="button"
                onClick={() => onSelectService(service)}
                aria-pressed={isActive}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-[0_2px_12px_rgba(239,68,68,0.4)] border border-red-400/50'
                    : 'bg-white/[0.04] text-neutral-300 hover:text-white hover:bg-white/[0.08] border border-white/10'
                }`}
              >
                {service}
              </button>
            );
          })}
        </div>

        {/* Counter Pill */}
        <div className="text-xs font-mono text-neutral-400 self-end md:self-auto shrink-0">
          Showing <span className="font-bold text-white">{totalFilteredCount}</span> projects
        </div>
      </div>

      {/* Optional Secondary Row: Industry Filters (rendered only if >= 2 distinct industries exist) */}
      {showIndustryFilter && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none animate-in fade-in duration-200">
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 mr-1 flex items-center gap-1.5 shrink-0">
            <Building2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Industry:</span>
          </span>

          <button
            type="button"
            onClick={() => onSelectIndustry('All')}
            aria-pressed={selectedIndustry === 'All'}
            className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all duration-200 cursor-pointer ${
              selectedIndustry === 'All'
                ? 'bg-indigo-600 text-white shadow-sm border border-indigo-400/40'
                : 'bg-white/[0.03] text-neutral-400 hover:text-neutral-200 border border-white/10'
            }`}
          >
            All Industries
          </button>

          {availableIndustries.map((ind) => {
            const isActive = selectedIndustry === ind;
            return (
              <button
                key={ind}
                type="button"
                onClick={() => onSelectIndustry(ind)}
                aria-pressed={isActive}
                className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm border border-indigo-400/40'
                    : 'bg-white/[0.03] text-neutral-400 hover:text-neutral-200 border border-white/10'
                }`}
              >
                {ind}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
