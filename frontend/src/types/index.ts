export interface Profile {
  id: number;
  name: string;
  title: string;
  tagline: string;
  bio: string;
  email: string;
  phone: string | null;
  location: string;
  github: string | null;
  linkedin: string | null;
  twitter: string | null;
  resumeUrl: string | null;
  avatarUrl: string | null;
  yearsExp: number;
}

export interface Skill {
  id: number;
  name: string;
  category: string;
  icon: string | null;
  order: number;
}

export interface Experience {
  id: number;
  company: string;
  role: string;
  location: string | null;
  startDate: string;
  endDate: string | null;
  current: boolean;
  description: string;
  highlights: string[];
  techStack: string[];
  order: number;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  longDesc: string | null;
  imageUrl: string | null;
  demoUrl: string | null;
  githubUrl: string | null;
  techStack: string[];
  featured: boolean;
  highlights: string[];
  order: number;
}

export interface Education {
  id: number;
  institution: string;
  degree: string;
  field: string | null;
  startDate: string;
  endDate: string | null;
  gpa: string | null;
  highlights: string[];
  order: number;
}

export interface Certification {
  id: number;
  name: string;
  issuer: string;
  date: string | null;
  credentialUrl: string | null;
  order: number;
}

export interface ContactForm {
  name: string;
  email: string;
  subject?: string;
  message: string;
}
