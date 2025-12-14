import React, { useState, useEffect, useContext } from 'react';
import CatalogItem from '../components/CatalogItem';
import PrimaryButton from '../components/ui/PrimaryButton';
import Loader from '../components/ui/Loader';
import { SearchContext } from '../context/SearchContext';
import { fetchGames } from '../api/items';

const Catalog = () => {
  const { searchTerm } = useContext(SearchContext);

  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [selectedPrice, setSelectedPrice] = useState('all');
  const [selectedRating, setSelectedRating] = useState('all');
  const [selectedDate, setSelectedDate] = useState('all');

  const loadGames = (filters = {}) => {
    setLoading(true);
    fetchGames(filters)
        .then(response => {
            setGames(response.data);
            setLoading(false);
        })
        .catch(err => {
            console.error(err);
            setError('Failed to fetch games');
            setLoading(false);
        });
  };

  useEffect(() => {
    loadGames(); 
  }, []);

  const applyFilters = () => {
    const filters = {
        price: selectedPrice,
        rating: selectedRating,
        date: selectedDate
    };
    loadGames(filters);
  };

  const filteredGames = games.filter(game => 
    game.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="catalog-page-wrapper">
      <div className="filter-bar">
        <select 
            className="ui-select" 
            value={selectedPrice} 
            onChange={(e) => setSelectedPrice(e.target.value)}
        >
            <option value="all">Price: All</option>
            <option value="cheap">Under $35</option>
            <option value="expensive">$35 and up</option>
        </select>
        
        <select 
            className="ui-select"
            value={selectedRating}
            onChange={(e) => setSelectedRating(e.target.value)}       
        >
            <option value="all">Rating: All</option>
            <option value="high">Masterpiece (9.5+)</option>
            <option value="good">Great (9.0-9.4)</option>
        </select>
        
        <select 
            className="ui-select" 
            value={selectedDate} 
            onChange={(e) => setSelectedDate(e.target.value)}
        >
            <option value="all">Date: Any</option>
            <option value="new">Modern (2018+)</option>
            <option value="classic">All Classics (&lt; 2018)</option>
            <option value="early_2015">Early 2015 Only</option>
        </select>

        <PrimaryButton text="Apply" onClick={applyFilters} />
      </div>

      <div className="items-list-grid">
        {loading ? (
            <div style={{gridColumn: '1/-1'}}><Loader /></div>
        ) : error ? (
            <p style={{color: 'red', textAlign: 'center'}}>{error}</p>
        ) : filteredGames.length > 0 ? (
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