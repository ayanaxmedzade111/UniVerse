import React, { useState } from 'react';
import { ChatRoom } from '../../types';
import { CHAT_ROOMS } from '../../data/sampleChat';
import {
  MessageSquare,
  BookOpen,
  Coffee,
  GraduationCap,
  Home,
  Sparkles,
  Search,
  Radio,
} from 'lucide-react';

interface ChatRoomListProps {
  selectedRoomId: string;
  onSelectRoom: (roomId: string) => void;
  universityName: string;
}

export const ChatRoomList: React.FC<ChatRoomListProps> = ({
  selectedRoomId,
  onSelectRoom,
  universityName,
}) => {
  const [search, setSearch] = useState('');

  const getRoomIcon = (id: string) => {
    switch (id) {
      case 'general':
        return <MessageSquare size={15} />;
      case 'academic':
        return <BookOpen size={15} />;
      case 'food-cafes':
        return <Coffee size={15} />;
      case 'courses':
        return <GraduationCap size={15} />;
      case 'housing':
        return <Home size={15} />;
      case 'events':
        return <Sparkles size={15} />;
      default:
        return <MessageSquare size={15} />;
    }
  };

  const filteredRooms = CHAT_ROOMS.filter(
    (room) =>
      room.name.toLowerCase().includes(search.toLowerCase()) ||
      room.topic.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 rounded-2xl theme-surface flex flex-col h-full space-y-4">
      <div>
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-bold text-sm tracking-tight">Student Discussion Rooms</h3>
          <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-500">
            <Radio size={10} className="animate-pulse" /> Live
          </span>
        </div>
        <p className="text-[11px] theme-text-muted">{universityName}</p>
      </div>

      {/* Local demo status badge */}
      <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-700 dark:text-amber-300">
        <span className="font-bold block">Local Demo Mode Active</span>
        <span>Messages persist in local browser storage. Connect Firebase for multi-user sync.</span>
      </div>

      {/* Room Search */}
      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 theme-text-muted" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter channels..."
          className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl theme-input bg-transparent"
        />
      </div>

      {/* Rooms List */}
      <div className="space-y-1 overflow-y-auto pr-1 flex-1">
        {filteredRooms.map((room) => {
          const isSelected = selectedRoomId === room.id;
          return (
            <button
              key={room.id}
              onClick={() => onSelectRoom(room.id)}
              className={`w-full text-left p-3 rounded-xl transition-all flex items-start gap-2.5 ${
                isSelected
                  ? 'theme-btn-primary shadow-xs'
                  : 'hover:bg-black/5 dark:hover:bg-white/5 theme-text-muted hover:text-black dark:hover:text-white'
              }`}
            >
              <span className={`p-1.5 rounded-lg ${isSelected ? 'bg-white/20' : 'bg-black/5 dark:bg-white/5'}`}>
                {getRoomIcon(room.id)}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold truncate block">{room.name}</span>
                  {room.unreadCount && !isSelected ? (
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-primary text-white font-bold">
                      {room.unreadCount}
                    </span>
                  ) : null}
                </div>
                <p className="text-[10px] opacity-75 truncate">{room.topic}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
