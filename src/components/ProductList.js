import React, { useState, useEffect } from 'react';
import './ProductList.css'; // Import the CSS file for styling

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || []);
  const [addedToCart, setAddedToCart] = useState({}); // Added state for tracking added items
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(`https://dummyjson.com/products?limit=${itemsPerPage}&skip=${(page - 1) * itemsPerPage}`);
      const data = await response.json();
      setProducts(data.products);
      setTotalProducts(data.total);
    };

    fetchProducts();
  }, [page]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const nextPage = () => {
    if (page < Math.ceil(totalProducts / itemsPerPage)) {
      setPage(page + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
    setAddedToCart((prev) => ({ ...prev, [product.id]: true })); // Set addedToCart state
    setTimeout(() => {
      setAddedToCart((prev) => ({ ...prev, [product.id]: false })); // Reset addedToCart state after 2 seconds
    }, 2000);
  };

  return (
    <div>
      <h2>Products</h2>
      <div className="product-grid">
        {products.map((product, index) => (
          <div key={`${product.id}-${index}`} className="product-item">
            <img src={product.thumbnail} alt={product.title} />
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
            {addedToCart[product.id] && <p className="added-to-cart-message">Added to Cart</p>} {/* Display added to cart message */}
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={prevPage} disabled={page === 1}>Previous</button>
        <button onClick={nextPage} disabled={page >= Math.ceil(totalProducts / itemsPerPage)}>Next</button>
      </div>
    </div>
  );
};

export default ProductList;
