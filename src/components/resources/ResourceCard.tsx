import React, { useState } from 'react';
import { AcademicResource } from '../../types';
import { FileText, Download, ThumbsUp, Bookmark, Sparkles, Check } from 'lucide-react';
import { useTheme } from '../theme/ThemeProvider';
import { getStoredResources, saveStoredResources } from '../../services/storageService';

interface ResourceCardProps {
  resource: AcademicResource;
  onUpdate?: (updated: AcademicResource) => void;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({ resource, onUpdate }) => {
  const { currentColors } = useTheme();
  const [item, setItem] = useState<AcademicResource>(resource);
  const [isDownloaded, setIsDownloaded] = useState(false);

  const handleHelpfulVote = () => {
    const userVoted = !item.userVoted;
    const helpfulVotes = userVoted ? item.helpfulVotes + 1 : Math.max(0, item.helpfulVotes - 1);
    const updated = { ...item, userVoted, helpfulVotes };
    setItem(updated);

    // Update in storage
    const all = getStoredResources();
    const nextAll = all.map((r) => (r.id === item.id ? updated : r));
    saveStoredResources(nextAll);

    if (onUpdate) onUpdate(updated);
  };

  const handleToggleSave = () => {
    const updated = { ...item, saved: !item.saved };
    setItem(updated);

    const all = getStoredResources();
    const nextAll = all.map((r) => (r.id === item.id ? updated : r));
    saveStoredResources(nextAll);

    if (onUpdate) onUpdate(updated);
  };

  const handleDownload = () => {
    setIsDownloaded(true);
    // Create safe simulated download blob
    const content = `UniVerse Academic Resource\nTitle: ${item.title}\nCourse: ${item.courseSubject}\nUniversity: ${item.universityName}\n\nDescription:\n${item.description}\n\nTags: ${item.tags.join(', ')}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = item.fileName || 'academic_notes.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setTimeout(() => setIsDownloaded(false), 2500);
  };

  return (
    <article className="theme-card p-5 flex flex-col justify-between space-y-4 hover:border-primary/40 transition-all">
      <div className="space-y-3">
        {/* Top Meta */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span
            className="text-[11px] font-bold px-2.5 py-1 rounded-full border theme-border"
            style={{ backgroundColor: `${currentColors.primary}15`, color: currentColors.primary }}
          >
            {item.resourceType}
          </span>
          <span className="text-[11px] font-mono theme-text-muted">
            {item.academicYear || 'All Semesters'}
          </span>
        </div>

        {/* Title & Subject */}
        <div>
          <span className="text-xs font-semibold text-primary block mb-0.5">
            {item.courseSubject}
          </span>
          <h3 className="font-bold text-base tracking-tight leading-snug">
            {item.title}
          </h3>
          {item.department && (
            <p className="text-[11px] theme-text-muted mt-0.5">{item.department}</p>
          )}
        </div>

        <p className="text-xs leading-relaxed opacity-85 line-clamp-3">
          {item.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/5 border theme-border theme-text-muted"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer & Attachment Actions */}
      <div className="pt-3 border-t theme-border space-y-3">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 theme-text-muted text-[11px]">
            <FileText size={13} />
            <span>{item.fileName || 'document.pdf'}</span>
            <span className="opacity-60">({item.fileSize || '1.2 MB'})</span>
          </div>
          <span className="text-[11px] theme-text-muted">
            by {item.isAnonymous ? 'Anonymous' : `@${item.authorNickname}`}
          </span>
        </div>

        <div className="flex items-center justify-between gap-2 pt-1">
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleHelpfulVote}
              aria-label={`Vote helpful (${item.helpfulVotes} votes)`}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                item.userVoted
                  ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                  : 'theme-surface-hover theme-text-muted hover:text-black dark:hover:text-white'
              }`}
            >
              <ThumbsUp size={13} fill={item.userVoted ? 'currentColor' : 'none'} />
              <span>{item.helpfulVotes}</span>
            </button>

            <button
              onClick={handleToggleSave}
              aria-label="Save resource"
              className={`p-2 rounded-xl text-xs transition-all ${
                item.saved
                  ? 'bg-amber-500/15 text-amber-500'
                  : 'theme-surface-hover theme-text-muted hover:text-black dark:hover:text-white'
              }`}
            >
              <Bookmark size={14} fill={item.saved ? 'currentColor' : 'none'} />
            </button>
          </div>

          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold theme-btn-primary shadow-xs hover:shadow-md transition-all"
          >
            {isDownloaded ? (
              <>
                <Check size={13} />
                Downloaded
              </>
            ) : (
              <>
                <Download size={13} />
                Download
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
