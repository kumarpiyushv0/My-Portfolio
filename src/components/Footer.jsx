import React from 'react';
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer>
            <p>© 2025 Piyush Kumar. All rights reserved.</p>
            <div className="home__social_footer">
                <a href="https://www.linkedin.com/in/piyush-kumar-3b8a222b8" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
                <a href="https://github.com/kumarpiyushv0" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
                <a href="https://x.com/impk1103" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            </div>
        </footer>
    );
};

export default Footer;
