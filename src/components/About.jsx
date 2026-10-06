import React from 'react';

const RESUME_URL = "https://ixereoqdgdptfaooscrq.supabase.co/storage/v1/object/public/resume/My_resume.pdf";

const About = () => {
  return (
    <section id="about" className="about">
      <h2>About Me</h2>
      <h3>
        Hi! I'm an app developer building Apps and websites using various languages, tools and frameworks since 2023.
        I specialize in android app development as well as backend web development and I love bringing ideas to life.
        These are some of my works i have done in past years.
      </h3>
      <a
        href={RESUME_URL}
        download="Piyush_Kumar_Resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="resume-btn"
      >
        View Resume
      </a>
    </section>
  );
};

export default About;
