import { useSelector } from "react-redux";
import NavBar from "./Navbar";
import { useState } from "react";
import { ChangeEvent, FormEvent } from "react";
import { useEffect } from "react";
import axios from "axios";
import * as CryptoJS from 'crypto-js';

const SECRET_KEY = 'e#4@X2!p9Zb$uYq6';

const decryptData = (ciphertext: string) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedData;
};
interface Product {
  id: string;
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

interface User {
  fid: number;
  fname: string;
  lname: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

const Payment: React.FC = () => {
  const [user, setUser] = useState<User>({
    fid: 0,
    fname: "",
    lname: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });
  const { fname, lname, email, phone, address, city, state, pincode } = user;
  const encryptedUserId = localStorage.getItem('userId');
const id = encryptedUserId ? decryptData(encryptedUserId) : '';


  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("Input changed:", e.target.id, e.target.value);
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    loadUser();
  }, []);
  const loadUser = async () => {
    try {
      const result = await axios.get<User>(
        `https://freshnco.onrender.com/user/${id}`
      );
      setUser(result.data);
    } catch (error) {
      console.error("Error loading user:", error);
    }
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`https://freshnco.onrender.com/user/${id}`, user);
      console.log("User details updated successfully");
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };

  const totalCost = useSelector(
    (state: { cartReducer: { totalCost: number } }) =>
      state.cartReducer.totalCost
  );
  const cart = useSelector(
    (state: { cartReducer: { cart: CartItem[] } }) => state.cartReducer.cart
  );

  return (
    <div>
      <NavBar />
      <div className="payment-content">
        <div className="payment-cart">
          <p>1. Current orders</p>
          <ul className="payment-cart-list">
            {cart.map((cartItem: CartItem) => (
              <li key={cartItem.id} className="payment-cart-item">
                <div
                  className="payment-cart-img"
                  style={{
                    backgroundImage: `url(${cartItem.product.imgurl})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    height: "110px",
                    width: "110px",
                    borderRadius: "10px",
                  }}
                >
                  <p className="payment-offer">{cartItem.product.offer}%</p>
                </div>
                <div className="payment-cart-item-details">
                  <p>{cartItem.product.name}</p>
                  <p>Price: ₹{cartItem.product.price}/Kg</p>

                  <p>Qty: {cartItem.quantity}</p>
                </div>
                <div className="payment-cart-buttons"></div>
              </li>
            ))}
          </ul>
          <hr />
          <p style={{ textAlign: "right", color: "grey" }}>
            Total Cost:{" "}
            <span style={{ color: "var(--textcolor)" }}>
              ₹{totalCost.toFixed(2)}
            </span>
          </p>
        </div>
        <div className="payment-address">
          <p>2. Delivery Address</p>
          <p style={{ fontSize: "0.9rem", color: "grey" }}>
            All fields are required*
          </p>
          <form onSubmit={onSubmit}>
            <div className="col-md-12 mb-4">
              <div className="form-outline">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  id="fname"
                  value={fname}
                  placeholder="Enter your first name"
                  onChange={(e) => onInputChange(e)}
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-md-12 mb-4">
              <div className="form-outline">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  id="lname"
                  placeholder="Enter your last name"
                  value={lname}
                  onChange={(e) => onInputChange(e)}
                  className="form-control"
                />
              </div>
            </div>
            <div className="form-outline col-md-12 mb-4">
              <label className="form-label">Email address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => onInputChange(e)}
                placeholder="Enter your email"
                className="form-control"
              />
            </div>

            <div className="form-outline col-md-12 mb-4">
              <label className="form-label">Phone number</label>
              <input
                type="number"
                id="phone"
                value={phone}
                onChange={(e) => onInputChange(e)}
                placeholder="Enter your phone number"
                className="form-control"
              />
            </div>
            <div className="form-outline col-md-12 mb-4">
              <label className="form-label">Address</label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => onInputChange(e)}
                placeholder="Enter your address"
                className="form-control"
              />
            </div>
            <div className="form-outline col-md-12 mb-4">
              <label className="form-label">City</label>
              <input
                type="text"
                id="city"
                value={city}
                onChange={(e) => onInputChange(e)}
                placeholder="Enter your city"
                className="form-control"
              />
            </div>
            <div className="form-outline col-md-12 mb-4">
              <label className="form-label">State</label>
              <input
                type="text"
                id="state"
                value={state}
                onChange={(e) => onInputChange(e)}
                placeholder="Enter your state"
                className="form-control"
              />
            </div>
            <div className="form-outline col-md-12 mb-4">
              <label className="form-label">pincode</label>
              <input
                type="text"
                id="pincode"
                value={pincode}
                onChange={(e) => onInputChange(e)}
                placeholder="Enter your pincode"
                className="form-control"
              />
            </div>

            <div className="payment-address-button">
              <button type="submit" className="btn btn-primary btn-block mb-4">
                Save
              </button>
            </div>
          </form>
        </div>
        <div className="payment-credit">Payment card</div>
      </div>
    </div>
  );
};
export default Payment;
