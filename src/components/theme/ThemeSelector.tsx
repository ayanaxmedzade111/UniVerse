import React from 'react';
import { useTheme } from './ThemeProvider';
import { THEME_PRESETS } from '../../data/themePresets';
import { ThemePresetId } from '../../types';
import { Check, Sparkles, Sun, Moon, Laptop } from 'lucide-react';

export const ThemeSelector: React.FC = () => {
  const { settings, setPreset, setMode, isDark } = useTheme();

  const presetsList = Object.values(THEME_PRESETS);

  return (
    <div className="space-y-6">
      {/* Light / Dark / System Mode Switcher */}
      <div className="p-4 rounded-2xl theme-surface flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 className="font-semibold text-sm">Appearance Mode</h4>
          <p className="text-xs theme-text-muted">Choose your preferred light balance or match device settings.</p>
        </div>
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/5 dark:bg-white/5 border theme-border">
          <button
            onClick={() => setMode('light')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              settings.mode === 'light'
                ? 'bg-white dark:bg-zinc-800 shadow-sm text-zinc-900 dark:text-zinc-100'
                : 'theme-text-muted hover:text-zinc-900 dark:hover:text-zinc-100'
            }`}
          >
            <Sun size={14} />
            Light
          </button>
          <button
            onClick={() => setMode('dark')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              settings.mode === 'dark'
                ? 'bg-white dark:bg-zinc-800 shadow-sm text-zinc-900 dark:text-zinc-100'
                : 'theme-text-muted hover:text-zinc-900 dark:hover:text-zinc-100'
            }`}
          >
            <Moon size={14} />
            Dark
          </button>
          <button
            onClick={() => setMode('system')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              settings.mode === 'system'
                ? 'bg-white dark:bg-zinc-800 shadow-sm text-zinc-900 dark:text-zinc-100'
                : 'theme-text-muted hover:text-zinc-900 dark:hover:text-zinc-100'
            }`}
          >
            <Laptop size={14} />
            System
          </button>
        </div>
      </div>

      {/* Preset Theme Cards Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="font-bold text-base flex items-center gap-2">
              <Sparkles size={16} className="text-amber-500" />
              12 Aesthetic Theme Presets
            </h4>
            <p className="text-xs theme-text-muted">
              Each preset changes fonts, borders, palettes, and mood across the entire community.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {presetsList.map((preset) => {
            const isSelected = settings.activePresetId === preset.id;
            const previewColors = isDark ? preset.dark : preset.light;

            return (
              <button
                key={preset.id}
                onClick={() => setPreset(preset.id as ThemePresetId)}
                className={`relative text-left p-4 rounded-xl border transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'ring-2 shadow-md transform -translate-y-0.5'
                    : 'hover:shadow-sm hover:border-zinc-400 dark:hover:border-zinc-600'
                }`}
                style={{
                  backgroundColor: previewColors.surface,
                  borderColor: isSelected ? previewColors.primary : previewColors.border,
                  color: previewColors.text,
                }}
              >
                {/* Active Check Badge */}
                {isSelected && (
                  <span
                    className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center text-white shadow"
                    style={{ backgroundColor: previewColors.primary }}
                  >
                    <Check size={14} />
                  </span>
                )}

                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span
                      className="w-3.5 h-3.5 rounded-full inline-block"
                      style={{ backgroundColor: previewColors.primary }}
                    />
                    <h5 className="font-bold text-sm tracking-tight">{preset.name}</h5>
                  </div>
                  <p className="text-xs line-clamp-2 mb-4 opacity-75">{preset.tagline}</p>
                </div>

                {/* Color swatch row & style preview */}
                <div className="space-y-2 pt-2 border-t" style={{ borderColor: previewColors.border }}>
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-4 h-4 rounded-md shadow-xs"
                      title="Primary"
                      style={{ backgroundColor: previewColors.primary }}
                    />
                    <span
                      className="w-4 h-4 rounded-md shadow-xs"
                      title="Accent"
                      style={{ backgroundColor: previewColors.accent }}
                    />
                    <span
                      className="w-4 h-4 rounded-md shadow-xs"
                      title="Surface"
                      style={{ backgroundColor: previewColors.surface }}
                    />
                    <span
                      className="w-4 h-4 rounded-md shadow-xs"
                      title="Background"
                      style={{ backgroundColor: previewColors.background }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] opacity-60">
                    <span>Radius: {preset.borderRadius}</span>
                    <span className="truncate max-w-[110px]">{preset.fontFamilyHeading.split(',')[0].replace(/['"]/g, '')}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
