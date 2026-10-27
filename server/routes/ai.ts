import { Router, Request, Response } from 'express';
import { classifyWithGemini } from '../services/classifier';
import { classifyConfessionLocally } from '../../src/services/aiClassifier';

export const aiRouter = Router();

aiRouter.post('/classify', async (req: Request, res: Response): Promise<void> => {
  try {
    const { text, title } = req.body;
    if (!text || typeof text !== 'string') {
      res.status(400).json({ error: 'Text content is required' });
      return;
    }

    // Try Gemini server-side call first if configured
    const aiResult = await classifyWithGemini(text, title);
    if (aiResult) {
      res.json({
        ...aiResult,
        engineUsed: 'Gemini Server API',
      });
      return;
    }

    // Fall back to rule-based analysis
    const localResult = classifyConfessionLocally(text, title);
    res.json(localResult);
  } catch (error: any) {
    console.error('AI Route error:', error);
    res.status(500).json({ error: 'Internal classification failure', details: error?.message });
  }
});
