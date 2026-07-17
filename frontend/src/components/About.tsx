import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import type { Profile } from '../types';

interface AboutProps {
  profile: Profile;
}

export function About({ profile }: AboutProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const stats = [
    { label: 'Years Experience', value: `${profile.yearsExp}+` },
    { label: 'ERP Areas', value: 'AP · AR · CM' },
    { label: 'API Response Gain', value: '35%' },
    { label: 'On-Time Releases', value: '100%' },
  ];

  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading title="About Me" subtitle="Who I am" />

        <div ref={ref} className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="relative">
              <div className="w-[min(18rem,100%)] aspect-square mx-auto rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] p-1 animate-float">
                <div className="w-full h-full rounded-2xl bg-[var(--color-bg-card)] flex items-center justify-center overflow-hidden">
                  {profile.avatarUrl ? (
                    <img
                      src={profile.avatarUrl}
                      alt={profile.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-8xl font-extrabold gradient-text">
                      {profile.name.charAt(0)}
                    </span>
                  )}
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-xl bg-[var(--color-accent)] opacity-20 blur-xl" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-4">
              {profile.title} passionate about building great software
            </h3>
            {profile.bio.split('\n\n').map((paragraph, i) => (
              <p key={i} className="text-[var(--color-text-muted)] leading-relaxed mb-4">
                {paragraph.trim()}
              </p>
            ))}

            <div className="grid grid-cols-2 gap-4 mt-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  className="p-4 rounded-xl glass text-center hover:glow transition-all duration-300"
                >
                  <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-sm text-[var(--color-text-muted)]">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function SectionHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="text-center mb-16">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-[var(--color-accent)] font-mono text-sm mb-2"
      >
        {'// '}{subtitle}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-4xl md:text-5xl font-bold"
      >
        {title}
      </motion.h2>
    </div>
  );
}
