import React from 'react';
import profilePhoto from '../assets/about2.jpg';

const Hero = () => {
    return (
        <section className="photo">
            <img src={profilePhoto} alt="Piyush Kumar" className="profile-photo" />
        </section>
    );
};

export default Hero;
