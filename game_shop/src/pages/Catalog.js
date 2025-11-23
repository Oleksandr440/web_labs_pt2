import React, { useState, useContext } from 'react';
import CatalogItem from '../components/CatalogItem';
import { gamesData } from '../data/games';
import PrimaryButton from '../components/ui/PrimaryButton';
import { SearchContext } from '../context/SearchContext';

const Catalog = () => {

  const { searchTerm } = useContext(SearchContext);

  const [filterPrice, setFilterPrice] = useState('all');
  const [filterRating, setFilterRating] = useState('all');
  const [filterDate, setFilterDate] = useState('all');
  
  const filteredGames = gamesData.filter(game => {

    const safeSearch = searchTerm ? searchTerm.toLowerCase() : '';
    const matchesSearch = game.title.toLowerCase().includes(safeSearch);

    let matchesPrice = true;
    if (filterPrice === 'cheap') matchesPrice = game.price < 35;
    if (filterPrice === 'expensive') matchesPrice = game.price >= 35;

    let matchesRating = true;
    if (filterRating === 'high') matchesRating = game.rating >= 9.5;
    if (filterRating === 'good') matchesRating = game.rating >= 9.0 && game.rating < 9.5;

    let matchesDate = true;
    if (game.releaseDate) {
        const gameDate = new Date(game.releaseDate); 

        if (filterDate === 'new') {
            matchesDate = gameDate >= new Date('2018-01-01');
        } 
        else if (filterDate === 'classic') {
            matchesDate = gameDate < new Date('2018-01-01');
        }
        else if (filterDate === 'early_2015') {
            const start2015 = new Date('2015-01-01');
            const april2015 = new Date('2015-04-01');
            matchesDate = gameDate >= start2015 && gameDate < april2015;
        }
    }

    return matchesSearch && matchesPrice && matchesRating && matchesDate;
  });

  return (
    <div className="catalog-page-wrapper">
      <div className="filter-bar">
        <select 
            className="ui-select" 
            value={filterPrice} 
            onChange={(e) => setFilterPrice(e.target.value)}
        >
            <option value="all">Price: All</option>
            <option value="cheap">Under $35</option>
            <option value="expensive">$35 and up</option>
        </select>

        <select 
            className="ui-select"
            value={filterRating}
            onChange={(e) => setFilterRating(e.target.value)}
        >
            <option value="all">Rating: All</option>
            <option value="high">Masterpiece (9.5+)</option>
            <option value="good">Great (9.0-9.4)</option>
        </select>

        <select 
            className="ui-select"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
        >
            <option value="all">Date: Any</option>
            <option value="new">Modern (2018+)</option>
            <option value="classic">All Classics (&lt; 2018)</option>
            <option value="early_2015">Early 2015 Only (Jan-Mar)</option>
        </select>

        <PrimaryButton text="Apply" />
      </div>

      <div className="items-list-grid">
        {filteredGames.length > 0 ? (
            filteredGames.map(game => (
              <CatalogItem key={game.id} game={game} />
            ))
        ) : (
            <p style={{color: 'white', gridColumn: '1/-1', textAlign: 'center'}}>No games found.</p>
        )}
      </div>
    </div>
  );
};

export default Catalog;