import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from './Navbar';
import { nanoid } from 'nanoid';

import { deleteCartItem, incrementQuantity, decrementQuantity, addToCart } from '../store/CartSlice';
import fruit from '../assets/icons/icon_17.png';
import img0 from '../assets/icons/icon_0.png';
import img1 from '../assets/icons/icon_1.png';
import img2 from '../assets/icons/icon_2.png';
import img3 from '../assets/icons/icon_3.png';
import img4 from '../assets/icons/icon_4.png';
import img5 from '../assets/icons/icon_5.png';
import img6 from '../assets/icons/icon_6.png';
import img7 from '../assets/icons/icon_7.png';
import img8 from '../assets/icons/icon_8.png';
import img9 from '../assets/icons/icon_9.png';
import img10 from '../assets/icons/icon_10.png';
import img11 from '../assets/icons/icon_11.png';
import img12 from '../assets/icons/icon_12.png';
import img13 from '../assets/icons/icon_13.png';
import img14 from '../assets/icons/icon_14.png';
import img15 from '../assets/icons/icon_15.png';
import img16 from '../assets/icons/icon_16.png';
import img17 from '../assets/icons/icon_17.png';
import img18 from '../assets/icons/icon_18.png';
import img19 from '../assets/icons/icon_19.png';
import img20 from '../assets/icons/icon_20.png';
import img21 from '../assets/icons/icon_21.png';
import img22 from '../assets/icons/icon_22.png';
import img23 from '../assets/icons/icon_23.png';
import img24 from '../assets/icons/icon_24.png';


interface Product {
  id: string; // Add the 'id' property
  name: string;
  description: string;
  imgurl: string;
  seller: string;
  price: number;
  classification: string;
  offer: number;
}

interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

const importImages = (index: number) => {
  const images = [
    img0, img1, img2, img3, img4, img5, img6, img7, img8, img9,
    img10, img11, img12, img13, img14, img15, img16, img17, img18, img19,
    img20, img21, img22, img23, img24
  ];
  return images[index];
};

const Cart: React.FC = () => {
  const [deletedItems, setDeletedItems] = useState<{ title: string; price: number; seller: string; imgurl: string;offer:number }[]>([]);
  const localStorageTab = 'cart';

  localStorage.setItem("livetab", localStorageTab);

  const cart = useSelector((state: any) => state.cartReducer.cart);
  const dispatch = useDispatch();

  const handleDelete = (id: string) => {
    const deletedItem = cart.find((cartItem: CartItem) => cartItem.id === id);

    if (deletedItem) {
      setDeletedItems((prevDeletedItems) => [
        ...prevDeletedItems,
        { title: deletedItem.product.name, price: deletedItem.product.price,seller:deletedItem.product.seller, imgurl:deletedItem.product.imgurl,offer:deletedItem.product.offer },
      ]);
    }
    dispatch(deleteCartItem(id));
  };
  const handleIncrement = (id: string) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrement = (id: string) => {
    dispatch(decrementQuantity(id));
  };

  const handleRestoreToCart = (item: { title: string; price: number; seller: string; description?: string; imgurl: string; offer: number }) => {
    const newItem: CartItem = {
      id: nanoid(),
      product: {
        id: nanoid(),
        name: item.title,
        seller: item.seller, // Use default value or provide a fallback
        price: item.price,
        description: item.description || 'Description not available', // Use default value or provide a fallback
        imgurl: item.imgurl, // Use default value or provide a fallback
        classification: 'Unknown Classification',
        offer: item.offer, // Use default value or provide a fallback
      },
      quantity: 1,
    };
  
    dispatch(addToCart(newItem.product));// Pass newItem.product as the payload
    setDeletedItems((prevDeletedItems) =>
    prevDeletedItems.filter((deletedItem) => deletedItem.title !== item.title)
  );
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total: number, cartItem: CartItem) => {
      return (total + cartItem.product.price * cartItem.quantity);
    }, 0);
  };

  const calculateTotalDiscount = () => {
    return cart.reduce((total: number, cartItem: CartItem) => {
      return (total + (cartItem.product.price * cartItem.quantity) - cartItem.product.price * cartItem.quantity * (1 - cartItem.product.offer / 100));
    }, 0);
  };

  return (
    <div>
      <NavBar />
      <div className='cart-content'>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul className='cart-list'>
            {cart.map((cartItem: CartItem) => (
              <li key={cartItem.id} className='cart-item'>
                <div className='cart-img' style={{ backgroundImage: `url(${cartItem.product.imgurl})`, backgroundPosition: "center", backgroundSize: "cover", height: "150px", width: "150px", borderRadius: "10px" }}></div>
                <div className='cart-item-details'>
                  <p>{cartItem.product.name}</p>
                  <p>Seller: {cartItem.product.seller}</p>
                  <p>Price: ₹{cartItem.product.price}/Kg</p>
                  <div className='cart-alter'>
                    <button className="cart-button btn btn-primary btn-block" onClick={() => handleDecrement(cartItem.id)}>-</button>
                    <p>{cartItem.quantity}</p>
                    <button className="cart-button btn btn-primary btn-block" onClick={() => handleIncrement(cartItem.id)}>+</button>
                  </div>
                </div>
                <div className='cart-item-price'>
                  <p>Your price: ₹{Math.round(cartItem.product.price * cartItem.quantity * (1 - cartItem.product.offer / 100))}</p>
                  <p>Real price: ₹{Math.round(cartItem.product.price * cartItem.quantity)}</p>
                  <p>You saved: ₹{Math.round((cartItem.product.price * cartItem.quantity) - (cartItem.product.price * cartItem.quantity * (1 - cartItem.product.offer / 100)))}</p>
                  <p>Offer: {cartItem.product.offer}%</p>
                </div>
                <div className='cart-buttons'>
                  <button className='cart-remove btn btn-warning btn-block' onClick={() => handleDelete(cartItem.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <div className='cart-payment'>
          <div className='cart-total'>
            <div>
              <p>Price Details</p>
              <p>Total Price: ₹{calculateTotalPrice()}</p>
              <p>Discount: ₹{calculateTotalDiscount().toFixed(2)}</p>
              <p>
                Delivery: {calculateTotalPrice() - calculateTotalDiscount() < 399 ? "₹40" : <span><s>₹40</s> Free</span>} </p>

              <hr />
              <p>Total Amount: ₹{(calculateTotalPrice() - calculateTotalDiscount()).toFixed(2)}</p>
            </div>
            <button
              type="submit"
              className="btn btn-primary btn-block mb-4"
            >
              Proceed to checkout
            </button>
          </div>
          <div className='cart-choice'>
            <p>Give them a second chance <img src={fruit} height="20px" width="20px" /> </p>
            {deletedItems.map((item, index) => (
  <div className='choice-item' key={index}>
    <p><img src={importImages(index % 24)} height="20px" width="20px" /></p>
    <p>{item.title}</p>
    <p>₹{item.price}</p>
    <p>
      <button
        className="cart-choice-button btn btn-primary btn-block"
        onClick={() => handleRestoreToCart(item)}
      >
        +
      </button>
    </p>
  </div>
))}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
