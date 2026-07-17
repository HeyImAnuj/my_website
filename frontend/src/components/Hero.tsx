import { AnimatePresence, motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { ArrowDown, Download, Github, Linkedin, Mail } from 'lucide-react';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { DynamicText } from './DynamicText';
import type { Profile } from '../types';

interface HeroProps {
  profile: Profile;
}

const WELCOME_WORDS = [
  'welcome',
  'स्वागतम्',
  'bienvenido',
  'bienvenue',
  'willkommen',
  'benvenuto',
  'bem-vindo',
  'welkom',
  'välkommen',
  'witamy',
  'добро пожаловать',
  'καλώς ήρθες',
  'hoş geldiniz',
  'أهلاً وسهلاً',
  'ברוכים הבאים',
  '欢迎',
  'ようこそ',
  '환영합니다',
  'ยินดีต้อนรับ',
  'chào mừng',
  'selamat datang',
  'karibu',
  'स्वागत',
  'સ્વાગત',
  'வரவேற்கிறோம்',
  'స్వాగతం',
  'स्वागत आहे',
  'ਸਵਾਗਤ ਹੈ',
  'خوش آمدید',
];

export function Hero({ profile }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const carX = useTransform(scrollYProgress, [0, 1], ['-6%', '42%']);
  const carY = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);
  const carScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const wheelRotate = useTransform(scrollYProgress, [0, 1], [0, 900]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.15]);
  const speedLines = useTransform(scrollYProgress, [0, 1], [0.2, 1]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-20 pt-28"
    >
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="noise" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_55%,rgba(212,175,55,.12),transparent_42%)]" />

      <motion.div
        aria-hidden="true"
        style={{ x: carX, y: carY, scale: carScale, opacity: speedLines }}
        className="pointer-events-none absolute inset-y-[18%] right-[-8%] z-0 w-[min(110vw,68rem)] sm:right-[-4%] lg:right-[-2%]"
      >
        <div className="absolute left-[8%] top-[18%] hidden w-[55%] space-y-4 opacity-40 sm:block">
          <div className="h-px bg-gradient-to-r from-transparent via-[#d4af37]/70 to-transparent" />
          <div className="h-px w-[85%] bg-gradient-to-r from-transparent via-white/25 to-transparent" />
          <div className="h-px w-[70%] bg-gradient-to-r from-transparent via-[#d4af37]/45 to-transparent" />
        </div>
        <BlackGoldF1Car wheelRotate={wheelRotate} />
        <div className="mx-auto mt-2 h-6 w-[58%] rounded-full bg-black/80 blur-2xl" />
      </motion.div>

      <div className="absolute bottom-[16%] left-0 right-0 z-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/35 to-transparent" />

      <motion.div
        style={{ opacity: copyOpacity }}
        className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10"
      >
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="eyebrow mb-8"
          >
            SDE II · Bhopal, India
          </motion.div>

          <HoverHeadline />

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
        </div>
      </motion.div>
    </section>
  );
}

function HoverHeadline() {
  const [hovered, setHovered] = useState(false);
  const [welcomeIndex, setWelcomeIndex] = useState(0);

  useEffect(() => {
    if (!hovered) return;
    const timer = window.setInterval(
      () => setWelcomeIndex((current) => (current + 1) % WELCOME_WORDS.length),
      2800
    );
    return () => window.clearInterval(timer);
  }, [hovered]);

  return (
    <motion.h1
      initial={{ opacity: 0, y: 36 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.85, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="relative max-w-4xl cursor-default text-[clamp(2.8rem,8.5vw,7.4rem)] font-semibold leading-[.88] tracking-[-.07em] drop-shadow-[0_8px_40px_rgba(0,0,0,.85)]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      tabIndex={0}
      data-cursor
      aria-label="I engineer momentum. Hover to see a welcome message."
    >
      <AnimatePresence mode="wait">
        {!hovered ? (
          <motion.span
            key="default"
            initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -18, filter: 'blur(10px)', scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="block"
          >
            I engineer
            <span className="block bg-gradient-to-r from-white via-[#d4af37] to-[#f5e6a3] bg-clip-text text-transparent">
              momentum.
            </span>
          </motion.span>
        ) : (
          <motion.span
            key="hover"
            initial={{ opacity: 0, y: 28, filter: 'blur(12px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="block text-[clamp(2rem,5.8vw,4.6rem)] leading-[1.05] tracking-[-.04em]"
          >
            hey i&apos;m anuj
            <span className="mt-2 block">
              <span className="inline-flex min-h-[1.15em] min-w-[9ch] items-baseline overflow-hidden align-bottom">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={WELCOME_WORDS[welcomeIndex]}
                    initial={{ y: '110%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: '-110%', opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-block whitespace-nowrap bg-gradient-to-r from-[#d4af37] to-[#f5e6a3] bg-clip-text text-transparent"
                  >
                    {WELCOME_WORDS[welcomeIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>{' '}
              to my site
            </span>
          </motion.span>
        )}
      </AnimatePresence>
    </motion.h1>
  );
}

function BlackGoldF1Car({ wheelRotate }: { wheelRotate: MotionValue<number> }) {
  return (
    <svg
      viewBox="0 0 900 320"
      className="h-auto w-full drop-shadow-[0_30px_60px_rgba(0,0,0,.65)]"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="carbon" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1a1a1a" />
          <stop offset="40%" stopColor="#0a0a0a" />
          <stop offset="100%" stopColor="#222" />
        </linearGradient>
        <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8a6b1f" />
          <stop offset="35%" stopColor="#d4af37" />
          <stop offset="70%" stopColor="#f5e6a3" />
          <stop offset="100%" stopColor="#b8922a" />
        </linearGradient>
        <linearGradient id="goldSoft" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f5e6a3" />
          <stop offset="100%" stopColor="#8a6b1f" />
        </linearGradient>
        <filter id="carGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#d4af37" floodOpacity="0.25" />
        </filter>
      </defs>

      <g filter="url(#carGlow)">
        <path d="M120 210h90l30-34h70l40 34h220l55-20h70l40 28v24H120z" fill="url(#carbon)" />
        <path d="M210 176h95l28 34H238z" fill="#050505" />
        <path d="M318 180h150l-18 30H300z" fill="#0d0d0d" />
        <path d="M468 186h110l22 28H490z" fill="#111" />

        <path d="M145 208h620" stroke="url(#gold)" strokeWidth="5" strokeLinecap="round" />
        <path d="M250 170h40l14 20h-54z" fill="#080808" stroke="#d4af37" strokeWidth="2" />
        <circle cx="270" cy="164" r="9" fill="url(#goldSoft)" />

        <rect x="95" y="200" width="58" height="14" rx="2" fill="url(#gold)" />
        <rect x="720" y="200" width="72" height="14" rx="2" fill="url(#gold)" />
        <path d="M190 210c40-8 90-8 130 0" stroke="#d4af37" strokeWidth="3" fill="none" opacity=".7" />
        <path d="M360 210c50-10 120-10 180 0" stroke="#d4af37" strokeWidth="2" fill="none" opacity=".45" />

        <text
          x="430"
          y="232"
          textAnchor="middle"
          fill="url(#gold)"
          fontSize="22"
          fontWeight="800"
          fontFamily="Inter, sans-serif"
          letterSpacing="4"
        >
          AP
        </text>

        <path d="M300 155h26l8 14h-34z" fill="#111" stroke="#d4af37" strokeWidth="1.5" />
        <rect x="560" y="192" width="36" height="8" rx="1" fill="#d4af37" opacity=".85" />
        <rect x="610" y="192" width="24" height="8" rx="1" fill="#f5e6a3" opacity=".7" />
      </g>

      <Wheel cx={220} cy={236} rotate={wheelRotate} />
      <Wheel cx={660} cy={236} rotate={wheelRotate} />
    </svg>
  );
}

function Wheel({ cx, cy, rotate }: { cx: number; cy: number; rotate: MotionValue<number> }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r="38" fill="#090909" stroke="#2a2a2a" strokeWidth="5" />
      <circle cx={cx} cy={cy} r="28" fill="#111" stroke="#d4af37" strokeWidth="2" />
      <motion.g style={{ rotate, transformOrigin: `${cx}px ${cy}px` }}>
        <circle cx={cx} cy={cy} r="12" fill="#1a1a1a" stroke="#f5e6a3" strokeWidth="2" />
        <path d={`M${cx} ${cy - 22}v44 M${cx - 22} ${cy}h44`} stroke="#d4af37" strokeWidth="4" />
        <path
          d={`M${cx - 15} ${cy - 15}l30 30 M${cx + 15} ${cy - 15}l-30 30`}
          stroke="#8a6b1f"
          strokeWidth="2"
        />
      </motion.g>
    </g>
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
