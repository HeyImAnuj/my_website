import { AnimatePresence, motion, useScroll } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const navLinks = [
  { label: 'Profile', href: '#about' },
  { label: 'Capabilities', href: '#skills' },
  { label: 'Journey', href: '#experience' },
  { label: 'Work', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

interface NavbarProps {
  activeSection: string;
  name: string;
}

export function Navbar({ activeSection, name }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? 'border-b border-white/8 bg-[#070807]/80 backdrop-blur-2xl' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
          <a href="#hero" className="flex items-center gap-3 font-bold tracking-tight" aria-label={`${name}, home`}>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-text)] text-sm text-black">
              AP
            </span>
            <span className="hidden sm:inline">{name}</span>
          </a>

          <div className="hidden items-center rounded-full border border-white/8 bg-white/[.035] p-1 md:flex">
            {navLinks.map((link) => {
              const selected = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={selected ? 'location' : undefined}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                    selected ? 'bg-white text-black' : 'text-white/50 hover:text-white'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          <a
            href="#contact"
            className="hidden items-center gap-2 text-sm font-semibold text-white sm:flex"
          >
            Let&apos;s talk <ArrowUpRight size={16} />
          </a>

          <button
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white md:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              id="mobile-navigation"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden border-t border-white/8 bg-[#0b0d0b]/95 backdrop-blur-2xl md:hidden"
            >
              <div className="space-y-1 px-5 py-5">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.04 }}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between rounded-xl px-4 py-3 text-lg font-semibold text-white/75 hover:bg-white/5 hover:text-white"
                  >
                    {link.label}<span className="font-mono text-xs text-white/25">0{index + 1}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
      <motion.div
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]"
        style={{ scaleX: scrollYProgress }}
      />
    </>
  );
}
