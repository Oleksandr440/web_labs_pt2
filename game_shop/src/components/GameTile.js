import React from 'react';

const GameTile = ({ game }) => {
  const imageUrl = `/images/${game.image}`;
  return (
    <div className="game-tile">
      <div className="game-image-placeholder">
        <img src={imageUrl} alt={game.title} />
      </div>
      <h3>{game.title}</h3>
      <p>{game.description}</p>
    </div>
  );
};

export default GameTile;