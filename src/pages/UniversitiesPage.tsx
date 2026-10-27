import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PageLayout } from '../components/layout/PageLayout';
import { UniversityCard } from '../components/universities/UniversityCard';
import { UniversitySearch } from '../components/universities/UniversitySearch';
import { UniversityFilters } from '../components/universities/UniversityFilters';
import {
  getAllUniversities,
  getAzerbaijanUniversities,
  filterUniversities,
} from '../services/universityService';
import { setSelectedUniversitySlug } from '../services/storageService';
import { University } from '../types';
import { GraduationCap, Sparkles, Building2, Plus, X, Check } from 'lucide-react';

export const UniversitiesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialCountry = searchParams.get('country') || 'All Countries';

  const [query, setQuery] = useState(initialQuery);
  const [selectedCountry, setSelectedCountry] = useState(initialCountry);
  const [azerbaijanOnly, setAzerbaijanOnly] = useState(initialCountry === 'Azerbaijan');
  const [showSuggestModal, setShowSuggestModal] = useState(false);
  const [suggestName, setSuggestName] = useState('');
  const [suggestCountry, setSuggestCountry] = useState('');
  const [suggestSuccess, setSuggestSuccess] = useState(false);

  const allUnis = getAllUniversities();
  const azUnis = getAzerbaijanUniversities();

  const filtered = filterUniversities(allUnis, {
    query,
    country: azerbaijanOnly ? 'Azerbaijan' : selectedCountry,
    azerbaijanOnly,
  });

  const handleSelectUni = (uni: University) => {
    setSelectedUniversitySlug(uni.slug);
  };

  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country);
    if (country === 'Azerbaijan') {
      setAzerbaijanOnly(true);
    } else {
      setAzerbaijanOnly(false);
    }
  };

  const handleToggleAzerbaijan = (val: boolean) => {
    setAzerbaijanOnly(val);
    if (val) {
      setSelectedCountry('Azerbaijan');
    } else {
      setSelectedCountry('All Countries');
    }
  };

  const handleSuggestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!suggestName.trim()) return;
    setSuggestSuccess(true);
    setTimeout(() => {
      setSuggestSuccess(false);
      setShowSuggestModal(false);
      setSuggestName('');
      setSuggestCountry('');
    }, 1800);
  };

  return (
    <PageLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary">
            <Building2 size={13} />
            <span>Campus Gateway</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Global University Directory
          </h1>
          <p className="text-xs sm:text-sm theme-text-muted leading-relaxed">
            Choose your university to enter its private student confessions, academic note library,
            and live chat discussion rooms.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <UniversitySearch
            value={query}
            onChange={setQuery}
            totalResults={filtered.length}
          />

          <UniversityFilters
            selectedCountry={selectedCountry}
            onSelectCountry={handleCountrySelect}
            azerbaijanOnly={azerbaijanOnly}
            onToggleAzerbaijanOnly={handleToggleAzerbaijan}
            onRequestMissing={() => setShowSuggestModal(true)}
          />
        </div>

        {/* Prominent Azerbaijan Section (Shown when no strict conflicting filter is active) */}
        {!query && selectedCountry === 'All Countries' && !azerbaijanOnly && (
          <div className="space-y-4 pt-4 border-t theme-border">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <span>🇦🇿 Universities in Azerbaijan</span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                    {azUnis.length} Institutions
                  </span>
                </h2>
                <p className="text-xs theme-text-muted mt-0.5">
                  Baku State University, ADA, UNEC, BHOS, Khazar, and specialized academies.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {azUnis.map((uni) => (
                <UniversityCard key={uni.id} university={uni} onSelect={handleSelectUni} />
              ))}
            </div>
          </div>
        )}

        {/* Main Grid Section */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">
              {azerbaijanOnly
                ? 'Azerbaijan Campuses'
                : selectedCountry !== 'All Countries'
                ? `Universities in ${selectedCountry}`
                : 'All Global Campuses'}
            </h2>
            <span className="text-xs theme-text-muted">
              Showing {filtered.length} {filtered.length === 1 ? 'result' : 'results'}
            </span>
          </div>

          {filtered.length === 0 ? (
            <div className="p-12 rounded-3xl theme-surface border theme-border text-center space-y-3">
              <GraduationCap size={36} className="mx-auto theme-text-muted opacity-50" />
              <h3 className="font-bold text-base">No universities found matching your search</h3>
              <p className="text-xs theme-text-muted max-w-md mx-auto">
                We couldn’t find an institution with that name or filter. You can submit a suggestion
                and we'll add your university campus community within 24 hours.
              </p>
              <button
                onClick={() => setShowSuggestModal(true)}
                className="px-4 py-2 text-xs font-bold rounded-xl theme-btn-primary shadow-xs"
              >
                Suggest My University
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((uni) => (
                <UniversityCard key={uni.id} university={uni} onSelect={handleSelectUni} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Suggest University Modal */}
      {showSuggestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-md p-6 rounded-2xl theme-surface space-y-4 shadow-2xl relative">
            <button
              onClick={() => setShowSuggestModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg theme-text-muted hover:text-black dark:hover:text-white"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-primary/10 text-primary">
                <Plus size={18} />
              </div>
              <div>
                <h3 className="font-bold text-base">Suggest a University</h3>
                <p className="text-xs theme-text-muted">Add your campus to the global UniVerse network.</p>
              </div>
            </div>

            {suggestSuccess ? (
              <div className="p-6 text-center space-y-2">
                <div className="w-10 h-10 mx-auto rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center">
                  <Check size={20} />
                </div>
                <p className="text-sm font-semibold">Campus Request Submitted</p>
                <p className="text-xs theme-text-muted">
                  Thank you! Our directory coordinators will verify the domain and set up the community feed.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSuggestSubmit} className="space-y-3">
                <div>
                  <label className="text-xs font-semibold block mb-1">University Full Name *</label>
                  <input
                    type="text"
                    required
                    value={suggestName}
                    onChange={(e) => setSuggestName(e.target.value)}
                    placeholder="e.g. Nakhchivan State University"
                    className="w-full px-3 py-2 text-xs rounded-xl theme-input bg-transparent"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold block mb-1">Country & City *</label>
                  <input
                    type="text"
                    required
                    value={suggestCountry}
                    onChange={(e) => setSuggestCountry(e.target.value)}
                    placeholder="e.g. Azerbaijan, Nakhchivan"
                    className="w-full px-3 py-2 text-xs rounded-xl theme-input bg-transparent"
                  />
                </div>
                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowSuggestModal(false)}
                    className="px-4 py-2 text-xs font-medium rounded-xl border theme-border"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-bold rounded-xl theme-btn-primary shadow-xs"
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </PageLayout>
  );
};
