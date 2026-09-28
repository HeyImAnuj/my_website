import { motion } from 'framer-motion';
import { SectionHeading } from './About';
import type { Experience } from '../types';

interface ExperienceSectionProps {
  experiences: Experience[];
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  return (
    <section id="experience" className="px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <SectionHeading title="Experience" subtitle="Where I work" />
        <div className="mt-8 space-y-5">
          {experiences.map((job, index) => (
            <motion.article
              key={job.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="rounded-3xl border border-[var(--color-border)] bg-white p-6 sm:p-8"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-xl font-semibold tracking-tight">{job.role}</h3>
                  <p className="mt-1 text-[var(--color-primary-dark)]">{job.company}</p>
                  {job.location && <p className="mt-1 text-sm text-[var(--color-text-muted)]">{job.location}</p>}
                </div>
                <p className="rounded-full bg-[var(--color-bg-elevated)] px-3 py-1 text-sm text-[var(--color-text-muted)]">
                  {formatDate(job.startDate)} — {job.current ? 'Present' : formatDate(job.endDate)}
                </p>
              </div>
              <p className="mt-5 leading-7 text-[var(--color-text-muted)]">{job.description}</p>
              <ul className="mt-5 space-y-3">
                {job.highlights.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-6 text-[var(--color-text)]">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-2">
                {job.techStack.map((tech) => (
                  <span key={tech} className="rounded-full bg-[var(--color-bg-elevated)] px-3 py-1 text-xs">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function formatDate(value: string | null) {
  if (!value) return '';
  const [year, month] = value.split('-');
  if (!month) return year;
  const names = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${names[Number(month) - 1]} ${year}`;
}
