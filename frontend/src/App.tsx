import { useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { ExperienceSection } from './components/Experience';
import { Projects } from './components/Projects';
import { EducationSection } from './components/Education';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { useActiveSection } from './hooks/useFetch';
import { resolveApiUrl } from './lib/api';
import {
  profile,
  skills,
  experiences,
  featuredProjects,
  education,
  certifications,
} from './data/portfolio';

const SECTIONS = ['about', 'skills', 'experience', 'projects', 'education', 'contact'];

export default function App() {
  const activeSection = useActiveSection(SECTIONS);

  const portfolioProfile = useMemo(
    () => ({
      ...profile,
      resumeUrl: resolveApiUrl('/api/assets/resume'),
      avatarUrl: resolveApiUrl('/api/assets/avatar'),
    }),
    []
  );

  return (
    <>
      <Navbar activeSection={activeSection} name={portfolioProfile.name} />
      <main>
        <Hero profile={portfolioProfile} />
        <About profile={portfolioProfile} />
        <Skills skills={skills} />
        <ExperienceSection experiences={experiences} />
        <Projects projects={featuredProjects} />
        <EducationSection education={education} certifications={certifications} />
        <Contact />
      </main>
      <Footer name={portfolioProfile.name} />
    </>
  );
}
