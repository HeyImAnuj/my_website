import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const words = ['enterprise workflows', 'finance systems', 'high-speed APIs', 'scalable products'];

export function DynamicText() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % words.length), 2200);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <span className="inline-flex min-w-[13.5rem] overflow-hidden align-bottom sm:min-w-[17rem]">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ y: '100%', opacity: 0, filter: 'blur(8px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: '-100%', opacity: 0, filter: 'blur(8px)' }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="whitespace-nowrap font-semibold text-[var(--color-accent)]"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
