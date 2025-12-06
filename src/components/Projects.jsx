import React, { useState } from 'react';
import carDealership from '../assets/image3.png';
import movieApp from '../assets/image.png';
import travelTracker from '../assets/image2.png';
import mlp from '../assets/MLP.png';
import weatherApp from '../assets/image4.png';
import doomShield from '../assets/image5.png';
import newsApp from '../assets/image6.jpg';

// Tech icons
import mongodb from '../assets/mongodb.png';
import nodejs from '../assets/node-js.png';
import js from '../assets/js.png';
import github from '../assets/github.png';
import reactIcon from '../assets/react.png';
import java from '../assets/java.png';
import mysql from '../assets/mysql.png';
import nginx from '../assets/nginx.png';
import kotlin from '../assets/Kotlin.png';
import androidStudio from '../assets/androidStudio.png';
import firebase from '../assets/firebase.png';
import gemini from '../assets/google-gemini.png';
import garuda from '../assets/garuda_cover.png';

const projects = [
    {
        title: "Garuda",
        image: garuda,
        link: "https://github.com/kumarpiyushv0/Garuda",
        description: "A personal safety application designed to provide peace of mind and immediate assistance in emergencies. It features Instant SOS Alerts, Real-Time Location Sharing, Discreet Audio Recording, and Voice Activation to ensure your loved ones know you're safe.",
        tech: [kotlin, androidStudio, firebase, gemini, github],
        isFeatured: true
    },
    {
        title: "News App",
        image: newsApp,
        link: "https://github.com/kumarpiyushv0/News",
        description: "A cutting-edge news application engineered with Kotlin and Jetpack Compose, following the MVVM architecture for robust performance. It features dynamic country-based news selection, immersive article views, and a highly responsive UI. The app leverages Retrofit for efficient API integration and Room database for offline caching, ensuring a seamless user experience even with intermittent connectivity.",
        tech: [kotlin, androidStudio, github],
        isFeatured: true
    },
    {
        title: "DoomShield",
        image: doomShield,
        link: "https://github.com/kumarpiyushv0/Doom-Shield",
        description: "A comprehensive digital wellbeing ecosystem built to combat doomscrolling and promote healthier digital habits. Developed using Kotlin and Jetpack Compose, it features intelligent scrolling detection algorithms, real-time intervention alerts, and a dedicated wellbeing hub. Users can access breathing exercises, mood tracking, and detailed usage analytics to regain control over their screen time.",
        tech: [kotlin, androidStudio, github],
        isFeatured: true
    },
    {
        title: "The Car Dealership",
        image: carDealership,
        link: "https://the-car-dealership-eadx.onrender.com/",
        description: "A full-stack web platform transforming local car dealerships into a digital marketplace. Built with Node.js and MongoDB, it offers a seamless inventory management system, advanced search filtering for customers, and a secure booking interface. The application streamlines the car buying process, bridging the gap between traditional sales and modern e-commerce.",
        tech: [mongodb, nodejs, js, github]
    },
    {
        title: "Movie Rating & Progress Tracker",
        image: movieApp,
        link: "https://use-popcorn-delta-jade.vercel.app/",
        description: "An interactive movie tracking application designed for film enthusiasts. Developed with React, it allows users to rate movies, track their watch history, and view real-time analytics on their viewing habits. The app features a dynamic search interface, personalized watchlists, and instant rating calculations to enhance the movie-watching journey.",
        tech: [reactIcon, js, github]
    },
    {
        title: "Traveling Items Tracker & To-Do List",
        image: travelTracker,
        link: "https://travel-list-orpin-phi.vercel.app/",
        description: "A smart travel companion app that ensures you never forget an essential item. Built with React and Node.js, it features a dynamic packing list with category sorting, progress tracking, and persistent storage. The intuitive interface helps travelers organize their trips efficiently, reducing packing stress and ensuring a smooth journey.",
        tech: [reactIcon, mongodb, nodejs, github]
    },
    {
        title: "Intellipark Multilevel Parking",
        image: mlp,
        link: "https://github.com/kumarpiyushv0/Multilevel_Parking_Kiosk",
        description: "An intelligent parking management system developed in Java, utilizing advanced data structures for optimal space allocation. It features a graphical Swing UI for easy interaction, Dijkstra’s algorithm for finding the nearest parking spot, and a robust MySQL backend for user management. This solution modernizes traditional parking facilities with automation and efficiency.",
        tech: [java, mysql, github]
    },
    {
        title: "Weather API Integration",
        image: weatherApp,
        link: "https://kumarpiyushv0.github.io/livetimer/",
        description: "A lightweight, high-performance weather dashboard that delivers real-time meteorological data. By integrating with global weather APIs, it provides accurate forecasts based on user geolocation. The application is optimized for speed and reliability, hosted on AWS EC2 with NGINX to ensure high availability and fast load times.",
        tech: [nginx, github]
    }
];

const Projects = () => {
    const featuredProjects = projects.filter(project => project.isFeatured);
    const regularProjects = projects.filter(project => !project.isFeatured);
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextProject = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % regularProjects.length);
    };

    const prevProject = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + regularProjects.length) % regularProjects.length);
    };

    return (
        <section id="projects" className="projects-section">
            <h2>Projects</h2><br />

            <div className="featured-projects">
                {featuredProjects.map((project, index) => (
                    <div className={`project project--featured ${index % 2 !== 0 ? 'reverse' : ''}`} key={`featured-${index}`}>
                        <section className="project_photo">
                            <a href={project.link} target="_blank" rel="noopener noreferrer">
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
                    </div>
                ))}
            </div>

            <div className="carousel-3d-container">
                <div className="carousel-track">
                    {regularProjects.map((project, index) => {
                        let position = 'hidden';
                        if (index === currentIndex) position = 'active';
                        else if (index === (currentIndex - 1 + regularProjects.length) % regularProjects.length) position = 'prev';
                        else if (index === (currentIndex + 1) % regularProjects.length) position = 'next';

                        return (
                            <div
                                key={index}
                                className={`carousel-card ${position}`}
                                onClick={() => {
                                    if (index === currentIndex) {
                                        window.open(project.link, '_blank');
                                    } else {
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
                    <button className="carousel-btn prev" onClick={prevProject}>&#10094;</button>
                    <button className="carousel-btn next" onClick={nextProject}>&#10095;</button>
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
                {regularProjects.map((_, index) => (
                    <span
                        key={index}
                        className={`indicator ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => setCurrentIndex(index)}
                    ></span>
                ))}
            </div>
        </section>
    );
};

export default Projects;
