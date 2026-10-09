import React from 'react';
import { ASSETS } from '../assets';

const skills = [
    { src: ASSETS.java, alt: "JAVA" },
    { src: ASSETS.nodejs, alt: "Node.js" },
    { src: ASSETS.react, alt: "React" },
    { src: ASSETS.mongodb, alt: "MongoDB" },
    { src: ASSETS.mysql, alt: "MySQL" },
    { src: ASSETS.js, alt: "JavaScript" },
    { src: ASSETS.nginx, alt: "Nginx" },
    { src: ASSETS.docker, alt: "Docker" },
    { src: ASSETS.github, alt: "GitHub" },
    { src: ASSETS.postgresql, alt: "PostgreSQL" },
    { src: ASSETS.linux, alt: "Linux" },
    { src: ASSETS.kotlin, alt: "Kotlin" },
    { src: ASSETS.androidStudio, alt: "Android Studio" },
    { src: ASSETS.firebase, alt: "Firebase" },
];

const Skills = () => {
    return (
        <div id="skills" data-analytics-section="skills" className="skills-marquee">
            <h2>Skills</h2><br />
            <div className="marquee">
                <div className="marquee-content">
                    {skills.map((skill, index) => (
                        <img key={index} src={skill.src} alt={skill.alt} title={skill.alt} />
                    ))}
                </div>
                <div className="marquee-content">
                    {skills.map((skill, index) => (
                        <img key={`duplicate-${index}`} src={skill.src} alt={skill.alt} title={skill.alt} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Skills;
