import { Router } from 'express';
import { prisma } from '../lib/prisma.js';

export const certificationsRouter = Router();

certificationsRouter.get('/', async (_req, res) => {
  const certifications = await prisma.certification.findMany({ orderBy: { order: 'asc' } });
  res.json(certifications);
});
