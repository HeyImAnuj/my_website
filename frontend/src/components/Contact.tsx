import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { SectionHeading } from './About';

const GOOGLE_FORM_EMBED =
  'https://docs.google.com/forms/d/e/1FAIpQLSeutl1KWkponxFeiJ1Df2h7UkTux5PKeJQQYdvUar9Qubhl9Q/viewform?embedded=true';
const GOOGLE_FORM_LINK = 'https://forms.gle/6q5ne6fh2AnfEkKU6';

export function Contact() {
  return (
    <section id="contact" className="px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <SectionHeading title="Contact" subtitle="Let's talk" />
        <p className="mt-4 max-w-xl text-[var(--color-text-muted)]">
          Send a note through the form. I usually reply by email.
        </p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 overflow-hidden rounded-3xl border border-[var(--color-border)] bg-white"
        >
          <iframe
            title="Contact Anuj Patel"
            src={GOOGLE_FORM_EMBED}
            className="block w-full border-0 bg-white"
            style={{ height: '1200px' }}
            loading="lazy"
            scrolling="no"
          >
            Loading contact form…
          </iframe>
        </motion.div>
        <p className="mt-4 text-sm text-[var(--color-text-muted)]">
          Form not loading?{' '}
          <a
            href={GOOGLE_FORM_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-medium text-[var(--color-primary-dark)] underline-offset-4 hover:underline"
          >
            Open it in a new tab <ExternalLink size={14} />
          </a>
        </p>
      </div>
    </section>
  );
}
