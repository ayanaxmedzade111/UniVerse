import React, { useState } from 'react';
import { Comment } from '../../types';
import { addCommentToConfession } from '../../services/confessionService';
import { getStoredUserProfile } from '../../services/storageService';
import { Send, User, Lock, Heart } from 'lucide-react';

interface CommentSectionProps {
  confessionId: string;
  initialComments?: Comment[];
  onCommentAdded?: (comment: Comment) => void;
}

export const CommentSection: React.FC<CommentSectionProps> = ({
  confessionId,
  initialComments = [],
  onCommentAdded,
}) => {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [inputText, setInputText] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const profile = getStoredUserProfile();

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newComment = addCommentToConfession(
      confessionId,
      inputText.trim(),
      profile.nickname || 'Student',
      isAnonymous
    );

    if (newComment) {
      setComments((prev) => [...prev, newComment]);
      setInputText('');
      if (onCommentAdded) onCommentAdded(newComment);
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
    <div className="pt-3 border-t theme-border space-y-4">
      {/* Comments List */}
      <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
        {comments.length === 0 ? (
          <p className="text-xs theme-text-muted italic py-2">
            No comments yet. Be the first student to leave friendly thoughts or advice!
          </p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="p-3 rounded-xl bg-black/5 dark:bg-white/5 text-xs space-y-1.5 border theme-border"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  {comment.isAnonymous ? (
                    <span className="p-1 rounded-full bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300">
                      <Lock size={10} />
                    </span>
                  ) : (
                    <span className="p-1 rounded-full bg-primary/20 text-primary">
                      <User size={10} />
                    </span>
                  )}
                  <span className="font-bold">
                    {comment.isAnonymous ? 'Secret Student' : comment.authorNickname}
                  </span>
                </div>
                <span className="text-[10px] theme-text-muted">
                  {formatRelativeTime(comment.createdAt)}
                </span>
              </div>
              <p className="leading-relaxed opacity-90">{comment.content}</p>
            </div>
          ))
        )}
      </div>

      {/* Comment Input Composer */}
      <form onSubmit={handleAddComment} className="space-y-2">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Write a supportive comment or reply..."
            className="w-full px-3 py-2 text-xs rounded-xl theme-input bg-transparent"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="p-2 rounded-xl theme-btn-primary disabled:opacity-40 transition-opacity"
            aria-label="Send comment"
          >
            <Send size={14} />
          </button>
        </div>

        <div className="flex items-center justify-between text-[11px] px-1">
          <label className="flex items-center gap-1.5 cursor-pointer theme-text-muted hover:text-black dark:hover:text-white">
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              className="w-3.5 h-3.5 rounded text-primary focus:ring-primary"
            />
            <span>Comment anonymously</span>
          </label>
          <span className="theme-text-muted">
            {isAnonymous ? 'Identity hidden' : `Posting as @${profile.nickname}`}
          </span>
        </div>
      </form>
    </div>
  );
};
