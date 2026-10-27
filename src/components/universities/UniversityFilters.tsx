import React from 'react';
import { getDistinctCountries } from '../../services/universityService';
import { Globe, Filter, PlusCircle } from 'lucide-react';

interface UniversityFiltersProps {
  selectedCountry: string;
  onSelectCountry: (country: string) => void;
  azerbaijanOnly: boolean;
  onToggleAzerbaijanOnly: (val: boolean) => void;
  onRequestMissing?: () => void;
}

export const UniversityFilters: React.FC<UniversityFiltersProps> = ({
  selectedCountry,
  onSelectCountry,
  azerbaijanOnly,
  onToggleAzerbaijanOnly,
  onRequestMissing,
}) => {
  const countries = getDistinctCountries();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl theme-surface">
      <div className="flex flex-wrap items-center gap-2">
        {/* Azerbaijan-First Fast Toggle */}
        <button
          onClick={() => onToggleAzerbaijanOnly(!azerbaijanOnly)}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
            azerbaijanOnly
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
              : 'theme-border theme-surface theme-surface-hover text-zinc-700 dark:text-zinc-300'
          }`}
        >
          <span>🇦🇿 Explore Azerbaijan</span>
          {azerbaijanOnly && <span className="text-[10px] bg-white/20 px-1 rounded-full">Active</span>}
        </button>

        {/* Country Selector */}
        <div className="flex items-center gap-1.5 border theme-border rounded-xl px-2.5 py-1.5 bg-black/5 dark:bg-white/5">
          <Globe size={13} className="theme-text-muted" />
          <select
            value={selectedCountry}
            onChange={(e) => onSelectCountry(e.target.value)}
            className="text-xs bg-transparent border-0 focus:outline-none cursor-pointer pr-1"
            aria-label="Filter universities by country"
          >
            <option value="All Countries">All Countries ({countries.reduce((acc, c) => acc + c.count, 0)})</option>
            {countries.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name} ({c.count})
              </option>
            ))}
          </select>
        </div>
      </div>

      {onRequestMissing && (
        <button
          onClick={onRequestMissing}
          className="text-xs flex items-center gap-1.5 theme-text-muted hover:text-primary transition-colors font-medium self-end sm:self-auto"
        >
          <PlusCircle size={14} />
          Can't find your campus? Suggest it
        </button>
      )}
    </div>
  );
};
