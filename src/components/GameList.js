import React from 'react';
import GameTile from './GameTile';
import { gamesData } from '../data/games';


const GameList = () => {
  return (
    <div className="game-list-container">
      {gamesData.map(game => (
        <GameTile key={game.id} game={game} />
      ))}
    </div>
  );
};

export default GameList;