import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { PageLayout } from '../components/layout/PageLayout';
import { ChatRoomList } from '../components/chat/ChatRoomList';
import { ChatWindow } from '../components/chat/ChatWindow';
import { getUniversityBySlug } from '../services/universityService';
import { MessageCircle } from 'lucide-react';

export const ChatPage: React.FC = () => {
  const { universitySlug } = useParams<{ universitySlug: string }>();
  const slug = universitySlug || 'ada-university';
  const university = getUniversityBySlug(slug);

  const [selectedRoomId, setSelectedRoomId] = useState('general');

  return (
    <PageLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="border-b pb-4 theme-border">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">
              Real-Time Discussions
            </span>
            <span className="text-xs theme-text-muted">• {university?.name || 'All Campuses'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Student Community Chat
          </h1>
          <p className="text-xs theme-text-muted mt-0.5">
            Connect with students in dedicated topic channels for course questions, cafe tips, and dorm housing.
          </p>
        </div>

        {/* Chat Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Rooms sidebar */}
          <div className="lg:col-span-4 h-full">
            <ChatRoomList
              selectedRoomId={selectedRoomId}
              onSelectRoom={setSelectedRoomId}
              universityName={university?.name || 'UniVerse Campus'}
            />
          </div>

          {/* Active Chat Window */}
          <div className="lg:col-span-8">
            <ChatWindow
              roomId={selectedRoomId}
              universitySlug={slug}
              universityName={university?.name || 'UniVerse Campus'}
            />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
