import React from 'react';
import java from '../assets/java.png';
import nodejs from '../assets/node-js.png';
import reactIcon from '../assets/react.png';
import mongodb from '../assets/mongodb.png';
import mysql from '../assets/mysql.png';
import js from '../assets/js.png';
import nginx from '../assets/nginx.png';
import docker from '../assets/docker.png';
import github from '../assets/github.png';
import postgresql from '../assets/postgresql.png';
import linux from '../assets/Linux.png';
import kotlin from '../assets/Kotlin.png';
import androidStudio from '../assets/androidStudio.png';
import firebase from '../assets/firebase.png';

const skills = [
    { src: java, alt: "JAVA" },
    { src: nodejs, alt: "Node.js" },
    { src: reactIcon, alt: "React" },
    { src: mongodb, alt: "MongoDB" },
    { src: mysql, alt: "MySQL" },
    { src: js, alt: "JavaScript" },
    { src: nginx, alt: "Nginx" },
    { src: docker, alt: "Docker" },
    { src: github, alt: "GitHub" },
    { src: postgresql, alt: "PostgreSQL" },
    { src: linux, alt: "Linux" },
    { src: kotlin, alt: "Kotlin" },
    { src: androidStudio, alt: "Android Studio" },
    { src: firebase, alt: "Firebase" },
];

const Skills = () => {
    return (
        <div id="skills" className="skills-marquee">
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
