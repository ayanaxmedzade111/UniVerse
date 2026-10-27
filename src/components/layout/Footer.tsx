import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Shield, Heart, Globe, Terminal } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t theme-border pt-12 pb-20 lg:pb-12 mt-20 text-xs theme-text-muted" style={{ backgroundColor: 'var(--color-surface)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        {/* Brand */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl flex items-center justify-center theme-btn-primary">
              <Sparkles size={14} className="text-white" />
            </div>
            <span className="font-extrabold text-base tracking-tight text-zinc-900 dark:text-zinc-100">
              UniVerse
            </span>
          </div>
          <p className="text-xs leading-relaxed opacity-80">
            A student-centered global platform where university students share anonymous confessions,
            study materials, campus recommendations, and cute 2D avatars.
          </p>
          <p className="text-[11px] opacity-60">
            Default language: English. Architecture prepared for Azerbaijani & multilingual localization.
          </p>
        </div>

        {/* Campuses & Directory */}
        <div className="space-y-2.5">
          <h4 className="font-bold text-xs uppercase tracking-wider opacity-90">
            Universities
          </h4>
          <ul className="space-y-2">
            <li>
              <Link to="/universities?country=Azerbaijan" className="hover:text-primary transition-colors">
                🇦🇿 Azerbaijan Universities (15+)
              </Link>
            </li>
            <li>
              <Link to="/universities/ada-university" className="hover:text-primary transition-colors">
                ADA University
              </Link>
            </li>
            <li>
              <Link to="/universities/baku-state-university" className="hover:text-primary transition-colors">
                Baku State University
              </Link>
            </li>
            <li>
              <Link to="/universities/unec" className="hover:text-primary transition-colors">
                UNEC (State Economics)
              </Link>
            </li>
            <li>
              <Link to="/universities" className="hover:text-primary transition-colors">
                Explore Global Directory
              </Link>
            </li>
          </ul>
        </div>

        {/* Community & Safety */}
        <div className="space-y-2.5">
          <h4 className="font-bold text-xs uppercase tracking-wider opacity-90">
            Community & Safety
          </h4>
          <ul className="space-y-2">
            <li>
              <Link to="/guidelines" className="hover:text-primary transition-colors flex items-center gap-1.5">
                <Shield size={12} /> Community Guidelines
              </Link>
            </li>
            <li>
              <Link to="/moderation" className="hover:text-primary transition-colors">
                Moderation & Safety Center
              </Link>
            </li>
            <li>
              <Link to="/profile/avatar" className="hover:text-primary transition-colors">
                Cute 2D Avatar Creator
              </Link>
            </li>
            <li>
              <Link to="/settings" className="hover:text-primary transition-colors">
                Theme Presets & Custom Colors
              </Link>
            </li>
          </ul>
        </div>

        {/* Philosophy & Disclaimer */}
        <div className="space-y-2.5">
          <h4 className="font-bold text-xs uppercase tracking-wider opacity-90">
            Trust & Anonymity
          </h4>
          <p className="text-xs leading-relaxed opacity-80">
            Confessions are anonymous to peer students. We prohibit doxxing, harassment, and private
            data leaks. Built with care for student mental wellness.
          </p>
          <div className="flex items-center gap-1 text-[11px] pt-1 text-primary">
            <Heart size={12} fill="currentColor" />
            <span>Built for university communities worldwide</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 border-t theme-border flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px]">
        <p>© 2026 UniVerse Platform. Open student architecture.</p>
        <div className="flex items-center gap-4">
          <Link to="/guidelines" className="hover:text-primary">Guidelines</Link>
          <Link to="/settings" className="hover:text-primary">Appearance</Link>
          <Link to="/moderation" className="hover:text-primary">Staff Portal</Link>
        </div>
      </div>
    </footer>
  );
};
