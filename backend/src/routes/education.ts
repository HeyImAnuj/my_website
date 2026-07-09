import { Router } from 'express';
import { prisma } from '../lib/prisma.js';

export const educationRouter = Router();

educationRouter.get('/', async (_req, res) => {
  const education = await prisma.education.findMany({ orderBy: { order: 'asc' } });
  res.json(education);
});
