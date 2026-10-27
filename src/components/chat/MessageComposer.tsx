import React, { useState } from 'react';
import { Send, Smile, X, CornerDownRight } from 'lucide-react';
import { ChatMessage } from '../../types';

interface MessageComposerProps {
  onSendMessage: (content: string, replyTo?: ChatMessage) => void;
  replyingTo?: ChatMessage;
  onCancelReply?: () => void;
}

const QUICK_EMOJIS = ['✨', '❤️', '☕', '🔥', '🙌', '🥐', '📚', '🚀'];

export const MessageComposer: React.FC<MessageComposerProps> = ({
  onSendMessage,
  replyingTo,
  onCancelReply,
}) => {
  const [content, setContent] = useState('');
  const [showEmojiBar, setShowEmojiBar] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    onSendMessage(content.trim(), replyingTo);
    setContent('');
    if (onCancelReply) onCancelReply();
  };

  const handleInsertEmoji = (emoji: string) => {
    setContent((prev) => prev + emoji);
  };

  return (
    <div className="pt-2 border-t theme-border space-y-2">
      {/* Replying-to Preview Banner */}
      {replyingTo && (
        <div className="flex items-center justify-between p-2 rounded-xl bg-black/5 dark:bg-white/5 text-xs theme-border border">
          <div className="flex items-center gap-1.5 min-w-0">
            <CornerDownRight size={13} className="text-primary shrink-0" />
            <span className="font-semibold text-primary truncate">
              Replying to @{replyingTo.senderNickname}:
            </span>
            <span className="theme-text-muted truncate">"{replyingTo.content}"</span>
          </div>
          <button
            onClick={onCancelReply}
            className="p-1 rounded-full theme-text-muted hover:text-black dark:hover:text-white"
            aria-label="Cancel reply"
          >
            <X size={13} />
          </button>
        </div>
      )}

      {/* Quick Emojis Strip */}
      {showEmojiBar && (
        <div className="flex items-center gap-1 p-1.5 rounded-xl bg-black/5 dark:bg-white/5 border theme-border overflow-x-auto">
          {QUICK_EMOJIS.map((emoji) => (
            <button
              key={emoji}
              type="button"
              onClick={() => handleInsertEmoji(emoji)}
              className="p-1 text-sm hover:scale-125 transition-transform"
            >
              {emoji}
            </button>
          ))}
        </div>
      )}

      {/* Input Row */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setShowEmojiBar(!showEmojiBar)}
          className="p-2 rounded-xl theme-surface theme-surface-hover border theme-border theme-text-muted hover:text-black dark:hover:text-white"
          title="Toggle emojis"
        >
          <Smile size={16} />
        </button>

        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Send a message to this channel..."
          className="w-full px-3.5 py-2.5 text-xs rounded-xl theme-input bg-transparent"
        />

        <button
          type="submit"
          disabled={!content.trim()}
          className="p-2.5 rounded-xl theme-btn-primary disabled:opacity-40 transition-opacity shadow-xs"
          aria-label="Send message"
        >
          <Send size={15} />
        </button>
      </form>
    </div>
  );
};
