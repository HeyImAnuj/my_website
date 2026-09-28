import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import type { ReactNode } from 'react';
import type { Profile } from '../types';

interface HeroProps {
  profile: Profile;
}

const fade = {
  hidden: { opacity: 0, y: 16 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function Hero({ profile }: HeroProps) {
  return (
    <section id="hero" className="px-5 pb-16 pt-32 sm:px-8 sm:pb-24 sm:pt-40">
      <div className="mx-auto max-w-5xl">
        <motion.p
          custom={0}
          initial="hidden"
          animate="show"
          variants={fade}
          className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[var(--color-text-muted)]"
        >
          <span className="inline-flex items-center gap-1.5">
            <MapPin size={15} />
            {profile.location}
          </span>
          <span aria-hidden="true">·</span>
          <span>{profile.yearsExp}+ years experience</span>
        </motion.p>

        <motion.h1
          custom={0.08}
          initial="hidden"
          animate="show"
          variants={fade}
          className="max-w-4xl text-5xl font-semibold tracking-[-0.045em] text-[var(--color-text)] sm:text-7xl"
        >
          {profile.name}
        </motion.h1>

        <motion.p
          custom={0.16}
          initial="hidden"
          animate="show"
          variants={fade}
          className="mt-4 text-xl font-medium text-[var(--color-primary-dark)] sm:text-2xl"
        >
          {profile.title}
        </motion.p>

        <motion.p
          custom={0.24}
          initial="hidden"
          animate="show"
          variants={fade}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-text-muted)]"
        >
          {profile.tagline}. I build finance and automation workflows that are reliable, faster, and easier for teams to use.
        </motion.p>

        <motion.div
          custom={0.32}
          initial="hidden"
          animate="show"
          variants={fade}
          className="mt-8 flex flex-wrap gap-3"
        >
          <a
            href="#projects"
            className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[var(--color-text)] px-5 text-sm font-medium text-white transition hover:bg-black"
          >
            See my work <ArrowDown size={16} />
          </a>
          <a
            href="#contact"
            className="inline-flex min-h-12 items-center rounded-full border border-[var(--color-border)] bg-white px-5 text-sm font-medium transition hover:border-[var(--color-text)]"
          >
            Get in touch
          </a>
        </motion.div>

        <motion.div
          custom={0.4}
          initial="hidden"
          animate="show"
          variants={fade}
          className="mt-8 flex items-center gap-2"
        >
          {profile.github && <SocialLink href={profile.github} icon={<Github size={18} />} label="GitHub" />}
          {profile.linkedin && <SocialLink href={profile.linkedin} icon={<Linkedin size={18} />} label="LinkedIn" />}
          <SocialLink href="https://leetcode.com/u/Anujpatel299" icon={<CodeIcon />} label="LeetCode" />
          <SocialLink href={`mailto:${profile.email}`} icon={<Mail size={18} />} label="Email" />
        </motion.div>
      </div>
    </section>
  );
}

function CodeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.102 17.93l-1.984-1.984 5.882-5.882-5.882-5.882 1.984-1.984 7.866 7.866-7.866 7.866zm-8.204 0L.032 10.064l7.866-7.866 1.984 1.984-5.882 5.882 5.882 5.882-1.984 1.984z" />
    </svg>
  );
}

function SocialLink({ href, icon, label }: { href: string; icon: ReactNode; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border)] bg-white text-[var(--color-text-muted)] transition hover:-translate-y-0.5 hover:text-[var(--color-text)]"
    >
      {icon}
    </a>
  );
}
