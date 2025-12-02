import React from 'react';
import { FaLinkedin, FaGithub, FaTwitter, FaSun, FaMoon } from 'react-icons/fa';

const Header = ({ theme, toggleTheme }) => {
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
                <button
                    className={`toggle ${theme === 'light' ? 'active' : ''}`}
                    onClick={toggleTheme}
                    aria-label="Toggle Theme"
                >
                    <div className="toggle-thumb">
                        {theme === 'light' ? <FaSun color="#FDB813" /> : <FaMoon color="#2196F3" />}
                    </div>
                </button>
                <a href="https://www.linkedin.com/in/piyush-kumar-3b8a222b8" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
                <a href="https://github.com/kumarpiyushv0" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
                <a href="https://x.com/impk1103" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            </div>
        </header>
    );
};

export default Header;
