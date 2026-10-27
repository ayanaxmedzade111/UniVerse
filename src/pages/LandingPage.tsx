import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PageLayout } from '../components/layout/PageLayout';
import { UniversitySearch } from '../components/universities/UniversitySearch';
import { UniversityCard } from '../components/universities/UniversityCard';
import { ConfessionCard } from '../components/confessions/ConfessionCard';
import { ResourceCard } from '../components/resources/ResourceCard';
import { AvatarPreview } from '../components/avatar/AvatarPreview';
import { getAzerbaijanUniversities, getAllUniversities, filterUniversities } from '../services/universityService';
import { getStoredConfessions } from '../services/storageService';
import { SAMPLE_RESOURCES, USEFUL_STUDY_TOOLS } from '../data/sampleResources';
import { DEFAULT_AVATAR } from '../data/sampleChat';
import { THEME_PRESETS } from '../data/themePresets';
import { useTheme } from '../components/theme/ThemeProvider';
import {
  Sparkles,
  ArrowRight,
  Shield,
  Palette,
  MessageSquare,
  BookOpen,
  Coffee,
  CheckCircle,
  ExternalLink,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentColors, setPreset, settings } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  const allUnis = getAllUniversities();
  const azUnis = getAzerbaijanUniversities();
  const confessions = getStoredConfessions().slice(0, 3);
  const resources = SAMPLE_RESOURCES.slice(0, 3);

  const searchResults = searchQuery
    ? filterUniversities(allUnis, { query: searchQuery })
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/universities?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/universities');
    }
  };

  return (
    <PageLayout>
      <div className="space-y-16 sm:space-y-24">
        {/* Compact, Thoughtful Hero Section */}
        <section className="text-center max-w-3xl mx-auto space-y-6 pt-4 sm:pt-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold border theme-border bg-black/5 dark:bg-white/5">
            <Sparkles size={14} className="text-primary" />
            <span>A Global Student Community with Anonymity & Theme Freedom</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Your campus. Your people.{' '}
            <span
              className="underline decoration-wavy decoration-2"
              style={{ textDecorationColor: currentColors.primary }}
            >
              Your space.
            </span>
          </h1>

          <p className="text-sm sm:text-base theme-text-muted leading-relaxed max-w-2xl mx-auto">
            UniVerse connects university students across Azerbaijan and worldwide.
            Share anonymous confessions with AI sentiment detection, exchange verified lecture notes,
            find the quietest study cafes, and personalize the interface with 12 aesthetic themes.
          </p>

          {/* University Search Bar */}
          <form onSubmit={handleSearchSubmit} className="max-w-xl mx-auto pt-2">
            <UniversitySearch
              value={searchQuery}
              onChange={setSearchQuery}
              totalResults={allUnis.length}
            />
            {searchQuery && searchResults.length > 0 && (
              <div className="mt-2 p-2 rounded-2xl theme-surface border theme-border shadow-lg text-left max-h-60 overflow-y-auto space-y-1">
                {searchResults.slice(0, 5).map((uni) => (
                  <Link
                    key={uni.id}
                    to={`/universities/${uni.slug}`}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 text-xs transition-colors"
                  >
                    <div>
                      <span className="font-bold block">{uni.name}</span>
                      <span className="theme-text-muted text-[11px]">{uni.city}, {uni.country}</span>
                    </div>
                    <ArrowRight size={13} className="text-primary" />
                  </Link>
                ))}
              </div>
            )}
          </form>

          {/* Quick Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              to="/universities"
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold theme-btn-primary shadow-sm"
            >
              <span>Explore Universities</span>
              <ArrowRight size={15} />
            </Link>
            <Link
              to="/settings"
              className="flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-medium border theme-border theme-surface theme-surface-hover"
            >
              <Palette size={15} />
              <span>Customize Aesthetic</span>
            </Link>
          </div>
        </section>

        {/* Azerbaijan Featured Universities Section */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-1">
                <span>🇦🇿 Special Focus</span>
              </div>
              <h2 className="text-2xl font-extrabold tracking-tight">
                Featured Universities in Azerbaijan
              </h2>
              <p className="text-xs theme-text-muted mt-1">
                Discover active student communities at premier Azerbaijani higher education institutions.
              </p>
            </div>
            <Link
              to="/universities?country=Azerbaijan"
              className="text-xs font-bold text-primary flex items-center gap-1 hover:underline"
            >
              <span>View all 15+ Azerbaijan campuses</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {azUnis.slice(0, 6).map((uni) => (
              <UniversityCard key={uni.id} university={uni} />
            ))}
          </div>
        </section>

        {/* Live Anonymous Confession Feed Preview */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-primary mb-1">
                <MessageSquare size={14} />
                <span>Anonymous Wall</span>
              </div>
              <h2 className="text-2xl font-extrabold tracking-tight">
                Trending Campus Confessions
              </h2>
              <p className="text-xs theme-text-muted mt-1">
                Filtered, analyzed with AI sentiment tags, and completely anonymous to fellow students.
              </p>
            </div>
            <Link
              to="/universities/ada-university/confessions"
              className="text-xs font-bold text-primary flex items-center gap-1 hover:underline"
            >
              <span>Browse all confessions feed</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {confessions.map((conf) => (
              <ConfessionCard key={conf.id} confession={conf} />
            ))}
          </div>
        </section>

        {/* Academic Notes & Study Tools Preview */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-1">
                <BookOpen size={14} />
                <span>Knowledge Exchange</span>
              </div>
              <h2 className="text-2xl font-extrabold tracking-tight">
                Recent Academic Resources
              </h2>
              <p className="text-xs theme-text-muted mt-1">
                Lecture summaries, solved exam prep, and study guides contributed by students.
              </p>
            </div>
            <Link
              to="/universities/ada-university/resources"
              className="text-xs font-bold text-primary flex items-center gap-1 hover:underline"
            >
              <span>Explore student resource repository</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {resources.map((res) => (
              <ResourceCard key={res.id} resource={res} />
            ))}
          </div>
        </section>

        {/* Aesthetic Customization & Cute Avatar Teaser */}
        <section className="p-8 rounded-3xl theme-surface border theme-border relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary">
                <Palette size={13} />
                <span>Total Visual Freedom</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight">
                Express yourself with 12 aesthetic presets & cute 2D vector avatars
              </h3>
              <p className="text-xs sm:text-sm theme-text-muted leading-relaxed">
                Whether you love Kawaii pastels, Dark Academia serif elegance, cyberpunk neon,
                or minimalist brutalism, UniVerse adapts its entire visual identity to your taste.
                Build your signature cute illustrated avatar without realistic AI slop.
              </p>

              {/* Quick Preset Selector Buttons */}
              <div className="flex flex-wrap gap-2 pt-2">
                {Object.values(THEME_PRESETS).slice(0, 6).map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => setPreset(preset.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                      settings.activePresetId === preset.id
                        ? 'theme-btn-primary shadow-xs'
                        : 'border-theme theme-surface hover:border-primary/50'
                    }`}
                  >
                    {preset.name}
                  </button>
                ))}
              </div>

              <div className="pt-3 flex flex-wrap gap-3">
                <Link
                  to="/profile/avatar"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold theme-btn-primary shadow-xs"
                >
                  Create Cute Avatar
                </Link>
                <Link
                  to="/settings"
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold border theme-border theme-surface theme-surface-hover"
                >
                  Open Appearance Panel
                </Link>
              </div>
            </div>

            {/* Avatar showcase */}
            <div className="lg:col-span-5 flex items-center justify-center gap-3">
              <div className="p-3 rounded-2xl bg-black/5 dark:bg-white/5 border theme-border shadow-sm transform -rotate-3 hover:rotate-0 transition-transform">
                <AvatarPreview
                  config={{
                    ...DEFAULT_AVATAR,
                    hairstyle: 'curly',
                    accessories: 'cuteBow',
                    clothingColor: '#ec4899',
                    backgroundColor: '#fce7f3',
                  }}
                  size={120}
                />
              </div>
              <div className="p-3 rounded-2xl bg-black/5 dark:bg-white/5 border theme-border shadow-sm transform rotate-3 hover:rotate-0 transition-transform">
                <AvatarPreview
                  config={{
                    ...DEFAULT_AVATAR,
                    hairstyle: 'wavy',
                    hairColor: '#1a1a1a',
                    glasses: 'roundWire',
                    clothing: 'academiaShirt',
                    clothingColor: '#1e3a8a',
                    backgroundColor: '#fef3c7',
                    backgroundShape: 'squircle',
                  }}
                  size={120}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Useful Study Tools Section */}
        <section className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h3 className="text-xl font-bold tracking-tight">Verified Study Tools</h3>
            <p className="text-xs theme-text-muted">
              Essential productivity, research, and formula tools vetted for university students.
            </p>
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
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold group-hover:text-primary transition-colors">
                      {tool.name}
                    </span>
                    <ExternalLink size={13} className="theme-text-muted group-hover:text-primary" />
                  </div>
                  <p className="text-xs theme-text-muted leading-relaxed">
                    {tool.description}
                  </p>
                </div>
                {tool.badge && (
                  <span className="text-[10px] font-semibold text-primary self-start px-2 py-0.5 rounded-md bg-primary/10">
                    {tool.badge}
                  </span>
                )}
              </a>
            ))}
          </div>
        </section>
      </div>
    </PageLayout>
  );
};
