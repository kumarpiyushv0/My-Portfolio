import React from 'react';
import { ASSETS } from '../assets';

const Hero = () => {
    return (
        <section className="photo">
            <img src={ASSETS.profilePhoto} alt="Piyush Kumar" className="profile-photo" />
        </section>
    );
};

export default Hero;
