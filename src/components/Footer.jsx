import React from 'react';
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';
import { trackSocialClick } from '../analytics';

const Footer = () => {
    return (
        <footer id="footer" data-analytics-section="footer">
            <p>© 2025 Piyush Kumar. All rights reserved.</p>
            <div className="home__social_footer">
                <a
                    id="btn-social-linkedin-footer"
                    name="social-linkedin-footer"
                    data-analytics-id="btn-social-linkedin-footer"
                    href="https://www.linkedin.com/in/piyush-kumar-3b8a222b8"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    onClick={() => trackSocialClick('linkedin', 'footer', 'https://www.linkedin.com/in/piyush-kumar-3b8a222b8', 'btn-social-linkedin-footer')}
                >
                    <FaLinkedin />
                </a>
                <a
                    id="btn-social-github-footer"
                    name="social-github-footer"
                    data-analytics-id="btn-social-github-footer"
                    href="https://github.com/kumarpiyushv0"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    onClick={() => trackSocialClick('github', 'footer', 'https://github.com/kumarpiyushv0', 'btn-social-github-footer')}
                >
                    <FaGithub />
                </a>
                <a
                    id="btn-social-twitter-footer"
                    name="social-twitter-footer"
                    data-analytics-id="btn-social-twitter-footer"
                    href="https://x.com/impk1103"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter / X"
                    onClick={() => trackSocialClick('twitter', 'footer', 'https://x.com/impk1103', 'btn-social-twitter-footer')}
                >
                    <FaTwitter />
                </a>
            </div>
        </footer>
    );
};

export default Footer;
