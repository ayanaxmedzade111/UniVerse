import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageLayout } from '../components/layout/PageLayout';
import { AvatarPreview } from '../components/avatar/AvatarPreview';
import { ConfessionCard } from '../components/confessions/ConfessionCard';
import { ResourceCard } from '../components/resources/ResourceCard';
import {
  getStoredUserProfile,
  saveStoredUserProfile,
  getStoredConfessions,
  getStoredResources,
  resetDemoData,
} from '../services/storageService';
import { ALL_UNIVERSITIES } from '../data/universities';
import {
  User,
  Sparkles,
  Lock,
  Globe,
  Bookmark,
  Check,
  RotateCcw,
  Palette,
  ExternalLink,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState(() => getStoredUserProfile());
  const [activeTab, setActiveTab] = useState<'profile' | 'savedConfessions' | 'savedResources'>('profile');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Form states
  const [displayName, setDisplayName] = useState(profile.displayName);
  const [nickname, setNickname] = useState(profile.nickname);
  const [universityId, setUniversityId] = useState(profile.universityId);
  const [department, setDepartment] = useState(profile.department || '');
  const [academicYear, setAcademicYear] = useState(profile.academicYear || '');
  const [group, setGroup] = useState(profile.group || '');
  const [bio, setBio] = useState(profile.bio || '');
  const [isPublicProfile, setIsPublicProfile] = useState(profile.isPublicProfile);

  const allConfessions = getStoredConfessions();
  const savedConfessions = allConfessions.filter((c) =>
    profile.savedConfessionIds.includes(c.id)
  );

  const allResources = getStoredResources();
  const savedResources = allResources.filter((r) =>
    profile.savedResourceIds.includes(r.id) || r.saved
  );

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const targetUni = ALL_UNIVERSITIES.find((u) => u.id === universityId) || ALL_UNIVERSITIES[0];

    const updated = {
      ...profile,
      displayName: displayName.trim(),
      nickname: nickname.trim(),
      universityId: targetUni.id,
      universityName: targetUni.name,
      department: department.trim() || undefined,
      academicYear: academicYear.trim() || undefined,
      group: group.trim() || undefined,
      bio: bio.trim() || undefined,
      isPublicProfile,
    };

    saveStoredUserProfile(updated);
    setProfile(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);

    try {
      confetti({ particleCount: 25, spread: 40, origin: { y: 0.6 } });
    } catch {
      // safe fallback
    }
  };

  const handleResetData = () => {
    if (confirm('Are you sure you want to reset all demo confessions, avatars, and bookmarks?')) {
      resetDemoData();
      window.location.reload();
    }
  };

  return (
    <PageLayout>
      <div className="space-y-8 max-w-4xl mx-auto">
        {/* Profile Header Banner */}
        <div className="p-6 sm:p-8 rounded-3xl theme-surface border theme-border flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 shadow-xs">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
            <div className="relative group shrink-0">
              <AvatarPreview config={profile.avatar} size={100} />
              <Link
                to="/profile/avatar"
                className="absolute -bottom-1 -right-1 p-2 rounded-full theme-btn-primary shadow-md hover:scale-110 transition-transform"
                title="Edit 2D Avatar"
              >
                <Sparkles size={13} />
              </Link>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                  {profile.displayName || profile.nickname}
                </h1>
                <span className="text-xs font-mono theme-text-muted">@{profile.nickname}</span>
              </div>
              <p className="text-xs font-semibold text-primary">{profile.universityName}</p>
              {profile.department && (
                <p className="text-xs theme-text-muted">{profile.department} • {profile.academicYear || 'Student'}</p>
              )}
              {profile.bio && (
                <p className="text-xs opacity-80 pt-1 max-w-md">{profile.bio}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2 shrink-0">
            <Link
              to="/profile/avatar"
              className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold theme-btn-primary shadow-xs"
            >
              <Sparkles size={14} />
              Customize Avatar
            </Link>
            <Link
              to="/settings"
              className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium border theme-border theme-surface theme-surface-hover"
            >
              <Palette size={14} />
              Theme Settings
            </Link>
          </div>
        </div>

        {/* Profile Tabs */}
        <div className="flex items-center gap-2 border-b theme-border pb-2 text-xs font-bold">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === 'profile'
                ? 'theme-btn-primary shadow-xs'
                : 'theme-text-muted hover:text-black dark:hover:text-white'
            }`}
          >
            Account & Privacy
          </button>
          <button
            onClick={() => setActiveTab('savedConfessions')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all ${
              activeTab === 'savedConfessions'
                ? 'theme-btn-primary shadow-xs'
                : 'theme-text-muted hover:text-black dark:hover:text-white'
            }`}
          >
            <Bookmark size={13} />
            <span>Saved Confessions ({savedConfessions.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('savedResources')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all ${
              activeTab === 'savedResources'
                ? 'theme-btn-primary shadow-xs'
                : 'theme-text-muted hover:text-black dark:hover:text-white'
            }`}
          >
            <Bookmark size={13} />
            <span>Saved Notes ({savedResources.length})</span>
          </button>
        </div>

        {/* Tab 1: Profile & Privacy Editor */}
        {activeTab === 'profile' && (
          <form onSubmit={handleSaveProfile} className="p-6 rounded-2xl theme-surface space-y-6">
            <div className="border-b pb-3 theme-border flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base">Student Profile Preferences</h3>
                <p className="text-xs theme-text-muted">
                  Control how your identity appears when commenting or publishing non-anonymous notes.
                </p>
              </div>
              {savedSuccess && (
                <span className="text-xs font-semibold text-emerald-500 flex items-center gap-1 bg-emerald-500/10 px-3 py-1 rounded-full">
                  <Check size={14} /> Saved!
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold block mb-1">Display Name</label>
                <input
                  type="text"
                  required
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl theme-input bg-transparent"
                />
              </div>

              <div>
                <label className="text-xs font-semibold block mb-1">Nickname / Handle</label>
                <input
                  type="text"
                  required
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl theme-input bg-transparent"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold block mb-1">Primary University</label>
              <select
                value={universityId}
                onChange={(e) => setUniversityId(e.target.value)}
                className="w-full p-2.5 text-xs rounded-xl theme-input bg-transparent"
              >
                {ALL_UNIVERSITIES.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.isAzerbaijan ? '🇦🇿' : '🌐'} {u.name} ({u.shortName})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-semibold block mb-1">Faculty / Department</label>
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  placeholder="e.g. Computer Science"
                  className="w-full px-3.5 py-2 text-xs rounded-xl theme-input bg-transparent"
                />
              </div>

              <div>
                <label className="text-xs font-semibold block mb-1">Academic Year</label>
                <input
                  type="text"
                  value={academicYear}
                  onChange={(e) => setAcademicYear(e.target.value)}
                  placeholder="e.g. Year 3"
                  className="w-full px-3.5 py-2 text-xs rounded-xl theme-input bg-transparent"
                />
              </div>

              <div>
                <label className="text-xs font-semibold block mb-1">Group / Section</label>
                <input
                  type="text"
                  value={group}
                  onChange={(e) => setGroup(e.target.value)}
                  placeholder="e.g. CS-24B"
                  className="w-full px-3.5 py-2 text-xs rounded-xl theme-input bg-transparent"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold block mb-1">Short Bio</label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="A sentence or two about yourself, favorite subjects, or campus hobbies..."
                className="w-full p-3 text-xs rounded-xl theme-input bg-transparent resize-y"
              />
            </div>

            {/* Privacy Controls Checkbox */}
            <div className="p-4 rounded-xl border theme-border bg-black/5 dark:bg-white/5 space-y-2">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isPublicProfile}
                  onChange={(e) => setIsPublicProfile(e.target.checked)}
                  className="w-4 h-4 rounded text-primary focus:ring-primary"
                />
                <span className="text-xs font-bold">Public Student Profile</span>
              </label>
              <p className="text-[11px] theme-text-muted pl-6">
                When unchecked (recommended), your department, group, and biography are kept private.
                Anonymous confessions will never expose this information regardless of this setting.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t theme-border">
              <button
                type="button"
                onClick={handleResetData}
                className="text-xs flex items-center gap-1.5 text-red-500 hover:text-red-700"
              >
                <RotateCcw size={13} />
                Reset All Local Demo Data
              </button>

              <button
                type="submit"
                className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-xs font-bold theme-btn-primary shadow-xs"
              >
                <Check size={15} />
                Save Changes
              </button>
            </div>
          </form>
        )}

        {/* Tab 2: Saved Confessions */}
        {activeTab === 'savedConfessions' && (
          <div className="space-y-4">
            {savedConfessions.length === 0 ? (
              <div className="p-12 text-center rounded-2xl theme-surface border theme-border space-y-2">
                <Bookmark size={30} className="mx-auto theme-text-muted opacity-50" />
                <p className="font-semibold text-sm">No saved confessions yet</p>
                <p className="text-xs theme-text-muted">
                  Click the bookmark ribbon on any confession in the feed to save it for later reading.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {savedConfessions.map((c) => (
                  <ConfessionCard key={c.id} confession={c} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Saved Resources */}
        {activeTab === 'savedResources' && (
          <div className="space-y-4">
            {savedResources.length === 0 ? (
              <div className="p-12 text-center rounded-2xl theme-surface border theme-border space-y-2">
                <Bookmark size={30} className="mx-auto theme-text-muted opacity-50" />
                <p className="font-semibold text-sm">No saved study notes yet</p>
                <p className="text-xs theme-text-muted">
                  Bookmark helpful lecture summaries or exam prep sheets from the knowledge library.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {savedResources.map((res) => (
                  <ResourceCard key={res.id} resource={res} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </PageLayout>
  );
};
