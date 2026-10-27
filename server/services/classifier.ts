import { GoogleGenAI } from '@google/genai';

export interface ConfessionClassificationResult {
  category: string;
  secondaryCategory?: string;
  sentiment: string;
  topic: string;
  isQuestion: boolean;
  needsAdvice: boolean;
  containsPersonalInfo: boolean;
  potentialViolation: boolean;
  moderationStatus: 'Published' | 'Needs Review';
  moderationReason?: string;
  confidenceScore: number;
}

export async function classifyWithGemini(
  text: string,
  title?: string
): Promise<ConfessionClassificationResult | null> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    // Return null so the caller can smoothly invoke local keyword classifier
    return null;
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const prompt = `You are the AI Confession Classifier and Safety Analyzer for "UniVerse", a university student platform.
Analyze the following student confession submission:
Title: "${title || 'None'}"
Content: "${text}"

Evaluate and return ONLY valid JSON in this exact structure:
{
  "category": "One of [Love & Crushes, Funny, Gossip, Academic Life, Friendship, Roommates, University Life, Rants, Advice, Secrets, Career, Other]",
  "secondaryCategory": "Optional secondary category from the same list or null",
  "sentiment": "One of [Happy, Romantic, Nervous, Frustrated, Excited, Melancholy, Neutral, Humorous]",
  "topic": "Concise 3-5 word topic label (e.g. 'Library study encounter', 'Midterm preparation stress')",
  "isQuestion": true or false,
  "needsAdvice": true or false,
  "containsPersonalInfo": true if text contains phone numbers, emails, room numbers, or full real names else false,
  "potentialViolation": true if text contains targeted hate, harassment, threats, or doxxing else false,
  "moderationStatus": "Needs Review" if potentialViolation or containsPersonalInfo else "Published",
  "moderationReason": "Brief explanation if flagged, else null",
  "confidenceScore": float between 0.70 and 0.99
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    if (response && response.text) {
      const parsed = JSON.parse(response.text.trim());
      return parsed;
    }
  } catch (error) {
    console.warn('Gemini AI classification fallback triggered:', error);
  }

  return null;
}
