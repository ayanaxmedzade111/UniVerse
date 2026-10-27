import React, { useState } from 'react';
import { AvatarConfig } from '../../types';
import { AvatarPreview } from './AvatarPreview';
import { AvatarOptions, SKIN_TONES, HAIR_COLORS, EYE_COLORS, BG_COLORS, CLOTHING_COLORS } from './AvatarOptions';
import { DEFAULT_AVATAR } from '../../data/sampleChat';
import { getStoredUserProfile, saveStoredUserProfile } from '../../services/storageService';
import { Dices, RotateCcw, Check, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface AvatarEditorProps {
  onSave?: (savedConfig: AvatarConfig) => void;
}

export const AvatarEditor: React.FC<AvatarEditorProps> = ({ onSave }) => {
  const [profile, setProfile] = useState(() => getStoredUserProfile());
  const [config, setConfig] = useState<AvatarConfig>(profile.avatar || DEFAULT_AVATAR);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleUpdate = (updates: Partial<AvatarConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }));
    setSavedSuccess(false);
  };

  const handleRandomize = () => {
    const randomItem = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
    const faceShapes: AvatarConfig['faceShape'][] = ['round', 'oval', 'heart', 'square'];
    const hairstyles: AvatarConfig['hairstyle'][] = [
      'curly',
      'wavy',
      'bob',
      'ponytail',
      'buzz',
      'fluffy',
      'messyBun',
      'straightLong',
    ];
    const eyeStyles: AvatarConfig['eyeStyle'][] = ['sparkle', 'anime', 'relaxed', 'catEye', 'sleepy', 'wink'];
    const eyebrows: AvatarConfig['eyebrows'][] = ['natural', 'softArch', 'bold', 'curious'];
    const mouths: AvatarConfig['mouth'][] = ['smile', 'catMouth', 'openSmile', 'grin', 'soft'];
    const blushes: AvatarConfig['blush'][] = ['softPeach', 'sakuraPink', 'freckles', 'none'];
    const glasses: AvatarConfig['glasses'][] = ['none', 'roundWire', 'thickFrame', 'catEye', 'retroY2K'];
    const accessories: AvatarConfig['accessories'][] = ['none', 'cuteBow', 'starClip', 'flower', 'headphones', 'beanie'];
    const earrings: AvatarConfig['earrings'][] = ['none', 'goldHoops', 'pearlStuds', 'silverStars'];
    const clothes: AvatarConfig['clothing'][] = [
      'knitSweater',
      'cozyHoodie',
      'varsityJacket',
      'academiaShirt',
      'casualTee',
    ];
    const bgShapes: AvatarConfig['backgroundShape'][] = ['circle', 'squircle', 'starburst', 'flower'];

    const newConfig: AvatarConfig = {
      skinTone: randomItem(SKIN_TONES).value,
      faceShape: randomItem(faceShapes),
      hairstyle: randomItem(hairstyles),
      hairColor: randomItem(HAIR_COLORS).value,
      eyeStyle: randomItem(eyeStyles),
      eyeColor: randomItem(EYE_COLORS).value,
      eyebrows: randomItem(eyebrows),
      mouth: randomItem(mouths),
      blush: randomItem(blushes),
      glasses: randomItem(glasses),
      accessories: randomItem(accessories),
      earrings: randomItem(earrings),
      clothing: randomItem(clothes),
      clothingColor: randomItem(CLOTHING_COLORS).value,
      backgroundShape: randomItem(bgShapes),
      backgroundColor: randomItem(BG_COLORS).value,
      decorativeSparkles: Math.random() > 0.3,
    };

    setConfig(newConfig);
    setSavedSuccess(false);
  };

  const handleApplyPresetThemeStyle = (preset: 'cute' | 'gothic' | 'academia' | 'y2k' | 'minimal') => {
    let override: Partial<AvatarConfig> = {};
    if (preset === 'cute') {
      override = {
        hairstyle: 'curly',
        accessories: 'cuteBow',
        blush: 'sakuraPink',
        clothing: 'knitSweater',
        clothingColor: '#ec4899',
        backgroundColor: '#fce7f3',
        backgroundShape: 'flower',
        decorativeSparkles: true,
      };
    } else if (preset === 'gothic') {
      override = {
        hairColor: '#1a1a1a',
        clothing: 'academiaShirt',
        clothingColor: '#27272a',
        backgroundColor: '#18181b',
        glasses: 'thickFrame',
        accessories: 'starClip',
        earrings: 'silverStars',
        backgroundShape: 'circle',
        blush: 'none',
      };
    } else if (preset === 'academia') {
      override = {
        hairstyle: 'wavy',
        hairColor: '#3a241d',
        glasses: 'roundWire',
        clothing: 'academiaShirt',
        clothingColor: '#1e3a8a',
        backgroundColor: '#fef3c7',
        accessories: 'none',
        backgroundShape: 'squircle',
      };
    } else if (preset === 'y2k') {
      override = {
        hairstyle: 'straightLong',
        hairColor: '#0d9488',
        glasses: 'retroY2K',
        accessories: 'headphones',
        clothing: 'varsityJacket',
        clothingColor: '#6366f1',
        backgroundColor: '#e0f2fe',
        backgroundShape: 'starburst',
        decorativeSparkles: true,
      };
    } else if (preset === 'minimal') {
      override = {
        faceShape: 'oval',
        glasses: 'none',
        accessories: 'none',
        earrings: 'none',
        blush: 'none',
        clothing: 'casualTee',
        clothingColor: '#27272a',
        backgroundColor: '#f4f4f5',
        backgroundShape: 'circle',
        decorativeSparkles: false,
      };
    }

    setConfig((prev) => ({ ...prev, ...override }));
    setSavedSuccess(false);
  };

  const handleSave = () => {
    const updatedProfile = { ...profile, avatar: config };
    saveStoredUserProfile(updatedProfile);
    setProfile(updatedProfile);
    setSavedSuccess(true);
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch {
      // safe fallback
    }
    if (onSave) onSave(config);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Column: Live Avatar Stage */}
      <div className="lg:col-span-5 p-6 rounded-2xl theme-surface space-y-6 flex flex-col items-center text-center">
        <div className="relative p-6 rounded-3xl bg-black/5 dark:bg-white/5 border theme-border flex items-center justify-center w-full max-w-[280px]">
          <AvatarPreview config={config} size={200} />
        </div>

        <div>
          <h3 className="font-bold text-lg">{profile.nickname || 'Student Avatar'}</h3>
          <p className="text-xs theme-text-muted">
            Cute 2D illustrated vector avatar. Rendered in clean SVG.
          </p>
        </div>

        {/* Theme presets shortcuts */}
        <div className="w-full text-left space-y-2 border-t pt-4 theme-border">
          <span className="text-xs font-semibold theme-text-muted block">Aesthetic Quick Looks:</span>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => handleApplyPresetThemeStyle('cute')}
              className="text-xs px-2.5 py-1 rounded-lg border theme-border bg-pink-500/10 text-pink-600 dark:text-pink-300 font-medium"
            >
              🎀 Cute
            </button>
            <button
              onClick={() => handleApplyPresetThemeStyle('gothic')}
              className="text-xs px-2.5 py-1 rounded-lg border theme-border bg-purple-500/10 text-purple-600 dark:text-purple-300 font-medium"
            >
              🌙 Gothic
            </button>
            <button
              onClick={() => handleApplyPresetThemeStyle('academia')}
              className="text-xs px-2.5 py-1 rounded-lg border theme-border bg-amber-500/10 text-amber-600 dark:text-amber-300 font-medium"
            >
              📚 Academia
            </button>
            <button
              onClick={() => handleApplyPresetThemeStyle('y2k')}
              className="text-xs px-2.5 py-1 rounded-lg border theme-border bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 font-medium"
            >
              ⚡ Y2K
            </button>
            <button
              onClick={() => handleApplyPresetThemeStyle('minimal')}
              className="text-xs px-2.5 py-1 rounded-lg border theme-border bg-zinc-500/10 text-zinc-600 dark:text-zinc-300 font-medium"
            >
              ◻️ Minimal
            </button>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full pt-2">
          <button
            onClick={handleRandomize}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border theme-border theme-surface theme-surface-hover text-xs font-semibold"
          >
            <Dices size={15} />
            Randomize
          </button>
          <button
            onClick={() => setConfig(DEFAULT_AVATAR)}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border theme-border text-xs font-medium theme-text-muted hover:text-black dark:hover:text-white"
          >
            <RotateCcw size={14} />
            Reset
          </button>
        </div>

        <button
          onClick={handleSave}
          className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl theme-btn-primary text-sm font-bold shadow-md"
        >
          {savedSuccess ? (
            <>
              <Check size={16} />
              Saved to Profile!
            </>
          ) : (
            <>
              <Sparkles size={16} />
              Save Avatar
            </>
          )}
        </button>
      </div>

      {/* Right Column: Customization Tabs and Palettes */}
      <div className="lg:col-span-7 p-6 rounded-2xl theme-surface">
        <div className="mb-4">
          <h3 className="font-bold text-lg">Customize Your Character</h3>
          <p className="text-xs theme-text-muted">
            Mix and match hairstyles, expressive eyes, outfits, and accessories to create your signature student look.
          </p>
        </div>

        <AvatarOptions config={config} onChange={handleUpdate} />
      </div>
    </div>
  );
};
