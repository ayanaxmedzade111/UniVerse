import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PageLayout } from '../components/layout/PageLayout';
import { ConfessionCard } from '../components/confessions/ConfessionCard';
import { ResourceCard } from '../components/resources/ResourceCard';
import { getUniversityBySlug } from '../services/universityService';
import {
  getStoredConfessions,
  getStoredResources,
  getStoredRecommendations,
  setSelectedUniversitySlug,
} from '../services/storageService';
import {
  MapPin,
  Users,
  MessageSquare,
  BookOpen,
  MessageCircle,
  Coffee,
  Plus,
  ArrowRight,
  Sparkles,
  CheckCircle,
  ShieldAlert,
  Flame,
} from 'lucide-react';
import { useTheme } from '../components/theme/ThemeProvider';

export const UniversityDashboardPage: React.FC = () => {
  const { universitySlug } = useParams<{ universitySlug: string }>();
  const navigate = useNavigate();
  const { currentColors } = useTheme();

  const slug = universitySlug || 'ada-university';
  const university = getUniversityBySlug(slug);

  // Sync selected university in storage
  useEffect(() => {
    if (slug) {
      setSelectedUniversitySlug(slug);
    }
  }, [slug]);

  if (!university) {
    return (
      <PageLayout>
        <div className="p-12 text-center rounded-3xl theme-surface border theme-border space-y-4 max-w-lg mx-auto">
          <h2 className="text-xl font-bold">University Not Found</h2>
          <p className="text-xs theme-text-muted">
            The university you are looking for does not exist in our directory.
          </p>
          <Link to="/universities" className="px-5 py-2.5 rounded-xl text-xs font-bold theme-btn-primary inline-block">
            Back to Directory
          </Link>
        </div>
      </PageLayout>
    );
  }

  const allConfessions = getStoredConfessions().filter((c) => c.universitySlug === slug);
  const latestConfessions = allConfessions.slice(0, 3);
  const popularConfessions = [...allConfessions].sort((a, b) => b.likes - a.likes).slice(0, 2);

  const allResources = getStoredResources().filter((r) => r.universitySlug === slug);
  const recentResources = allResources.slice(0, 2);

  const recommendations = getStoredRecommendations(slug).slice(0, 3);

  return (
    <PageLayout>
      <div className="space-y-10">
        {/* University Hero Header */}
        <div className="p-6 sm:p-8 rounded-3xl theme-surface border theme-border space-y-6 relative overflow-hidden shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                {university.isAzerbaijan ? (
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                    🇦🇿 Azerbaijan Institution
                  </span>
                ) : (
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/15 text-blue-600 dark:text-blue-400">
                    🌐 {university.country}
                  </span>
                )}
                {university.verified && (
                  <span className="text-xs font-medium text-emerald-500 flex items-center gap-1">
                    <CheckCircle size={13} /> Verified Community
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                {university.name}
              </h1>

              {university.nativeName && (
                <p className="text-sm theme-text-muted italic">
                  {university.nativeName}
                </p>
              )}

              <div className="flex items-center gap-3 text-xs theme-text-muted pt-1 flex-wrap">
                <span className="flex items-center gap-1">
                  <MapPin size={13} className="text-rose-500" />
                  {university.city}, {university.country}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Users size={13} />
                  {university.studentCount} students
                </span>
                <span>•</span>
                <span>Est. {university.foundedYear}</span>
              </div>
            </div>

            {/* Quick Actions Panel */}
            <div className="flex flex-wrap sm:flex-col gap-2 shrink-0">
              <Link
                to={`/universities/${slug}/confessions/new`}
                className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold theme-btn-primary shadow-xs"
              >
                <Plus size={14} />
                Write a Confession
              </Link>
              <Link
                to={`/universities/${slug}/resources/new`}
                className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold border theme-border theme-surface theme-surface-hover"
              >
                <BookOpen size={14} />
                Share Study Notes
              </Link>
              <Link
                to={`/universities/${slug}/chat`}
                className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold border theme-border theme-surface theme-surface-hover"
              >
                <MessageCircle size={14} />
                Open Campus Chat
              </Link>
            </div>
          </div>

          {/* Quick Sub-navigation Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pt-4 border-t theme-border scrollbar-none text-xs font-semibold">
            <Link
              to={`/universities/${slug}/confessions`}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl theme-surface-hover theme-text-muted hover:text-black dark:hover:text-white border theme-border"
            >
              <MessageSquare size={14} />
              <span>Confessions ({allConfessions.length})</span>
            </Link>
            <Link
              to={`/universities/${slug}/resources`}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl theme-surface-hover theme-text-muted hover:text-black dark:hover:text-white border theme-border"
            >
              <BookOpen size={14} />
              <span>Notes & Guides ({allResources.length})</span>
            </Link>
            <Link
              to={`/universities/${slug}/chat`}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl theme-surface-hover theme-text-muted hover:text-black dark:hover:text-white border theme-border"
            >
              <MessageCircle size={14} />
              <span>Discussion Rooms</span>
            </Link>
            <Link
              to={`/universities/${slug}/recommendations`}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl theme-surface-hover theme-text-muted hover:text-black dark:hover:text-white border theme-border"
            >
              <Coffee size={14} />
              <span>Campus Places ({recommendations.length})</span>
            </Link>
          </div>
        </div>

        {/* Community Announcements Strip */}
        <div className="p-3.5 rounded-2xl bg-black/5 dark:bg-white/5 border theme-border flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <Sparkles size={15} className="text-amber-500 shrink-0" />
            <span>
              <strong>Campus Announcement:</strong> Midterm exam period study spaces on floors 2 & 3 have extended opening hours this week.
            </span>
          </div>
          <span className="text-[10px] theme-text-muted shrink-0">Official Student Council</span>
        </div>

        {/* Latest & Popular Confessions Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold tracking-tight">Recent Campus Confessions</h2>
              <p className="text-xs theme-text-muted">Anonymous thoughts from students at {university.shortName}</p>
            </div>
            <Link
              to={`/universities/${slug}/confessions`}
              className="text-xs font-bold text-primary flex items-center gap-1 hover:underline"
            >
              <span>View all ({allConfessions.length})</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          {latestConfessions.length === 0 ? (
            <div className="p-8 rounded-2xl theme-surface border theme-border text-center space-y-2">
              <p className="text-xs theme-text-muted italic">No confessions posted yet for {university.name}.</p>
              <Link
                to={`/universities/${slug}/confessions/new`}
                className="px-4 py-2 rounded-xl text-xs font-bold theme-btn-primary inline-block"
              >
                Be the first to confess
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {latestConfessions.map((c) => (
                <ConfessionCard key={c.id} confession={c} />
              ))}
            </div>
          )}
        </div>

        {/* Academic Notes & Recommendations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Notes Section */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold tracking-tight">Academic Resources</h3>
                <p className="text-xs theme-text-muted">Midterm guides & lecture summaries</p>
              </div>
              <Link
                to={`/universities/${slug}/resources`}
                className="text-xs font-bold text-primary flex items-center gap-1 hover:underline"
              >
                <span>All Notes</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            <div className="space-y-4">
              {recentResources.map((res) => (
                <ResourceCard key={res.id} resource={res} />
              ))}
            </div>
          </div>

          {/* Campus Places Recommendations */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold tracking-tight">Student-Loved Spots</h3>
                <p className="text-xs theme-text-muted">Near {university.shortName} campus</p>
              </div>
              <Link
                to={`/universities/${slug}/recommendations`}
                className="text-xs font-bold text-primary flex items-center gap-1 hover:underline"
              >
                <span>Explore all</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            <div className="space-y-3">
              {recommendations.map((rec) => (
                <div
                  key={rec.id}
                  className="p-4 rounded-2xl theme-surface border theme-border space-y-2 hover:border-primary/40 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-primary block">{rec.category}</span>
                      <h4 className="font-bold text-xs">{rec.name}</h4>
                      <p className="text-[11px] theme-text-muted">{rec.address} • {rec.distanceFromCampus}</p>
                    </div>
                    <span className="text-xs font-bold text-amber-500">★ {rec.rating}</span>
                  </div>
                  <p className="text-xs opacity-80 leading-relaxed line-clamp-2">{rec.description}</p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {rec.tags.map((t) => (
                      <span key={t} className="text-[10px] px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/5 border theme-border theme-text-muted">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
