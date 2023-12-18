import React from 'react';
import NavBar from './Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCartItem } from '../store/CartSlice';

interface CartItem {
  id: string;
  product: {
    name: string;
    description: string;
    price: number;
    // Add other properties as needed
  };
}

const Cart: React.FC = () => {
  localStorage.setItem("livetab", "cart");
  
  // Use useSelector to get the cart state from the Redux store
  const cart = useSelector((state: any) => state.cartReducer.cart);
  
  const dispatch = useDispatch();

  const handleDelete = (id: string) => {
    // Dispatch the deleteCartItem action with the id of the item to be deleted
    dispatch(deleteCartItem(id));
  };

  return (
    <div>
      <NavBar />
      <h1>Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((cartItem: CartItem) => (
            <li key={cartItem.id}>
              <p>{cartItem.product.name}</p>
              <p>{cartItem.product.description}</p>
              <p>Price: ${cartItem.product.price}</p>
              {/* Add more details you want to display */}
              <button onClick={() => handleDelete(cartItem.id)}>Delete</button>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
