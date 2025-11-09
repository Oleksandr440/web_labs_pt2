import React from 'react';
import Select from '../components/ui/Select';
import PrimaryButton from '../components/ui/PrimaryButton';
import CatalogItem from '../components/CatalogItem';
import { gamesData } from '../data/games'; 

const Catalog = () => {
  return (
    <div className="catalog-page-wrapper">
      
      <div className="filter-bar">
        <Select label="Filter 1" />
        <Select label="Filter 2" />
        <Select label="Filter 3" />
        <PrimaryButton text="Apply" isDisabled={true} />
      </div>

      <div className="items-list-grid">
        {gamesData.map(game => (
          <CatalogItem key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
};

export default Catalog;