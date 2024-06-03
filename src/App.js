import React, { useState, useEffect } from 'react';
import './App.css'; // Import the CSS file for styling
import Login from './components/login';
import ProductList from './components/ProductList';
import Cart from './components/Cart';

const App = () => {
  // Initialize authentication status from local storage or default to false
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('token'));
  const [view, setView] = useState('products');
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || []);

  useEffect(() => {
    // Update authentication status when the component mounts
    setIsAuthenticated(!!localStorage.getItem('token'));
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('cart');
    setIsAuthenticated(false);
    setView('products');
    setCart([]);
  };

  return (
    <div className="App">
      <div className="container">
        {isAuthenticated ? (
          <div>
            <nav>
              <div className="navButtons">
              <button onClick={() => setView('products')}>Products</button>
              <button onClick={() => setView('cart')}>Cart</button>
              <button onClick={handleLogout}>Logout</button>
              </div>
            </nav>
            {view === 'products' ? <ProductList cart={cart} setCart={setCart} /> : <Cart cart={cart} />}
          </div>
        ) : (
          <Login onLogin={handleLogin} />
        )}
      </div>
    </div>
  );
};

export default App;
