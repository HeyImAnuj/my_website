import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const existingProfile = await prisma.profile.findFirst();
  if (existingProfile) {
    console.log('Database already has data — skipping seed.');
    return;
  }

  await prisma.contactMessage.deleteMany();
  await prisma.certification.deleteMany();
  await prisma.education.deleteMany();
  await prisma.project.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.profile.deleteMany();

  await prisma.profile.create({
    data: {
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
      yearsExp: 2,
    },
  });

  const skills = [
    { name: 'Java', category: 'Languages', level: 92, icon: 'java', order: 1 },
    { name: 'JavaScript (ES6+)', category: 'Languages', level: 90, icon: 'javascript', order: 2 },
    { name: 'Python', category: 'Languages', level: 82, icon: 'python', order: 3 },
    { name: 'SQL', category: 'Languages', level: 88, icon: 'sql', order: 4 },
    { name: 'HTML/CSS', category: 'Frontend', level: 90, icon: 'html', order: 5 },
    { name: 'React.js', category: 'Frontend', level: 92, icon: 'react', order: 6 },
    { name: 'Spring Boot', category: 'Backend', level: 92, icon: 'spring', order: 7 },
    { name: 'Node.js', category: 'Backend', level: 88, icon: 'nodejs', order: 8 },
    { name: 'Hibernate/JPA', category: 'Backend', level: 85, icon: 'hibernate', order: 9 },
    { name: 'REST APIs', category: 'Backend', level: 90, icon: 'api', order: 10 },
    { name: 'PostgreSQL', category: 'Database', level: 90, icon: 'postgresql', order: 11 },
    { name: 'Git/GitHub', category: 'Developer Tools', level: 92, icon: 'git', order: 12 },
    { name: 'Docker', category: 'Developer Tools', level: 78, icon: 'docker', order: 13 },
    { name: 'Azure DevOps', category: 'Developer Tools', level: 85, icon: 'azure', order: 14 },
    { name: 'Postman', category: 'Developer Tools', level: 88, icon: 'postman', order: 15 },
    { name: 'Linux/Unix', category: 'Developer Tools', level: 80, icon: 'linux', order: 16 },
    { name: 'ERP Systems', category: 'Domain', level: 90, icon: 'erp', order: 17 },
    { name: 'Agile/Scrum', category: 'Domain', level: 88, icon: 'agile', order: 18 },
    { name: 'Microservices', category: 'Architecture', level: 75, icon: 'microservices', order: 19 },
    { name: 'Design Patterns', category: 'Architecture', level: 82, icon: 'patterns', order: 20 },
  ];

  await prisma.skill.createMany({ data: skills });

  await prisma.experience.createMany({
    data: [
      {
        company: 'Star Tech Software Pvt. Ltd.',
        role: 'Software Development Engineer 2',
        location: 'Bhopal, India',
        startDate: '2024-04',
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
    ],
  });

  await prisma.project.createMany({
    data: [
      {
        title: 'Star Automation — Accounts Payable Module',
        description:
          'Enterprise AP module with Voucher Cash Disbursement, Payment File Generation, Remittance, and Multi-Level Approver Workflow.',
        longDesc:
          'Led full-stack development of the Accounts Payable module for Star Automation ERP. Built end-to-end finance workflows including voucher processing, payment file generation for banking systems, remittance tracking, and a configurable multi-level approval system. Improved finance team productivity by 45–50%.',
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
        title: 'Star Finance ERP',
        description:
          'Enterprise finance ERP covering Accounts Receivable, Cash Management, and Accounts Payable modules.',
        longDesc:
          'Contributed to Star Finance ERP development across AR, Cash Management, and AP modules. Improved overall workflow efficiency by 65–70% through feature development and process automation. Optimized Hibernate queries and REST APIs for high-volume client transactions.',
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
        title: 'Spring Boot E-Commerce Web Application',
        description:
          'Monolithic E-Commerce platform with user management, product catalog, shopping cart, and order placement.',
        longDesc:
          'Developed a full E-Commerce platform with features like user management, product catalog, shopping cart, and order placement with stock checks. Implemented CRUD operations via JPA/Hibernate and optimized database performance with PostgreSQL.',
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
        title: 'Developer Portfolio Website',
        description:
          'This website — a full-stack portfolio with dynamic content managed via PostgreSQL.',
        longDesc:
          'A modern interactive portfolio built with React, Node.js, and PostgreSQL featuring animated UI, contact form, and CMS-like backend for content management.',
        githubUrl: 'https://github.com/HeyImAnuj',
        techStack: ['React', 'Node.js', 'PostgreSQL', 'Prisma', 'Tailwind CSS', 'Framer Motion'],
        featured: false,
        highlights: [
          'Fully responsive with animated transitions',
          'Contact form with backend persistence',
          'Dynamic content from PostgreSQL',
        ],
        order: 4,
      },
    ],
  });

  await prisma.education.createMany({
    data: [
      {
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
    ],
  });

  await prisma.certification.createMany({
    data: [
      {
        name: 'Programming, Data Structures and Algorithms using Python',
        issuer: 'NPTEL',
        date: '2023',
        order: 1,
      },
      {
        name: 'RESTful Java Web Services using JAX-RS and Jersey',
        issuer: 'Udemy',
        date: '2023',
        order: 2,
      },
    ],
  });

  console.log('Database seeded successfully with Anuj Patel\'s profile!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
