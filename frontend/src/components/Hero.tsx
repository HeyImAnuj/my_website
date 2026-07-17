import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Download, Github, Linkedin, Mail } from 'lucide-react';
import { useRef, type ReactNode } from 'react';
import { DynamicText } from './DynamicText';
import type { Profile } from '../types';

interface HeroProps {
  profile: Profile;
}

export function Hero({ profile }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const visualY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const visualScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.72], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-14 pt-24"
    >
      <div className="absolute inset-0 grid-bg opacity-70" />
      <div className="noise" />
      <motion.div
        style={{ y: visualY, scale: visualScale }}
        className="absolute -right-[20rem] top-[12%] h-[40rem] w-[40rem] rounded-full border border-white/10 md:-right-[10rem] lg:-right-16 lg:h-[48rem] lg:w-[48rem]"
      >
        <div className="absolute inset-[9%] rounded-full border border-white/8" />
        <div className="absolute inset-[19%] rounded-full border border-[var(--color-primary)]/30" />
        <div className="absolute inset-[33%] rounded-full bg-[var(--color-primary)]/15 blur-3xl" />
      </motion.div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[.9fr_1.1fr] lg:px-10">
        <motion.div style={{ opacity: copyOpacity }} className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="eyebrow mb-8"
          >
            SDE II · Bhopal, India
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl text-[clamp(3.6rem,10vw,8.8rem)] font-semibold leading-[.82] tracking-[-.075em]"
          >
            I engineer
            <span className="block gradient-text">momentum.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.34 }}
            className="mt-8 max-w-xl text-lg leading-relaxed text-[var(--color-text-muted)] sm:text-xl"
          >
            I turn complex <DynamicText /> into fast, reliable experiences people enjoy using.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.48 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <a href="#projects" className="premium-button bg-[var(--color-text)] text-black">
              Explore my work <ArrowDown size={17} />
            </a>
            {profile.resumeUrl && (
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="premium-button border border-white/15 bg-white/5 text-white hover:border-white/30"
              >
                <Download size={18} /> Resume
              </a>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.62 }}
            className="mt-10 flex items-center gap-2"
          >
            {profile.github && <SocialLink href={profile.github} icon={<Github size={19} />} label="GitHub" />}
            {profile.linkedin && <SocialLink href={profile.linkedin} icon={<Linkedin size={19} />} label="LinkedIn" />}
            <SocialLink href="https://leetcode.com/u/Anujpatel299" icon={<CodeIcon />} label="LeetCode" />
            <SocialLink href={`mailto:${profile.email}`} icon={<Mail size={19} />} label="Email" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 70, rotateY: -8 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ y: visualY }}
          className="relative mx-auto w-full max-w-2xl [perspective:1200px]"
        >
          <HeroDashboard />
        </motion.div>
      </div>
    </section>
  );
}

function HeroDashboard() {
  return (
    <div className="product-shell aspect-[4/3] w-full rounded-[1.6rem] p-3 sm:rounded-[2.2rem] sm:p-5">
      <div className="noise" />
      <div className="flex h-full overflow-hidden rounded-[1.15rem] border border-white/8 bg-[#0a0c0a] sm:rounded-[1.6rem]">
        <aside className="hidden w-[22%] flex-col border-r border-white/8 p-4 sm:flex">
          <div className="mb-8 flex items-center gap-2 text-xs font-bold">
            <span className="h-6 w-6 rounded-lg bg-[var(--color-primary)]" />
            FLOW/OS
          </div>
          {['Overview', 'Approvals', 'Payments', 'Vendors'].map((item, index) => (
            <div
              key={item}
              className={`mb-2 rounded-lg px-3 py-2 text-[10px] ${
                index === 0 ? 'bg-white/10 text-white' : 'text-white/35'
              }`}
            >
              {item}
            </div>
          ))}
          <div className="mt-auto rounded-xl border border-[var(--color-accent)]/20 bg-[var(--color-accent)]/8 p-3 text-[9px] text-[var(--color-accent)]">
            Systems operational
          </div>
        </aside>
        <div className="relative flex-1 p-4 sm:p-6">
          <div className="mb-6 flex items-start justify-between">
            <div>
              <p className="text-[9px] uppercase tracking-[.18em] text-white/35">Finance workspace</p>
              <h2 className="mt-1 text-lg font-semibold sm:text-2xl">Good morning, Anuj.</h2>
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-primary)] text-[10px] font-bold">AP</div>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
            {[
              ['35%', 'Faster APIs'],
              ['30%', 'Lower DB load'],
              ['100%', 'On-time releases'],
            ].map(([value, label], index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.12 }}
                className={`${index === 2 ? 'col-span-2 sm:col-span-1' : ''} rounded-xl border border-white/8 bg-white/[.035] p-3 sm:p-4`}
              >
                <strong className="text-lg sm:text-2xl">{value}</strong>
                <p className="mt-1 text-[8px] uppercase tracking-wider text-white/35 sm:text-[9px]">{label}</p>
              </motion.div>
            ))}
          </div>
          <div className="relative mt-3 h-[42%] overflow-hidden rounded-xl border border-white/8 bg-white/[.025] p-3 sm:mt-4 sm:p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[9px] text-white/50">Workflow velocity</span>
              <span className="rounded-full bg-[var(--color-accent)]/10 px-2 py-1 text-[8px] text-[var(--color-accent)]">+45–50%</span>
            </div>
            <div className="flex h-[70%] items-end gap-2">
              {[34, 48, 42, 65, 58, 82, 74, 94].map((height, index) => (
                <motion.div
                  key={index}
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ delay: 1 + index * 0.06, duration: 0.7 }}
                  className="flex-1 rounded-t-sm bg-gradient-to-t from-[var(--color-primary)] to-[var(--color-accent)] opacity-80"
                />
              ))}
            </div>
            <div className="animate-scan absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-transparent via-white/[.025] to-transparent" />
          </div>
        </div>
      </div>
      <div className="absolute -bottom-5 left-1/2 h-8 w-[66%] -translate-x-1/2 rounded-full bg-black/80 blur-xl" />
      <a
        href="#projects"
        className="absolute -bottom-6 -right-2 flex items-center gap-2 rounded-full border border-white/10 bg-[#f4f5ef] px-4 py-3 text-xs font-bold text-black shadow-2xl sm:right-8"
      >
        See the systems <ArrowUpRight size={15} />
      </a>
    </div>
  );
}

function CodeIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
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
      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[.035] text-[var(--color-text-muted)] transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:text-white"
    >
      {icon}
    </a>
  );
}
