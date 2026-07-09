import { motion } from 'framer-motion';
import { ArrowDown, Download, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import type { ReactNode } from 'react';
import { useTypingEffect } from '../hooks/useFetch';
import type { Profile } from '../types';

interface HeroProps {
  profile: Profile;
}

export function Hero({ profile }: HeroProps) {
  const { displayed, done } = useTypingEffect(profile.tagline, 40);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[var(--color-primary)] rounded-full blur-[128px] opacity-20 animate-pulse-glow" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[var(--color-accent)] rounded-full blur-[128px] opacity-15 animate-pulse-glow" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-[var(--color-text-muted)] mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Available for opportunities
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4"
        >
          Hi, I'm{' '}
          <span className="gradient-text">{profile.name.split(' ')[0]}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-xl md:text-2xl text-[var(--color-primary-light)] font-semibold mb-2"
        >
          {profile.title}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-lg text-[var(--color-text-muted)] max-w-2xl mx-auto mb-4 h-8"
        >
          {displayed}
          {!done && <span className="animate-pulse">|</span>}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="flex items-center justify-center gap-2 text-[var(--color-text-muted)] mb-10"
        >
          <MapPin size={16} />
          <span>{profile.location}</span>
          <span className="mx-2">·</span>
          <span>{profile.yearsExp}+ years experience</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1 }}
          className="flex items-center justify-center gap-4 mb-12"
        >
          <a
            href="#contact"
            className="px-8 py-3 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-semibold transition-all duration-300 glow hover:scale-105"
          >
            Get In Touch
          </a>
          {profile.resumeUrl && (
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 rounded-xl glass text-[var(--color-text)] font-semibold hover:bg-[var(--color-bg-elevated)] transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              <Download size={18} /> Resume
            </a>
          )}
          <a
            href="#projects"
            className="px-8 py-3 rounded-xl glass text-[var(--color-text)] font-semibold hover:bg-[var(--color-bg-elevated)] transition-all duration-300 hover:scale-105"
          >
            View Projects
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.2 }}
          className="flex items-center justify-center gap-5"
        >
          {profile.github && (
            <SocialLink href={profile.github} icon={<Github size={22} />} label="GitHub" />
          )}
          {profile.linkedin && (
            <SocialLink href={profile.linkedin} icon={<Linkedin size={22} />} label="LinkedIn" />
          )}
          <SocialLink href="https://leetcode.com/u/Anujpatel299" icon={<CodeIcon />} label="LeetCode" />
          <SocialLink href={`mailto:${profile.email}`} icon={<Mail size={22} />} label="Email" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ duration: 2, delay: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <a href="#about" className="text-[var(--color-text-muted)] hover:text-[var(--color-text)]">
            <ArrowDown size={24} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function CodeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
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
      className="p-3 rounded-xl glass text-[var(--color-text-muted)] hover:text-[var(--color-primary-light)] hover:scale-110 transition-all duration-300"
    >
      {icon}
    </a>
  );
}
