import React from 'react';
import Carousel from "./Carousel";
import Fruitoftheday from "./Fruitoftheday";
import HomeProducts from "./HomeProducts";
import Mainfooter from "./Mainfooter";
import Navbar from "./Navbar";
import { useNavigate } from 'react-router-dom';

export default function Home() {
  localStorage.setItem("livetab", "home");
  let name = localStorage.getItem("name");
  let navigate = useNavigate();
  const handlePress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      navigate("/products");
    }
  };

  return (
    <div>
      <Navbar />
      <Fruitoftheday />
      <div className="home-nav">
        <p>Beverages</p>
        <p>Dairy</p>
        <p>Grains</p>
        <p>Veggies</p>
        <p>Fruits</p>
      </div>
      <div className="home-search">
        <input placeholder="🔎 An apple a day keeps the doctor away..." onKeyDown={handlePress} />
        <h1>Hello <span>{name}</span> greens at your fingertips..</h1>
      </div>
      <Carousel />
      <HomeProducts />
      <Mainfooter />
    </div>
  );
}
