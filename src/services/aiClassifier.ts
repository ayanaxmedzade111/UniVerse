import { ConfessionAnalysis, ConfessionCategory, ModerationStatus } from '../types';

/**
 * Local rule-engine fallback classifier
 * Implements intelligent regex and keyword scoring when backend AI is not configured.
 */
export function classifyConfessionLocally(text: string, title?: string): ConfessionAnalysis {
  const combined = `${title || ''} ${text}`.toLowerCase();

  // Category keyword scoring
  const scores: Record<ConfessionCategory, number> = {
    'Love & Crushes': 0,
    Funny: 0,
    Gossip: 0,
    'Academic Life': 0,
    Friendship: 0,
    Roommates: 0,
    'University Life': 0,
    Rants: 0,
    Advice: 0,
    Secrets: 0,
    Career: 0,
    Other: 1, // baseline
  };

  // Love & Crushes
  if (/crush|love|cute|kiss|date|attracted|beautiful|handsome|smile|blush|romantic|holding hands|eye contact|heart|confess/i.test(combined)) {
    scores['Love & Crushes'] += 5;
  }
  // Funny
  if (/haha|lol|lmao|hilarious|awkward|funny|joke|slipped|laughed|clown|crying laughing|rofl|absurd/i.test(combined)) {
    scores['Funny'] += 4;
  }
  // Academic Life
  if (/exam|midterm|final|lecture|professor|gpa|homework|assignment|study|quiz|syllabus|library|math|grade|credit|thesis/i.test(combined)) {
    scores['Academic Life'] += 5;
  }
  // Roommates
  if (/roommate|dorm|flatmate|landlord|dishes|shared room|alarm at 6|messy room|dormitory/i.test(combined)) {
    scores['Roommates'] += 6;
  }
  // Friendship
  if (/friend|bestie|group|crew|homie|roomie|squad|together|hangout|camaraderie/i.test(combined)) {
    scores['Friendship'] += 3;
  }
  // Rants
  if (/hate|annoying|frustrated|tired of|furious|unfair|worst|disaster|stop doing|can't stand|ridiculous/i.test(combined)) {
    scores['Rants'] += 4;
  }
  // Advice
  if (/how do i|any advice|should i|tips for|help me|recommendations|wondering if|what would you do|struggling with/i.test(combined)) {
    scores['Advice'] += 5;
  }
  // Career
  if (/interview|internship|resume|cv|job|linkedin|offer|salary|career|hiring|recruiter/i.test(combined)) {
    scores['Career'] += 5;
  }
  // Secrets
  if (/secret|never told anyone|confession|nobody knows|guilty|confess|honestly speaking|truth is/i.test(combined)) {
    scores['Secrets'] += 4;
  }
  // Gossip
  if (/drama|rumor|heard that|did you see|allegedly|spill the tea|scandal/i.test(combined)) {
    scores['Gossip'] += 4;
  }
  // University Life
  if (/campus|building|canteen|cafeteria|security|elevator|metro|bus|freshman|senior|club|registration/i.test(combined)) {
    scores['University Life'] += 3;
  }

  // Find top category
  let topCategory: ConfessionCategory = 'University Life';
  let maxScore = 0;
  for (const [cat, score] of Object.entries(scores) as [ConfessionCategory, number][]) {
    if (score > maxScore) {
      maxScore = score;
      topCategory = cat;
    }
  }

  // Secondary category
  let secondaryCategory: string | undefined;
  let secondMax = 0;
  for (const [cat, score] of Object.entries(scores) as [ConfessionCategory, number][]) {
    if (cat !== topCategory && score > secondMax && score > 2) {
      secondMax = score;
      secondaryCategory = cat;
    }
  }

  // Sentiment analysis
  let sentiment: ConfessionAnalysis['sentiment'] = 'Neutral';
  if (/love|crush|romantic|sweet|heart|blush/i.test(combined)) {
    sentiment = 'Romantic';
  } else if (/furious|hate|annoying|frustrated|exhausted|unfair/i.test(combined)) {
    sentiment = 'Frustrated';
  } else if (/nervous|anxious|terrified|scared|worried|panicking/i.test(combined)) {
    sentiment = 'Nervous';
  } else if (/haha|lol|funny|laughed|hilarious/i.test(combined)) {
    sentiment = 'Humorous';
  } else if (/happy|grateful|amazing|blessed|excited|yay/i.test(combined)) {
    sentiment = 'Happy';
  } else if (/sad|lonely|alone|crying|miss|melancholy/i.test(combined)) {
    sentiment = 'Melancholy';
  }

  // Questions and Advice needs
  const isQuestion = combined.includes('?') || /how do|what should|can anyone|is it true|where can/i.test(combined);
  const needsAdvice = isQuestion || /advice|help|suggestions|tips/i.test(combined);

  // Safety & PII check
  const phoneRegex = /(?:\+?994|0)\s*(?:50|51|55|70|77|99)\s*\d{3}\s*\d{2}\s*\d{2}|\b\d{3}[-.\s]??\d{3}[-.\s]??\d{4}\b/;
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
  const targetedHarassment = /kill yourself|die in a fire|doxx|hate crime|threaten|leak photos/i.test(combined);

  const containsPersonalInfo = phoneRegex.test(combined) || emailRegex.test(combined);
  const potentialViolation = targetedHarassment || containsPersonalInfo;

  let moderationStatus: ModerationStatus = 'Published';
  let moderationReason: string | undefined;

  if (potentialViolation) {
    moderationStatus = 'Needs Review';
    moderationReason = containsPersonalInfo
      ? 'Potential phone number or email address detected in text.'
      : 'Flagged for potentially aggressive or harassing phrasing.';
  }

  // Topic generation
  let topic = 'Campus Life Reflections';
  if (topCategory === 'Love & Crushes') topic = 'Crushes & Campus Romance';
  else if (topCategory === 'Academic Life') topic = 'Exams & Coursework';
  else if (topCategory === 'Roommates') topic = 'Dorm & Living Dynamics';
  else if (topCategory === 'Career') topic = 'Jobs & Professional Growth';
  else if (topCategory === 'Funny') topic = 'Campus Comedy & Mishaps';
  else if (topCategory === 'Secrets') topic = 'Anonymous Revelations';

  return {
    category: topCategory,
    secondaryCategory,
    sentiment,
    topic,
    isQuestion,
    needsAdvice,
    containsPersonalInfo,
    potentialViolation,
    moderationStatus,
    moderationReason,
    confidenceScore: Math.min(0.98, 0.75 + maxScore * 0.04),
    engineUsed: 'Local Rule-Engine Fallback',
  };
}

/**
 * Main classification function that attempts server API first and seamlessly falls back
 */
export async function analyzeConfession(text: string, title?: string): Promise<ConfessionAnalysis> {
  try {
    const res = await fetch('/api/ai/classify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, title }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data && data.category) {
        return {
          ...data,
          engineUsed: 'Gemini Server API',
        };
      }
    }
  } catch {
    // Expected fallback when running client-only dev mode or if server is unreachable
  }

  return classifyConfessionLocally(text, title);
}
