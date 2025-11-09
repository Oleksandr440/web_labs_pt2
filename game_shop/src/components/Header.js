import React from 'react';
import Navigation from './Navigation';
import SearchBar from './ui/SearchBar'; 

const Header = () => {
  return (
    <header className="main-header">
      <div className="logo">LOGO</div>
      <Navigation />
      <SearchBar />
    </header>
  );
};

export default Header;