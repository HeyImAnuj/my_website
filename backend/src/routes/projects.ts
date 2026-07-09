import { Router } from 'express';
import { prisma } from '../lib/prisma.js';

export const projectsRouter = Router();

projectsRouter.get('/', async (req, res) => {
  const featured = req.query.featured === 'true';
  const projects = await prisma.project.findMany({
    where: featured ? { featured: true } : undefined,
    orderBy: { order: 'asc' },
  });
  res.json(projects);
});

projectsRouter.get('/:id', async (req, res) => {
  const project = await prisma.project.findUnique({
    where: { id: Number(req.params.id) },
  });
  if (!project) {
    res.status(404).json({ error: 'Project not found' });
    return;
  }
  res.json(project);
});
