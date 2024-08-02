import React, { useState } from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);
  };

  return (
    <div>
      <h1>Product List</h1>
      <ProductList addToCart={addToCart} />
      <h1>Cart</h1>
      <Cart cartItems={cartItems} />
    </div>
  );
};

export default App;
