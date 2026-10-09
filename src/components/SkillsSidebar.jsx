import React from 'react';
import { ASSETS } from '../assets';
import { trackButtonClick } from '../analytics';

// Skills with experience ratings (1-5 stars)
const skillsWithRatings = [
    { src: ASSETS.java, alt: "JAVA", rating: 4 },
    { src: ASSETS.nodejs, alt: "Node.js", rating: 4 },
    { src: ASSETS.androidStudio, alt: "Android Studio", rating: 4 },
    { src: ASSETS.kotlin, alt: "Kotlin", rating: 4 },
    { src: ASSETS.mongodb, alt: "MongoDB", rating: 4 },
    { src: ASSETS.firebase, alt: "Firebase", rating: 3 },
    { src: ASSETS.mysql, alt: "MySQL", rating: 3 },
    { src: ASSETS.js, alt: "JavaScript", rating: 3 },
    { src: ASSETS.nginx, alt: "Nginx", rating: 2 },
    { src: ASSETS.react, alt: "React", rating: 2 },
    { src: ASSETS.docker, alt: "Docker", rating: 3 },
    { src: ASSETS.github, alt: "GitHub", rating: 5 },
    { src: ASSETS.postgresql, alt: "PostgreSQL", rating: 2 },
    { src: ASSETS.linux, alt: "Linux", rating: 4 },
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
        <aside id="sidebar-skills" data-analytics-section="skills-sidebar" className="skills-sidebar">
            <div className="sidebar-content">
                {skillsWithRatings.map((skill, index) => {
                    const skillId = `skill-sidebar-${skill.alt.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
                    return (
                        <div
                            key={index}
                            id={skillId}
                            name={`skill-sidebar-${skill.alt.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                            data-analytics-id={skillId}
                            className="sidebar-skill-item"
                            onClick={() => trackButtonClick(skillId, `Sidebar Skill: ${skill.alt}`, {
                                skill_name: skill.alt,
                                rating: skill.rating,
                            })}
                        >
                            <div className="skill-icon">
                                <img src={skill.src} alt={skill.alt} title={skill.alt} />
                            </div>
                            <div className="skill-details">
                                <span className="skill-name">{skill.alt}</span>
                                <StarRating rating={skill.rating} />
                            </div>
                        </div>
                    );
                })}
            </div>
        </aside>
    );
};

export default SkillsSidebar;
