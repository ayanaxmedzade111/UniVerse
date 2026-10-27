import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageLayout } from '../components/layout/PageLayout';
import { ResourceCard } from '../components/resources/ResourceCard';
import { ResourceFilters } from '../components/resources/ResourceFilters';
import { getUniversityBySlug } from '../services/universityService';
import { getStoredResources } from '../services/storageService';
import { USEFUL_STUDY_TOOLS } from '../data/sampleResources';
import { BookOpen, ExternalLink, Sparkles, Plus } from 'lucide-react';

export const ResourcesPage: React.FC = () => {
  const { universitySlug } = useParams<{ universitySlug: string }>();
  const slug = universitySlug || 'ada-university';
  const university = getUniversityBySlug(slug);

  const [selectedType, setSelectedType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const allResources = getStoredResources().filter(
    (r) => slug === 'all' || r.universitySlug === slug
  );

  const filteredResources = allResources.filter((r) => {
    if (selectedType !== 'All' && r.resourceType !== selectedType) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchTitle = r.title.toLowerCase().includes(q);
      const matchSubject = r.courseSubject.toLowerCase().includes(q);
      const matchDesc = r.description.toLowerCase().includes(q);
      const matchTag = r.tags.some((t) => t.toLowerCase().includes(q));
      return matchTitle || matchSubject || matchDesc || matchTag;
    }
    return true;
  });

  return (
    <PageLayout>
      <div className="space-y-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-6 theme-border">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                Knowledge Exchange
              </span>
              <span className="text-xs theme-text-muted">• {university?.name || 'All Campuses'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Academic Notes & Exam Preparation
            </h1>
            <p className="text-xs theme-text-muted mt-0.5">
              Verified lecture summaries, formulas, and study guides contributed by fellow students.
            </p>
          </div>

          <Link
            to={`/universities/${slug}/resources/new`}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold theme-btn-primary shadow-xs self-start sm:self-auto"
          >
            <Plus size={15} />
            <span>Share Your Notes</span>
          </Link>
        </div>

        {/* Filters */}
        <ResourceFilters
          selectedType={selectedType}
          onSelectType={setSelectedType}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          universitySlug={slug}
        />

        {/* Resources Grid */}
        {filteredResources.length === 0 ? (
          <div className="p-12 rounded-3xl theme-surface border theme-border text-center space-y-3">
            <BookOpen size={36} className="mx-auto theme-text-muted opacity-50" />
            <h3 className="font-bold text-base">No study resources found</h3>
            <p className="text-xs theme-text-muted max-w-sm mx-auto">
              Be the first student to upload a midterm formula sheet or lecture notes for this course!
            </p>
            <Link
              to={`/universities/${slug}/resources/new`}
              className="px-4 py-2 text-xs font-bold rounded-xl theme-btn-primary shadow-xs inline-block"
            >
              Upload Notes
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((res) => (
              <ResourceCard key={res.id} resource={res} />
            ))}
          </div>
        )}

        {/* Curated Useful Study Tools Section */}
        <div className="pt-8 border-t theme-border space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Sparkles size={18} className="text-amber-500" />
                Useful Study Tools for University Students
              </h2>
              <p className="text-xs theme-text-muted mt-0.5">
                Hand-picked research, LaTeX, citation, and computational tools.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {USEFUL_STUDY_TOOLS.map((tool) => (
              <a
                key={tool.id}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl theme-surface border theme-border hover:border-primary/50 transition-all flex flex-col justify-between space-y-3 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold group-hover:text-primary transition-colors">
                      {tool.name}
                    </span>
                    <ExternalLink size={13} className="theme-text-muted group-hover:text-primary" />
                  </div>
                  <p className="text-xs theme-text-muted leading-relaxed">{tool.description}</p>
                </div>
                {tool.badge && (
                  <span className="text-[10px] font-semibold text-primary self-start px-2 py-0.5 rounded-md bg-primary/10">
                    {tool.badge}
                  </span>
                )}
              </a>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
