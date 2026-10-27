import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageLayout } from '../components/layout/PageLayout';
import { ConfessionCard } from '../components/confessions/ConfessionCard';
import { ConfessionFilters } from '../components/confessions/ConfessionFilters';
import { getUniversityBySlug } from '../services/universityService';
import { getConfessionsForUniversity } from '../services/confessionService';
import { Plus, Shuffle, MessageSquare, AlertCircle } from 'lucide-react';

export const ConfessionsPage: React.FC = () => {
  const { universitySlug } = useParams<{ universitySlug: string }>();
  const slug = universitySlug || 'ada-university';
  const university = getUniversityBySlug(slug);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'latest' | 'popular' | 'discussed' | 'saved'>('latest');
  const [searchQuery, setSearchQuery] = useState('');
  const [randomModalItem, setRandomModalItem] = useState<any | null>(null);

  const confessions = getConfessionsForUniversity(slug, {
    category: selectedCategory,
    sortBy,
    search: searchQuery,
    savedOnly: sortBy === 'saved',
  });

  const handleRandomConfession = () => {
    if (confessions.length === 0) return;
    const random = confessions[Math.floor(Math.random() * confessions.length)];
    setRandomModalItem(random);
  };

  return (
    <PageLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-6 theme-border">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">
                Anonymous Wall
              </span>
              <span className="text-xs theme-text-muted">• {university?.name || 'All Campuses'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Campus Confessions Feed
            </h1>
            <p className="text-xs theme-text-muted mt-0.5">
              Honest student stories, secret crushes, late-night thoughts, and university comedy.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={handleRandomConfession}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border theme-border theme-surface theme-surface-hover text-xs font-semibold"
              title="Read a random confession"
            >
              <Shuffle size={14} />
              <span>Random</span>
            </button>
            <Link
              to={`/universities/${slug}/confessions/new`}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold theme-btn-primary shadow-xs"
            >
              <Plus size={15} />
              <span>Write a Confession</span>
            </Link>
          </div>
        </div>

        {/* Filters & Sorting */}
        <ConfessionFilters
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          sortBy={sortBy}
          onSelectSort={setSortBy}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Feed List */}
        {confessions.length === 0 ? (
          <div className="p-12 rounded-3xl theme-surface border theme-border text-center space-y-3">
            <MessageSquare size={36} className="mx-auto theme-text-muted opacity-50" />
            <h3 className="font-bold text-base">No confessions found</h3>
            <p className="text-xs theme-text-muted max-w-sm mx-auto">
              {searchQuery || selectedCategory !== 'All'
                ? 'Try clearing your filter or search query.'
                : 'Be the first student to anonymously post your thoughts on this wall!'}
            </p>
            <Link
              to={`/universities/${slug}/confessions/new`}
              className="px-4 py-2 text-xs font-bold rounded-xl theme-btn-primary shadow-xs inline-block"
            >
              Post First Confession
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {confessions.map((c) => (
              <ConfessionCard key={c.id} confession={c} />
            ))}
          </div>
        )}
      </div>

      {/* Random Confession Modal */}
      {randomModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-lg space-y-4">
            <div className="flex items-center justify-between text-white text-xs px-2">
              <span className="font-bold flex items-center gap-1.5">
                <Shuffle size={14} /> Random Campus Pick
              </span>
              <button
                onClick={() => setRandomModalItem(null)}
                className="underline hover:text-zinc-300"
              >
                Close (ESC)
              </button>
            </div>
            <ConfessionCard confession={randomModalItem} />
          </div>
        </div>
      )}
    </PageLayout>
  );
};
