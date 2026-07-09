import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';
import { isEmailConfigured, sendContactNotification } from '../lib/email.js';

export const contactRouter = Router();

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  subject: z.string().max(200).optional(),
  message: z.string().min(10).max(5000),
});

contactRouter.post('/', async (req, res) => {
  try {
    const data = contactSchema.parse(req.body);
    const message = await prisma.contactMessage.create({ data });

    try {
      await sendContactNotification(data);
    } catch (emailError) {
      console.error('Failed to send contact email:', emailError);
      if (isEmailConfigured()) {
        res.status(500).json({ error: 'Message saved but failed to send email notification' });
        return;
      }
    }

    res.status(201).json({ success: true, id: message.id });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: 'Validation failed', details: error.errors });
      return;
    }
    res.status(500).json({ error: 'Failed to send message' });
  }
});

contactRouter.get('/', async (_req, res) => {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: 'desc' },
    select: { id: true, name: true, email: true, subject: true, read: true, createdAt: true },
  });
  res.json(messages);
});
