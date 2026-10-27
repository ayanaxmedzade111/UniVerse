import React from 'react';
import { AvatarConfig } from '../../types';

interface AvatarOptionsProps {
  config: AvatarConfig;
  onChange: (updated: Partial<AvatarConfig>) => void;
}

export const SKIN_TONES = [
  { label: 'Fair Porcelain', value: '#fff1eb' },
  { label: 'Warm Peach', value: '#ffd2ba' },
  { label: 'Honey Almond', value: '#f5c396' },
  { label: 'Golden Sand', value: '#e0a980' },
  { label: 'Caramel Bronze', value: '#c68652' },
  { label: 'Rich Cocoa', value: '#8d5524' },
  { label: 'Deep Espresso', value: '#49281a' },
];

export const HAIR_COLORS = [
  { label: 'Midnight Black', value: '#1a1a1a' },
  { label: 'Deep Chestnut', value: '#3a241d' },
  { label: 'Warm Auburn', value: '#78350f' },
  { label: 'Golden Honey', value: '#d97706' },
  { label: 'Nordic Blonde', value: '#fde047' },
  { label: 'Sakura Pastel Pink', value: '#f472b6' },
  { label: 'Lavender Blossom', value: '#c084fc' },
  { label: 'Ocean Teal', value: '#0d9488' },
  { label: 'Cyber Blue', value: '#2563eb' },
];

export const EYE_COLORS = [
  { label: 'Deep Espresso', value: '#331e17' },
  { label: 'Warm Hazel', value: '#634226' },
  { label: 'Emerald Forest', value: '#047857' },
  { label: 'Sapphire Night', value: '#1d4ed8' },
  { label: 'Amethyst Violet', value: '#7e22ce' },
  { label: 'Slate Gray', value: '#475569' },
];

export const BG_COLORS = [
  { label: 'Blush Pink', value: '#fce7f3' },
  { label: 'Soft Lavender', value: '#f3e8ff' },
  { label: 'Powder Sky', value: '#e0f2fe' },
  { label: 'Sage Mint', value: '#dcfce7' },
  { label: 'Warm Vanilla', value: '#fef3c7' },
  { label: 'Midnight Slate', value: '#1e1b4b' },
  { label: 'Obsidian Black', value: '#18181b' },
];

export const CLOTHING_COLORS = [
  { label: 'Electric Indigo', value: '#6366f1' },
  { label: 'Sweet Berry', value: '#ec4899' },
  { label: 'Forest Pine', value: '#15803d' },
  { label: 'Sunset Amber', value: '#f97316' },
  { label: 'Navy Crimson', value: '#1e3a8a' },
  { label: 'Gothic Charcoal', value: '#27272a' },
  { label: 'Pastel Lilac', value: '#a855f7' },
];

export const AvatarOptions: React.FC<AvatarOptionsProps> = ({ config, onChange }) => {
  const [activeTab, setActiveTab] = React.useState<
    'face' | 'hair' | 'eyes' | 'mouth' | 'accessories' | 'clothing' | 'background'
  >('face');

  return (
    <div className="space-y-6">
      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b theme-border scrollbar-none">
        {(
          [
            { id: 'face', label: 'Face & Skin' },
            { id: 'hair', label: 'Hair' },
            { id: 'eyes', label: 'Eyes & Brows' },
            { id: 'mouth', label: 'Mouth & Blush' },
            { id: 'clothing', label: 'Clothing' },
            { id: 'accessories', label: 'Accessories' },
            { id: 'background', label: 'Background' },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'theme-btn-primary shadow-xs'
                : 'theme-btn-secondary hover:text-black dark:hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      {activeTab === 'face' && (
        <div className="space-y-5">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider block mb-2 opacity-75">
              Skin Tone
            </label>
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
              {SKIN_TONES.map((tone) => (
                <button
                  key={tone.value}
                  onClick={() => onChange({ skinTone: tone.value })}
                  title={tone.label}
                  className={`h-10 rounded-xl border flex items-center justify-center transition-all ${
                    config.skinTone === tone.value
                      ? 'ring-2 ring-offset-2 ring-primary scale-105'
                      : 'hover:scale-95'
                  }`}
                  style={{ backgroundColor: tone.value, borderColor: 'rgba(0,0,0,0.1)' }}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider block mb-2 opacity-75">
              Face Shape
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(['round', 'oval', 'heart', 'square'] as const).map((shape) => (
                <button
                  key={shape}
                  onClick={() => onChange({ faceShape: shape })}
                  className={`p-3 rounded-xl border text-xs font-medium capitalize text-center transition-all ${
                    config.faceShape === shape
                      ? 'theme-btn-primary'
                      : 'theme-surface theme-surface-hover'
                  }`}
                >
                  {shape}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'hair' && (
        <div className="space-y-5">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider block mb-2 opacity-75">
              Hairstyle
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(
                [
                  { id: 'curly', label: 'Playful Curls' },
                  { id: 'wavy', label: 'Soft Waves' },
                  { id: 'bob', label: 'Classic Bob' },
                  { id: 'ponytail', label: 'High Ponytail' },
                  { id: 'buzz', label: 'Clean Buzz' },
                  { id: 'fluffy', label: 'Fluffy Shag' },
                  { id: 'messyBun', label: 'Messy Bun' },
                  { id: 'straightLong', label: 'Long Straight' },
                ] as const
              ).map((style) => (
                <button
                  key={style.id}
                  onClick={() => onChange({ hairstyle: style.id })}
                  className={`p-3 rounded-xl border text-xs font-medium text-center transition-all ${
                    config.hairstyle === style.id
                      ? 'theme-btn-primary'
                      : 'theme-surface theme-surface-hover'
                  }`}
                >
                  {style.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider block mb-2 opacity-75">
              Hair Color
            </label>
            <div className="grid grid-cols-5 sm:grid-cols-9 gap-2">
              {HAIR_COLORS.map((col) => (
                <button
                  key={col.value}
                  onClick={() => onChange({ hairColor: col.value })}
                  title={col.label}
                  className={`h-9 rounded-xl border transition-all ${
                    config.hairColor === col.value
                      ? 'ring-2 ring-offset-2 ring-primary scale-105'
                      : 'hover:scale-95'
                  }`}
                  style={{ backgroundColor: col.value }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'eyes' && (
        <div className="space-y-5">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider block mb-2 opacity-75">
              Eye Style
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {(
                [
                  { id: 'sparkle', label: 'Anime Sparkle ✨' },
                  { id: 'catEye', label: 'Cat Eye Winged' },
                  { id: 'relaxed', label: 'Soft & Relaxed' },
                  { id: 'wink', label: 'Playful Wink 😉' },
                  { id: 'sleepy', label: 'Sleepy Chill' },
                  { id: 'anime', label: 'Big Shoujo' },
                ] as const
              ).map((eye) => (
                <button
                  key={eye.id}
                  onClick={() => onChange({ eyeStyle: eye.id })}
                  className={`p-3 rounded-xl border text-xs font-medium text-center transition-all ${
                    config.eyeStyle === eye.id
                      ? 'theme-btn-primary'
                      : 'theme-surface theme-surface-hover'
                  }`}
                >
                  {eye.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider block mb-2 opacity-75">
              Eye Color
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {EYE_COLORS.map((col) => (
                <button
                  key={col.value}
                  onClick={() => onChange({ eyeColor: col.value })}
                  title={col.label}
                  className={`h-9 rounded-xl border transition-all ${
                    config.eyeColor === col.value
                      ? 'ring-2 ring-offset-2 ring-primary scale-105'
                      : 'hover:scale-95'
                  }`}
                  style={{ backgroundColor: col.value }}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider block mb-2 opacity-75">
              Eyebrows
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(['natural', 'softArch', 'bold', 'curious'] as const).map((brow) => (
                <button
                  key={brow}
                  onClick={() => onChange({ eyebrows: brow })}
                  className={`p-2.5 rounded-xl border text-xs font-medium capitalize text-center transition-all ${
                    config.eyebrows === brow
                      ? 'theme-btn-primary'
                      : 'theme-surface theme-surface-hover'
                  }`}
                >
                  {brow}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'mouth' && (
        <div className="space-y-5">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider block mb-2 opacity-75">
              Mouth Expression
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {(
                [
                  { id: 'smile', label: 'Gentle Smile 😊' },
                  { id: 'catMouth', label: 'Cat :3' },
                  { id: 'openSmile', label: 'Joyful Open' },
                  { id: 'grin', label: 'Cheeky Grin' },
                  { id: 'soft', label: 'Subtle Pout' },
                ] as const
              ).map((m) => (
                <button
                  key={m.id}
                  onClick={() => onChange({ mouth: m.id })}
                  className={`p-3 rounded-xl border text-xs font-medium text-center transition-all ${
                    config.mouth === m.id
                      ? 'theme-btn-primary'
                      : 'theme-surface theme-surface-hover'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider block mb-2 opacity-75">
              Cheek Blush & Freckles
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(
                [
                  { id: 'none', label: 'None' },
                  { id: 'softPeach', label: 'Soft Peach' },
                  { id: 'sakuraPink', label: 'Sakura Pink' },
                  { id: 'freckles', label: 'Cute Freckles' },
                ] as const
              ).map((b) => (
                <button
                  key={b.id}
                  onClick={() => onChange({ blush: b.id })}
                  className={`p-3 rounded-xl border text-xs font-medium text-center transition-all ${
                    config.blush === b.id
                      ? 'theme-btn-primary'
                      : 'theme-surface theme-surface-hover'
                  }`}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'clothing' && (
        <div className="space-y-5">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider block mb-2 opacity-75">
              Outfit
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {(
                [
                  { id: 'knitSweater', label: 'Knit Turtleneck' },
                  { id: 'cozyHoodie', label: 'Cozy Hoodie' },
                  { id: 'varsityJacket', label: 'Campus Varsity Jacket' },
                  { id: 'academiaShirt', label: 'Academia Vest & Tie' },
                  { id: 'casualTee', label: 'Casual Scoop Tee' },
                ] as const
              ).map((c) => (
                <button
                  key={c.id}
                  onClick={() => onChange({ clothing: c.id })}
                  className={`p-3 rounded-xl border text-xs font-medium text-center transition-all ${
                    config.clothing === c.id
                      ? 'theme-btn-primary'
                      : 'theme-surface theme-surface-hover'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider block mb-2 opacity-75">
              Outfit Color
            </label>
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
              {CLOTHING_COLORS.map((col) => (
                <button
                  key={col.value}
                  onClick={() => onChange({ clothingColor: col.value })}
                  title={col.label}
                  className={`h-9 rounded-xl border transition-all ${
                    config.clothingColor === col.value
                      ? 'ring-2 ring-offset-2 ring-primary scale-105'
                      : 'hover:scale-95'
                  }`}
                  style={{ backgroundColor: col.value }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'accessories' && (
        <div className="space-y-5">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider block mb-2 opacity-75">
              Glasses
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {(
                [
                  { id: 'none', label: 'No Glasses' },
                  { id: 'roundWire', label: 'Round Wire 👓' },
                  { id: 'thickFrame', label: 'Thick Geek' },
                  { id: 'catEye', label: 'Red Cat-Eye' },
                  { id: 'retroY2K', label: 'Retro Y2K Tint' },
                ] as const
              ).map((g) => (
                <button
                  key={g.id}
                  onClick={() => onChange({ glasses: g.id })}
                  className={`p-3 rounded-xl border text-xs font-medium text-center transition-all ${
                    config.glasses === g.id
                      ? 'theme-btn-primary'
                      : 'theme-surface theme-surface-hover'
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider block mb-2 opacity-75">
              Hair Clip or Headwear
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
              {(
                [
                  { id: 'none', label: 'None' },
                  { id: 'cuteBow', label: 'Pink Bow 🎀' },
                  { id: 'starClip', label: 'Star Clip ⭐' },
                  { id: 'flower', label: 'Blossom 🌸' },
                  { id: 'headphones', label: 'Headphones 🎧' },
                  { id: 'beanie', label: 'Cozy Beanie' },
                ] as const
              ).map((acc) => (
                <button
                  key={acc.id}
                  onClick={() => onChange({ accessories: acc.id })}
                  className={`p-3 rounded-xl border text-xs font-medium text-center transition-all ${
                    config.accessories === acc.id
                      ? 'theme-btn-primary'
                      : 'theme-surface theme-surface-hover'
                  }`}
                >
                  {acc.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider block mb-2 opacity-75">
              Earrings
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(
                [
                  { id: 'none', label: 'None' },
                  { id: 'goldHoops', label: 'Gold Hoops' },
                  { id: 'pearlStuds', label: 'Pearl Studs' },
                  { id: 'silverStars', label: 'Silver Stars' },
                ] as const
              ).map((e) => (
                <button
                  key={e.id}
                  onClick={() => onChange({ earrings: e.id })}
                  className={`p-3 rounded-xl border text-xs font-medium text-center transition-all ${
                    config.earrings === e.id
                      ? 'theme-btn-primary'
                      : 'theme-surface theme-surface-hover'
                  }`}
                >
                  {e.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'background' && (
        <div className="space-y-5">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider block mb-2 opacity-75">
              Frame Shape
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(
                [
                  { id: 'circle', label: 'Circle ⚪' },
                  { id: 'squircle', label: 'Squircle ◻️' },
                  { id: 'starburst', label: 'Starburst ☀️' },
                  { id: 'flower', label: 'Flower Petals 🌺' },
                ] as const
              ).map((s) => (
                <button
                  key={s.id}
                  onClick={() => onChange({ backgroundShape: s.id })}
                  className={`p-3 rounded-xl border text-xs font-medium text-center transition-all ${
                    config.backgroundShape === s.id
                      ? 'theme-btn-primary'
                      : 'theme-surface theme-surface-hover'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider block mb-2 opacity-75">
              Background Color
            </label>
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
              {BG_COLORS.map((bg) => (
                <button
                  key={bg.value}
                  onClick={() => onChange({ backgroundColor: bg.value })}
                  title={bg.label}
                  className={`h-9 rounded-xl border transition-all ${
                    config.backgroundColor === bg.value
                      ? 'ring-2 ring-offset-2 ring-primary scale-105'
                      : 'hover:scale-95'
                  }`}
                  style={{ backgroundColor: bg.value }}
                />
              ))}
            </div>
          </div>

          <div className="pt-2">
            <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl border theme-border theme-surface">
              <input
                type="checkbox"
                checked={config.decorativeSparkles}
                onChange={(e) => onChange({ decorativeSparkles: e.target.checked })}
                className="w-4 h-4 rounded text-primary focus:ring-primary"
              />
              <div>
                <span className="text-xs font-bold block">Decorative Sparkles & Stars ✨</span>
                <span className="text-[11px] theme-text-muted">
                  Adds floating magical stars and anime sparkles around your avatar.
                </span>
              </div>
            </label>
          </div>
        </div>
      )}
    </div>
  );
};
