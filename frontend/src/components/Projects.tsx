import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, X } from 'lucide-react';
import { useState } from 'react';
import { SectionHeading } from './About';
import type { Project } from '../types';

interface ProjectsProps {
  projects: Project[];
}

export function Projects({ projects }: ProjectsProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-bg-elevated)]/30 to-transparent" />
      <div className="max-w-6xl mx-auto px-6 relative">
        <SectionHeading title="Featured Projects" subtitle="What I've built" />

        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onClick={() => setSelected(project)}
              className="group p-6 rounded-xl glass hover:border-[var(--color-primary)]/50 cursor-pointer transition-all duration-300 hover:glow hover:-translate-y-1"
            >
              <div className="h-40 rounded-lg bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-accent)]/20 mb-4 flex items-center justify-center group-hover:from-[var(--color-primary)]/30 group-hover:to-[var(--color-accent)]/30 transition-all">
                <span className="text-4xl font-bold gradient-text opacity-50 group-hover:opacity-100 transition-opacity">
                  {project.title.charAt(0)}
                </span>
              </div>

              <h3 className="text-lg font-bold mb-2 group-hover:gradient-text transition-all">
                {project.title}
              </h3>
              <p className="text-sm text-[var(--color-text-muted)] mb-4 line-clamp-2">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.techStack.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 text-xs rounded-md bg-[var(--color-bg-elevated)] text-[var(--color-text-muted)]"
                  >
                    {tech}
                  </span>
                ))}
                {project.techStack.length > 4 && (
                  <span className="px-2 py-0.5 text-xs text-[var(--color-text-muted)]">
                    +{project.techStack.length - 4}
                  </span>
                )}
              </div>

              <div className="flex gap-3">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-[var(--color-text-muted)] hover:text-[var(--color-primary-light)] transition-colors"
                  >
                    <Github size={18} />
                  </a>
                )}
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
                  >
                    <ExternalLink size={18} />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: 'spring', damping: 25 }}
        className="w-full max-w-2xl max-h-[85vh] overflow-y-auto p-8 rounded-2xl glass glow"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-6">
          <h3 className="text-2xl font-bold gradient-text">{project.title}</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-[var(--color-bg-elevated)] text-[var(--color-text-muted)]"
          >
            <X size={20} />
          </button>
        </div>

        <p className="text-[var(--color-text-muted)] leading-relaxed mb-6">
          {project.longDesc || project.description}
        </p>

        {project.highlights.length > 0 && (
          <div className="mb-6">
            <h4 className="font-semibold mb-3">Key Highlights</h4>
            <ul className="space-y-2">
              {project.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[var(--color-text-muted)]">
                  <span className="text-[var(--color-accent)]">▹</span>
                  {h}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-6">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-sm rounded-full bg-[var(--color-primary)]/20 text-[var(--color-primary-light)]"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-4">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--color-bg-elevated)] hover:bg-[var(--color-primary)]/20 transition-colors"
            >
              <Github size={18} /> View Code
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] transition-colors"
            >
              <ExternalLink size={18} /> Live Demo
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
