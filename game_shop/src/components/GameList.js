import React from 'react';
import GameTile from './GameTile';
import witcher3Img from '../images/witcher3.png';
import godofwarImg from '../images/gow.png';
import tlou2Img from '../images/tlou2.png';


const GameList = () => {
  const games = [
    {
      id: 1,
      title: "The Witcher 3: Wild Hunt",
      description: "Action role-playing game where you play as Geralt of Rivia, a monster slayer, in a massive open world.",
      image: witcher3Img
    },
    {
      id: 2,
      title: "God of War (2018)",
      description: "This is an action-adventure game where a now-older Kratos, having left ancient Greece, must guide and protect his son, Atreus, in the Norse lands.",
      image: godofwarImg
    },
    {
      id: 3,
      title: "The Last of Us Part II",
      description: "A third-person action-adventure survival horror game where Ellie goes on a revenge mission across a post-apocalyptic United States five years after the first game.",
      image: tlou2Img
    },
  ];

  return (
    <div className="game-list-container">
      {games.map(game => (
        <GameTile key={game.id} game={game} />
      ))}
    </div>
  );
};

export default GameList;