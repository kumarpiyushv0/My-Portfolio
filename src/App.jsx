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
import './index.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
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
          <Header theme={theme} toggleTheme={toggleTheme} />
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
