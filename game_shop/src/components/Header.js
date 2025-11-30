import React from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from './Navigation';
import SearchBar from './ui/SearchBar'; 

const Header = () => {
  const location = useLocation();

  return (
    <header className="main-header">
      <div className="logo">LOGO</div>
      <Navigation />
      {location.pathname === '/catalog' && <SearchBar />}
    </header>
  );
};

export default Header;