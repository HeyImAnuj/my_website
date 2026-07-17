import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink } from 'lucide-react';
import { SectionHeading } from './About';

const GOOGLE_FORM_EMBED =
  'https://docs.google.com/forms/d/e/1FAIpQLSeutl1KWkponxFeiJ1Df2h7UkTux5PKeJQQYdvUar9Qubhl9Q/viewform?embedded=true';
const GOOGLE_FORM_LINK = 'https://forms.gle/6q5ne6fh2AnfEkKU6';

export function Contact() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="contact" className="relative py-24 sm:py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-bg-elevated)]/30 to-transparent" />
      <div className="relative mx-auto max-w-4xl px-5 sm:px-8">
        <SectionHeading title="Get In Touch" subtitle="Let's connect" />

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-white shadow-2xl sm:rounded-[2rem]"
        >
          <iframe
            title="Contact Anuj Patel"
            src={GOOGLE_FORM_EMBED}
            className="block h-[min(78vh,52rem)] w-full border-0 bg-white"
            loading="lazy"
          >
            Loading contact form…
          </iframe>
        </motion.div>

        <p className="mt-5 text-center text-sm text-[var(--color-text-muted)]">
          Form not loading?{' '}
          <a
            href={GOOGLE_FORM_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-[var(--color-accent)] hover:underline"
          >
            Open it in a new tab <ExternalLink size={14} />
          </a>
        </p>
      </div>
    </section>
  );
}
