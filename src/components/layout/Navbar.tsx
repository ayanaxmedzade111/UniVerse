import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../theme/ThemeProvider';
import { getStoredUserProfile, getSelectedUniversitySlug } from '../../services/storageService';
import { getUniversityBySlug } from '../../services/universityService';
import { AvatarPreview } from '../avatar/AvatarPreview';
import { ExportModal } from '../common/ExportModal';
import {
  Sparkles,
  Sun,
  Moon,
  Palette,
  Settings,
  Download,
  GraduationCap,
  Menu,
  X,
  ShieldAlert,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { setMode, isDark, settings } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  const profile = getStoredUserProfile();
  const currentUniSlug = getSelectedUniversitySlug();
  const currentUni = getUniversityBySlug(currentUniSlug);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Universities', path: '/universities' },
    { label: 'Confessions', path: `/universities/${currentUniSlug}/confessions` },
    { label: 'Academic Notes', path: `/universities/${currentUniSlug}/resources` },
    { label: 'Student Chat', path: `/universities/${currentUniSlug}/chat` },
    { label: 'Recommendations', path: `/universities/${currentUniSlug}/recommendations` },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b theme-border bg-surface/90 backdrop-blur-md transition-colors" style={{ backgroundColor: 'var(--color-surface)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-9 h-9 rounded-2xl flex items-center justify-center theme-btn-primary shadow-xs group-hover:scale-105 transition-transform">
              <Sparkles size={18} className="text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-tight leading-none">
                UniVerse
              </span>
              <span className="text-[10px] theme-text-muted font-medium tracking-wide">
                Campus Voices & Notes
              </span>
            </div>
          </Link>

          {/* Current Campus Switcher Pill */}
          {currentUni && (
            <Link
              to={`/universities/${currentUni.slug}`}
              className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full border theme-border bg-black/5 dark:bg-white/5 text-xs hover:border-primary/50 transition-colors"
              title="Current university community"
            >
              <GraduationCap size={14} className="text-primary" />
              <span className="font-bold max-w-[130px] truncate">{currentUni.shortName}</span>
              <span className="text-[10px] theme-text-muted">Change</span>
            </Link>
          )}

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    active
                      ? 'theme-btn-primary shadow-xs'
                      : 'theme-text-muted hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Actions & Profile Toolbar */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Appearance Mode Quick Toggle */}
            <button
              onClick={() => setMode(isDark ? 'light' : 'dark')}
              aria-label="Toggle dark mode"
              className="p-2 rounded-xl theme-surface-hover border theme-border theme-text-muted hover:text-black dark:hover:text-white transition-colors"
              title={`Switch to ${isDark ? 'Light' : 'Dark'} mode`}
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Theme Preset Selector Shortcut */}
            <Link
              to="/settings"
              aria-label="Appearance & Theme Settings"
              className="p-2 rounded-xl theme-surface-hover border theme-border theme-text-muted hover:text-black dark:hover:text-white transition-colors"
              title="Theme customization"
            >
              <Palette size={16} />
            </Link>

            {/* Export Code Button */}
            <button
              onClick={() => setShowExportModal(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl border theme-border text-xs font-semibold theme-text-muted hover:text-black dark:hover:text-white transition-colors"
              title="Export project code"
            >
              <Download size={14} />
              <span>Export</span>
            </button>

            {/* User Avatar & Profile Link */}
            <Link
              to="/profile"
              className="flex items-center gap-2 p-1 pl-1.5 pr-2.5 rounded-full border theme-border hover:border-primary/50 transition-colors bg-black/5 dark:bg-white/5"
              title="View your student profile"
            >
              <AvatarPreview config={profile.avatar} size={28} showShadow={false} />
              <span className="text-xs font-bold hidden sm:inline-block max-w-[80px] truncate">
                {profile.nickname}
              </span>
            </Link>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl border theme-border theme-text-muted hover:text-black dark:hover:text-white"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t theme-border p-4 space-y-2 bg-surface" style={{ backgroundColor: 'var(--color-surface)' }}>
            {currentUni && (
              <div className="pb-2 border-b theme-border flex items-center justify-between text-xs">
                <span className="theme-text-muted">Campus:</span>
                <Link to="/universities" onClick={() => setMobileMenuOpen(false)} className="font-bold text-primary">
                  {currentUni.name} (Change)
                </Link>
              </div>
            )}
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-xl text-xs font-bold ${
                  isActive(link.path)
                    ? 'theme-btn-primary'
                    : 'theme-text-muted hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t theme-border flex items-center justify-between text-xs">
              <Link
                to="/moderation"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-1.5 text-zinc-500 hover:text-primary font-medium"
              >
                <ShieldAlert size={14} /> Moderation Portal
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setShowExportModal(true);
                }}
                className="flex items-center gap-1 text-primary font-bold"
              >
                <Download size={13} /> Export Code
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Export Modal */}
      <ExportModal isOpen={showExportModal} onClose={() => setShowExportModal(false)} />
    </>
  );
};
