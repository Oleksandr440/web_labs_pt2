import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import './App.css';
import Item from './pages/Item';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import Success from './pages/Success';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          
          <Route path="/catalog" element={
            <ProtectedRoute>
              <Catalog />
            </ProtectedRoute>
          } />

          <Route path="/catalog/:id" element={
            <ProtectedRoute>
              <Item />
            </ProtectedRoute>
          } />

          <Route path="/cart" element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          } />

          <Route path="/checkout" element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          } />

          <Route path="/success" element={
            <ProtectedRoute>
              <Success />
            </ProtectedRoute>
          } />

          <Route path="*" element={
             <ProtectedRoute>
                 <Home />
             </ProtectedRoute>
          } />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;