import React from 'react';
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';
import { trackEvent } from '../analytics';

const Header = () => {
    return (
        <header>
            <h1 className="name"><a href="#">▄ Piyush Kumar ▄</a></h1>
            <nav aria-label="Main Navigation">
                <a href="#about">About</a>
                <a href="#projects">Projects</a>
                <a href="#skills">Skills</a>
                <a href="#contact">Contact</a>
            </nav>
            <div className="home__social">
                <a href="https://www.linkedin.com/in/piyush-kumar-3b8a222b8" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" onClick={() => trackEvent('social_profile_opened', { platform: 'linkedin' })}><FaLinkedin /></a>
                <a href="https://github.com/kumarpiyushv0" target="_blank" rel="noopener noreferrer" aria-label="GitHub" onClick={() => trackEvent('social_profile_opened', { platform: 'github' })}><FaGithub /></a>
                <a href="https://x.com/impk1103" target="_blank" rel="noopener noreferrer" aria-label="Twitter / X" onClick={() => trackEvent('social_profile_opened', { platform: 'twitter' })}><FaTwitter /></a>
            </div>
        </header>
    );
};

export default Header;
