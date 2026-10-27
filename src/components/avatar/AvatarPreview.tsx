import React from 'react';
import { AvatarConfig } from '../../types';

interface AvatarPreviewProps {
  config: AvatarConfig;
  size?: number;
  className?: string;
  showShadow?: boolean;
}

export const AvatarPreview: React.FC<AvatarPreviewProps> = ({
  config,
  size = 140,
  className = '',
  showShadow = true,
}) => {
  const {
    skinTone,
    faceShape,
    hairstyle,
    hairColor,
    eyeStyle,
    eyeColor,
    eyebrows,
    mouth,
    blush,
    glasses,
    accessories,
    earrings,
    clothing,
    clothingColor,
    backgroundShape,
    backgroundColor,
    decorativeSparkles,
  } = config;

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 200 200"
        width={size}
        height={size}
        className={showShadow ? 'drop-shadow-md' : ''}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <clipPath id="avatar-clip">
            {backgroundShape === 'circle' && <circle cx="100" cy="100" r="92" />}
            {backgroundShape === 'squircle' && (
              <rect x="10" y="10" width="180" height="180" rx="48" ry="48" />
            )}
            {backgroundShape === 'starburst' && (
              <circle cx="100" cy="100" r="92" />
            )}
            {backgroundShape === 'flower' && (
              <circle cx="100" cy="100" r="92" />
            )}
          </clipPath>
        </defs>

        {/* Outer Background Shape */}
        {backgroundShape === 'circle' && (
          <circle cx="100" cy="100" r="92" fill={backgroundColor} />
        )}
        {backgroundShape === 'squircle' && (
          <rect x="10" y="10" width="180" height="180" rx="48" ry="48" fill={backgroundColor} />
        )}
        {backgroundShape === 'starburst' && (
          <g fill={backgroundColor}>
            <circle cx="100" cy="100" r="92" />
            <polygon points="100,2 120,40 160,20 145,60 190,70 155,100 190,130 145,140 160,180 120,160 100,198 80,160 40,180 55,140 10,130 45,100 10,70 55,60 40,20 80,40" opacity="0.25" />
          </g>
        )}
        {backgroundShape === 'flower' && (
          <g fill={backgroundColor}>
            <circle cx="100" cy="100" r="92" />
            <circle cx="100" cy="20" r="24" opacity="0.3" />
            <circle cx="180" cy="100" r="24" opacity="0.3" />
            <circle cx="100" cy="180" r="24" opacity="0.3" />
            <circle cx="20" cy="100" r="24" opacity="0.3" />
          </g>
        )}

        {/* Decorative Sparkles & Stars */}
        {decorativeSparkles && (
          <g fill="#f59e0b" opacity="0.85">
            {/* Top right sparkle */}
            <path d="M 160 30 Q 160 40 170 40 Q 160 40 160 50 Q 160 40 150 40 Q 160 40 160 30 Z" />
            {/* Top left star */}
            <circle cx="42" cy="46" r="3" fill="#ec4899" />
            {/* Tiny accent */}
            <path d="M 32 120 Q 32 125 37 125 Q 32 125 32 130 Q 32 125 27 125 Q 32 125 32 120 Z" fill="#8b5cf6" />
            <circle cx="168" cy="135" r="3.5" fill="#3b82f6" />
          </g>
        )}

        {/* Avatar Body Content Clipped to Boundary */}
        <g clipPath="url(#avatar-clip)">
          {/* Back Hair (for long/bun styles) */}
          {hairstyle === 'straightLong' && (
            <path
              d="M 45 80 C 45 40, 155 40, 155 80 C 155 130, 165 180, 160 210 L 40 210 C 35 180, 45 130, 45 80 Z"
              fill={hairColor}
            />
          )}
          {hairstyle === 'ponytail' && (
            <g fill={hairColor}>
              <ellipse cx="148" cy="72" rx="22" ry="32" transform="rotate(25 148 72)" />
              <circle cx="135" cy="80" r="8" fill="#ec4899" />
            </g>
          )}
          {hairstyle === 'messyBun' && (
            <g fill={hairColor}>
              <circle cx="100" cy="40" r="28" />
              <circle cx="85" cy="48" r="14" opacity="0.6" />
            </g>
          )}

          {/* Neck */}
          <rect x="88" y="125" width="24" height="28" rx="6" fill={skinTone} />
          {/* Neck shadow */}
          <ellipse cx="100" cy="132" rx="14" ry="4" fill="#000000" opacity="0.08" />

          {/* Clothing */}
          {clothing === 'cozyHoodie' && (
            <g>
              <path
                d="M 50 150 C 65 140, 135 140, 150 150 L 175 220 L 25 220 Z"
                fill={clothingColor}
              />
              <path
                d="M 85 142 C 95 152, 105 152, 115 142 C 112 165, 88 165, 85 142 Z"
                fill="#ffffff"
                opacity="0.3"
              />
              <line x1="94" y1="155" x2="94" y2="180" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
              <line x1="106" y1="155" x2="106" y2="180" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
            </g>
          )}
          {clothing === 'varsityJacket' && (
            <g>
              <path
                d="M 50 150 C 65 140, 135 140, 150 150 L 175 220 L 25 220 Z"
                fill={clothingColor}
              />
              {/* White collar stripes & center zipper */}
              <path d="M 85 142 L 100 162 L 115 142" stroke="#ffffff" strokeWidth="4" fill="none" />
              <line x1="100" y1="162" x2="100" y2="220" stroke="#ffffff" strokeWidth="2.5" />
              {/* Letter U badge */}
              <circle cx="75" cy="175" r="9" fill="#ffffff" />
              <text x="75" y="179" textAnchor="middle" fontSize="10" fontWeight="bold" fill={clothingColor}>
                U
              </text>
            </g>
          )}
          {clothing === 'knitSweater' && (
            <g>
              <path
                d="M 50 150 C 65 140, 135 140, 150 150 L 175 220 L 25 220 Z"
                fill={clothingColor}
              />
              {/* Ribbed turtleneck collar */}
              <ellipse cx="100" cy="142" rx="20" ry="7" fill={clothingColor} stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.4" />
            </g>
          )}
          {clothing === 'casualTee' && (
            <g>
              <path
                d="M 50 150 C 65 140, 135 140, 150 150 L 175 220 L 25 220 Z"
                fill={clothingColor}
              />
              {/* Crewneck scoop */}
              <path d="M 82 144 Q 100 158 118 144" stroke="#ffffff" strokeWidth="2.5" fill="none" opacity="0.6" />
            </g>
          )}
          {clothing === 'academiaShirt' && (
            <g>
              <path
                d="M 50 150 C 65 140, 135 140, 150 150 L 175 220 L 25 220 Z"
                fill="#f8fafc"
              />
              {/* Dark academia vest over collar */}
              <path
                d="M 55 160 L 80 150 L 100 185 L 120 150 L 145 160 L 165 220 L 35 220 Z"
                fill={clothingColor}
              />
              {/* Collar points */}
              <polygon points="85,142 100,160 88,162" fill="#ffffff" />
              <polygon points="115,142 100,160 112,162" fill="#ffffff" />
              <circle cx="100" cy="170" r="3" fill="#b45309" />
            </g>
          )}

          {/* Head & Face Shape */}
          {faceShape === 'round' && (
            <circle cx="100" cy="95" r="45" fill={skinTone} />
          )}
          {faceShape === 'oval' && (
            <ellipse cx="100" cy="95" rx="42" ry="48" fill={skinTone} />
          )}
          {faceShape === 'heart' && (
            <path
              d="M 60 75 C 60 55, 100 55, 100 75 C 100 55, 140 55, 140 75 C 140 110, 100 138, 100 138 C 100 138, 60 110, 60 75 Z"
              fill={skinTone}
            />
          )}
          {faceShape === 'square' && (
            <rect x="58" y="55" width="84" height="80" rx="30" ry="30" fill={skinTone} />
          )}

          {/* Ears */}
          <circle cx="56" cy="98" r="8" fill={skinTone} />
          <circle cx="144" cy="98" r="8" fill={skinTone} />

          {/* Earrings */}
          {earrings === 'goldHoops' && (
            <g stroke="#f59e0b" strokeWidth="2.5" fill="none">
              <circle cx="53" cy="103" r="5" />
              <circle cx="147" cy="103" r="5" />
            </g>
          )}
          {earrings === 'pearlStuds' && (
            <g fill="#f8fafc" stroke="#cbd5e1" strokeWidth="0.5">
              <circle cx="54" cy="101" r="3.5" />
              <circle cx="146" cy="101" r="3.5" />
            </g>
          )}
          {earrings === 'silverStars' && (
            <g fill="#94a3b8">
              <polygon points="53,99 55,102 58,102 56,104 57,107 53,105 50,107 51,104 49,102 52,102" />
              <polygon points="147,99 149,102 152,102 150,104 151,107 147,105 144,107 145,104 143,102 146,102" />
            </g>
          )}

          {/* Blush */}
          {blush === 'softPeach' && (
            <g fill="#fb923c" opacity="0.35">
              <ellipse cx="76" cy="106" rx="9" ry="5" />
              <ellipse cx="124" cy="106" rx="9" ry="5" />
            </g>
          )}
          {blush === 'sakuraPink' && (
            <g fill="#f43f5e" opacity="0.45">
              <ellipse cx="75" cy="106" rx="10" ry="5.5" />
              <ellipse cx="125" cy="106" rx="10" ry="5.5" />
            </g>
          )}
          {blush === 'freckles' && (
            <g fill="#78350f" opacity="0.5">
              <circle cx="74" cy="104" r="1.2" />
              <circle cx="78" cy="106" r="1.4" />
              <circle cx="72" cy="108" r="1" />
              <circle cx="122" cy="104" r="1.2" />
              <circle cx="126" cy="106" r="1.4" />
              <circle cx="128" cy="108" r="1" />
            </g>
          )}

          {/* Eyebrows */}
          {eyebrows === 'natural' && (
            <g stroke={hairColor} strokeWidth="2.5" strokeLinecap="round" fill="none">
              <path d="M 72 82 Q 82 78 90 82" />
              <path d="M 110 82 Q 118 78 128 82" />
            </g>
          )}
          {eyebrows === 'softArch' && (
            <g stroke={hairColor} strokeWidth="2.2" strokeLinecap="round" fill="none">
              <path d="M 72 84 Q 82 76 90 83" />
              <path d="M 110 83 Q 118 76 128 84" />
            </g>
          )}
          {eyebrows === 'bold' && (
            <g stroke={hairColor} strokeWidth="3.5" strokeLinecap="round" fill="none">
              <path d="M 71 81 Q 81 78 89 82" />
              <path d="M 111 82 Q 119 78 129 81" />
            </g>
          )}
          {eyebrows === 'curious' && (
            <g stroke={hairColor} strokeWidth="2.5" strokeLinecap="round" fill="none">
              <path d="M 72 81 Q 82 76 90 81" />
              <path d="M 110 84 Q 118 85 128 84" />
            </g>
          )}

          {/* Eyes */}
          {eyeStyle === 'sparkle' && (
            <g>
              <ellipse cx="80" cy="94" rx="7" ry="8" fill={eyeColor} />
              <ellipse cx="120" cy="94" rx="7" ry="8" fill={eyeColor} />
              {/* Highlights */}
              <circle cx="78" cy="91" r="2.5" fill="#ffffff" />
              <circle cx="82" cy="96" r="1.2" fill="#ffffff" />
              <circle cx="118" cy="91" r="2.5" fill="#ffffff" />
              <circle cx="122" cy="96" r="1.2" fill="#ffffff" />
            </g>
          )}
          {eyeStyle === 'anime' && (
            <g>
              <path d="M 72 96 C 72 88, 88 88, 88 96 Z" fill={eyeColor} />
              <path d="M 112 96 C 112 88, 128 88, 128 96 Z" fill={eyeColor} />
              <circle cx="80" cy="93" r="2.5" fill="#ffffff" />
              <circle cx="120" cy="93" r="2.5" fill="#ffffff" />
            </g>
          )}
          {eyeStyle === 'relaxed' && (
            <g stroke="#18181b" strokeWidth="2.8" strokeLinecap="round" fill="none">
              <path d="M 74 94 Q 80 99 86 94" />
              <path d="M 114 94 Q 120 99 126 94" />
            </g>
          )}
          {eyeStyle === 'catEye' && (
            <g>
              <ellipse cx="80" cy="94" rx="6.5" ry="7.5" fill={eyeColor} />
              <ellipse cx="120" cy="94" rx="6.5" ry="7.5" fill={eyeColor} />
              <circle cx="78" cy="92" r="2" fill="#ffffff" />
              <circle cx="118" cy="92" r="2" fill="#ffffff" />
              {/* Eyeliner wing */}
              <path d="M 85 92 Q 88 90 91 88" stroke="#18181b" strokeWidth="2" strokeLinecap="round" />
              <path d="M 125 92 Q 128 90 131 88" stroke="#18181b" strokeWidth="2" strokeLinecap="round" />
            </g>
          )}
          {eyeStyle === 'sleepy' && (
            <g stroke="#18181b" strokeWidth="2.5" strokeLinecap="round" fill="none">
              <path d="M 73 95 L 87 95" />
              <path d="M 113 95 L 127 95" />
            </g>
          )}
          {eyeStyle === 'wink' && (
            <g>
              <ellipse cx="80" cy="94" rx="7" ry="8" fill={eyeColor} />
              <circle cx="78" cy="91" r="2.5" fill="#ffffff" />
              {/* Right eye winking */}
              <path d="M 114 94 Q 120 98 126 94" stroke="#18181b" strokeWidth="2.8" strokeLinecap="round" fill="none" />
            </g>
          )}

          {/* Nose */}
          <circle cx="100" cy="102" r="1.8" fill="#000000" opacity="0.15" />

          {/* Mouth */}
          {mouth === 'smile' && (
            <path
              d="M 94 113 Q 100 120 106 113"
              stroke="#e11d48"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
          )}
          {mouth === 'catMouth' && (
            <path
              d="M 93 113 Q 96.5 117 100 113 Q 103.5 117 107 113"
              stroke="#e11d48"
              strokeWidth="2.2"
              strokeLinecap="round"
              fill="none"
            />
          )}
          {mouth === 'openSmile' && (
            <path
              d="M 93 112 Q 100 123 107 112 Z"
              fill="#e11d48"
            />
          )}
          {mouth === 'soft' && (
            <path
              d="M 95 114 Q 100 117 105 114"
              stroke="#e11d48"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
          )}
          {mouth === 'grin' && (
            <path
              d="M 92 112 Q 100 125 108 112 Z"
              fill="#e11d48"
              stroke="#ffffff"
              strokeWidth="1"
            />
          )}

          {/* Front Hairstyle */}
          {hairstyle === 'curly' && (
            <g fill={hairColor}>
              <circle cx="70" cy="55" r="18" />
              <circle cx="95" cy="50" r="20" />
              <circle cx="125" cy="55" r="18" />
              <circle cx="58" cy="75" r="16" />
              <circle cx="142" cy="75" r="16" />
              <circle cx="52" cy="98" r="14" />
              <circle cx="148" cy="98" r="14" />
              {/* Cute forehead curls */}
              <path d="M 75 62 Q 85 75 92 65 Q 100 75 110 65" stroke={hairColor} strokeWidth="6" strokeLinecap="round" fill="none" />
            </g>
          )}
          {hairstyle === 'wavy' && (
            <g fill={hairColor}>
              <path d="M 52 80 C 50 45, 150 45, 148 80 C 146 110, 154 135, 150 150 C 145 130, 140 100, 138 90 C 130 65, 70 65, 62 90 C 60 100, 55 130, 50 150 C 46 135, 54 110, 52 80 Z" />
              {/* Bangs */}
              <path d="M 68 60 Q 100 78 132 60 Q 100 68 68 60 Z" />
            </g>
          )}
          {hairstyle === 'bob' && (
            <g fill={hairColor}>
              <path d="M 54 85 C 50 50, 150 50, 146 85 C 146 115, 142 125, 136 120 C 130 90, 70 90, 64 120 C 58 125, 54 115, 54 85 Z" />
              {/* Straight blunt fringe */}
              <path d="M 65 65 L 135 65 L 135 75 L 65 75 Z" />
            </g>
          )}
          {hairstyle === 'ponytail' && (
            <g fill={hairColor}>
              <path d="M 56 80 C 55 50, 145 50, 144 80 C 140 70, 60 70, 56 80 Z" />
              {/* Side swept bangs */}
              <path d="M 64 64 Q 100 80 134 68 Z" />
            </g>
          )}
          {hairstyle === 'buzz' && (
            <path
              d="M 58 80 C 58 52, 142 52, 142 80 C 138 72, 62 72, 58 80 Z"
              fill={hairColor}
              opacity="0.9"
            />
          )}
          {hairstyle === 'fluffy' && (
            <g fill={hairColor}>
              <path d="M 54 75 C 50 40, 150 40, 146 75 C 150 78, 140 85, 135 75 C 120 62, 80 62, 65 75 C 60 85, 50 78, 54 75 Z" />
              <circle cx="80" cy="52" r="15" />
              <circle cx="102" cy="48" r="16" />
              <circle cx="122" cy="54" r="14" />
            </g>
          )}
          {hairstyle === 'messyBun' && (
            <g fill={hairColor}>
              <path d="M 56 80 C 55 52, 145 52, 144 80 C 140 72, 60 72, 56 80 Z" />
              {/* Whispy face-framing strands */}
              <path d="M 62 82 Q 58 105 60 120" stroke={hairColor} strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M 138 82 Q 142 105 140 120" stroke={hairColor} strokeWidth="2.5" strokeLinecap="round" fill="none" />
            </g>
          )}
          {hairstyle === 'straightLong' && (
            <g fill={hairColor}>
              <path d="M 56 80 C 55 50, 145 50, 144 80 C 140 72, 60 72, 56 80 Z" />
              {/* Center part bangs */}
              <path d="M 64 62 Q 90 78 98 68 Q 110 78 136 62 Z" />
            </g>
          )}

          {/* Glasses */}
          {glasses === 'roundWire' && (
            <g stroke="#3f3f46" strokeWidth="2.5" fill="rgba(255,255,255,0.25)">
              <circle cx="80" cy="94" r="12" />
              <circle cx="120" cy="94" r="12" />
              <line x1="92" y1="94" x2="108" y2="94" />
            </g>
          )}
          {glasses === 'thickFrame' && (
            <g stroke="#18181b" strokeWidth="3.5" fill="rgba(255,255,255,0.2)">
              <rect x="67" y="83" width="26" height="22" rx="6" />
              <rect x="107" y="83" width="26" height="22" rx="6" />
              <line x1="93" y1="92" x2="107" y2="92" />
            </g>
          )}
          {glasses === 'catEye' && (
            <g stroke="#be123c" strokeWidth="3" fill="rgba(255,255,255,0.25)">
              <path d="M 66 86 Q 80 82 94 88 Q 80 106 66 86 Z" />
              <path d="M 134 86 Q 120 82 106 88 Q 120 106 134 86 Z" />
              <line x1="94" y1="88" x2="106" y2="88" />
            </g>
          )}
          {glasses === 'retroY2K' && (
            <g fill="rgba(14, 165, 233, 0.45)" stroke="#0284c7" strokeWidth="2">
              <ellipse cx="80" cy="94" rx="14" ry="8" transform="rotate(-5 80 94)" />
              <ellipse cx="120" cy="94" rx="14" ry="8" transform="rotate(5 120 94)" />
              <line x1="94" y1="94" x2="106" y2="94" strokeWidth="3" />
            </g>
          )}

          {/* Hair Accessories & Headwear */}
          {accessories === 'cuteBow' && (
            <g fill="#ec4899" transform="translate(122, 45) scale(0.9)">
              <polygon points="0,10 15,0 15,20" />
              <polygon points="30,10 15,0 15,20" />
              <circle cx="15" cy="10" r="5" fill="#f472b6" />
            </g>
          )}
          {accessories === 'starClip' && (
            <g fill="#f59e0b" transform="translate(64, 62) scale(0.9)">
              <polygon points="10,0 13,7 20,7 15,12 17,19 10,14 3,19 5,12 0,7 7,7" />
            </g>
          )}
          {accessories === 'headphones' && (
            <g>
              {/* Headband */}
              <path d="M 52 90 A 48 48 0 0 1 148 90" stroke="#475569" strokeWidth="5" fill="none" />
              {/* Ear cushions */}
              <rect x="46" y="85" width="10" height="24" rx="5" fill="#0f172a" />
              <rect x="144" y="85" width="10" height="24" rx="5" fill="#0f172a" />
            </g>
          )}
          {accessories === 'flower' && (
            <g transform="translate(126, 52) scale(0.85)">
              <circle cx="12" cy="6" r="6" fill="#f43f5e" />
              <circle cx="18" cy="12" r="6" fill="#f43f5e" />
              <circle cx="12" cy="18" r="6" fill="#f43f5e" />
              <circle cx="6" cy="12" r="6" fill="#f43f5e" />
              <circle cx="12" cy="12" r="4" fill="#fbbf24" />
            </g>
          )}
          {accessories === 'beanie' && (
            <g fill="#9333ea">
              <path d="M 52 75 C 50 35, 150 35, 148 75 Z" />
              {/* Brim */}
              <rect x="48" y="70" width="104" height="12" rx="4" fill="#7e22ce" />
              {/* Pom-pom */}
              <circle cx="100" cy="30" r="10" fill="#c084fc" />
            </g>
          )}
        </g>
      </svg>
    </div>
  );
};
