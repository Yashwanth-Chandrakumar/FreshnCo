
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
        { name: 'Red Tomatoes', imageUrl: img1, price: '40',class:"tomato" },
        { name: 'Country Tomatoes', imageUrl: img2, price: '35',class:"tomato" },
        { name: 'Brinjal', imageUrl: img3, price: '25',class:"brinjal" },
        { name: 'Spinach', imageUrl: img4, price: '30',class:"spinach" },
        { name: 'Broccoli', imageUrl: img5, price: '50',class:"broccoli" },
        { name: 'Ladies finger', imageUrl: img6, price: '45',class:"ladies finger" },
  ];
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll('li');
  
    for (const item of listItems) {
      const itemText = item.textContent?.toLowerCase();
      if (!itemText?.includes(searchValue)) {
        item.style.display = 'none';
      } else {
        item.style.display = 'block';
      }
    }
  };
  let name = localStorage.getItem("name");
    return (
      <div >
        <NavBar />
        <div className='home-search' id='products-page'>
        <input placeholder="🔎 Eat veggies, feel invincible. Seriously." onChange={handleChange} />
        </div>
          <h1 style={{paddingTop:"2rem",paddingLeft:"1rem",paddingBottom:"2rem",fontWeight:"800"}}><span style={{color:"var(--btncolor)"}}>{name}</span> here is your venue.</h1>
          <h2 style={{ paddingLeft: "1rem" }}>Products in stock.</h2>
      <div className='product-buy'>
          <hr/>
<ul>
{products.map((product, index) => (
            <li className="prod" key={index} id={product.class}>
              <div>
                <h2>{product.name}</h2>
                <p>Rs.{product.price}/Kg</p>
              </div>
              <img src={product.imageUrl} alt="" style={{ borderRadius: '10px' }} />
            </li>
          ))}
</ul>


        </div>
            </div>
  )
}
