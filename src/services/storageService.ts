import {
  Confession,
  AcademicResource,
  ChatMessage,
  CampusRecommendation,
  UserProfile,
  UserThemeSettings,
} from '../types';
import { SAMPLE_CONFESSIONS } from '../data/sampleConfessions';
import { SAMPLE_RESOURCES } from '../data/sampleResources';
import { SAMPLE_CHAT_MESSAGES, DEFAULT_AVATAR } from '../data/sampleChat';
import { SAMPLE_RECOMMENDATIONS } from '../data/sampleRecommendations';
import { DEFAULT_THEME_SETTINGS } from '../data/themePresets';

const STORAGE_KEYS = {
  CONFESSIONS: 'universe_confessions_v1',
  RESOURCES: 'universe_resources_v1',
  CHAT_MESSAGES: 'universe_chat_messages_v1',
  RECOMMENDATIONS: 'universe_recommendations_v1',
  USER_PROFILE: 'universe_user_profile_v1',
  SELECTED_UNIVERSITY: 'universe_selected_uni_slug_v1',
  THEME_SETTINGS: 'universe_theme_settings_v1',
  REPORTED_ITEMS: 'universe_reported_items_v1',
};

export const DEFAULT_USER_PROFILE: UserProfile = {
  id: 'usr_me_1',
  displayName: 'Ayan',
  nickname: 'StarGazer',
  universityId: 'ada-university',
  universityName: 'ADA University',
  department: 'Computer Science & Information Technology',
  academicYear: 'Year 3',
  group: 'CS-24B',
  bio: 'Building dreams with code & coffee ☕✨ Love campus sunsets and algorithms.',
  isPublicProfile: false,
  avatar: DEFAULT_AVATAR,
  savedConfessionIds: ['conf-1', 'conf-5'],
  savedResourceIds: ['res-1'],
  blockedNicknames: [],
};

// Helper for safe localStorage access in both browser & node testing
function getStoredJson<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined' || !window.localStorage) {
    return defaultValue;
  }
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function setStoredJson<T>(key: string, value: T): void {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error('Storage quota exceeded or error saving:', err);
  }
}

// Confessions
export function getStoredConfessions(): Confession[] {
  return getStoredJson<Confession[]>(STORAGE_KEYS.CONFESSIONS, SAMPLE_CONFESSIONS);
}

export function saveStoredConfessions(confessions: Confession[]): void {
  setStoredJson(STORAGE_KEYS.CONFESSIONS, confessions);
}

export function addConfession(confession: Confession): void {
  const current = getStoredConfessions();
  saveStoredConfessions([confession, ...current]);
}

// Resources
export function getStoredResources(): AcademicResource[] {
  return getStoredJson<AcademicResource[]>(STORAGE_KEYS.RESOURCES, SAMPLE_RESOURCES);
}

export function saveStoredResources(resources: AcademicResource[]): void {
  setStoredJson(STORAGE_KEYS.RESOURCES, resources);
}

export function addResource(resource: AcademicResource): void {
  const current = getStoredResources();
  saveStoredResources([resource, ...current]);
}

// Chat Messages
export function getStoredChatMessages(universitySlug?: string, roomId?: string): ChatMessage[] {
  const all = getStoredJson<ChatMessage[]>(STORAGE_KEYS.CHAT_MESSAGES, SAMPLE_CHAT_MESSAGES);
  return all.filter((msg) => {
    if (universitySlug && msg.universitySlug !== universitySlug) return false;
    if (roomId && msg.roomId !== roomId) return false;
    return true;
  });
}

export function addChatMessage(message: ChatMessage): void {
  const all = getStoredJson<ChatMessage[]>(STORAGE_KEYS.CHAT_MESSAGES, SAMPLE_CHAT_MESSAGES);
  setStoredJson(STORAGE_KEYS.CHAT_MESSAGES, [...all, message]);
}

// Recommendations
export function getStoredRecommendations(universitySlug?: string): CampusRecommendation[] {
  const all = getStoredJson<CampusRecommendation[]>(STORAGE_KEYS.RECOMMENDATIONS, SAMPLE_RECOMMENDATIONS);
  if (!universitySlug) return all;
  return all.filter((r) => r.universitySlug === universitySlug);
}

export function addRecommendation(rec: CampusRecommendation): void {
  const current = getStoredJson<CampusRecommendation[]>(STORAGE_KEYS.RECOMMENDATIONS, SAMPLE_RECOMMENDATIONS);
  setStoredJson(STORAGE_KEYS.RECOMMENDATIONS, [rec, ...current]);
}

// User Profile
export function getStoredUserProfile(): UserProfile {
  return getStoredJson<UserProfile>(STORAGE_KEYS.USER_PROFILE, DEFAULT_USER_PROFILE);
}

export function saveStoredUserProfile(profile: UserProfile): void {
  setStoredJson(STORAGE_KEYS.USER_PROFILE, profile);
}

// Selected University
export function getSelectedUniversitySlug(): string {
  if (typeof window === 'undefined' || !window.localStorage) {
    return 'ada-university';
  }
  return window.localStorage.getItem(STORAGE_KEYS.SELECTED_UNIVERSITY) || 'ada-university';
}

export function setSelectedUniversitySlug(slug: string): void {
  if (typeof window === 'undefined' || !window.localStorage) return;
  window.localStorage.setItem(STORAGE_KEYS.SELECTED_UNIVERSITY, slug);
}

// Theme Settings
export function getStoredThemeSettings(): UserThemeSettings {
  return getStoredJson<UserThemeSettings>(STORAGE_KEYS.THEME_SETTINGS, DEFAULT_THEME_SETTINGS);
}

export function saveStoredThemeSettings(settings: UserThemeSettings): void {
  setStoredJson(STORAGE_KEYS.THEME_SETTINGS, settings);
}

// Reports
export interface ReportRecord {
  id: string;
  targetType: 'confession' | 'comment' | 'message' | 'resource';
  targetId: string;
  reason: string;
  details?: string;
  createdAt: string;
  status: 'Pending' | 'Reviewed' | 'Dismissed';
}

export function getStoredReports(): ReportRecord[] {
  return getStoredJson<ReportRecord[]>(STORAGE_KEYS.REPORTED_ITEMS, [
    {
      id: 'rep-1',
      targetType: 'confession',
      targetId: 'conf-2',
      reason: 'Contains slightly sensitive exam room detail',
      createdAt: '2026-10-26T18:00:00Z',
      status: 'Pending',
    },
  ]);
}

export function addReport(report: ReportRecord): void {
  const current = getStoredReports();
  setStoredJson(STORAGE_KEYS.REPORTED_ITEMS, [report, ...current]);
}

export function updateReportStatus(reportId: string, status: ReportRecord['status']): void {
  const current = getStoredReports();
  const updated = current.map((r) => (r.id === reportId ? { ...r, status } : r));
  setStoredJson(STORAGE_KEYS.REPORTED_ITEMS, updated);
}

// Reset Demo Data
export function resetDemoData(): void {
  if (typeof window === 'undefined' || !window.localStorage) return;
  window.localStorage.removeItem(STORAGE_KEYS.CONFESSIONS);
  window.localStorage.removeItem(STORAGE_KEYS.RESOURCES);
  window.localStorage.removeItem(STORAGE_KEYS.CHAT_MESSAGES);
  window.localStorage.removeItem(STORAGE_KEYS.RECOMMENDATIONS);
  window.localStorage.removeItem(STORAGE_KEYS.USER_PROFILE);
  window.localStorage.removeItem(STORAGE_KEYS.REPORTED_ITEMS);
  window.localStorage.removeItem(STORAGE_KEYS.THEME_SETTINGS);
  window.localStorage.removeItem(STORAGE_KEYS.SELECTED_UNIVERSITY);
}
