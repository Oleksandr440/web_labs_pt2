import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import Navigation from './Navigation';
import SearchBar from './ui/SearchBar'; 
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../redux/actions';

const Header = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const { cartItems, user } = useSelector(state => state);
  
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleLogout = () => {
      dispatch(logoutUser());
  };

  return (
    <header className="main-header">
      <div className="logo">
        <Link to="/" style={{textDecoration: 'none', color: 'inherit'}}>LOGO</Link>
      </div>
      
      <Navigation />
      
      {location.pathname === '/catalog' && <SearchBar />}
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          
          <Link to="/cart" className="cart-link">
              Cart ({totalItems})
          </Link>

          {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: '#333', fontSize: '0.9rem', fontWeight: 'bold' }}>
                    {user}
                  </span>
                  
                  <button onClick={handleLogout} className="logout-btn">
                      Sign Out
                  </button>
              </div>
          ) : (
              <Link to="/login" className="nav-link" style={{fontSize: '18px', fontWeight: 'bold'}}>
                  Log In
              </Link>
          )}

      </div>
    </header>
  );
};

export default Header;