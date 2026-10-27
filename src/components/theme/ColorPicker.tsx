import React from 'react';
import { useTheme } from './ThemeProvider';
import { RefreshCw, Check } from 'lucide-react';

export const ColorPicker: React.FC = () => {
  const { settings, currentColors, setCustomColors, setIsCustomColorsEnabled, resetTheme, activePreset } = useTheme();

  const handleColorChange = (key: 'primary' | 'accent' | 'background' | 'surface' | 'text', value: string) => {
    setCustomColors({ [key]: value });
  };

  return (
    <div className="p-6 rounded-2xl theme-surface space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4 theme-border">
        <div>
          <h3 className="text-lg font-bold">Custom Color Palette</h3>
          <p className="text-sm theme-text-muted">
            Fine-tune any individual hue using real HTML color pickers. Changes apply globally in real-time.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {settings.isCustomColorsEnabled && (
            <button
              onClick={() => setIsCustomColorsEnabled(false)}
              className="text-xs px-3 py-1.5 rounded-lg border theme-border theme-text-muted hover:text-black dark:hover:text-white transition-colors"
            >
              Revert to Preset
            </button>
          )}
          <button
            onClick={resetTheme}
            className="text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/20 transition-colors font-medium"
          >
            <RefreshCw size={13} />
            Reset All
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Primary Color */}
        <div className="p-3.5 rounded-xl border theme-border flex flex-col justify-between space-y-3 bg-black/5 dark:bg-white/5">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">Primary Color</span>
            <div
              className="w-5 h-5 rounded-full border border-black/10 dark:border-white/20 shadow-sm"
              style={{ backgroundColor: currentColors.primary }}
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="color"
              aria-label="Pick primary color"
              value={currentColors.primary}
              onChange={(e) => handleColorChange('primary', e.target.value)}
              className="w-10 h-10 rounded-lg cursor-pointer border-0 p-0 bg-transparent"
            />
            <input
              type="text"
              aria-label="Primary color hex value"
              value={currentColors.primary.toUpperCase()}
              onChange={(e) => handleColorChange('primary', e.target.value)}
              className="w-full text-xs font-mono px-2 py-1.5 rounded border theme-border bg-transparent"
            />
          </div>
          <span className="text-[11px] theme-text-muted">Buttons, active tabs & links</span>
        </div>

        {/* Accent Color */}
        <div className="p-3.5 rounded-xl border theme-border flex flex-col justify-between space-y-3 bg-black/5 dark:bg-white/5">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">Accent Color</span>
            <div
              className="w-5 h-5 rounded-full border border-black/10 dark:border-white/20 shadow-sm"
              style={{ backgroundColor: currentColors.accent }}
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="color"
              aria-label="Pick accent color"
              value={currentColors.accent}
              onChange={(e) => handleColorChange('accent', e.target.value)}
              className="w-10 h-10 rounded-lg cursor-pointer border-0 p-0 bg-transparent"
            />
            <input
              type="text"
              aria-label="Accent color hex value"
              value={currentColors.accent.toUpperCase()}
              onChange={(e) => handleColorChange('accent', e.target.value)}
              className="w-full text-xs font-mono px-2 py-1.5 rounded border theme-border bg-transparent"
            />
          </div>
          <span className="text-[11px] theme-text-muted">Badges, sparks & highlights</span>
        </div>

        {/* Background Color */}
        <div className="p-3.5 rounded-xl border theme-border flex flex-col justify-between space-y-3 bg-black/5 dark:bg-white/5">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">Background</span>
            <div
              className="w-5 h-5 rounded-full border border-black/10 dark:border-white/20 shadow-sm"
              style={{ backgroundColor: currentColors.background }}
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="color"
              aria-label="Pick background color"
              value={currentColors.background}
              onChange={(e) => handleColorChange('background', e.target.value)}
              className="w-10 h-10 rounded-lg cursor-pointer border-0 p-0 bg-transparent"
            />
            <input
              type="text"
              aria-label="Background color hex value"
              value={currentColors.background.toUpperCase()}
              onChange={(e) => handleColorChange('background', e.target.value)}
              className="w-full text-xs font-mono px-2 py-1.5 rounded border theme-border bg-transparent"
            />
          </div>
          <span className="text-[11px] theme-text-muted">Canvas & app backdrop</span>
        </div>

        {/* Surface Color */}
        <div className="p-3.5 rounded-xl border theme-border flex flex-col justify-between space-y-3 bg-black/5 dark:bg-white/5">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">Card Surface</span>
            <div
              className="w-5 h-5 rounded-full border border-black/10 dark:border-white/20 shadow-sm"
              style={{ backgroundColor: currentColors.surface }}
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="color"
              aria-label="Pick surface color"
              value={currentColors.surface}
              onChange={(e) => handleColorChange('surface', e.target.value)}
              className="w-10 h-10 rounded-lg cursor-pointer border-0 p-0 bg-transparent"
            />
            <input
              type="text"
              aria-label="Surface color hex value"
              value={currentColors.surface.toUpperCase()}
              onChange={(e) => handleColorChange('surface', e.target.value)}
              className="w-full text-xs font-mono px-2 py-1.5 rounded border theme-border bg-transparent"
            />
          </div>
          <span className="text-[11px] theme-text-muted">Cards, modals & dropdowns</span>
        </div>

        {/* Text Color */}
        <div className="p-3.5 rounded-xl border theme-border flex flex-col justify-between space-y-3 bg-black/5 dark:bg-white/5">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">Text Color</span>
            <div
              className="w-5 h-5 rounded-full border border-black/10 dark:border-white/20 shadow-sm"
              style={{ backgroundColor: currentColors.text }}
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="color"
              aria-label="Pick text color"
              value={currentColors.text}
              onChange={(e) => handleColorChange('text', e.target.value)}
              className="w-10 h-10 rounded-lg cursor-pointer border-0 p-0 bg-transparent"
            />
            <input
              type="text"
              aria-label="Text color hex value"
              value={currentColors.text.toUpperCase()}
              onChange={(e) => handleColorChange('text', e.target.value)}
              className="w-full text-xs font-mono px-2 py-1.5 rounded border theme-border bg-transparent"
            />
          </div>
          <span className="text-[11px] theme-text-muted">Headings & body copy</span>
        </div>
      </div>

      {settings.isCustomColorsEnabled && (
        <div className="flex items-center gap-2 text-xs py-2 px-3 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
          <Check size={14} />
          <span>Custom palette active on top of <strong>{activePreset.name}</strong> typography and layout settings.</span>
        </div>
      )}
    </div>
  );
};
