import React, { useState } from 'react';
import { Confession } from '../../types';
import { toggleLikeConfession, toggleSaveConfession } from '../../services/confessionService';
import { CommentSection } from './CommentSection';
import { ReportModal } from './ReportModal';
import {
  Heart,
  MessageCircle,
  Bookmark,
  Share2,
  Flag,
  Lock,
  User,
  Sparkles,
  HelpCircle,
  Check,
} from 'lucide-react';
import { useTheme } from '../theme/ThemeProvider';

interface ConfessionCardProps {
  confession: Confession;
  onUpdate?: (updated: Confession) => void;
}

export const ConfessionCard: React.FC<ConfessionCardProps> = ({ confession, onUpdate }) => {
  const { currentColors } = useTheme();
  const [item, setItem] = useState<Confession>(confession);
  const [showComments, setShowComments] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleLike = () => {
    const updated = toggleLikeConfession(item.id);
    if (updated) {
      setItem(updated);
      if (onUpdate) onUpdate(updated);
    }
  };

  const handleSave = () => {
    const { confession: updated } = toggleSaveConfession(item.id);
    if (updated) {
      setItem(updated);
      if (onUpdate) onUpdate(updated);
    }
  };

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(`${window.location.origin}/universities/${item.universitySlug}?confession=${item.id}`);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const formatRelativeTime = (isoString: string) => {
    try {
      const diffSec = Math.floor((Date.now() - new Date(isoString).getTime()) / 1000);
      if (diffSec < 60) return 'just now';
      if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
      if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;
      return `${Math.floor(diffSec / 86400)}d ago`;
    } catch {
      return 'recently';
    }
  };

  return (
    <article className="theme-card p-5 sm:p-6 space-y-4 relative flex flex-col justify-between">
      {/* Header Info */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          {item.anonymityMode === 'anonymous' ? (
            <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-300">
              <Lock size={14} />
            </div>
          ) : (
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-xs"
              style={{ backgroundColor: currentColors.primary }}
            >
              <User size={14} />
            </div>
          )}

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold">
                {item.anonymityMode === 'anonymous' ? 'Anonymous Student' : (item.authorNickname || 'Student')}
              </span>
              {item.authorDepartment && item.anonymityMode === 'profile' && (
                <span className="text-[11px] theme-text-muted">({item.authorDepartment})</span>
              )}
            </div>
            <div className="flex items-center gap-x-2 gap-y-0.5 flex-wrap text-[11px] theme-text-muted">
              <span>{item.universityName}</span>
              <span>•</span>
              <time dateTime={item.createdAt}>{formatRelativeTime(item.createdAt)}</time>
            </div>
          </div>
        </div>

        {/* Category & AI Badges */}
        <div className="flex items-center gap-1.5 flex-wrap justify-end">
          <span
            className="text-[11px] font-semibold px-2.5 py-1 rounded-full border theme-border"
            style={{ backgroundColor: `${currentColors.primary}15`, color: currentColors.primary }}
          >
            {item.category}
          </span>
          {item.analysis?.needsAdvice && (
            <span
              className="text-[10px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1 bg-amber-500/15 text-amber-600 dark:text-amber-400"
              title="Seeking Advice"
            >
              <HelpCircle size={10} />
              Advice
            </span>
          )}
        </div>
      </div>

      {/* Confession Body */}
      <div className="space-y-2">
        {item.title && (
          <h3 className="font-bold text-base tracking-tight leading-snug">
            {item.title}
          </h3>
        )}
        <p className="text-sm leading-relaxed whitespace-pre-wrap opacity-95">
          {item.content}
        </p>

        {item.imageUrl && (
          <div className="mt-3 rounded-xl overflow-hidden border theme-border max-h-72">
            <img src={item.imageUrl} alt="Confession attachment" className="w-full h-full object-cover" />
          </div>
        )}
      </div>

      {/* AI Sentiment & Topic Footer Pill (Subtle & Informative) */}
      {item.analysis && (
        <div className="flex items-center gap-2 text-[11px] theme-text-muted pt-1 flex-wrap">
          <span className="flex items-center gap-1">
            <Sparkles size={11} className="text-amber-500" />
            <span className="capitalize">{item.analysis.sentiment}</span> sentiment
          </span>
          <span>•</span>
          <span>Topic: {item.analysis.topic}</span>
        </div>
      )}

      {/* Action Buttons Toolbar */}
      <div className="flex items-center justify-between pt-3 border-t theme-border text-xs">
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Like */}
          <button
            onClick={handleLike}
            aria-label={`Like confession (${item.likes} likes)`}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
              item.userLiked
                ? 'bg-rose-500/15 text-rose-500 font-semibold'
                : 'theme-surface-hover theme-text-muted hover:text-black dark:hover:text-white'
            }`}
          >
            <Heart size={15} fill={item.userLiked ? 'currentColor' : 'none'} />
            <span>{item.likes}</span>
          </button>

          {/* Comments */}
          <button
            onClick={() => setShowComments(!showComments)}
            aria-label={`View comments (${item.commentsCount} comments)`}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
              showComments
                ? 'bg-black/10 dark:bg-white/10 font-semibold'
                : 'theme-surface-hover theme-text-muted hover:text-black dark:hover:text-white'
            }`}
          >
            <MessageCircle size={15} />
            <span>{item.commentsCount}</span>
          </button>

          {/* Save */}
          <button
            onClick={handleSave}
            aria-label={`Save confession (${item.saves} saves)`}
            className={`p-2 rounded-xl transition-all ${
              item.userSaved
                ? 'bg-amber-500/15 text-amber-500'
                : 'theme-surface-hover theme-text-muted hover:text-black dark:hover:text-white'
            }`}
          >
            <Bookmark size={15} fill={item.userSaved ? 'currentColor' : 'none'} />
          </button>
        </div>

        <div className="flex items-center gap-1">
          {/* Share */}
          <button
            onClick={handleShare}
            aria-label="Share confession link"
            className="flex items-center gap-1 p-2 rounded-xl theme-surface-hover theme-text-muted hover:text-black dark:hover:text-white transition-colors"
            title="Copy confession link"
          >
            {copiedLink ? <Check size={14} className="text-emerald-500" /> : <Share2 size={14} />}
          </button>

          {/* Report */}
          <button
            onClick={() => setShowReport(true)}
            aria-label="Report confession"
            className="p-2 rounded-xl theme-surface-hover theme-text-muted hover:text-red-500 transition-colors"
            title="Report this post"
          >
            <Flag size={14} />
          </button>
        </div>
      </div>

      {/* Expandable Comment Section */}
      {showComments && (
        <CommentSection
          confessionId={item.id}
          initialComments={item.comments || []}
          onCommentAdded={(newComment) => {
            setItem((prev) => ({
              ...prev,
              commentsCount: prev.commentsCount + 1,
              comments: [...(prev.comments || []), newComment],
            }));
          }}
        />
      )}

      {/* Report Modal */}
      <ReportModal
        isOpen={showReport}
        onClose={() => setShowReport(false)}
        targetType="confession"
        targetId={item.id}
      />
    </article>
  );
};
