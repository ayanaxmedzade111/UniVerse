import React from 'react';
import { ConfessionCategory } from '../../types';
import { Search, Flame, Clock, MessageSquare, Bookmark } from 'lucide-react';
import { useTheme } from '../theme/ThemeProvider';

interface ConfessionFiltersProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  sortBy: 'latest' | 'popular' | 'discussed' | 'saved';
  onSelectSort: (sort: 'latest' | 'popular' | 'discussed' | 'saved') => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

const CATEGORIES: ('All' | ConfessionCategory)[] = [
  'All',
  'Love & Crushes',
  'Funny',
  'Gossip',
  'Academic Life',
  'Friendship',
  'Roommates',
  'University Life',
  'Rants',
  'Advice',
  'Secrets',
  'Career',
  'Other',
];

export const ConfessionFilters: React.FC<ConfessionFiltersProps> = ({
  selectedCategory,
  onSelectCategory,
  sortBy,
  onSelectSort,
  searchQuery,
  onSearchChange,
}) => {
  const { currentColors } = useTheme();

  return (
    <div className="space-y-4">
      {/* Top Search & Sort Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 theme-text-muted" />
          <input
            type="text"
            placeholder="Search confessions by keywords, topics, crushes..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl theme-input bg-transparent"
          />
        </div>

        {/* Sort Pill Buttons */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-black/5 dark:bg-white/5 border theme-border self-start sm:self-auto">
          <button
            onClick={() => onSelectSort('latest')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              sortBy === 'latest'
                ? 'theme-btn-primary shadow-xs'
                : 'theme-text-muted hover:text-black dark:hover:text-white'
            }`}
          >
            <Clock size={13} />
            Latest
          </button>
          <button
            onClick={() => onSelectSort('popular')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              sortBy === 'popular'
                ? 'theme-btn-primary shadow-xs'
                : 'theme-text-muted hover:text-black dark:hover:text-white'
            }`}
          >
            <Flame size={13} />
            Popular
          </button>
          <button
            onClick={() => onSelectSort('discussed')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              sortBy === 'discussed'
                ? 'theme-btn-primary shadow-xs'
                : 'theme-text-muted hover:text-black dark:hover:text-white'
            }`}
          >
            <MessageSquare size={13} />
            Discussed
          </button>
          <button
            onClick={() => onSelectSort('saved')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              sortBy === 'saved'
                ? 'theme-btn-primary shadow-xs'
                : 'theme-text-muted hover:text-black dark:hover:text-white'
            }`}
          >
            <Bookmark size={13} />
            Saved
          </button>
        </div>
      </div>

      {/* Horizontal Category Scroll Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                isSelected
                  ? 'text-white border-transparent shadow-xs'
                  : 'theme-surface theme-border theme-text-muted hover:text-black dark:hover:text-white'
              }`}
              style={{
                backgroundColor: isSelected ? currentColors.primary : undefined,
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
};
