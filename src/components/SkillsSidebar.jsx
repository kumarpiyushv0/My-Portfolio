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
import gemini from '../assets/google-gemini.png';

// Skills with experience ratings (1-5 stars)
const skillsWithRatings = [
    { src: java, alt: "JAVA", rating: 4 },
    { src: nodejs, alt: "Node.js", rating: 4 },
    { src: androidStudio, alt: "Android Studio", rating: 4 },
    { src: kotlin, alt: "Kotlin", rating: 4 },
    { src: mongodb, alt: "MongoDB", rating: 4 },
    { src: firebase, alt: "Firebase", rating: 3 },
    { src: mysql, alt: "MySQL", rating: 3 },
    { src: js, alt: "JavaScript", rating: 3 },
    { src: nginx, alt: "Nginx", rating: 2 },
    { src: reactIcon, alt: "React", rating: 2 },
    { src: docker, alt: "Docker", rating: 3 },
    { src: github, alt: "GitHub", rating: 5 },
    { src: postgresql, alt: "PostgreSQL", rating: 2 },
    { src: linux, alt: "Linux", rating: 4 },
    { src: gemini, alt: "Gemini AI", rating: 3 },
];

// Star rating component
const StarRating = ({ rating }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        stars.push(
            <span key={i} className={`star ${i <= rating ? 'filled' : 'empty'}`}>
                ★
            </span>
        );
    }
    return <div className="star-rating">{stars}</div>;
};

const SkillsSidebar = () => {
    return (
        <aside className="skills-sidebar">
            <div className="sidebar-content">
                {skillsWithRatings.map((skill, index) => (
                    <div key={index} className="sidebar-skill-item">
                        <div className="skill-icon">
                            <img src={skill.src} alt={skill.alt} title={skill.alt} />
                        </div>
                        <div className="skill-details">
                            <span className="skill-name">{skill.alt}</span>
                            <StarRating rating={skill.rating} />
                        </div>
                    </div>
                ))}
            </div>
        </aside>
    );
};

export default SkillsSidebar;
