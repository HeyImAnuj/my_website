import type { Profile, Skill, Experience, Project, Education, Certification } from '../types';

export const profile: Profile = {
  id: 1,
  name: 'Anuj Patel',
  title: 'Software Development Engineer 2',
  tagline: 'Full-stack developer building enterprise ERP & finance automation systems',
  bio: `I'm a Software Development Engineer 2 at Star Tech Software with 2+ years of experience building
and maintaining enterprise ERP applications. I specialize in Java, Spring Boot, React.js, Node.js, and
PostgreSQL, with a strong track record of delivering client-facing features, optimizing APIs, and improving
workflow efficiency in finance and automation systems.

I excel at translating complex business requirements into reliable, scalable software — from multi-level
approver workflows to payment file generation systems. I work directly with enterprise clients for
requirement gathering, issue resolution, and feature delivery, maintaining a 100% on-time release record.`,
  email: 'anujpatel299@gmail.com',
  phone: '+91 6261319171',
  location: 'Bhopal, Madhya Pradesh, India',
  github: 'https://github.com/HeyImAnuj',
  linkedin: 'https://linkedin.com/in/anujpatelmanit',
  twitter: null,
  resumeUrl: null,
  avatarUrl: null,
  yearsExp: 2,
};

export const skills: Skill[] = [
  { id: 1, name: 'Java', category: 'Languages', level: 92, icon: 'java', order: 1 },
  { id: 2, name: 'JavaScript (ES6+)', category: 'Languages', level: 90, icon: 'javascript', order: 2 },
  { id: 3, name: 'Python', category: 'Languages', level: 82, icon: 'python', order: 3 },
  { id: 4, name: 'SQL', category: 'Languages', level: 88, icon: 'sql', order: 4 },
  { id: 5, name: 'HTML/CSS', category: 'Frontend', level: 90, icon: 'html', order: 5 },
  { id: 6, name: 'React.js', category: 'Frontend', level: 92, icon: 'react', order: 6 },
  { id: 7, name: 'Spring Boot', category: 'Backend', level: 92, icon: 'spring', order: 7 },
  { id: 8, name: 'Node.js', category: 'Backend', level: 88, icon: 'nodejs', order: 8 },
  { id: 9, name: 'Hibernate/JPA', category: 'Backend', level: 85, icon: 'hibernate', order: 9 },
  { id: 10, name: 'REST APIs', category: 'Backend', level: 90, icon: 'api', order: 10 },
  { id: 11, name: 'PostgreSQL', category: 'Database', level: 90, icon: 'postgresql', order: 11 },
  { id: 12, name: 'Git/GitHub', category: 'Developer Tools', level: 92, icon: 'git', order: 12 },
  { id: 13, name: 'Docker', category: 'Developer Tools', level: 78, icon: 'docker', order: 13 },
  { id: 14, name: 'Azure DevOps', category: 'Developer Tools', level: 85, icon: 'azure', order: 14 },
  { id: 15, name: 'Postman', category: 'Developer Tools', level: 88, icon: 'postman', order: 15 },
  { id: 16, name: 'Linux/Unix', category: 'Developer Tools', level: 80, icon: 'linux', order: 16 },
  { id: 17, name: 'ERP Systems', category: 'Domain', level: 90, icon: 'erp', order: 17 },
  { id: 18, name: 'Agile/Scrum', category: 'Domain', level: 88, icon: 'agile', order: 18 },
  { id: 19, name: 'Microservices', category: 'Architecture', level: 75, icon: 'microservices', order: 19 },
  { id: 20, name: 'Design Patterns', category: 'Architecture', level: 82, icon: 'patterns', order: 20 },
];

export const experiences: Experience[] = [
  {
    id: 1,
    company: 'Star Tech Software Pvt. Ltd.',
    role: 'Software Development Engineer 2',
    location: 'Bhopal, India',
    startDate: '2024-04',
    endDate: null,
    current: true,
    description:
      'Promoted from Junior Software Developer to SDE-2 (Oct 2025). Building enterprise ERP products — Star Automation (React + Node.js + PostgreSQL) and Star Finance (Spring Boot + Hibernate). Working directly with enterprise clients on requirement gathering, issue resolution, and feature delivery.',
    highlights: [
      'Led full-stack development of Accounts Payable (AP) module — Voucher Cash Disbursement, Payment File Generation, Remittance, and Multi-Level Approver Workflow, improving finance team productivity by 45–50%',
      'Contributed to Star Finance ERP (Accounts Receivable, Cash Management, AP modules), improving workflow efficiency by 65–70%',
      'Optimized backend REST APIs and PostgreSQL queries — 35% faster response times and 30% reduction in database load',
      'Built and maintained React.js frontend and Node.js backend services integrated with PostgreSQL for enterprise clients',
      'Maintained 100% on-time release record while working directly with enterprise clients',
      'Proposed and implemented query and architecture optimization for multi-tenant deployments',
      'Followed Agile practices — sprint planning, standups, and reviews using Azure DevOps',
    ],
    techStack: ['Java', 'Spring Boot', 'React.js', 'Node.js', 'PostgreSQL', 'Hibernate', 'Azure DevOps'],
    order: 1,
  },
];

export const projects: Project[] = [
  {
    id: 1,
    title: 'Star Automation — Accounts Payable Module',
    description:
      'Enterprise AP module with Voucher Cash Disbursement, Payment File Generation, Remittance, and Multi-Level Approver Workflow.',
    longDesc:
      'Led full-stack development of the Accounts Payable module for Star Automation ERP. Built end-to-end finance workflows including voucher processing, payment file generation for banking systems, remittance tracking, and a configurable multi-level approval system. Improved finance team productivity by 45–50%.',
    imageUrl: null,
    demoUrl: null,
    githubUrl: null,
    techStack: ['React.js', 'Node.js', 'PostgreSQL', 'REST APIs'],
    featured: true,
    highlights: [
      'Multi-level approver workflow engine',
      'Payment file generation for banking systems',
      '45–50% improvement in finance team productivity',
    ],
    order: 1,
  },
  {
    id: 2,
    title: 'Star Finance ERP',
    description:
      'Enterprise finance ERP covering Accounts Receivable, Cash Management, and Accounts Payable modules.',
    longDesc:
      'Contributed to Star Finance ERP development across AR, Cash Management, and AP modules. Improved overall workflow efficiency by 65–70% through feature development and process automation. Optimized Hibernate queries and REST APIs for high-volume client transactions.',
    imageUrl: null,
    demoUrl: null,
    githubUrl: null,
    techStack: ['Java', 'Spring Boot', 'Hibernate', 'PostgreSQL', 'REST APIs'],
    featured: true,
    highlights: [
      '65–70% workflow efficiency improvement',
      '35% faster API response times',
      '30% reduction in database load',
    ],
    order: 2,
  },
  {
    id: 3,
    title: 'Spring Boot E-Commerce Web Application',
    description:
      'Monolithic E-Commerce platform with user management, product catalog, shopping cart, and order placement.',
    longDesc:
      'Developed a full E-Commerce platform with features like user management, product catalog, shopping cart, and order placement with stock checks. Implemented CRUD operations via JPA/Hibernate and optimized database performance with PostgreSQL.',
    imageUrl: null,
    demoUrl: null,
    githubUrl: 'https://github.com/HeyImAnuj',
    techStack: ['Java', 'Spring Boot', 'JPA', 'Hibernate', 'PostgreSQL', 'Docker'],
    featured: true,
    highlights: [
      'Complete e-commerce flow with stock validation',
      'JPA/Hibernate ORM with optimized queries',
      'Dockerized deployment',
    ],
    order: 3,
  },
  {
    id: 4,
    title: 'Developer Portfolio Website',
    description: 'This website — a modern interactive portfolio with contact form and live resume from Google Drive.',
    longDesc:
      'A responsive portfolio built with React, Node.js, and Tailwind CSS featuring animated UI, email contact form, and resume/photo served from Google Drive.',
    imageUrl: null,
    demoUrl: null,
    githubUrl: 'https://github.com/HeyImAnuj',
    techStack: ['React', 'Node.js', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
    featured: false,
    highlights: [
      'Fully responsive with animated transitions',
      'Contact form with email notifications',
      'Resume and photo from Google Drive',
    ],
    order: 4,
  },
];

export const education: Education[] = [
  {
    id: 1,
    institution: 'Maulana Azad National Institute of Technology (MANIT)',
    degree: 'Bachelor of Technology',
    field: 'Civil Engineering',
    startDate: '2019-07',
    endDate: '2023-06',
    gpa: '8.02 CGPA',
    highlights: [
      'National Institute of Technology, Bhopal',
      'Strong foundation in problem-solving and analytical thinking',
    ],
    order: 1,
  },
];

export const certifications: Certification[] = [
  {
    id: 1,
    name: 'Programming, Data Structures and Algorithms using Python',
    issuer: 'NPTEL',
    date: '2023',
    credentialUrl: null,
    order: 1,
  },
  {
    id: 2,
    name: 'RESTful Java Web Services using JAX-RS and Jersey',
    issuer: 'Udemy',
    date: '2023',
    credentialUrl: null,
    order: 2,
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
