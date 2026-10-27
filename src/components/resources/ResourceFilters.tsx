import React from 'react';
import { ResourceType } from '../../types';
import { Search, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ResourceFiltersProps {
  selectedType: string;
  onSelectType: (type: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  universitySlug: string;
}

const RESOURCE_TYPES: ('All' | ResourceType)[] = [
  'All',
  'Study Guide',
  'Lecture Notes',
  'Exam Prep',
  'Course Advice',
  'Study Schedule',
  'Project Material',
  'Survival Tip',
];

export const ResourceFilters: React.FC<ResourceFiltersProps> = ({
  selectedType,
  onSelectType,
  searchQuery,
  onSearchChange,
  universitySlug,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 theme-text-muted" />
          <input
            type="text"
            placeholder="Search notes by subject (e.g. CS201, Calculus, Macroeconomics), topic or professor..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl theme-input bg-transparent"
          />
        </div>

        {/* Share Notes CTA */}
        <Link
          to={`/universities/${universitySlug}/resources/new`}
          className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold theme-btn-primary shadow-xs shrink-0"
        >
          <Plus size={15} />
          Share Study Notes
        </Link>
      </div>

      {/* Resource Types Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {RESOURCE_TYPES.map((type) => {
          const isSelected = selectedType === type;
          return (
            <button
              key={type}
              onClick={() => onSelectType(type)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                isSelected
                  ? 'theme-btn-primary border-transparent shadow-xs'
                  : 'theme-surface theme-border theme-text-muted hover:text-black dark:hover:text-white'
              }`}
            >
              {type}
            </button>
          );
        })}
      </div>
    </div>
  );
};
