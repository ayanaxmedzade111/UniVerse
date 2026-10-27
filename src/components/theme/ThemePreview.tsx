import React from 'react';
import { useTheme } from './ThemeProvider';
import { Heart, MessageCircle, Bookmark, Sparkles, Send } from 'lucide-react';

export const ThemePreview: React.FC = () => {
  const { activePreset, currentColors, isDark } = useTheme();

  return (
    <div className="p-6 rounded-2xl theme-surface space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-bold text-sm">Real-time Theme Output Preview</h4>
          <p className="text-xs theme-text-muted">
            Displaying live typography, button weights, and surface contrast.
          </p>
        </div>
        <span
          className="px-2.5 py-1 rounded-full text-xs font-semibold"
          style={{ backgroundColor: `${currentColors.primary}20`, color: currentColors.primary }}
        >
          {activePreset.name} • {isDark ? 'Dark' : 'Light'}
        </span>
      </div>

      <div
        className="p-5 rounded-2xl border transition-all space-y-4"
        style={{
          backgroundColor: currentColors.background,
          borderColor: currentColors.border,
          color: currentColors.text,
        }}
      >
        {/* Sample Confession Card Preview */}
        <div
          className="p-4 rounded-xl border shadow-xs space-y-3"
          style={{
            backgroundColor: currentColors.surface,
            borderColor: currentColors.border,
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
                style={{ backgroundColor: currentColors.primary }}
              >
                U
              </div>
              <div>
                <span className="text-xs font-bold block">Anonymous Student</span>
                <span className="text-[10px] opacity-70">ADA University • 10m ago</span>
              </div>
            </div>
            <span
              className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
              style={{ backgroundColor: `${currentColors.accent}20`, color: currentColors.accent }}
            >
              Love & Crushes
            </span>
          </div>

          <p className="text-xs leading-relaxed">
            "To the person studying linear algebra by the courtyard fountain with the purple sweater:
            your concentration is unmatched and your music playlist seems amazing!"
          </p>

          <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: currentColors.border }}>
            <div className="flex items-center gap-3 text-xs opacity-80">
              <span className="flex items-center gap-1">
                <Heart size={13} style={{ color: currentColors.primary }} />
                <span>48</span>
              </span>
              <span className="flex items-center gap-1">
                <MessageCircle size={13} />
                <span>12</span>
              </span>
            </div>
            <button
              className="px-3 py-1 text-xs font-medium rounded-lg text-white shadow-xs"
              style={{ backgroundColor: currentColors.primary }}
            >
              Read More
            </button>
          </div>
        </div>

        {/* Action button samples */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white shadow-xs"
            style={{ backgroundColor: currentColors.primary }}
          >
            <Sparkles size={13} />
            Primary Action
          </button>
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white shadow-xs"
            style={{ backgroundColor: currentColors.accent }}
          >
            <Send size={13} />
            Accent Action
          </button>
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border"
            style={{
              backgroundColor: currentColors.surface,
              borderColor: currentColors.border,
              color: currentColors.text,
            }}
          >
            <Bookmark size={13} />
            Secondary Outline
          </button>
        </div>
      </div>
    </div>
  );
};
