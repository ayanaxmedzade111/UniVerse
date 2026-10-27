import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, Plugin} from 'vite';

function apiDevMiddleware(): Plugin {
  return {
    name: 'api-dev-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === '/api/health') {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ status: 'ok', app: 'UniVerse Vite Middleware' }));
          return;
        }

        if (req.url === '/api/ai/classify' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const { text, title } = JSON.parse(body || '{}');
              // Local fallback classifier logic for dev environment
              const combined = `${title || ''} ${text || ''}`.toLowerCase();
              let category = 'University Life';
              let sentiment = 'Neutral';

              if (/crush|love|cute|kiss|date|romantic|smile|heart/i.test(combined)) {
                category = 'Love & Crushes';
                sentiment = 'Romantic';
              } else if (/exam|midterm|final|study|lecture|grade|calculus/i.test(combined)) {
                category = 'Academic Life';
                sentiment = 'Nervous';
              } else if (/haha|lol|funny|laughed|joke|awkward/i.test(combined)) {
                category = 'Funny';
                sentiment = 'Humorous';
              } else if (/roommate|dorm|flatmate|alarm/i.test(combined)) {
                category = 'Roommates';
                sentiment = 'Frustrated';
              } else if (/interview|job|internship|resume|career/i.test(combined)) {
                category = 'Career';
                sentiment = 'Excited';
              }

              const isQuestion = combined.includes('?') || /how do|what should/i.test(combined);
              const needsAdvice = isQuestion || /advice|tips/i.test(combined);
              const phoneRegex = /(?:\+?994|0)\s*(?:50|51|55|70|77|99)\s*\d{3}\s*\d{2}\s*\d{2}|\b\d{3}[-.\s]??\d{3}[-.\s]??\d{4}\b/;
              const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
              const containsPersonalInfo = phoneRegex.test(combined) || emailRegex.test(combined);

              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({
                category,
                sentiment,
                topic: 'Campus Student Reflection',
                isQuestion,
                needsAdvice,
                containsPersonalInfo,
                potentialViolation: containsPersonalInfo,
                moderationStatus: containsPersonalInfo ? 'Needs Review' : 'Published',
                confidenceScore: 0.95,
                engineUsed: 'Local Rule-Engine Fallback',
              }));
            } catch (err: any) {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: err.message }));
            }
          });
          return;
        }

        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), apiDevMiddleware()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

