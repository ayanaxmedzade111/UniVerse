import React, { useState, useEffect } from 'react';
import { ConfessionCategory, AnonymityMode, ConfessionAnalysis } from '../../types';
import { analyzeConfession } from '../../services/aiClassifier';
import { createConfession } from '../../services/confessionService';
import { getStoredUserProfile } from '../../services/storageService';
import { useTheme } from '../theme/ThemeProvider';
import {
  Lock,
  User,
  Sparkles,
  AlertCircle,
  Eye,
  Check,
  Image as ImageIcon,
  HelpCircle,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ConfessionComposerProps {
  universityId: string;
  universitySlug: string;
  universityName: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const CATEGORIES: ConfessionCategory[] = [
  'Love & Crushes',
  'Funny',
  'Gossip',
  'Academic Life',
  'Friendship',
  'Roommates',
  'University Life',
  'Rants',
  'Advice',
  'Secrets',
  'Career',
  'Other',
];

export const ConfessionComposer: React.FC<ConfessionComposerProps> = ({
  universityId,
  universitySlug,
  universityName,
  onSuccess,
  onCancel,
}) => {
  const { currentColors } = useTheme();
  const profile = getStoredUserProfile();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ConfessionCategory | ''>('');
  const [anonymityMode, setAnonymityMode] = useState<AnonymityMode>('anonymous');
  const [customNickname, setCustomNickname] = useState(profile.nickname || 'SecretStudent');
  const [showAdvancedFields, setShowAdvancedFields] = useState(false);
  const [department, setDepartment] = useState(profile.department || '');
  const [academicYear, setAcademicYear] = useState(profile.academicYear || '');
  const [group, setGroup] = useState(profile.group || '');
  const [imageUrl, setImageUrl] = useState('');

  const [analysis, setAnalysis] = useState<ConfessionAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Debounced auto-analysis when text changes
  useEffect(() => {
    if (!content.trim() || content.trim().length < 10) {
      setAnalysis(null);
      return;
    }

    const timer = setTimeout(async () => {
      setIsAnalyzing(true);
      try {
        const result = await analyzeConfession(content, title);
        setAnalysis(result);
        if (!selectedCategory) {
          setSelectedCategory(result.category);
        }
      } catch (err) {
        console.error('Analysis error:', err);
      } finally {
        setIsAnalyzing(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [content, title]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      setErrorMsg('Confession text is required.');
      return;
    }
    if (content.trim().length < 8) {
      setErrorMsg('Please write at least a brief sentence.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      await createConfession({
        universityId,
        universitySlug,
        universityName,
        title: title.trim() || undefined,
        content: content.trim(),
        category: selectedCategory || (analysis ? analysis.category : 'University Life'),
        anonymityMode,
        authorNickname: anonymityMode === 'nickname' ? customNickname : undefined,
        authorDepartment: anonymityMode === 'profile' ? department : undefined,
        authorYear: anonymityMode === 'profile' ? academicYear : undefined,
        authorGroup: anonymityMode === 'profile' ? group : undefined,
        imageUrl: imageUrl.trim() || undefined,
      });

      try {
        confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
      } catch {
        // safe fallback
      }

      if (onSuccess) onSuccess();
    } catch (err: any) {
      setErrorMsg(err?.message || 'Failed to publish confession.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 rounded-2xl theme-surface space-y-6 max-w-2xl mx-auto shadow-sm">
      <div className="flex items-start justify-between border-b pb-4 theme-border">
        <div>
          <h2 className="text-xl font-bold tracking-tight">Write a Confession</h2>
          <p className="text-xs theme-text-muted mt-0.5">
            Share what’s on your mind with students at <strong>{universityName}</strong>.
          </p>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
          <ShieldCheck size={14} />
          Safe & Monitored
        </div>
      </div>

      {errorMsg && (
        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
          <AlertCircle size={16} />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Anonymity Controls */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider block opacity-75">
            Privacy & Identity Mode
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <button
              type="button"
              onClick={() => setAnonymityMode('anonymous')}
              className={`p-3 rounded-xl border text-left transition-all ${
                anonymityMode === 'anonymous'
                  ? 'theme-btn-primary shadow-xs ring-2 ring-primary/40'
                  : 'theme-surface theme-surface-hover'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Lock size={14} />
                <span className="font-bold text-xs">Completely Anonymous</span>
              </div>
              <p className="text-[11px] opacity-80">Default. No name, avatar, or profile traces shown.</p>
            </button>

            <button
              type="button"
              onClick={() => setAnonymityMode('nickname')}
              className={`p-3 rounded-xl border text-left transition-all ${
                anonymityMode === 'nickname'
                  ? 'theme-btn-primary shadow-xs ring-2 ring-primary/40'
                  : 'theme-surface theme-surface-hover'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <User size={14} />
                <span className="font-bold text-xs">Custom Nickname</span>
              </div>
              <p className="text-[11px] opacity-80">Publish under a cute pseudonym or handle.</p>
            </button>

            <button
              type="button"
              onClick={() => setAnonymityMode('profile')}
              className={`p-3 rounded-xl border text-left transition-all ${
                anonymityMode === 'profile'
                  ? 'theme-btn-primary shadow-xs ring-2 ring-primary/40'
                  : 'theme-surface theme-surface-hover'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Sparkles size={14} />
                <span className="font-bold text-xs">Student Profile</span>
              </div>
              <p className="text-[11px] opacity-80">Signed with your profile handle.</p>
            </button>
          </div>

          {anonymityMode === 'nickname' && (
            <div className="pt-2">
              <label className="text-xs font-semibold block mb-1">Your Nickname</label>
              <input
                type="text"
                value={customNickname}
                onChange={(e) => setCustomNickname(e.target.value)}
                placeholder="e.g. SecretPoet, MatchaLatte..."
                className="w-full px-3.5 py-2 text-xs rounded-xl theme-input bg-transparent"
              />
            </div>
          )}
        </div>

        {/* Title (Optional) */}
        <div>
          <label className="text-xs font-semibold block mb-1">Confession Title (Optional)</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. To the person reading in Building B corner..."
            className="w-full px-3.5 py-2 text-xs rounded-xl theme-input bg-transparent"
          />
        </div>

        {/* Confession Content */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-semibold">Your Confession *</label>
            <span className="text-[11px] theme-text-muted">{content.length} characters</span>
          </div>
          <textarea
            required
            rows={5}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What happened? Share your crush, library thought, exam struggle, funny moment, or secret..."
            className="w-full p-3.5 text-xs rounded-xl theme-input bg-transparent resize-y"
          />
        </div>

        {/* Category Picker */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold">Category Selection</label>
            {analysis && (
              <span className="text-[11px] text-primary flex items-center gap-1 font-medium">
                <Sparkles size={12} />
                AI suggested: {analysis.category}
              </span>
            )}
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as ConfessionCategory)}
            className="w-full p-2.5 text-xs rounded-xl theme-input bg-transparent"
          >
            <option value="">Select a category (or let AI auto-categorize)</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* AI Analyzer Live Diagnostic Banner */}
        {content.trim().length >= 10 && (
          <div className="p-4 rounded-xl border theme-border bg-black/5 dark:bg-white/5 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold flex items-center gap-1.5 text-primary">
                <Sparkles size={14} />
                AI Content Analyzer & Safety Check
              </span>
              <span className="text-[10px] theme-text-muted">
                Engine: {analysis?.engineUsed || 'Analyzing...'}
              </span>
            </div>

            {isAnalyzing ? (
              <p className="text-xs theme-text-muted italic">Analyzing sentiment and community safety...</p>
            ) : analysis ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs pt-1">
                <div className="p-2 rounded-lg bg-black/5 dark:bg-white/5">
                  <span className="text-[10px] theme-text-muted block">Category</span>
                  <span className="font-semibold">{analysis.category}</span>
                </div>
                <div className="p-2 rounded-lg bg-black/5 dark:bg-white/5">
                  <span className="text-[10px] theme-text-muted block">Sentiment</span>
                  <span className="font-semibold">{analysis.sentiment}</span>
                </div>
                <div className="p-2 rounded-lg bg-black/5 dark:bg-white/5">
                  <span className="text-[10px] theme-text-muted block">Advice Flag</span>
                  <span className="font-semibold">{analysis.needsAdvice ? 'Yes (Advice)' : 'General'}</span>
                </div>
                <div className="p-2 rounded-lg bg-black/5 dark:bg-white/5">
                  <span className="text-[10px] theme-text-muted block">Safety Review</span>
                  <span
                    className={`font-semibold ${
                      analysis.moderationStatus === 'Published'
                        ? 'text-emerald-500'
                        : 'text-amber-500'
                    }`}
                  >
                    {analysis.moderationStatus}
                  </span>
                </div>
              </div>
            ) : null}

            {analysis?.potentialViolation && (
              <div className="text-xs text-amber-600 dark:text-amber-400 p-2 rounded-lg bg-amber-500/10 flex items-start gap-2">
                <AlertCircle size={15} className="mt-0.5 shrink-0" />
                <span>
                  <strong>Moderation notice:</strong> {analysis.moderationReason || 'May require manual approval before public feed display.'}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Optional Identifying Details Accordion */}
        <div className="border-t pt-3 theme-border">
          <button
            type="button"
            onClick={() => setShowAdvancedFields(!showAdvancedFields)}
            className="flex items-center justify-between w-full text-xs font-semibold theme-text-muted hover:text-black dark:hover:text-white"
          >
            <span>Optional Academic Info & Image Attachment</span>
            {showAdvancedFields ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          </button>

          {showAdvancedFields && (
            <div className="space-y-3 pt-3">
              <p className="text-[11px] theme-text-muted">
                These optional details remain private unless you selected "Student Profile" mode.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div>
                  <label className="text-[11px] font-medium block mb-1">Department</label>
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    placeholder="e.g. IT, Law, Economics"
                    className="w-full px-3 py-1.5 text-xs rounded-xl theme-input bg-transparent"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-medium block mb-1">Academic Year</label>
                  <input
                    type="text"
                    value={academicYear}
                    onChange={(e) => setAcademicYear(e.target.value)}
                    placeholder="e.g. Year 2"
                    className="w-full px-3 py-1.5 text-xs rounded-xl theme-input bg-transparent"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-medium block mb-1">Group / Cohort</label>
                  <input
                    type="text"
                    value={group}
                    onChange={(e) => setGroup(e.target.value)}
                    placeholder="e.g. CS-24B"
                    className="w-full px-3 py-1.5 text-xs rounded-xl theme-input bg-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-medium block mb-1">Image Attachment URL (Optional)</label>
                <div className="flex items-center gap-2">
                  <ImageIcon size={16} className="theme-text-muted" />
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full px-3 py-1.5 text-xs rounded-xl theme-input bg-transparent"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Live Card Preview Toggle */}
        <div className="pt-2">
          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
          >
            <Eye size={14} />
            {showPreview ? 'Hide Card Preview' : 'Preview Before Publishing'}
          </button>

          {showPreview && (
            <div className="mt-3 p-4 rounded-xl border theme-border bg-black/5 dark:bg-white/5 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider theme-text-muted block">
                How other students will see this:
              </span>
              <div className="flex items-center gap-2">
                <div
                  className="w-7 h-7 rounded-full text-white flex items-center justify-center text-xs font-bold"
                  style={{ backgroundColor: currentColors.primary }}
                >
                  {anonymityMode === 'anonymous' ? <Lock size={12} /> : customNickname[0] || 'U'}
                </div>
                <div>
                  <span className="text-xs font-bold block">
                    {anonymityMode === 'anonymous' ? 'Anonymous Student' : customNickname}
                  </span>
                  <span className="text-[10px] theme-text-muted">{universityName} • Just now</span>
                </div>
              </div>
              {title && <h4 className="font-bold text-sm">{title}</h4>}
              <p className="text-xs opacity-90 leading-relaxed whitespace-pre-wrap">
                {content || 'Your confession text will appear here...'}
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t theme-border">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2.5 text-xs font-medium rounded-xl border theme-border hover:bg-black/5 dark:hover:bg-white/5"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={isSubmitting || !content.trim()}
            className="px-6 py-2.5 text-xs font-bold rounded-xl theme-btn-primary shadow-sm disabled:opacity-50 flex items-center gap-2"
          >
            <Check size={15} />
            {isSubmitting ? 'Publishing...' : 'Publish Confession'}
          </button>
        </div>
      </form>
    </div>
  );
};
