import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useMemo } from 'react';
import { SectionHeading } from './About';
import type { Skill } from '../types';

interface SkillsProps {
  skills: Skill[];
}

export function Skills({ skills }: SkillsProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const categories = useMemo(
    () => [...new Set(skills.map((s) => s.category))],
    [skills]
  );
  const [activeCategory, setActiveCategory] = useState('All');
  const allCategories = ['All', ...categories];

  const filtered =
    activeCategory === 'All'
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-bg-elevated)]/30 to-transparent" />
      <div className="max-w-6xl mx-auto px-6 relative">
        <SectionHeading title="Skills & Technologies" subtitle="What I work with" />

        <div ref={ref} className="flex flex-wrap justify-center gap-2 mb-10">
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-[var(--color-primary)] text-white glow'
                  : 'glass text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((skill, i) => (
              <motion.div
                key={skill.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                className="group p-4 rounded-xl glass hover:glow transition-all duration-300 cursor-default"
              >
                <div className="text-center">
                  <div className="text-lg font-semibold mb-3 group-hover:gradient-text transition-all">
                    {skill.name}
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-[var(--color-bg-dark)] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                      transition={{ duration: 1, delay: 0.3 + i * 0.05, ease: 'easeOut' }}
                      className="h-full rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]"
                    />
                  </div>
                  <div className="text-xs text-[var(--color-text-muted)] mt-2">{skill.level}%</div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
