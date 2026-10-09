import React from 'react';
import { trackEvent } from '../analytics';

const RESUME_URL = "https://ixereoqdgdptfaooscrq.supabase.co/storage/v1/object/public/resume/My_resume.pdf";

const About = () => {
  return (
    <section id="about" className="about">
      <h2>About Me</h2>
      <h3>
        Hi! Being an app developer, i am building Apps and websites using various languages, tools and frameworks since 2023.
        I specialize in <strong>mobile app development</strong> as well as <strong>backend development</strong> and I love bringing ideas to life.
        These are some of my works i have done in past years.
      </h3>
      <a
        href={RESUME_URL}
        download="Piyush_Kumar_Resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="resume-btn"
        onClick={() => trackEvent('resume_download_clicked')}
      >
        View Resume
      </a>
    </section>
  );
};

export default About;
