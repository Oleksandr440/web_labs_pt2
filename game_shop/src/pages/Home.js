import React from 'react';
import HeroSection from '../components/HeroSection';
import GameList from '../components/GameList';
import PrimaryButton from '../components/ui/PrimaryButton';

const Home = () => {
  return (
    <> 
      <HeroSection />
      <div className="product-showcase">
        <GameList />
        <div className="view-more-button-container">
          <PrimaryButton text="View more" />
        </div>
      </div>
    </>
  );
};

export default Home;