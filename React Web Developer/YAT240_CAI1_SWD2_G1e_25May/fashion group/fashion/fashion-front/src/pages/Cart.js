import { useEffect, useState } from 'react';
import axios from 'axios';
import './Cart.css';

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/cart/USER_ID') // Replace USER_ID with actual user ID
      .then(response => setCart(response.data.products))
      .catch(error => console.error('Error fetching cart:', error));
  }, []);

  return (
    <div className="cart">
      <h1>Your Cart</h1>
      {cart.map(item => (
        <div key={item.productId} className="cart-item">
          <span>{item.productId}</span>
          <span>Quantity: {item.quantity}</span>
        </div>
      ))}
    </div>
  );
};

export default Cart;