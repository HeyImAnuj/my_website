import { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { ExperienceSection } from './components/Experience';
import { Projects } from './components/Projects';
import { EducationSection } from './components/Education';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { LoadingScreen, ErrorScreen } from './components/LoadingScreen';
import { useActiveSection } from './hooks/useFetch';
import { api } from './lib/api';
import {
  fallbackProfile,
  fallbackSkills,
  fallbackExperience,
  fallbackProjects,
  fallbackEducation,
  fallbackCertifications,
} from './data/fallback';
import type { Profile, Skill, Experience, Project, Education, Certification } from './types';

const SECTIONS = ['about', 'skills', 'experience', 'projects', 'education', 'contact'];

export default function App() {
  const activeSection = useActiveSection(SECTIONS);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);

  useEffect(() => {
    Promise.all([
      api.getProfile(),
      api.getSkills(),
      api.getExperience(),
      api.getProjects(true),
      api.getEducation(),
      api.getCertifications(),
    ])
      .then(([p, s, e, pr, ed, c]) => {
        setProfile(p);
        setSkills(s);
        setExperiences(e);
        setProjects(pr);
        setEducation(ed);
        setCertifications(c);
      })
      .catch(() => {
        setProfile(fallbackProfile);
        setSkills(fallbackSkills);
        setExperiences(fallbackExperience);
        setProjects(fallbackProjects);
        setEducation(fallbackEducation);
        setCertifications(fallbackCertifications);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingScreen />;
  if (!profile) return <ErrorScreen message="Profile not found" />;

  return (
    <>
      <Navbar activeSection={activeSection} name={profile.name} />
      <main>
        <Hero profile={profile} />
        <About profile={profile} />
        <Skills skills={skills} />
        <ExperienceSection experiences={experiences} />
        <Projects projects={projects} />
        <EducationSection education={education} certifications={certifications} />
        <Contact />
      </main>
      <Footer name={profile.name} />
    </>
  );
}
