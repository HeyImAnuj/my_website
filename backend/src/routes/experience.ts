import { Router } from 'express';
import { prisma } from '../lib/prisma.js';

export const experienceRouter = Router();

experienceRouter.get('/', async (_req, res) => {
  const experiences = await prisma.experience.findMany({ orderBy: { order: 'asc' } });
  res.json(experiences);
});
