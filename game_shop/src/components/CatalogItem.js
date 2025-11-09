import React from 'react';
import PrimaryButton from './ui/PrimaryButton';

const CatalogItem = ({ game }) => {
  return (
    <div className="catalog-item">
      <div className="item-image-container">
        <img src={game.image} alt={game.title} />
      </div>
      <h3>{game.title}</h3>
      <p className="item-description">
        {game.description.substring(0, 70)}... 
      </p>
      <div className="item-price">
        <strong>Price :</strong>
        <span>$ {game.price}</span>
      </div>
      <PrimaryButton text="View more" />
    </div>
  );
};

export default CatalogItem;