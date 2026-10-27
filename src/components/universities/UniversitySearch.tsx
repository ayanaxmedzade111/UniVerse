import React from 'react';
import { Search, X } from 'lucide-react';

interface UniversitySearchProps {
  value: string;
  onChange: (val: string) => void;
  totalResults: number;
}

export const UniversitySearch: React.FC<UniversitySearchProps> = ({ value, onChange, totalResults }) => {
  return (
    <div className="relative w-full">
      <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 theme-text-muted" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search universities by name (e.g. ADA, BSU, UNEC, Oxford), city or acronym..."
        className="w-full pl-11 pr-24 py-3.5 text-sm rounded-2xl theme-input bg-transparent shadow-xs"
        aria-label="Search universities"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-14 top-1/2 -translate-y-1/2 p-1 rounded-full theme-text-muted hover:text-black dark:hover:text-white"
          aria-label="Clear search"
        >
          <X size={15} />
        </button>
      )}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold theme-text-muted pointer-events-none">
        {totalResults} {totalResults === 1 ? 'campus' : 'campuses'}
      </div>
    </div>
  );
};
