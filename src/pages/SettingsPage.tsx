import React from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { ThemeSelector } from '../components/theme/ThemeSelector';
import { ColorPicker } from '../components/theme/ColorPicker';
import { ThemePreview } from '../components/theme/ThemePreview';
import { Palette, Sparkles, Sliders } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  return (
    <PageLayout>
      <div className="space-y-10 max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary">
            <Palette size={13} />
            <span>Theme & Styling Studio</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Appearance & Visual Identity
          </h1>
          <p className="text-xs sm:text-sm theme-text-muted leading-relaxed">
            Customize the entire look and feel of UniVerse. Switch between light and dark modes,
            pick from 12 distinct aesthetic presets, or fine-tune exact hex shades using HTML color inputs.
          </p>
        </div>

        {/* 1. Theme Presets & Modes */}
        <ThemeSelector />

        {/* 2. Custom Color Picker */}
        <ColorPicker />

        {/* 3. Live Preview Card */}
        <ThemePreview />
      </div>
    </PageLayout>
  );
};
