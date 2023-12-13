import React from 'react'
import NavBar from './Navbar'

export default function Productbuy() {
    localStorage.setItem("livetab", "products")
    const products = [
        { name: 'Red Tomatoes', imageUrl: '../assets/images/tomato.png' },
      ];
    return (
      <div>
              <NavBar />
      <div className='product-buy'>
          
              

<ul>
{products.map((product, index) => (
        <li className="adidas" key={index}>
          <div>
            <h2>{product.name}</h2>
            {/* Uncomment the line below if you have pricing information */}
            {/* <p>Rs.40/kg</p> */}
          </div>
          <img src={product.imageUrl} alt="" />
        </li>
      ))}
  
</ul>


            </div>
            </div>
  )
}
