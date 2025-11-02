import React from 'react';
import TopBanner from '../images/games_pic.png'

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-image-container">

        <img src={TopBanner} alt="Головний банер" className="hero-image"/>

        </div>
      <div className="hero-content">
        <h1>Top Games Store</h1>
        <p>Here you can buy the greatest games of all time for a cheap price</p>
      </div>
    </section>
  );
};

export default HeroSection;