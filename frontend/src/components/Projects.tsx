import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Check, Github } from 'lucide-react';
import { useState } from 'react';
import type { Project } from '../types';

interface ProjectsProps {
  projects: Project[];
}

const projectMeta = [
  { label: 'Finance automation', metric: '45–50%', metricLabel: 'productivity gain', accent: '#ff5c35' },
  { label: 'Enterprise ERP', metric: '65–70%', metricLabel: 'workflow efficiency', accent: '#b7f53b' },
  { label: 'Commerce platform', metric: '4', metricLabel: 'core product areas', accent: '#6ca8ff' },
];

export function Projects({ projects }: ProjectsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = projects[activeIndex] ?? projects[0];
  const meta = projectMeta[activeIndex] ?? projectMeta[0];

  if (!activeProject) return null;

  return (
    <section id="projects" className="relative overflow-hidden py-28 sm:py-36">
      <div className="noise" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="mb-16 grid gap-8 lg:grid-cols-[1fr_.7fr] lg:items-end">
          <div>
            <span className="eyebrow">Selected systems</span>
            <h2 className="mt-7 max-w-4xl text-[clamp(3rem,7vw,6.7rem)] font-semibold leading-[.9] tracking-[-.065em]">
              Built to move
              <span className="block text-[var(--color-text-muted)]">business forward.</span>
            </h2>
          </div>
          <p className="max-w-lg text-base leading-relaxed text-[var(--color-text-muted)] lg:justify-self-end lg:text-lg">
            Real enterprise products, presented as product stories—what was difficult, what I built, and the measurable change it created.
          </p>
        </div>

        <div className="mb-8 flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Project case studies">
          {projects.map((project, index) => (
            <button
              key={project.id}
              role="tab"
              aria-selected={index === activeIndex}
              aria-controls="project-panel"
              onClick={() => setActiveIndex(index)}
              className={`shrink-0 rounded-full border px-5 py-3 text-sm font-semibold transition-all ${
                index === activeIndex
                  ? 'border-white bg-white text-black'
                  : 'border-white/10 bg-white/[.025] text-[var(--color-text-muted)] hover:border-white/25 hover:text-white'
              }`}
            >
              0{index + 1} · {project.title.split('—')[0].trim()}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.article
            id="project-panel"
            role="tabpanel"
            key={activeProject.id}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="product-shell rounded-[1.6rem] sm:rounded-[2.4rem]"
          >
            <div className="grid min-h-[42rem] lg:grid-cols-[.83fr_1.17fr]">
              <div className="flex flex-col p-7 sm:p-10 lg:p-14">
                <span className="font-mono text-xs uppercase tracking-[.18em]" style={{ color: meta.accent }}>
                  {meta.label}
                </span>
                <h3 className="mt-6 text-3xl font-semibold leading-tight tracking-[-.04em] sm:text-5xl">
                  {activeProject.title}
                </h3>
                <p className="mt-6 text-base leading-relaxed text-[var(--color-text-muted)] sm:text-lg">
                  {activeProject.longDesc || activeProject.description}
                </p>

                <ul className="mt-8 space-y-3">
                  {activeProject.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-3 text-sm text-white/75">
                      <span
                        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                        style={{ backgroundColor: `${meta.accent}20`, color: meta.accent }}
                      >
                        <Check size={12} />
                      </span>
                      {highlight}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex flex-wrap items-end justify-between gap-8 pt-12">
                  <div>
                    <strong className="text-5xl font-semibold tracking-[-.06em] sm:text-6xl" style={{ color: meta.accent }}>
                      {meta.metric}
                    </strong>
                    <p className="mt-2 text-xs uppercase tracking-[.14em] text-white/40">{meta.metricLabel}</p>
                  </div>
                  {activeProject.githubUrl && (
                    <a
                      href={activeProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="premium-button border border-white/15 bg-white/5 text-white hover:border-white/30"
                    >
                      <Github size={17} /> GitHub profile
                    </a>
                  )}
                </div>
              </div>

              <ProjectVisual projectIndex={activeIndex} accent={meta.accent} />
            </div>
          </motion.article>
        </AnimatePresence>

        <div className="mt-7 flex flex-wrap gap-2">
          {activeProject.techStack.map((tech) => (
            <span key={tech} className="rounded-full border border-white/8 bg-white/[.025] px-4 py-2 text-xs text-white/55">
              {tech}
            </span>
          ))}
          {activeProject.demoUrl && (
            <a
              href={activeProject.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto flex items-center gap-2 text-sm font-semibold text-white"
            >
              Open live product <ArrowUpRight size={16} />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

function ProjectVisual({ projectIndex, accent }: { projectIndex: number; accent: string }) {
  const views = [
    {
      title: 'Accounts Payable workspace',
      metrics: [['45–50%', 'Productivity'], ['4', 'Core workflows'], ['Multi-level', 'Approvals']],
      rows: [
        ['Voucher Cash Disbursement', 'Delivered'],
        ['Payment File Generation', 'Delivered'],
        ['Remittance', 'Delivered'],
        ['Approver Workflow', 'Delivered'],
      ],
    },
    {
      title: 'Star Finance modules',
      metrics: [['65–70%', 'Efficiency'], ['35%', 'Faster APIs'], ['30%', 'Lower DB load']],
      rows: [
        ['Accounts Receivable', 'Contributed'],
        ['Cash Management', 'Contributed'],
        ['Accounts Payable', 'Contributed'],
        ['Query Optimization', 'Optimized'],
      ],
    },
    {
      title: 'E-Commerce application',
      metrics: [['4', 'Core features'], ['JPA', 'Data access'], ['Stock', 'Order checks']],
      rows: [
        ['User Management', 'Developed'],
        ['Product Catalog', 'Developed'],
        ['Shopping Cart', 'Developed'],
        ['Order Placement', 'Developed'],
      ],
    },
  ];
  const view = views[projectIndex] ?? views[0];

  return (
    <div className="relative min-h-[32rem] overflow-hidden border-t border-white/8 bg-[#0b0d0b] p-5 sm:p-9 lg:border-l lg:border-t-0">
      <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full blur-[100px]" style={{ backgroundColor: `${accent}25` }} />
      <div className="absolute -bottom-20 -left-24 h-72 w-72 rounded-full blur-[100px]" style={{ backgroundColor: `${accent}14` }} />
      <div className="relative flex h-full flex-col rounded-[1.5rem] border border-white/10 bg-[#111411] p-4 shadow-2xl sm:p-6">
        <div className="mb-7 flex items-center justify-between">
          <div>
            <p className="text-[9px] uppercase tracking-[.18em] text-white/30">Experience visualization</p>
            <h4 className="mt-1 text-base font-semibold sm:text-xl">{view.title}</h4>
          </div>
          <div className="flex gap-1.5"><span className="h-2 w-2 rounded-full bg-white/10" /><span className="h-2 w-2 rounded-full bg-white/10" /><span className="h-2 w-2 rounded-full" style={{ backgroundColor: accent }} /></div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {view.metrics.map(([value, label], index) => (
            <div key={label} className={`${index === 2 ? 'col-span-2 sm:col-span-1' : ''} rounded-xl border border-white/8 bg-white/[.025] p-4`}>
              <p className="text-[9px] uppercase tracking-wider text-white/30">{label}</p>
              <strong className="mt-2 block text-xl sm:text-2xl">{value}</strong>
            </div>
          ))}
        </div>

        <div className="mt-3 flex-1 overflow-hidden rounded-xl border border-white/8 bg-black/20">
          <div className="grid grid-cols-[1fr_.6fr_.5fr] border-b border-white/8 px-4 py-3 text-[8px] uppercase tracking-[.14em] text-white/25">
            <span>Capability</span><span>Status</span><span className="text-right">Stack</span>
          </div>
          {view.rows.map(([row, status], index) => (
            <motion.div
              key={row}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: .15 + index * .08 }}
              className="grid grid-cols-[1fr_.6fr_.5fr] items-center border-b border-white/5 px-4 py-4 text-[10px] sm:text-xs"
            >
              <span className="font-medium">{row}</span>
              <span><i className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: accent }} />{status}</span>
              <span className="text-right text-white/45">
                {projectIndex === 0 ? 'React/Node' : projectIndex === 1 ? 'Spring/SQL' : 'Spring/JPA'}
              </span>
            </motion.div>
          ))}
        </div>
        <div className="mt-3 flex h-1 overflow-hidden rounded-full bg-white/5">
          <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 1, delay: .4 }} className="rounded-full opacity-70" style={{ backgroundColor: accent }} />
        </div>
      </div>
    </div>
  );
}
