import React, { useState } from 'react';
import HeroSection from '../components/HeroSection';
import GameList from '../components/GameList';
import PrimaryButton from '../components/ui/PrimaryButton';
import CatalogItem from '../components/CatalogItem';
import { gamesData } from '../data/games';

const Home = () => {

  const [showMore, setShowMore] = useState(false);
  const handleViewMore = () => {
    setShowMore(!showMore);
  };
  const extraGame = gamesData.find(g => g.id === 4);

  return (
    <> 
      <HeroSection />
      <div className="product-showcase">
        <GameList />

        {showMore && (
          <div className="extra-content fade-in">
            <div className="extra-text-block">
              <h2>More about Gaming</h2>
              <p>
                Video games have evolved from simple pixelated graphics to immersive, cinematic experiences.
                Explore worlds like never before in our curated collection.
              </p>
            </div>
            <div className="extra-card-container">
                {extraGame && <CatalogItem game={extraGame} />}
            </div>
          </div>
        )}

        <div className="view-more-button-container">
          <PrimaryButton 
            text={showMore ? "Show Less" : "View More"} 
            onClick={handleViewMore}
          />
        </div>
      </div>
    </>
  );
};

export default Home;