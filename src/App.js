import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import './App.css';
import Item from './pages/Item';
import CartPage from './pages/CartPage';

function App() {
  return (
    <div className="page-container">
      <Header />
      
      <main className="main-content-wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/:id" element={<Item />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;