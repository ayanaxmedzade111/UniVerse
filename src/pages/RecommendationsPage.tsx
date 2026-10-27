import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { PageLayout } from '../components/layout/PageLayout';
import { CampusRecommendation } from '../types';
import {
  getStoredRecommendations,
  addRecommendation,
  getStoredUserProfile,
} from '../../src/services/storageService';
import { getUniversityBySlug } from '../services/universityService';
import {
  Coffee,
  Plus,
  MapPin,
  ThumbsUp,
  Star,
  Search,
  Check,
  X,
  Sparkles,
} from 'lucide-react';
import confetti from 'canvas-confetti';

const TAGS_LIST = [
  'All Tags',
  'Quiet',
  'Good Wi-Fi',
  'Power Outlets',
  'Affordable',
  'Late Opening',
  'Near Campus',
  'Group Study',
  'Specialty Coffee',
];

const CATEGORIES_LIST = [
  'All',
  'Cafe',
  'Restaurant',
  'Bookstore',
  'Library',
  'Study Space',
  'Late Food',
];

export const RecommendationsPage: React.FC = () => {
  const { universitySlug } = useParams<{ universitySlug: string }>();
  const slug = universitySlug || 'ada-university';
  const university = getUniversityBySlug(slug);
  const profile = getStoredUserProfile();

  const [recommendations, setRecommendations] = useState<CampusRecommendation[]>(() =>
    getStoredRecommendations(slug)
  );
  const [selectedTag, setSelectedTag] = useState('All Tags');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form states
  const [placeName, setPlaceName] = useState('');
  const [category, setCategory] = useState<CampusRecommendation['category']>('Cafe');
  const [address, setAddress] = useState('');
  const [distance, setDistance] = useState('5 min walk');
  const [rating, setRating] = useState('4.8');
  const [description, setDescription] = useState('');
  const [tagsInput, setTagsInput] = useState('Quiet, Good Wi-Fi, Near Campus');

  const filtered = recommendations.filter((item) => {
    if (selectedCategory !== 'All' && item.category !== selectedCategory) return false;
    if (selectedTag !== 'All Tags' && !item.tags.includes(selectedTag)) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.address.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleUpvote = (id: string) => {
    setRecommendations((prev) =>
      prev.map((rec) => {
        if (rec.id === id) {
          const userUpvoted = !rec.userUpvoted;
          const upvotes = userUpvoted ? rec.upvotes + 1 : Math.max(0, rec.upvotes - 1);
          return { ...rec, userUpvoted, upvotes };
        }
        return rec;
      })
    );
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!placeName.trim() || !description.trim()) return;

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const newRec: CampusRecommendation = {
      id: `rec-${Date.now()}`,
      universityId: university?.id || slug,
      universitySlug: slug,
      name: placeName.trim(),
      category,
      address: address.trim() || 'Near Campus',
      distanceFromCampus: distance.trim() || '5 min walk',
      rating: parseFloat(rating) || 4.5,
      tags: tags.length > 0 ? tags : ['Near Campus'],
      authorNickname: profile.nickname || 'Student',
      description: description.trim(),
      createdAt: new Date().toISOString(),
      upvotes: 1,
      userUpvoted: true,
    };

    addRecommendation(newRec);
    setRecommendations((prev) => [newRec, ...prev]);
    setShowAddModal(false);

    // Reset fields
    setPlaceName('');
    setDescription('');
    setAddress('');

    try {
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
    } catch {
      // safe fallback
    }
  };

  return (
    <PageLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-6 theme-border">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400">
                Local Discoveries
              </span>
              <span className="text-xs theme-text-muted">• {university?.name || 'All Campuses'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Campus Places & Secret Spots
            </h1>
            <p className="text-xs theme-text-muted mt-0.5">
              Favorite study cafes, late-night doner, peaceful parks, and stationery centers near {university?.shortName}.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold theme-btn-primary shadow-xs self-start sm:self-auto"
          >
            <Plus size={15} />
            <span>Recommend a Spot</span>
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 theme-text-muted" />
              <input
                type="text"
                placeholder="Search cafes, libraries, cheap lunches..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl theme-input bg-transparent"
              />
            </div>

            {/* Category Select */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="p-2.5 text-xs rounded-xl theme-input bg-transparent"
              aria-label="Filter recommendations by category"
            >
              {CATEGORIES_LIST.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'All' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>

          {/* Quick Tag Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {TAGS_LIST.map((tag) => {
              const isSelected = selectedTag === tag;
              return (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                    isSelected
                      ? 'theme-btn-primary border-transparent shadow-xs'
                      : 'theme-surface theme-border theme-text-muted hover:text-black dark:hover:text-white'
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        {/* Places Grid */}
        {filtered.length === 0 ? (
          <div className="p-12 rounded-3xl theme-surface border theme-border text-center space-y-3">
            <Coffee size={36} className="mx-auto theme-text-muted opacity-50" />
            <h3 className="font-bold text-base">No places found matching criteria</h3>
            <p className="text-xs theme-text-muted max-w-sm mx-auto">
              Know an awesome coffee shop or library nook near campus? Share it with other students!
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 text-xs font-bold rounded-xl theme-btn-primary shadow-xs"
            >
              Add First Recommendation
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="theme-card p-5 flex flex-col justify-between space-y-4 hover:border-primary/40 transition-all"
              >
                <div className="space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold text-primary uppercase tracking-wider block">
                        {item.category}
                      </span>
                      <h3 className="font-bold text-base tracking-tight">{item.name}</h3>
                    </div>
                    <span className="flex items-center gap-1 text-xs font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-md">
                      <Star size={12} fill="currentColor" />
                      {item.rating}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs theme-text-muted">
                    <MapPin size={13} className="text-rose-500 shrink-0" />
                    <span className="truncate">{item.address}</span>
                    <span>•</span>
                    <span className="font-semibold shrink-0">{item.distanceFromCampus}</span>
                  </div>

                  <p className="text-xs opacity-85 leading-relaxed">{item.description}</p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/5 border theme-border theme-text-muted font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t theme-border flex items-center justify-between text-xs">
                  <span className="text-[11px] theme-text-muted">
                    Rec by @{item.authorNickname}
                  </span>
                  <button
                    onClick={() => handleUpvote(item.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-semibold transition-all ${
                      item.userUpvoted
                        ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                        : 'theme-surface-hover theme-text-muted hover:text-black dark:hover:text-white'
                    }`}
                  >
                    <ThumbsUp size={13} fill={item.userUpvoted ? 'currentColor' : 'none'} />
                    <span>{item.upvotes} Helpful</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Recommendation Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-lg p-6 rounded-2xl theme-surface space-y-4 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg theme-text-muted hover:text-black dark:hover:text-white"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-primary/10 text-primary">
                <Coffee size={18} />
              </div>
              <div>
                <h3 className="font-bold text-base">Recommend a Campus Spot</h3>
                <p className="text-xs theme-text-muted">Share your favorite cafe, library or quick bite spot.</p>
              </div>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3.5">
              <div>
                <label className="text-xs font-semibold block mb-1">Place Name *</label>
                <input
                  type="text"
                  required
                  value={placeName}
                  onChange={(e) => setPlaceName(e.target.value)}
                  placeholder="e.g. Coffee Moffie, Dede Gorgud Pergola"
                  className="w-full px-3 py-2 text-xs rounded-xl theme-input bg-transparent"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold block mb-1">Category *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full p-2 text-xs rounded-xl theme-input bg-transparent"
                  >
                    <option value="Cafe">Cafe</option>
                    <option value="Restaurant">Restaurant</option>
                    <option value="Bookstore">Bookstore</option>
                    <option value="Library">Library</option>
                    <option value="Study Space">Study Space</option>
                    <option value="Late Food">Late Food</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold block mb-1">Rating (1-5)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl theme-input bg-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold block mb-1">Address / Landmark</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. Ganjlik Mall, 2nd Floor"
                    className="w-full px-3 py-2 text-xs rounded-xl theme-input bg-transparent"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold block mb-1">Distance from Campus</label>
                  <input
                    type="text"
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                    placeholder="e.g. 5 min walk"
                    className="w-full px-3 py-2 text-xs rounded-xl theme-input bg-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold block mb-1">Why do students love it? *</label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the Wi-Fi, noise level, price range, seating, and outlet access..."
                  className="w-full p-2.5 text-xs rounded-xl theme-input bg-transparent resize-y"
                />
              </div>

              <div>
                <label className="text-xs font-semibold block mb-1">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="Quiet, Good Wi-Fi, Affordable, Near Campus"
                  className="w-full px-3 py-2 text-xs rounded-xl theme-input bg-transparent"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t theme-border">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-medium rounded-xl border theme-border"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold rounded-xl theme-btn-primary shadow-xs"
                >
                  Save Recommendation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </PageLayout>
  );
};
