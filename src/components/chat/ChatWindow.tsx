import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage, ChatRoom } from '../../types';
import { AvatarPreview } from '../avatar/AvatarPreview';
import { MessageComposer } from './MessageComposer';
import { ReportModal } from '../confessions/ReportModal';
import {
  getStoredChatMessages,
  addChatMessage,
  getStoredUserProfile,
} from '../../services/storageService';
import { CHAT_ROOMS, DEFAULT_AVATAR } from '../../data/sampleChat';
import { CornerDownRight, Flag, SmilePlus } from 'lucide-react';

interface ChatWindowProps {
  roomId: string;
  universitySlug: string;
  universityName: string;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  roomId,
  universitySlug,
  universityName,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [replyingTo, setReplyingTo] = useState<ChatMessage | undefined>();
  const [reportTargetId, setReportTargetId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const profile = getStoredUserProfile();

  const currentRoom: ChatRoom =
    CHAT_ROOMS.find((r) => r.id === roomId) || CHAT_ROOMS[0];

  useEffect(() => {
    const list = getStoredChatMessages(universitySlug, roomId);
    setMessages(list);
  }, [roomId, universitySlug]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (text: string, replyTo?: ChatMessage) => {
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      roomId,
      universitySlug,
      senderNickname: profile.nickname || 'Student',
      senderAvatar: profile.avatar || DEFAULT_AVATAR,
      content: text,
      timestamp: new Date().toISOString(),
      reactions: { '❤️': 1 },
      replyToId: replyTo?.id,
      replyToText: replyTo?.content,
      replyToSender: replyTo?.senderNickname,
    };

    addChatMessage(newMsg);
    setMessages((prev) => [...prev, newMsg]);
    setReplyingTo(undefined);
  };

  const handleToggleReaction = (msgId: string, emoji: string) => {
    setMessages((prev) =>
      prev.map((m) => {
        if (m.id === msgId) {
          const currentCount = m.reactions[emoji] || 0;
          const userReactions = m.userReactions || [];
          const hasReacted = userReactions.includes(emoji);

          const updatedUserReactions = hasReacted
            ? userReactions.filter((e) => e !== emoji)
            : [...userReactions, emoji];

          const updatedReactions = {
            ...m.reactions,
            [emoji]: hasReacted ? Math.max(0, currentCount - 1) : currentCount + 1,
          };

          return {
            ...m,
            reactions: updatedReactions,
            userReactions: updatedUserReactions,
          };
        }
        return m;
      })
    );
  };

  const formatTime = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return '';
    }
  };

  return (
    <div className="p-4 sm:p-6 rounded-2xl theme-surface flex flex-col h-[600px] shadow-sm justify-between">
      {/* Room Header */}
      <div className="border-b pb-3 theme-border flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-primary font-bold">#</span>
            <h3 className="font-bold text-base tracking-tight">{currentRoom.name}</h3>
          </div>
          <p className="text-xs theme-text-muted mt-0.5">{currentRoom.topic}</p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-black/5 dark:bg-white/5 border theme-border">
          {universityName}
        </span>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto space-y-4 py-4 pr-1">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-black/5 dark:bg-white/5 flex items-center justify-center text-primary">
              <CornerDownRight size={20} />
            </div>
            <p className="font-semibold text-sm">Welcome to #{currentRoom.name}</p>
            <p className="text-xs theme-text-muted max-w-sm">
              Be the first to start the conversation! Say hello, ask a campus question, or share study tips.
            </p>
          </div>
        ) : (
          messages.map((msg) => {
            const isMe = msg.senderNickname === profile.nickname;
            return (
              <div
                key={msg.id}
                className="group flex items-start gap-3 text-xs hover:bg-black/[0.02] dark:hover:bg-white/[0.02] p-1.5 rounded-xl transition-colors"
              >
                <div className="shrink-0 mt-0.5">
                  <AvatarPreview config={msg.senderAvatar || DEFAULT_AVATAR} size={36} showShadow={false} />
                </div>

                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold">{msg.senderNickname}</span>
                      {isMe && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-primary/10 text-primary font-medium">
                          You
                        </span>
                      )}
                      <time className="text-[10px] theme-text-muted">{formatTime(msg.timestamp)}</time>
                    </div>

                    {/* Hover Actions */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                      <button
                        onClick={() => setReplyingTo(msg)}
                        className="p-1 rounded theme-text-muted hover:text-primary"
                        title="Reply to message"
                      >
                        <CornerDownRight size={13} />
                      </button>
                      <button
                        onClick={() => handleToggleReaction(msg.id, '❤️')}
                        className="p-1 rounded theme-text-muted hover:text-rose-500"
                        title="React with heart"
                      >
                        <SmilePlus size={13} />
                      </button>
                      <button
                        onClick={() => setReportTargetId(msg.id)}
                        className="p-1 rounded theme-text-muted hover:text-red-500"
                        title="Report message"
                      >
                        <Flag size={12} />
                      </button>
                    </div>
                  </div>

                  {/* Replied to context */}
                  {msg.replyToText && (
                    <div className="flex items-center gap-1 text-[11px] theme-text-muted pl-2 border-l-2 border-primary/40 italic">
                      <span>@{msg.replyToSender}:</span>
                      <span className="truncate">"{msg.replyToText}"</span>
                    </div>
                  )}

                  {/* Content */}
                  <p className="leading-relaxed whitespace-pre-wrap opacity-90">{msg.content}</p>

                  {/* Reactions Chips */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {Object.entries(msg.reactions).map(([emoji, count]) => {
                      if (count <= 0) return null;
                      const userReacted = (msg.userReactions || []).includes(emoji);
                      return (
                        <button
                          key={emoji}
                          onClick={() => handleToggleReaction(msg.id, emoji)}
                          className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] border transition-all ${
                            userReacted
                              ? 'bg-primary/15 border-primary/40 font-bold'
                              : 'bg-black/5 dark:bg-white/5 border-transparent hover:border-black/20'
                          }`}
                        >
                          <span>{emoji}</span>
                          <span>{count}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Composer */}
      <MessageComposer
        onSendMessage={handleSendMessage}
        replyingTo={replyingTo}
        onCancelReply={() => setReplyingTo(undefined)}
      />

      {/* Report Modal */}
      {reportTargetId && (
        <ReportModal
          isOpen={!!reportTargetId}
          onClose={() => setReportTargetId(null)}
          targetType="message"
          targetId={reportTargetId}
        />
      )}
    </div>
  );
};
