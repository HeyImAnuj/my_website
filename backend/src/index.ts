import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { profileRouter } from './routes/profile.js';
import { skillsRouter } from './routes/skills.js';
import { experienceRouter } from './routes/experience.js';
import { projectsRouter } from './routes/projects.js';
import { educationRouter } from './routes/education.js';
import { certificationsRouter } from './routes/certifications.js';
import { contactRouter } from './routes/contact.js';
import { assetsRouter } from './routes/assets.js';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 5000;
const CORS_ORIGINS = (process.env.CORS_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(helmet());
app.use(
  cors({
    origin: CORS_ORIGINS.length === 1 ? CORS_ORIGINS[0] : CORS_ORIGINS,
  })
);
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/profile', profileRouter);
app.use('/api/skills', skillsRouter);
app.use('/api/experience', experienceRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/education', educationRouter);
app.use('/api/certifications', certificationsRouter);
app.use('/api/contact', contactRouter);
app.use('/api/assets', assetsRouter);

app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
