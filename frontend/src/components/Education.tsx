import { motion } from 'framer-motion';
import { SectionHeading } from './About';
import type { Certification, Education } from '../types';

interface EducationSectionProps {
  education: Education[];
  certifications: Certification[];
}

export function EducationSection({ education, certifications }: EducationSectionProps) {
  return (
    <section id="education" className="px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2">
        <div>
          <SectionHeading title="Education" subtitle="Background" />
          <div className="mt-6 space-y-4">
            {education.map((item) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-3xl border border-[var(--color-border)] bg-white p-6"
              >
                <p className="text-sm text-[var(--color-text-muted)]">
                  {formatYear(item.startDate)} — {formatYear(item.endDate)}
                </p>
                <h3 className="mt-2 text-lg font-semibold">{item.degree}</h3>
                <p className="mt-1 text-[var(--color-primary-dark)]">{item.institution}</p>
                {item.field && <p className="mt-1 text-sm text-[var(--color-text-muted)]">{item.field}</p>}
                {item.gpa && <p className="mt-2 text-sm">CGPA {item.gpa.replace(' CGPA', '')}</p>}
              </motion.article>
            ))}
          </div>
        </div>

        <div>
          <SectionHeading title="Certifications" subtitle="Learning" />
          <div className="mt-6 space-y-4">
            {certifications.map((item) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-3xl border border-[var(--color-border)] bg-white p-6"
              >
                {item.date && <p className="text-sm text-[var(--color-text-muted)]">{item.date}</p>}
                <h3 className="mt-1 text-lg font-semibold">{item.name}</h3>
                <p className="mt-1 text-sm text-[var(--color-text-muted)]">{item.issuer}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function formatYear(value: string | null) {
  if (!value) return '';
  return value.slice(0, 4);
}
