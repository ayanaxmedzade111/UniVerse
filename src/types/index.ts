export type AnonymityMode = 'anonymous' | 'nickname' | 'profile';

export type ConfessionCategory =
  | 'Love & Crushes'
  | 'Funny'
  | 'Gossip'
  | 'Academic Life'
  | 'Friendship'
  | 'Roommates'
  | 'University Life'
  | 'Rants'
  | 'Advice'
  | 'Secrets'
  | 'Career'
  | 'Other';

export type ModerationStatus = 'Published' | 'Pending' | 'Needs Review' | 'Rejected';

export interface ConfessionAnalysis {
  category: ConfessionCategory;
  secondaryCategory?: string;
  sentiment: 'Happy' | 'Romantic' | 'Nervous' | 'Frustrated' | 'Excited' | 'Melancholy' | 'Neutral' | 'Humorous';
  topic: string;
  isQuestion: boolean;
  needsAdvice: boolean;
  containsPersonalInfo: boolean;
  potentialViolation: boolean;
  moderationStatus: ModerationStatus;
  moderationReason?: string;
  confidenceScore: number;
  engineUsed: 'Gemini Server API' | 'Local Rule-Engine Fallback';
}

export interface Comment {
  id: string;
  confessionId: string;
  authorNickname: string;
  authorAvatar?: AvatarConfig;
  isAnonymous: boolean;
  content: string;
  createdAt: string;
  likes: number;
  userLiked?: boolean;
}

export interface Confession {
  id: string;
  universityId: string;
  universitySlug: string;
  universityName: string;
  title?: string;
  content: string;
  category: ConfessionCategory;
  secondaryCategory?: string;
  anonymityMode: AnonymityMode;
  authorNickname?: string;
  authorDepartment?: string;
  authorYear?: string;
  authorGroup?: string;
  imageUrl?: string;
  createdAt: string;
  likes: number;
  userLiked?: boolean;
  saves: number;
  userSaved?: boolean;
  commentsCount: number;
  comments?: Comment[];
  views: number;
  moderationStatus: ModerationStatus;
  analysis?: ConfessionAnalysis;
  isPinned?: boolean;
}

export interface University {
  id: string;
  slug: string;
  name: string;
  nativeName?: string;
  shortName: string;
  city: string;
  country: string;
  countryCode: string;
  isAzerbaijan: boolean;
  description: string;
  studentCount: string;
  foundedYear: number;
  verified: boolean;
  websiteUrl: string;
  logoUrl?: string;
  heroColor?: string;
  featured?: boolean;
  communityStats: {
    confessionsCount: number;
    resourcesCount: number;
    activeStudents: number;
  };
}

export type ResourceType =
  | 'Lecture Notes'
  | 'Study Guide'
  | 'Exam Prep'
  | 'Course Advice'
  | 'Study Schedule'
  | 'Project Material'
  | 'Survival Tip';

export interface AcademicResource {
  id: string;
  universityId: string;
  universitySlug: string;
  universityName: string;
  title: string;
  description: string;
  courseSubject: string;
  department?: string;
  academicYear?: string;
  resourceType: ResourceType;
  tags: string[];
  fileUrl?: string;
  fileName?: string;
  fileSize?: string;
  helpfulVotes: number;
  userVoted?: boolean;
  saved: boolean;
  authorNickname: string;
  isAnonymous: boolean;
  createdAt: string;
}

export interface StudyTool {
  id: string;
  name: string;
  description: string;
  category: 'Flashcards' | 'Math & Science' | 'Writing & Citation' | 'Productivity' | 'Research';
  url: string;
  badge?: string;
  iconName: string;
}

export interface CampusRecommendation {
  id: string;
  universityId: string;
  universitySlug: string;
  name: string;
  category: 'Cafe' | 'Restaurant' | 'Bookstore' | 'Library' | 'Study Space' | 'Late Food';
  address: string;
  distanceFromCampus: string;
  rating: number;
  tags: string[];
  authorNickname: string;
  description: string;
  createdAt: string;
  upvotes: number;
  userUpvoted?: boolean;
}

export interface ChatMessage {
  id: string;
  roomId: string;
  universitySlug: string;
  senderNickname: string;
  senderAvatar: AvatarConfig;
  content: string;
  timestamp: string;
  reactions: { [emoji: string]: number };
  userReactions?: string[];
  replyToId?: string;
  replyToText?: string;
  replyToSender?: string;
}

export interface ChatRoom {
  id: string;
  name: string;
  topic: string;
  category:
    | 'General'
    | 'Academic Help'
    | 'Course Discussions'
    | 'Campus Life'
    | 'Food & Cafes'
    | 'Events & Clubs'
    | 'Roommates & Housing'
    | 'Advice';
  icon: string;
  unreadCount?: number;
}

export interface AvatarConfig {
  skinTone: string;
  faceShape: 'round' | 'oval' | 'heart' | 'square';
  hairstyle: 'curly' | 'wavy' | 'bob' | 'ponytail' | 'buzz' | 'fluffy' | 'messyBun' | 'straightLong';
  hairColor: string;
  eyeStyle: 'sparkle' | 'anime' | 'relaxed' | 'catEye' | 'sleepy' | 'wink';
  eyeColor: string;
  eyebrows: 'natural' | 'softArch' | 'bold' | 'curious';
  mouth: 'smile' | 'catMouth' | 'grin' | 'soft' | 'openSmile';
  blush: 'none' | 'softPeach' | 'sakuraPink' | 'freckles';
  glasses: 'none' | 'roundWire' | 'thickFrame' | 'catEye' | 'retroY2K';
  accessories: 'none' | 'cuteBow' | 'starClip' | 'headphones' | 'flower' | 'beanie';
  earrings: 'none' | 'goldHoops' | 'pearlStuds' | 'silverStars';
  clothing: 'cozyHoodie' | 'varsityJacket' | 'knitSweater' | 'casualTee' | 'academiaShirt';
  clothingColor: string;
  backgroundShape: 'circle' | 'squircle' | 'starburst' | 'flower';
  backgroundColor: string;
  decorativeSparkles: boolean;
}

export type ThemePresetId =
  | 'cute'
  | 'minimalist'
  | 'gothic'
  | 'academia'
  | 'y2k'
  | 'cyber'
  | 'nature'
  | 'ocean'
  | 'sunset'
  | 'monochrome'
  | 'coquette'
  | 'lavender';

export interface ThemeColors {
  primary: string;
  primaryHover: string;
  accent: string;
  background: string;
  surface: string;
  surfaceHover: string;
  text: string;
  muted: string;
  border: string;
}

export interface ThemePreset {
  id: ThemePresetId;
  name: string;
  tagline: string;
  fontFamilyHeading: string;
  fontFamilyBody: string;
  borderRadius: string;
  light: ThemeColors;
  dark: ThemeColors;
}

export interface UserThemeSettings {
  mode: 'light' | 'dark' | 'system';
  activePresetId: ThemePresetId;
  isCustomColorsEnabled: boolean;
  customColors: {
    primary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
  };
}

export interface UserProfile {
  id: string;
  displayName: string;
  nickname: string;
  universityId: string;
  universityName: string;
  department?: string;
  academicYear?: string;
  group?: string;
  bio?: string;
  isPublicProfile: boolean;
  avatar: AvatarConfig;
  savedConfessionIds: string[];
  savedResourceIds: string[];
  blockedNicknames: string[];
}
