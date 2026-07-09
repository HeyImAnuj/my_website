import { Router } from 'express';
import { z } from 'zod';
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

    if (!isEmailConfigured()) {
      res.status(503).json({ error: 'Email service is not configured' });
      return;
    }

    await sendContactNotification(data);
    res.status(201).json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: 'Validation failed', details: error.errors });
      return;
    }
    console.error('Failed to send contact email:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});
