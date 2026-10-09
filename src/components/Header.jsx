import React from 'react';
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';
import { trackButtonClick, trackSocialClick } from '../analytics';

const Header = () => {
    return (
        <header id="main-header" data-analytics-section="header">
            <h1 className="name">
                <a
                    id="link-header-brand"
                    name="header-brand-logo"
                    data-analytics-id="link-header-brand"
                    href="#"
                    onClick={() => trackButtonClick('link-header-brand', 'Header Brand Logo')}
                >
                    ▄ Piyush Kumar ▄
                </a>
            </h1>
            <nav aria-label="Main Navigation">
                <a
                    id="nav-link-about"
                    name="nav-about"
                    data-analytics-id="nav-link-about"
                    href="#about"
                    onClick={() => trackButtonClick('nav-link-about', 'Nav Link About', { target_section: 'about' })}
                >
                    About
                </a>
                <a
                    id="nav-link-projects"
                    name="nav-projects"
                    data-analytics-id="nav-link-projects"
                    href="#projects"
                    onClick={() => trackButtonClick('nav-link-projects', 'Nav Link Projects', { target_section: 'projects' })}
                >
                    Projects
                </a>
                <a
                    id="nav-link-skills"
                    name="nav-skills"
                    data-analytics-id="nav-link-skills"
                    href="#skills"
                    onClick={() => trackButtonClick('nav-link-skills', 'Nav Link Skills', { target_section: 'skills' })}
                >
                    Skills
                </a>
                <a
                    id="nav-link-contact"
                    name="nav-contact"
                    data-analytics-id="nav-link-contact"
                    href="#contact"
                    onClick={() => trackButtonClick('nav-link-contact', 'Nav Link Contact', { target_section: 'contact' })}
                >
                    Contact
                </a>
            </nav>
            <div className="home__social">
                <a
                    id="btn-social-linkedin-header"
                    name="social-linkedin-header"
                    data-analytics-id="btn-social-linkedin-header"
                    href="https://www.linkedin.com/in/piyush-kumar-3b8a222b8"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    onClick={() => trackSocialClick('linkedin', 'header', 'https://www.linkedin.com/in/piyush-kumar-3b8a222b8', 'btn-social-linkedin-header')}
                >
                    <FaLinkedin />
                </a>
                <a
                    id="btn-social-github-header"
                    name="social-github-header"
                    data-analytics-id="btn-social-github-header"
                    href="https://github.com/kumarpiyushv0"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    onClick={() => trackSocialClick('github', 'header', 'https://github.com/kumarpiyushv0', 'btn-social-github-header')}
                >
                    <FaGithub />
                </a>
                <a
                    id="btn-social-twitter-header"
                    name="social-twitter-header"
                    data-analytics-id="btn-social-twitter-header"
                    href="https://x.com/impk1103"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter / X"
                    onClick={() => trackSocialClick('twitter', 'header', 'https://x.com/impk1103', 'btn-social-twitter-header')}
                >
                    <FaTwitter />
                </a>
            </div>
        </header>
    );
};

export default Header;
