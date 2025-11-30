import React from 'react';
import { Link } from 'react-router-dom';
import PrimaryButton from './ui/PrimaryButton';

const CatalogItem = ({ game }) => {
  const imageUrl = `/images/${game.image}`;

  return (
    <div className="catalog-item">
      <div className="item-image-container">
        <img src={imageUrl} alt={game.title} />
      </div>
      <h3>{game.title}</h3>

      <p className="item-description">
        {game.description.substring(0, 60)}... 
      </p>

      <div className="item-price">
        <strong>Price :</strong>
        <span>$ {game.price}</span>
      </div>

      <div className="item-details-row">
        <span>{game.rating}</span>
        <span>{game.releaseDate}</span>
      </div>


      <Link to={`/catalog/${game.id}`} style={{width: '100%'}}>
        <PrimaryButton text="View more" />
      </Link>
    </div>
  );
};

export default CatalogItem;