import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Briefcase, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { SectionHeading } from './About';
import type { Experience } from '../types';

interface ExperienceSectionProps {
  experiences: Experience[];
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [expanded, setExpanded] = useState<number | null>(experiences[0]?.id ?? null);

  return (
    <section id="experience" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading title="Work Experience" subtitle="My journey" />

        <div ref={ref} className="relative">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-[var(--color-border)] md:-translate-x-px" />

          {experiences.map((exp, i) => {
            const isExpanded = expanded === exp.id;
            const isLeft = i % 2 === 0;

            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className={`relative flex items-start mb-8 ${
                  isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div className="absolute left-6 md:left-1/2 w-3 h-3 rounded-full bg-[var(--color-primary)] border-2 border-[var(--color-bg-dark)] -translate-x-1/2 mt-6 z-10">
                  {exp.current && (
                    <span className="absolute inset-0 rounded-full bg-[var(--color-primary)] animate-ping opacity-40" />
                  )}
                </div>

                <div className={`ml-14 md:ml-0 md:w-1/2 ${isLeft ? 'md:pr-12' : 'md:pl-12'}`}>
                  <button
                    onClick={() => setExpanded(isExpanded ? null : exp.id)}
                    className="w-full text-left p-6 rounded-xl glass hover:glow transition-all duration-300 group"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Briefcase size={16} className="text-[var(--color-primary-light)]" />
                          <span className="text-sm text-[var(--color-accent)] font-mono">
                            {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                          </span>
                          {exp.current && (
                            <span className="px-2 py-0.5 text-xs rounded-full bg-green-500/20 text-green-400">
                              Current
                            </span>
                          )}
                        </div>
                        <h3 className="text-xl font-bold group-hover:gradient-text transition-all">
                          {exp.role}
                        </h3>
                        <p className="text-[var(--color-primary-light)] font-medium">{exp.company}</p>
                        {exp.location && (
                          <p className="text-sm text-[var(--color-text-muted)]">{exp.location}</p>
                        )}
                      </div>
                      <ChevronDown
                        size={20}
                        className={`text-[var(--color-text-muted)] transition-transform duration-300 shrink-0 mt-1 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    </div>

                    <motion.div
                      initial={false}
                      animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-[var(--color-text-muted)] mt-4 leading-relaxed">
                        {exp.description}
                      </p>
                      <ul className="mt-4 space-y-2">
                        {exp.highlights.map((h, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-[var(--color-text-muted)]">
                            <span className="text-[var(--color-accent)] mt-1">▹</span>
                            {h}
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {exp.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 text-xs rounded-md bg-[var(--color-bg-elevated)] text-[var(--color-text-muted)]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
