import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ASSETS } from '../assets';
import { trackEvent, trackButtonClick } from '../analytics';

const projects = [
    {
        title: "Garuda",
        image: ASSETS.garuda,
        link: "https://github.com/kumarpiyushv0/Garuda",
        description: "A personal safety application designed to provide peace of mind and immediate assistance in emergencies. It features Instant SOS Alerts, Real-Time Location Sharing, Discreet Audio Recording, and Voice Activation to ensure your loved ones know you're safe.",
        tech: [ASSETS.kotlin, ASSETS.androidStudio, ASSETS.firebase, ASSETS.googleGemini, ASSETS.github],
        isFeatured: true
    },
    {
        title: "News App",
        image: ASSETS.newsApp,
        link: "https://github.com/kumarpiyushv0/News",
        description: "A cutting-edge news application engineered with Kotlin and Jetpack Compose, following the MVVM architecture for robust performance. It features dynamic country-based news selection, immersive article views, and a highly responsive UI. The app leverages Retrofit for efficient API integration and Room database for offline caching, ensuring a seamless user experience even with intermittent connectivity.",
        tech: [ASSETS.kotlin, ASSETS.androidStudio, ASSETS.github],
        isFeatured: true
    },
    {
        title: "DoomShield",
        image: ASSETS.doomShield,
        link: "https://github.com/kumarpiyushv0/Doom-Shield",
        description: "A comprehensive digital wellbeing ecosystem built to combat doomscrolling and promote healthier digital habits. Developed using Kotlin and Jetpack Compose, it features intelligent scrolling detection algorithms, real-time intervention alerts, and a dedicated wellbeing hub. Users can access breathing exercises, mood tracking, and detailed usage analytics to regain control over their screen time.",
        tech: [ASSETS.kotlin, ASSETS.androidStudio, ASSETS.github],
        isFeatured: true
    },
    {
        title: "The Car Dealership",
        image: ASSETS.carDealership,
        link: "https://the-car-dealership-eadx.onrender.com/",
        description: "A full-stack web platform transforming local car dealerships into a digital marketplace. Built with Node.js and MongoDB, it offers a seamless inventory management system, advanced search filtering for customers, and a secure booking interface. The application streamlines the car buying process, bridging the gap between traditional sales and modern e-commerce.",
        tech: [ASSETS.mongodb, ASSETS.nodejs, ASSETS.js, ASSETS.github]
    },
    {
        title: "Movie Rating & Progress Tracker",
        image: ASSETS.movieApp,
        link: "https://use-popcorn-delta-jade.vercel.app/",
        description: "An interactive movie tracking application designed for film enthusiasts. Developed with React, it allows users to rate movies, track their watch history, and view real-time analytics on their viewing habits. The app features a dynamic search interface, personalized watchlists, and instant rating calculations to enhance the movie-watching journey.",
        tech: [ASSETS.react, ASSETS.js, ASSETS.github]
    },
    {
        title: "Traveling Items Tracker & To-Do List",
        image: ASSETS.travelTracker,
        link: "https://travel-list-orpin-phi.vercel.app/",
        description: "A smart travel companion app that ensures you never forget an essential item. Built with React and Node.js, it features a dynamic packing list with category sorting, progress tracking, and persistent storage. The intuitive interface helps travelers organize their trips efficiently, reducing packing stress and ensuring a smooth journey.",
        tech: [ASSETS.react, ASSETS.mongodb, ASSETS.nodejs, ASSETS.github]
    },
    {
        title: "Intellipark Multilevel Parking",
        image: ASSETS.mlp,
        link: "https://github.com/kumarpiyushv0/Multilevel_Parking_Kiosk",
        description: "An intelligent parking management system developed in Java, utilizing advanced data structures for optimal space allocation. It features a graphical Swing UI for easy interaction, Dijkstra’s algorithm for finding the nearest parking spot, and a robust MySQL backend for user management. This solution modernizes traditional parking facilities with automation and efficiency.",
        tech: [ASSETS.java, ASSETS.mysql, ASSETS.github]
    },
    {
        title: "Weather API Integration",
        image: ASSETS.weatherApp,
        link: "https://kumarpiyushv0.github.io/livetimer/",
        description: "A lightweight, high-performance weather dashboard that delivers real-time meteorological data. By integrating with global weather APIs, it provides accurate forecasts based on user geolocation. The application is optimized for speed and reliability, hosted on AWS EC2 with NGINX to ensure high availability and fast load times.",
        tech: [ASSETS.nginx, ASSETS.github]
    }
];

const Projects = () => {
    const featuredProjects = projects.filter(project => project.isFeatured);
    const regularProjects = projects.filter(project => !project.isFeatured);
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextProject = () => {
        const nextIdx = (currentIndex + 1) % regularProjects.length;
        trackButtonClick('btn-carousel-next', 'Carousel Next Project', {
            target_project: regularProjects[nextIdx].title,
            target_index: nextIdx,
        });
        setCurrentIndex(nextIdx);
    };

    const prevProject = () => {
        const prevIdx = (currentIndex - 1 + regularProjects.length) % regularProjects.length;
        trackButtonClick('btn-carousel-prev', 'Carousel Previous Project', {
            target_project: regularProjects[prevIdx].title,
            target_index: prevIdx,
        });
        setCurrentIndex(prevIdx);
    };

    return (
        <section id="projects" data-analytics-section="projects" className="projects-section">
            <h2>Projects</h2><br />

            <div className="featured-projects">
                {featuredProjects.map((project, index) => {
                    const btnId = `btn-featured-project-${project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
                    return (
                        <motion.div
                            className={`project project--featured ${index % 2 !== 0 ? 'reverse' : ''}`}
                            key={`featured-${index}`}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            onMouseMove={(e) => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                const x = e.clientX - rect.left;
                                const y = e.clientY - rect.top;
                                e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
                                e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
                            }}
                        >
                            <div className="spotlight-overlay"></div>
                            <section className="project_photo">
                                <a
                                    id={btnId}
                                    name={`featured-project-${project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                                    data-analytics-id={btnId}
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => trackButtonClick(btnId, `Featured Project: ${project.title}`, {
                                        project_title: project.title,
                                        destination_url: project.link,
                                        source: 'featured_gallery',
                                    })}
                                >
                                    <img src={project.image} alt={project.title} className="project__photo" />
                                </a>
                            </section>
                            <div className="project__content">
                                <h3>{project.title}</h3>
                                <p>{project.description}</p>
                                <div className="project-tech-icons">
                                    {project.tech.map((icon, i) => (
                                        <img key={i} src={icon} alt="Tech" />
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            <div className="carousel-3d-container">
                <div className="carousel-track">
                    {regularProjects.map((project, index) => {
                        let position = 'hidden';
                        if (index === currentIndex) position = 'active';
                        else if (index === (currentIndex - 1 + regularProjects.length) % regularProjects.length) position = 'prev';
                        else if (index === (currentIndex + 1) % regularProjects.length) position = 'next';

                        const cardId = `btn-carousel-card-${project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

                        return (
                            <div
                                key={index}
                                id={cardId}
                                name={`carousel-card-${project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                                data-analytics-id={cardId}
                                className={`carousel-card ${position}`}
                                onClick={() => {
                                    if (index === currentIndex) {
                                        trackButtonClick(cardId, `Active Carousel Project: ${project.title}`, {
                                            project_title: project.title,
                                            destination_url: project.link,
                                            source: 'project_carousel',
                                        });
                                        window.open(project.link, '_blank');
                                    } else {
                                        trackButtonClick(cardId, `Select Carousel Project: ${project.title}`, {
                                            project_title: project.title,
                                            source: 'project_carousel',
                                        });
                                        setCurrentIndex(index);
                                    }
                                }}
                            >
                                <div className="card-image-wrapper">
                                    <img src={project.image} alt={project.title} className="project__photo" />
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="carousel-controls">
                    <button
                        id="btn-carousel-prev"
                        name="carousel-previous-button"
                        data-analytics-id="btn-carousel-prev"
                        className="carousel-btn prev"
                        onClick={prevProject}
                    >
                        &#10094;
                    </button>
                    <button
                        id="btn-carousel-next"
                        name="carousel-next-button"
                        data-analytics-id="btn-carousel-next"
                        className="carousel-btn next"
                        onClick={nextProject}
                    >
                        &#10095;
                    </button>
                </div>
            </div>

            <div className="project-details fade-in" key={currentIndex}>
                <h3>{regularProjects[currentIndex].title}</h3>
                <p>{regularProjects[currentIndex].description}</p>
                <div className="project-tech-icons">
                    {regularProjects[currentIndex].tech.map((icon, i) => (
                        <img key={i} src={icon} alt="Tech" />
                    ))}
                </div>
            </div>

            <div className="carousel-indicators">
                {regularProjects.map((project, index) => {
                    const dotId = `btn-carousel-dot-${index}`;
                    return (
                        <span
                            key={index}
                            id={dotId}
                            name={`carousel-indicator-${index}`}
                            data-analytics-id={dotId}
                            className={`indicator ${index === currentIndex ? 'active' : ''}`}
                            onClick={() => {
                                trackButtonClick(dotId, `Carousel Indicator: ${project.title}`, {
                                    target_project: project.title,
                                    target_index: index,
                                });
                                setCurrentIndex(index);
                            }}
                        ></span>
                    );
                })}
            </div>
        </section>
    );
};

export default Projects;
