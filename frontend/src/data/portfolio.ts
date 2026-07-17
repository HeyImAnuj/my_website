import type { Profile, Skill, Experience, Project, Education, Certification } from '../types';

export const profile: Profile = {
  id: 1,
  name: 'Anuj Patel',
  title: 'Software Development Engineer (SDE-2)',
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
  { id: 1, name: 'Java', category: 'Primary Stack', icon: 'java', order: 1 },
  { id: 2, name: 'Spring Boot', category: 'Primary Stack', icon: 'spring', order: 2 },
  { id: 3, name: 'React.js', category: 'Primary Stack', icon: 'react', order: 3 },
  { id: 4, name: 'Node.js', category: 'Primary Stack', icon: 'nodejs', order: 4 },
  { id: 5, name: 'JavaScript (ES6+)', category: 'Primary Stack', icon: 'javascript', order: 5 },
  { id: 6, name: 'Python', category: 'Primary Stack', icon: 'python', order: 6 },
  { id: 7, name: 'SQL', category: 'Primary Stack', icon: 'sql', order: 7 },
  { id: 8, name: 'HTML/CSS', category: 'Primary Stack', icon: 'html', order: 8 },
  { id: 9, name: 'Git & GitHub', category: 'Developer Tools', icon: 'git', order: 9 },
  { id: 10, name: 'Docker', category: 'Developer Tools', icon: 'docker', order: 10 },
  { id: 11, name: 'Postman', category: 'Developer Tools', icon: 'postman', order: 11 },
  { id: 12, name: 'Azure DevOps', category: 'Developer Tools', icon: 'azure', order: 12 },
  { id: 13, name: 'Linux/Unix', category: 'Developer Tools', icon: 'linux', order: 13 },
  { id: 14, name: 'VS Code', category: 'Developer Tools', icon: 'vscode', order: 14 },
  { id: 15, name: 'IntelliJ', category: 'Developer Tools', icon: 'intellij', order: 15 },
  { id: 16, name: 'Eclipse', category: 'Developer Tools', icon: 'eclipse', order: 16 },
  { id: 17, name: 'DSA', category: 'Domain Knowledge', icon: 'dsa', order: 17 },
  { id: 18, name: 'OOPS', category: 'Domain Knowledge', icon: 'oops', order: 18 },
  { id: 19, name: 'ERP Systems', category: 'Domain Knowledge', icon: 'erp', order: 19 },
  { id: 20, name: 'AP/AR Modules', category: 'Domain Knowledge', icon: 'finance', order: 20 },
  { id: 21, name: 'Payment File Banking Systems', category: 'Domain Knowledge', icon: 'banking', order: 21 },
  { id: 22, name: 'Agile/Scrum', category: 'Domain Knowledge', icon: 'agile', order: 22 },
  { id: 23, name: 'Microservices', category: 'Familiar With', icon: 'microservices', order: 23 },
  { id: 24, name: 'Operating Systems', category: 'Familiar With', icon: 'os', order: 24 },
  { id: 25, name: 'Low-Level Design', category: 'Familiar With', icon: 'lld', order: 25 },
  { id: 26, name: 'Algorithms', category: 'Familiar With', icon: 'algorithms', order: 26 },
  { id: 27, name: 'SOLID Principles', category: 'Familiar With', icon: 'solid', order: 27 },
  { id: 28, name: 'Design Patterns', category: 'Familiar With', icon: 'patterns', order: 28 },
];

export const experiences: Experience[] = [
  {
    id: 1,
    company: 'Star Tech Software Pvt. Ltd.',
    role: 'Software Development Engineer (SDE-2)',
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
    highlights: ['Bhopal, India'],
    order: 1,
  },
];

export const certifications: Certification[] = [
  {
    id: 1,
    name: 'Programming, Data Structures and Algorithms using Python',
    issuer: 'NPTEL',
    date: null,
    credentialUrl: null,
    order: 1,
  },
  {
    id: 2,
    name: 'RESTful Java Web Services using JAX-RS and Jersey',
    issuer: 'Udemy',
    date: null,
    credentialUrl: null,
    order: 2,
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
