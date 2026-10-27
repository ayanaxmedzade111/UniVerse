import { Confession, Comment, ConfessionCategory } from '../types';
import {
  getStoredConfessions,
  saveStoredConfessions,
  addConfession as persistConfession,
  getStoredUserProfile,
  saveStoredUserProfile,
} from './storageService';
import { analyzeConfession } from './aiClassifier';

export async function createConfession(data: {
  universityId: string;
  universitySlug: string;
  universityName: string;
  title?: string;
  content: string;
  category?: ConfessionCategory;
  anonymityMode: 'anonymous' | 'nickname' | 'profile';
  authorNickname?: string;
  authorDepartment?: string;
  authorYear?: string;
  authorGroup?: string;
  imageUrl?: string;
}): Promise<Confession> {
  const analysis = await analyzeConfession(data.content, data.title);
  const resolvedCategory = data.category || analysis.category;

  const newConfession: Confession = {
    id: `conf-${Date.now()}`,
    universityId: data.universityId,
    universitySlug: data.universitySlug,
    universityName: data.universityName,
    title: data.title?.trim() || undefined,
    content: data.content.trim(),
    category: resolvedCategory,
    secondaryCategory: analysis.secondaryCategory,
    anonymityMode: data.anonymityMode,
    authorNickname: data.anonymityMode === 'anonymous' ? undefined : (data.authorNickname || 'Student'),
    authorDepartment: data.anonymityMode === 'profile' ? data.authorDepartment : undefined,
    authorYear: data.anonymityMode === 'profile' ? data.authorYear : undefined,
    authorGroup: data.anonymityMode === 'profile' ? data.authorGroup : undefined,
    imageUrl: data.imageUrl,
    createdAt: new Date().toISOString(),
    likes: 0,
    userLiked: false,
    saves: 0,
    userSaved: false,
    commentsCount: 0,
    comments: [],
    views: 1,
    moderationStatus: analysis.moderationStatus,
    analysis,
  };

  persistConfession(newConfession);
  return newConfession;
}

export function getConfessionsForUniversity(
  universitySlug?: string,
  options?: {
    category?: string;
    sortBy?: 'latest' | 'popular' | 'discussed' | 'saved';
    search?: string;
    savedOnly?: boolean;
    onlyPublished?: boolean;
  }
): Confession[] {
  let list = getStoredConfessions();
  const profile = getStoredUserProfile();

  if (universitySlug && universitySlug !== 'all') {
    list = list.filter((c) => c.universitySlug === universitySlug);
  }

  if (options?.onlyPublished !== false) {
    list = list.filter((c) => c.moderationStatus === 'Published');
  }

  if (options?.category && options.category !== 'All') {
    list = list.filter((c) => c.category === options.category);
  }

  if (options?.search) {
    const q = options.search.toLowerCase();
    list = list.filter(
      (c) =>
        c.content.toLowerCase().includes(q) ||
        (c.title && c.title.toLowerCase().includes(q)) ||
        c.category.toLowerCase().includes(q)
    );
  }

  if (options?.savedOnly) {
    list = list.filter((c) => profile.savedConfessionIds.includes(c.id));
  }

  // Sorting
  const sortBy = options?.sortBy || 'latest';
  list = [...list].sort((a, b) => {
    if (sortBy === 'popular') return b.likes - a.likes;
    if (sortBy === 'discussed') return b.commentsCount - a.commentsCount;
    // default: latest
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return list;
}

export function toggleLikeConfession(id: string): Confession | undefined {
  const list = getStoredConfessions();
  let updatedItem: Confession | undefined;

  const updatedList = list.map((item) => {
    if (item.id === id) {
      const userLiked = !item.userLiked;
      const likes = userLiked ? item.likes + 1 : Math.max(0, item.likes - 1);
      updatedItem = { ...item, userLiked, likes };
      return updatedItem;
    }
    return item;
  });

  saveStoredConfessions(updatedList);
  return updatedItem;
}

export function toggleSaveConfession(id: string): { isSaved: boolean; confession?: Confession } {
  const profile = getStoredUserProfile();
  const isCurrentlySaved = profile.savedConfessionIds.includes(id);

  let newSavedIds: string[];
  if (isCurrentlySaved) {
    newSavedIds = profile.savedConfessionIds.filter((item) => item !== id);
  } else {
    newSavedIds = [...profile.savedConfessionIds, id];
  }

  saveStoredUserProfile({ ...profile, savedConfessionIds: newSavedIds });

  // Update confession save count
  const list = getStoredConfessions();
  let updatedConfession: Confession | undefined;
  const updatedList = list.map((item) => {
    if (item.id === id) {
      const saves = !isCurrentlySaved ? item.saves + 1 : Math.max(0, item.saves - 1);
      updatedConfession = { ...item, userSaved: !isCurrentlySaved, saves };
      return updatedConfession;
    }
    return item;
  });
  saveStoredConfessions(updatedList);

  return { isSaved: !isCurrentlySaved, confession: updatedConfession };
}

export function addCommentToConfession(
  confessionId: string,
  content: string,
  authorNickname: string,
  isAnonymous: boolean
): Comment | undefined {
  const list = getStoredConfessions();
  let createdComment: Comment | undefined;

  const updatedList = list.map((item) => {
    if (item.id === confessionId) {
      const newComment: Comment = {
        id: `comm-${Date.now()}`,
        confessionId,
        authorNickname: isAnonymous ? 'Secret Student' : (authorNickname || 'Student'),
        isAnonymous,
        content: content.trim(),
        createdAt: new Date().toISOString(),
        likes: 0,
      };
      createdComment = newComment;
      const currentComments = item.comments || [];
      return {
        ...item,
        commentsCount: item.commentsCount + 1,
        comments: [...currentComments, newComment],
      };
    }
    return item;
  });

  saveStoredConfessions(updatedList);
  return createdComment;
}

export function deleteConfession(id: string): boolean {
  const list = getStoredConfessions();
  const filtered = list.filter((item) => item.id !== id);
  saveStoredConfessions(filtered);
  return true;
}

export function updateConfessionModeration(id: string, status: Confession['moderationStatus']): void {
  const list = getStoredConfessions();
  const updated = list.map((item) => (item.id === id ? { ...item, moderationStatus: status } : item));
  saveStoredConfessions(updated);
}
