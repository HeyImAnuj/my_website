import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

export function AmbientCursor() {
  const x = useMotionValue(-300);
  const y = useMotionValue(-300);
  const dotX = useMotionValue(-30);
  const dotY = useMotionValue(-30);
  const smoothX = useSpring(x, { stiffness: 90, damping: 24, mass: 0.3 });
  const smoothY = useSpring(y, { stiffness: 90, damping: 24, mass: 0.3 });
  const ringX = useSpring(dotX, { stiffness: 380, damping: 30 });
  const ringY = useSpring(dotY, { stiffness: 380, damping: 30 });
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reducedMotion) return;

    setEnabled(true);
    document.documentElement.classList.add('custom-cursor');
    const onMove = (event: PointerEvent) => {
      x.set(event.clientX - 220);
      y.set(event.clientY - 220);
      dotX.set(event.clientX - 18);
      dotY.set(event.clientY - 18);
      setHovering(Boolean((event.target as HTMLElement).closest('a, button, [data-cursor]')));
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    return () => {
      document.documentElement.classList.remove('custom-cursor');
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
    };
  }, [dotX, dotY, x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-0 h-[27.5rem] w-[27.5rem] rounded-full bg-[var(--color-primary)]/[.045] blur-[90px]"
        style={{ x: smoothX, y: smoothY }}
      />
      <motion.div
        aria-hidden="true"
        animate={{
          scale: pressed ? 0.7 : hovering ? 1.65 : 1,
          backgroundColor: hovering ? 'rgba(183,245,59,.12)' : 'rgba(255,255,255,.03)',
          borderColor: hovering ? 'rgba(183,245,59,.9)' : 'rgba(255,255,255,.55)',
        }}
        className="pointer-events-none fixed left-0 top-0 z-[100] flex h-9 w-9 items-center justify-center rounded-full border"
        style={{ x: ringX, y: ringY }}
      >
        <motion.span
          animate={{ scale: hovering ? 0.45 : 1 }}
          className="h-1.5 w-1.5 rounded-full bg-white"
        />
      </motion.div>
    </>
  );
}
