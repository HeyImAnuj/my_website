import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, GraduationCap } from 'lucide-react';
import { SectionHeading } from './About';
import type { Education, Certification } from '../types';

interface EducationSectionProps {
  education: Education[];
  certifications: Certification[];
}

export function EducationSection({ education, certifications }: EducationSectionProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="education" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading title="Education & Certifications" subtitle="Background" />

        <div ref={ref} className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="flex items-center gap-2 text-xl font-bold mb-6">
              <GraduationCap size={24} className="text-[var(--color-primary-light)]" />
              Education
            </h3>
            {education.map((edu, i) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="p-6 rounded-xl glass mb-4 hover:glow transition-all duration-300"
              >
                <div className="text-sm text-[var(--color-accent)] font-mono mb-1">
                  {edu.startDate} — {edu.endDate}
                </div>
                <h4 className="text-lg font-bold">{edu.degree}</h4>
                <p className="text-[var(--color-primary-light)]">{edu.institution}</p>
                {edu.field && (
                  <p className="text-sm text-[var(--color-text-muted)]">{edu.field}</p>
                )}
                {edu.gpa && (
                  <p className="text-sm text-[var(--color-text-muted)] mt-1">GPA: {edu.gpa}</p>
                )}
                <ul className="mt-3 space-y-1">
                  {edu.highlights.map((h, j) => (
                    <li key={j} className="text-sm text-[var(--color-text-muted)] flex items-start gap-2">
                      <span className="text-[var(--color-accent)]">▹</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <div>
            <h3 className="flex items-center gap-2 text-xl font-bold mb-6">
              <Award size={24} className="text-[var(--color-accent)]" />
              Certifications
            </h3>
            {certifications.map((cert, i) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="p-6 rounded-xl glass mb-4 hover:glow transition-all duration-300 group"
              >
                <div className="text-sm text-[var(--color-text-muted)] font-mono mb-1">
                  {cert.date}
                </div>
                <h4 className="text-lg font-bold group-hover:gradient-text transition-all">
                  {cert.name}
                </h4>
                <p className="text-[var(--color-primary-light)]">{cert.issuer}</p>
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-sm text-[var(--color-accent)] hover:underline"
                  >
                    Verify Credential →
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
