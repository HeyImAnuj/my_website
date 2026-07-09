import { Router } from 'express';
import { prisma } from '../lib/prisma.js';

export const skillsRouter = Router();

skillsRouter.get('/', async (_req, res) => {
  const skills = await prisma.skill.findMany({ orderBy: { order: 'asc' } });
  res.json(skills);
});
