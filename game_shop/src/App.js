import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import GameList from './components/GameList';
import './App.css'; 

function App() {
  return (
    <div className="page-container">
      <Header />
      
      <main className="main-content-wrapper">
        <HeroSection />

        <div className="product-showcase">
          <GameList />
          <div className="view-more-button-container">
            <button className="view-more-btn">View more</button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;