import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom'; 
import './App.css'; 
import { SearchProvider } from './context/SearchContext';

import { Provider } from 'react-redux';
import store from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Provider store={store}> 
        <SearchProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </SearchProvider>
      </Provider>
    </React.StrictMode>
);