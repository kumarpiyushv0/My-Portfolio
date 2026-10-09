import React from 'react';
import { ASSETS } from '../assets';

const Hero = () => {
    return (
        <section id="hero" data-analytics-section="hero" className="photo">
            <img src={ASSETS.profilePhoto} alt="Piyush Kumar" className="profile-photo" />
        </section>
    );
};

export default Hero;
