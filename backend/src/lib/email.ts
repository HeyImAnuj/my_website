import nodemailer from 'nodemailer';

const CONTACT_EMAIL_TO = process.env.CONTACT_EMAIL_TO || 'anujpatel299@gmail.com';

export interface ContactEmailData {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export function isEmailConfigured(): boolean {
  return Boolean(process.env.SMTP_USER && process.env.SMTP_PASS);
}

export async function sendContactNotification(data: ContactEmailData): Promise<void> {
  if (!isEmailConfigured()) {
    console.warn('SMTP not configured — contact form will not send email');
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const emailSubject = data.subject
    ? `Portfolio contact: ${data.subject}`
    : `Portfolio contact from ${data.name}`;

  const text = [
    `New message from your portfolio contact form`,
    ``,
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Subject: ${data.subject || '(none)'}`,
    ``,
    `Message:`,
    data.message,
  ].join('\n');

  const html = `
    <h2>New portfolio contact message</h2>
    <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
    <p><strong>Email:</strong> <a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></p>
    <p><strong>Subject:</strong> ${escapeHtml(data.subject || '(none)')}</p>
    <hr />
    <p style="white-space: pre-wrap;">${escapeHtml(data.message)}</p>
  `;

  await transporter.sendMail({
    from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
    to: CONTACT_EMAIL_TO,
    replyTo: data.email,
    subject: emailSubject,
    text,
    html,
  });
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
