import React from 'react';
import Carousel from "./Carousel";
import Fruitoftheday from "./Fruitoftheday";
import HomeProducts from "./HomeProducts";
import Mainfooter from "./Mainfooter";
import Navbar from "./Navbar";
import { Link, useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import Loader from './Loader';
import * as CryptoJS from 'crypto-js';

const SECRET_KEY = 'e#4@X2!p9Zb$uYq6';

const decryptData = (ciphertext: string) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedData;
};
export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
    };

    fetchData();
  }, []);

  localStorage.setItem("livetab", "home");
  const encryptedName = localStorage.getItem('name');
const name = encryptedName ? decryptData(encryptedName) : '';

  let navigate = useNavigate();

  const handlePress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      localStorage.setItem("search", event.currentTarget.value);
      navigate("/products");
    }
  };
  return (
    <div>
      {loading && <Loader />}
      <div style={{ display: loading ? "none" : "block" }}>
        <Navbar />
        <Fruitoftheday />
        <Link to={"/products"}>
        <div className="home-nav">
          <p>Beverages</p>
          <p>Dairy</p>
          <p>Grains</p>
          <p>Veggies</p>
          <p>Fruits</p>
          </div>
          </Link>
        <div className="home-search">
          <input placeholder="🔎 An apple a day keeps the doctor away..." onKeyDown={handlePress} />
          <h1>Hello <span>{name}</span> greens at your fingertips..</h1>
        </div>
        <Carousel />
        <HomeProducts />
        <Mainfooter />
      </div>
    </div>
  );
}
