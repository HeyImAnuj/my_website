import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { ExperienceSection } from './components/Experience';
import { Projects } from './components/Projects';
import { EducationSection } from './components/Education';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AmbientCursor } from './components/AmbientCursor';
import { ScrollNinjas } from './components/ScrollNinjas';
import { MusicToggle } from './components/MusicToggle';
import { useActiveSection } from './hooks/useFetch';
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
  const portfolioProfile = profile;

  return (
    <>
      <AmbientCursor />
      <ScrollNinjas />
      <MusicToggle />
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
