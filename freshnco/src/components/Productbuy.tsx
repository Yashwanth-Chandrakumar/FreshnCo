import React from 'react'
import NavBar from './Navbar'
import img1 from "../assets/images/tomato-realistic-image-vector-illustration_324395-282-removebg-preview.png";
import img2 from "../assets/images/tomato.png";
import img3 from "../assets/images/brinjal.png";
import img4 from "../assets/images/spinach.png";
import img5 from "../assets/images/broccoli.png"
import img6 from "../assets/images/ladies.png"
export default function Productbuy() {
    localStorage.setItem("livetab", "products")
    const products = [
        { name: 'Red Tomatoes', imageUrl: img1, price: 'Rs.40/kg' },
        { name: 'Country Tomatoes', imageUrl: img2, price: 'Rs.35/kg' },
        { name: 'Brinjal', imageUrl: img3, price: 'Rs.25/kg' },
        { name: 'Spinach', imageUrl: img4, price: 'Rs.30/kg' },
        { name: 'Broccoli', imageUrl: img5, price: 'Rs.50/kg' },
        { name: 'Ladies finger', imageUrl: img6, price: 'Rs.45/kg' },
        { name: 'Red Tomatoes', imageUrl: img1, price: 'Rs.40/kg' },
        { name: 'Country Tomatoes', imageUrl: img2, price: 'Rs.35/kg' },
        { name: 'Brinjal', imageUrl: img3, price: 'Rs.25/kg' },
        { name: 'Spinach', imageUrl: img4, price: 'Rs.30/kg' },
        { name: 'Broccoli', imageUrl: img5, price: 'Rs.50/kg' },
        { name: 'Ladies finger', imageUrl: img6, price: 'Rs.45/kg' },
        { name: 'Brinjal', imageUrl: img3, price: 'Rs.25/kg' },
        { name: 'Spinach', imageUrl: img4, price: 'Rs.30/kg' },
        { name: 'Broccoli', imageUrl: img5, price: 'Rs.50/kg' },
        { name: '', imageUrl:'', price: '' },
        { name: '', imageUrl:"", price: '' },
        { name: '', imageUrl:"", price: '' },
        { name: '', imageUrl:"", price: '' },
        { name: '', imageUrl:"", price: '' },
  ];
  let name = localStorage.getItem("name");
    return (
      <div>
        <NavBar />
      <div className='product-buy'>
          
          <h1 style={{paddingLeft:"1rem",paddingBottom:"2rem",fontWeight:"800"}}><span style={{color:"var(--btncolor)"}}>{name}</span> here is your venue.</h1>

          <h2 style={{ paddingLeft: "1rem" }}>Products in stock.</h2>
          <hr/>
<ul>
{products.map((product, index) => (
            <li className="adidas" key={index}>
              <div>
                <h2>{product.name}</h2>
                <p>{product.price}</p>
              </div>
              <img src={product.imageUrl} alt="" style={{ borderRadius: '10px' }} />
            </li>
          ))}
  
</ul>


            </div>
            </div>
  )
}
