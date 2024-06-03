import React from 'react';
import './cart.css';

const Cart = ({ cart }) => {
  return (
    <div>
      <h2>Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cart.map((product, index) => (
            <div key={`${product.id}-${index}`} className="cart-item">
              <img src={product.thumbnail} alt={product.title} />
              <div>
                <h3>{product.title}</h3>
                <p>Price: ${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
