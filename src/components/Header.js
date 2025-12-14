import React from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from './Navigation';
import SearchBar from './ui/SearchBar'; 
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const cartItems = useSelector(state => state.cartItems);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="main-header">
      <div className="logo">LOGO</div>
      <Navigation />
      {location.pathname === '/catalog' && <SearchBar />}
      <Link to="/cart" className="cart-link">
              Cart ({totalItems})
          </Link>
    </header>
  );
};

export default Header;