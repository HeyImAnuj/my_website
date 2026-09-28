import { motion } from 'framer-motion';
import type { Profile } from '../types';

interface AboutProps {
  profile: Profile;
}

export function About({ profile }: AboutProps) {
  const stats = [
    { value: `${profile.yearsExp}+`, label: 'Years building ERP software' },
    { value: '45–50%', label: 'Finance team productivity gain' },
    { value: '35%', label: 'Faster API responses' },
    { value: '100%', label: 'On-time releases' },
  ];

  return (
    <section id="about" className="px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <SectionHeading title="About" subtitle="A short introduction" />
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <div className="space-y-4 text-base leading-7 text-[var(--color-text-muted)] sm:text-lg">
            {profile.bio.split('\n\n').map((paragraph) => (
              <p key={paragraph}>{paragraph.trim()}</p>
            ))}
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-[var(--color-border)] bg-white p-4">
                <p className="text-2xl font-semibold tracking-tight">{stat.value}</p>
                <p className="mt-1 text-sm leading-snug text-[var(--color-text-muted)]">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function SectionHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--color-accent)]">{subtitle}</p>
      <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
    </div>
  );
}
