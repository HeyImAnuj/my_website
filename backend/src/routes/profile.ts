import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';
import { getDriveAssets, isDriveConfigured } from '../lib/googleDrive.js';

export const profileRouter = Router();

profileRouter.get('/', async (_req, res) => {
  const profile = await prisma.profile.findFirst();
  if (!profile) {
    res.status(404).json({ error: 'Profile not found' });
    return;
  }

  if (!isDriveConfigured()) {
    res.json(profile);
    return;
  }

  const driveAssets = await getDriveAssets();
  res.json({
    ...profile,
    resumeUrl: driveAssets.resumeFileId ? '/api/assets/resume' : profile.resumeUrl,
    avatarUrl: driveAssets.avatarFileId ? '/api/assets/avatar' : profile.avatarUrl,
  });
});

profileRouter.put('/', async (req, res) => {
  const schema = z.object({
    name: z.string().optional(),
    title: z.string().optional(),
    tagline: z.string().optional(),
    bio: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    location: z.string().optional(),
    github: z.string().optional(),
    linkedin: z.string().optional(),
    twitter: z.string().optional(),
    resumeUrl: z.string().optional(),
    yearsExp: z.number().optional(),
  });

  const data = schema.parse(req.body);
  const existing = await prisma.profile.findFirst();

  if (!existing) {
    res.status(404).json({ error: 'Profile not found' });
    return;
  }

  const profile = await prisma.profile.update({
    where: { id: existing.id },
    data,
  });

  res.json(profile);
});
