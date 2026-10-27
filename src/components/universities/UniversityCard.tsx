import React from 'react';
import { University } from '../../types';
import { Link } from 'react-router-dom';
import { MapPin, Users, BookOpen, MessageSquare, ArrowRight, CheckCircle } from 'lucide-react';
import { useTheme } from '../theme/ThemeProvider';

interface UniversityCardProps {
  university: University;
  onSelect?: (uni: University) => void;
}

export const UniversityCard: React.FC<UniversityCardProps> = ({ university, onSelect }) => {
  const { currentColors } = useTheme();

  return (
    <article className="theme-card p-5 flex flex-col justify-between space-y-4 hover:border-primary/50 transition-all group">
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            {university.isAzerbaijan ? (
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                🇦🇿 Azerbaijan
              </span>
            ) : (
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-600 dark:text-blue-400">
                🌐 {university.country}
              </span>
            )}
            {university.verified && (
              <span className="text-[10px] font-medium text-emerald-500 flex items-center gap-0.5" title="Verified Campus">
                <CheckCircle size={12} />
              </span>
            )}
          </div>
          <span className="text-xs font-mono font-bold opacity-60">
            {university.shortName}
          </span>
        </div>

        {/* University Name & Native Title */}
        <div className="space-y-1">
          <h3 className="font-bold text-base tracking-tight group-hover:text-primary transition-colors">
            {university.name}
          </h3>
          {university.nativeName && (
            <p className="text-xs theme-text-muted italic">
              {university.nativeName}
            </p>
          )}
        </div>

        {/* Location & Details */}
        <div className="flex items-center gap-3 text-xs theme-text-muted pt-2.5">
          <span className="flex items-center gap-1">
            <MapPin size={13} className="text-rose-500" />
            {university.city}, {university.country}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Users size={13} />
            {university.studentCount} students
          </span>
        </div>

        <p className="text-xs line-clamp-2 mt-2.5 opacity-80 leading-relaxed">
          {university.description}
        </p>
      </div>

      {/* Community Stats & Enter Button */}
      <div className="pt-3 border-t theme-border space-y-3">
        <div className="grid grid-cols-2 gap-2 text-center text-xs">
          <div className="p-2 rounded-xl bg-black/5 dark:bg-white/5">
            <span className="font-bold block text-sm">{university.communityStats.confessionsCount}</span>
            <span className="text-[10px] theme-text-muted flex items-center justify-center gap-1">
              <MessageSquare size={10} /> Confessions
            </span>
          </div>
          <div className="p-2 rounded-xl bg-black/5 dark:bg-white/5">
            <span className="font-bold block text-sm">{university.communityStats.resourcesCount}</span>
            <span className="text-[10px] theme-text-muted flex items-center justify-center gap-1">
              <BookOpen size={10} /> Notes & Guides
            </span>
          </div>
        </div>

        <Link
          to={`/universities/${university.slug}`}
          onClick={() => onSelect && onSelect(university)}
          className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-xs font-bold theme-btn-primary shadow-xs group-hover:shadow-md transition-all"
        >
          <span>Enter Community</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  );
};
