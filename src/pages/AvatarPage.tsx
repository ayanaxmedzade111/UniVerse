import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { PageLayout } from '../components/layout/PageLayout';
import { AvatarEditor } from '../components/avatar/AvatarEditor';
import { ArrowLeft, Sparkles } from 'lucide-react';

export const AvatarPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <PageLayout>
      <div className="space-y-6 max-w-5xl mx-auto">
        <div className="flex items-center justify-between border-b pb-4 theme-border">
          <div>
            <Link
              to="/profile"
              className="inline-flex items-center gap-1.5 text-xs font-semibold theme-text-muted hover:text-black dark:hover:text-white transition-colors mb-2"
            >
              <ArrowLeft size={14} />
              <span>Back to Profile</span>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight flex items-center gap-2">
              <Sparkles size={22} className="text-primary" />
              Cute 2D Avatar Creator
            </h1>
            <p className="text-xs theme-text-muted mt-0.5">
              Customize expressive eyes, aesthetic hair, cozy outfits, and charm clips. Pure vector SVG.
            </p>
          </div>
        </div>

        <AvatarEditor onSave={() => navigate('/profile')} />
      </div>
    </PageLayout>
  );
};
