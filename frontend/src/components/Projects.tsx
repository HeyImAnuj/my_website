import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Github } from 'lucide-react';
import { useState } from 'react';
import { SectionHeading } from './About';
import type { Project } from '../types';

interface ProjectsProps {
  projects: Project[];
}

export function Projects({ projects }: ProjectsProps) {
  const [openId, setOpenId] = useState<number | null>(projects[0]?.id ?? null);

  return (
    <section id="projects" className="px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <SectionHeading title="Selected work" subtitle="Projects" />
        <div className="mt-8 divide-y divide-[var(--color-border)] overflow-hidden rounded-3xl border border-[var(--color-border)] bg-white">
          {projects.map((project, index) => {
            const open = openId === project.id;
            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => setOpenId(open ? null : project.id)}
                  className="flex w-full items-start justify-between gap-4 px-5 py-5 text-left sm:px-7"
                >
                  <div>
                    <p className="font-mono text-xs text-[var(--color-text-muted)]">0{index + 1}</p>
                    <h3 className="mt-1 text-lg font-semibold tracking-tight sm:text-xl">{project.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-[var(--color-text-muted)]">{project.description}</p>
                  </div>
                  <ChevronDown
                    size={18}
                    className={`mt-1 shrink-0 text-[var(--color-text-muted)] transition-transform ${open ? 'rotate-180' : ''}`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-6 sm:px-7">
                        <p className="max-w-3xl leading-7 text-[var(--color-text-muted)]">
                          {project.longDesc || project.description}
                        </p>
                        <ul className="mt-4 space-y-2">
                          {project.highlights.map((item) => (
                            <li key={item} className="text-sm leading-6">
                              {item}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-4 flex flex-wrap items-center gap-2">
                          {project.techStack.map((tech) => (
                            <span key={tech} className="rounded-full bg-[var(--color-bg-elevated)] px-3 py-1 text-xs">
                              {tech}
                            </span>
                          ))}
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="ml-auto inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-primary-dark)]"
                            >
                              <Github size={15} /> GitHub
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
