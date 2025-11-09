import React from 'react';

const GameTile = ({ game }) => {
  return (
    <div className="game-tile">
      <div className="game-image-placeholder">
        <img src={game.image} alt={game.title} />
      </div>
      <h3>{game.title}</h3>
      <p>{game.description}</p>
    </div>
  );
};

export default GameTile;