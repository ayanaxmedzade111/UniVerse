import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { PageLayout } from '../components/layout/PageLayout';
import { ConfessionComposer } from '../components/confessions/ConfessionComposer';
import { getUniversityBySlug } from '../services/universityService';
import { ArrowLeft } from 'lucide-react';

export const CreateConfessionPage: React.FC = () => {
  const { universitySlug } = useParams<{ universitySlug: string }>();
  const navigate = useNavigate();

  const slug = universitySlug || 'ada-university';
  const university = getUniversityBySlug(slug);

  const handleSuccess = () => {
    navigate(`/universities/${slug}/confessions`);
  };

  const handleCancel = () => {
    navigate(`/universities/${slug}/confessions`);
  };

  return (
    <PageLayout>
      <div className="space-y-6">
        <Link
          to={`/universities/${slug}/confessions`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold theme-text-muted hover:text-black dark:hover:text-white transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Back to {university?.shortName || 'Campuses'} Feed</span>
        </Link>

        <ConfessionComposer
          universityId={university?.id || slug}
          universitySlug={slug}
          universityName={university?.name || 'UniVerse Campus'}
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />
      </div>
    </PageLayout>
  );
};
