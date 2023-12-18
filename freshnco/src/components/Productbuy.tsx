import { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './Navbar';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/CartSlice';

export default function Productbuy() {
  const dispatch = useDispatch();

  localStorage.setItem("livetab", "products");

  interface Product {
    id: number;
    name: string;
    description: string;
    imgurl: string;
    seller: string;
    price: number;
    classification: string;
    offer: number; // Add offer
  }

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const result = await axios.get("http://localhost:8080/products");
      console.log("Products received", result.data);
      setProducts(result.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll('article');

    for (const item of listItems) {
      const itemText = item.textContent?.toLowerCase();
      if (!itemText?.includes(searchValue)) {
        (item as HTMLElement).style.display = 'none';
      } else {
        (item as HTMLElement).style.display = 'block';
      }
    }
  };

  const handleClick = (product: Product) => {
    dispatch(addToCart(product));
  };

  let name = localStorage.getItem("name");

  return (
    <div>
      <NavBar />
      <div className='home-search' id='products-page'>
        <input placeholder="🔎 Eat veggies, feel invincible. Seriously." onChange={handleChange} />
      </div>
      <h1 style={{ paddingTop: "2rem", paddingLeft: "1rem", paddingBottom: "2rem", fontWeight: "800" }}>
        <span style={{ color: "var(--btncolor)" }}>{name}</span> here is your venue.
      </h1>
      <h2 style={{ paddingLeft: "1rem" }}>Products in stock.</h2>
      <div className='product-buy'>
        <hr />
        <div className='cards'>
          {products.map((product, index) => (
            <article id={product.classification} key={index} className="cardh" style={{ backgroundImage: `url(${product.imgurl})`, backgroundSize: "cover", backgroundPosition: "center" }}>
              <div className="contenth">
                <h2 className="titleh">{product.name}</h2>
                <p className="copyh">{product.description}</p>
                <p className='seller' style={{ color: "var(--btncolor)" }}>From: <span style={{ color: "white" }}>{product.seller}</span></p>
                <p className='offer'>Offer: {product.offer}%</p> {/* Display offer */}
                <button className="btnh" onClick={() => handleClick(product)}>
                  Add to Cart - Price: ₹{product.price}
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
