import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Intro from './components/Intro';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SkillsSidebar from './components/SkillsSidebar';
import ThemeToggle from './components/ThemeToggle';
import { trackEvent, useSectionTracking } from './analytics';
import './index.css';

const PORTFOLIO_SECTIONS = [
  { id: 'hero', name: 'Hero Section' },
  { id: 'about', name: 'About Me' },
  { id: 'skills', name: 'Skills' },
  { id: 'projects', name: 'Projects' },
  { id: 'contact', name: 'Contact' },
  { id: 'footer', name: 'Footer' },
];

function App() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState('dark');

  useSectionTracking(loading ? [] : PORTFOLIO_SECTIONS);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
      trackEvent('portfolio_loaded', {
        initial_load_delay_ms: 2000,
      });
    }, 2000);

    // Mouse move effect
    const handleMouseMove = (e) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    document.body.className = theme === 'light' ? 'light-mode' : '';
  }, [theme]);

  return (
    <div className="App">
      {loading ? (
        <Intro />
      ) : (
        <>
          <SkillsSidebar />
          <Header />
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          <div className="intro-container">
            <Hero />
            <About />
          </div>
          <Skills />
          <Projects />
          <Contact />
          <Footer />
        </>
      )
      }
    </div >
  );
}

export default App;
