import React from 'react';
import { Link } from 'react-router-dom';
import { PageLayout } from '../components/layout/PageLayout';
import { Compass, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <PageLayout>
      <div className="py-20 text-center max-w-md mx-auto space-y-5">
        <div className="w-16 h-16 mx-auto rounded-3xl bg-black/5 dark:bg-white/5 border theme-border flex items-center justify-center text-primary">
          <Compass size={32} />
        </div>
        <div className="space-y-1.5">
          <span className="text-xs font-mono font-bold text-primary">ERROR 404</span>
          <h1 className="text-2xl font-extrabold tracking-tight">Campus Path Not Found</h1>
          <p className="text-xs theme-text-muted leading-relaxed">
            The student page or discussion you are looking for has been moved, archived, or never existed in this quadrant.
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 pt-2">
          <Link
            to="/"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold theme-btn-primary shadow-xs"
          >
            <ArrowLeft size={14} />
            <span>Return Home</span>
          </Link>
          <Link
            to="/universities"
            className="px-4 py-2.5 rounded-xl text-xs font-medium border theme-border theme-surface theme-surface-hover"
          >
            Explore Universities
          </Link>
        </div>
      </div>
    </PageLayout>
  );
};
