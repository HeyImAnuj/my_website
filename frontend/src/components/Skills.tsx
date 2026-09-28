import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { SectionHeading } from './About';
import type { Skill } from '../types';

interface SkillsProps {
  skills: Skill[];
}

export function Skills({ skills }: SkillsProps) {
  const categories = useMemo(() => [...new Set(skills.map((skill) => skill.category))], [skills]);
  const [active, setActive] = useState('All');
  const visible = active === 'All' ? skills : skills.filter((skill) => skill.category === active);
  const groups = useMemo(() => {
    const names = active === 'All' ? categories : [active];
    return names.map((category) => ({
      category,
      items: visible.filter((skill) => skill.category === category),
    }));
  }, [active, categories, visible]);

  return (
    <section id="skills" className="px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading title="Skills" subtitle="What I work with" />
          <div className="flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Skill categories">
            {['All', ...categories].map((category) => (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={active === category}
                onClick={() => setActive(category)}
                className={`shrink-0 rounded-full px-3 py-1.5 text-sm transition ${
                  active === category
                    ? 'bg-[var(--color-text)] text-white'
                    : 'bg-white text-[var(--color-text-muted)] ring-1 ring-[var(--color-border)] hover:text-[var(--color-text)]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28 }}
              className="space-y-8"
            >
              {groups.map((group) => (
                <div key={group.category}>
                  <h3 className="mb-3 text-sm font-medium text-[var(--color-text-muted)]">{group.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((skill) => (
                      <span
                        key={skill.id}
                        className="rounded-full border border-[var(--color-border)] bg-white px-3 py-2 text-sm"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
