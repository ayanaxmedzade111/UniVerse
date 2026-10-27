import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getSelectedUniversitySlug } from '../../services/storageService';
import { Home, Compass, MessageSquare, BookOpen, MessageCircle, User } from 'lucide-react';

export const MobileNavigation: React.FC = () => {
  const location = useLocation();
  const currentUniSlug = getSelectedUniversitySlug();

  const links = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Campuses', path: '/universities', icon: Compass },
    { label: 'Confess', path: `/universities/${currentUniSlug}/confessions`, icon: MessageSquare },
    { label: 'Notes', path: `/universities/${currentUniSlug}/resources`, icon: BookOpen },
    { label: 'Chat', path: `/universities/${currentUniSlug}/chat`, icon: MessageCircle },
    { label: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t theme-border backdrop-blur-md px-2 py-2 flex items-center justify-around"
      style={{ backgroundColor: 'var(--color-surface)' }}
      aria-label="Mobile Bottom Navigation"
    >
      {links.map((link) => {
        const Icon = link.icon;
        const isActive =
          link.path === '/'
            ? location.pathname === '/'
            : location.pathname.startsWith(link.path);

        return (
          <Link
            key={link.path}
            to={link.path}
            className={`flex flex-col items-center gap-1 p-1.5 rounded-xl text-[10px] font-semibold transition-colors ${
              isActive
                ? 'text-primary font-bold'
                : 'theme-text-muted hover:text-black dark:hover:text-white'
            }`}
          >
            <Icon size={18} />
            <span>{link.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};
