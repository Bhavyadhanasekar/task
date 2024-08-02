import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import CartItem from './components/CartItem';

const stripePromise = loadStripe('123485764332'); 

const Cart = ({ cartItems }) => {
  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div>
      <h2>Cart</h2>
      {cartItems.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
      <p>Total: ${total.toFixed(2)}</p>
      <Elements stripe={stripePromise}>
        <CheckoutForm cartItems={cartItems} />
      </Elements>
    </div>
  );
};

export default Cart;
