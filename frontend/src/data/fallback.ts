import type { Profile, Skill, Experience, Project, Education, Certification } from '../types';

export const fallbackProfile: Profile = {
  id: 1,
  name: 'Anuj Patel',
  title: 'Software Development Engineer 2',
  tagline: 'Full-stack developer building enterprise ERP & finance automation systems',
  bio: `I'm a Software Development Engineer 2 at Star Tech Software with 2+ years of experience building and maintaining enterprise ERP applications. I specialize in Java, Spring Boot, React.js, Node.js, and PostgreSQL, with a strong track record of delivering client-facing features, optimizing APIs, and improving workflow efficiency in finance and automation systems.`,
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

export const fallbackSkills: Skill[] = [
  { id: 1, name: 'Java', category: 'Languages', level: 92, icon: null, order: 1 },
  { id: 2, name: 'React.js', category: 'Frontend', level: 92, icon: null, order: 2 },
  { id: 3, name: 'Spring Boot', category: 'Backend', level: 92, icon: null, order: 3 },
  { id: 4, name: 'Node.js', category: 'Backend', level: 88, icon: null, order: 4 },
  { id: 5, name: 'PostgreSQL', category: 'Database', level: 90, icon: null, order: 5 },
  { id: 6, name: 'JavaScript', category: 'Languages', level: 90, icon: null, order: 6 },
  { id: 7, name: 'Python', category: 'Languages', level: 82, icon: null, order: 7 },
  { id: 8, name: 'Docker', category: 'Developer Tools', level: 78, icon: null, order: 8 },
  { id: 9, name: 'Azure DevOps', category: 'Developer Tools', level: 85, icon: null, order: 9 },
  { id: 10, name: 'ERP Systems', category: 'Domain', level: 90, icon: null, order: 10 },
];

export const fallbackExperience: Experience[] = [
  {
    id: 1,
    company: 'Star Tech Software Pvt. Ltd.',
    role: 'Software Development Engineer 2',
    location: 'Bhopal, India',
    startDate: '2024-04',
    endDate: null,
    current: true,
    description:
      'Promoted from Junior Software Developer to SDE-2 (Oct 2025). Building Star Automation and Star Finance ERP products for enterprise clients.',
    highlights: [
      'Led AP module development — 45–50% productivity improvement',
      'Optimized APIs — 35% faster response, 30% less DB load',
      '100% on-time release record with enterprise clients',
    ],
    techStack: ['Java', 'Spring Boot', 'React.js', 'Node.js', 'PostgreSQL', 'Azure DevOps'],
    order: 1,
  },
];

export const fallbackProjects: Project[] = [
  {
    id: 1,
    title: 'Star Automation — Accounts Payable Module',
    description: 'Enterprise AP module with payment file generation, remittance, and multi-level approver workflow.',
    longDesc: 'Led full-stack development of the Accounts Payable module for Star Automation ERP, improving finance team productivity by 45–50%.',
    imageUrl: null,
    demoUrl: null,
    githubUrl: null,
    techStack: ['React.js', 'Node.js', 'PostgreSQL'],
    featured: true,
    highlights: ['Multi-level approver workflow', 'Payment file generation', '45–50% productivity gain'],
    order: 1,
  },
  {
    id: 2,
    title: 'Spring Boot E-Commerce Web Application',
    description: 'E-Commerce platform with user management, product catalog, shopping cart, and order placement.',
    longDesc: null,
    imageUrl: null,
    demoUrl: null,
    githubUrl: 'https://github.com/HeyImAnuj',
    techStack: ['Java', 'Spring Boot', 'JPA', 'PostgreSQL', 'Docker'],
    featured: true,
    highlights: ['Stock validation on orders', 'JPA/Hibernate ORM', 'Dockerized'],
    order: 2,
  },
];

export const fallbackEducation: Education[] = [
  {
    id: 1,
    institution: 'Maulana Azad National Institute of Technology (MANIT)',
    degree: 'Bachelor of Technology',
    field: 'Civil Engineering',
    startDate: '2019-07',
    endDate: '2023-06',
    gpa: '8.02 CGPA',
    highlights: ['NIT Bhopal', 'Strong analytical & problem-solving foundation'],
    order: 1,
  },
];

export const fallbackCertifications: Certification[] = [
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
