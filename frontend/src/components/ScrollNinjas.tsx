import { motion, useScroll, useTransform } from 'framer-motion';

export function ScrollNinjas() {
  const { scrollYProgress } = useScroll();
  const firstX = useTransform(scrollYProgress, [0.08, 0.14, 0.23, 0.28], [-130, 0, 0, -140]);
  const firstRotate = useTransform(scrollYProgress, [0.08, 0.14, 0.28], [-25, 5, -35]);
  const secondX = useTransform(scrollYProgress, [0.34, 0.4, 0.51, 0.57], [140, 0, 0, 150]);
  const secondRotate = useTransform(scrollYProgress, [0.34, 0.4, 0.57], [30, -6, 40]);
  const thirdY = useTransform(scrollYProgress, [0.68, 0.74, 0.86, 0.92], [130, 0, 0, 150]);
  const thirdRotate = useTransform(scrollYProgress, [0.68, 0.76, 0.92], [20, -4, -25]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      <motion.div style={{ x: firstX, rotate: firstRotate }} className="absolute left-0 top-[27%]">
        <Ninja label="SHIP" side="left" />
      </motion.div>
      <motion.div style={{ x: secondX, rotate: secondRotate }} className="absolute right-0 top-[52%]">
        <Ninja label="SCALE" side="right" />
      </motion.div>
      <motion.div style={{ y: thirdY, rotate: thirdRotate }} className="absolute bottom-0 left-[18%] sm:left-[36%]">
        <Ninja label="OPTIMIZE" side="bottom" />
      </motion.div>
    </div>
  );
}

function Ninja({ label, side }: { label: string; side: 'left' | 'right' | 'bottom' }) {
  return (
    <div className={`group flex items-center gap-2 ${side === 'right' ? 'flex-row-reverse' : ''}`}>
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        className="relative h-20 w-16 drop-shadow-[0_12px_20px_rgba(0,0,0,.6)] sm:h-24 sm:w-20"
      >
        <svg viewBox="0 0 80 100" className="h-full w-full">
          <path d="M18 93c3-24 3-44 10-58h24c7 14 7 34 10 58L47 80l-7 17-7-17z" fill="#090b09" stroke="rgba(255,255,255,.15)" />
          <circle cx="40" cy="30" r="24" fill="#0b0d0b" stroke="rgba(255,255,255,.18)" />
          <path d="M18 27c14-9 30-9 44 0l-3 16H21z" fill="#171a17" />
          <path d="M23 29c11-5 23-5 34 0l-3 10H26z" fill="#f4f5ef" />
          <path d="M29 33l8 2-8 2zm22 0l-8 2 8 2z" fill="#ff5c35" />
          <path d="M14 48L2 66l18-7m46-11 12 18-18-7" fill="none" stroke="#0b0d0b" strokeWidth="9" strokeLinecap="round" />
          <path d="M24 18C9 7 7 30 2 18c7 1 10-8 22-8z" fill="#b7f53b" />
        </svg>
        <motion.span
          animate={{ opacity: [0, 1, 0], x: side === 'right' ? [0, -15] : [0, 15] }}
          transition={{ duration: 1.4, repeat: Infinity }}
          className={`absolute top-1/2 h-px w-8 bg-[var(--color-accent)] ${side === 'right' ? '-left-7' : '-right-7'}`}
        />
      </motion.div>
      <span className="hidden rounded-full border border-white/10 bg-black/70 px-3 py-1 font-mono text-[9px] tracking-[.18em] text-[var(--color-accent)] backdrop-blur-md sm:block">
        {label}
      </span>
    </div>
  );
}
