import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { aiRouter } from './routes/ai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// API Routes
app.use('/api/ai', aiRouter);

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    app: 'UniVerse Server',
    geminiConfigured: !!process.env.GEMINI_API_KEY,
    timestamp: new Date().toISOString(),
  });
});

// Serve production build if available
const distPath = path.resolve(__dirname, '../dist');
app.use(express.static(distPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`UniVerse Server running on port ${PORT}`);
  });
}

export default app;
