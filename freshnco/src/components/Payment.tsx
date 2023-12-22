import { useSelector } from 'react-redux';
import NavBar from './Navbar';
import { deleteCartItem, incrementQuantity, decrementQuantity, addToCart ,setTotalCost} from '../store/CartSlice';
import { useDispatch} from 'react-redux';
import { nanoid } from 'nanoid';
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
export default function Payment() {
  let name = localStorage.getItem("name") ?? ""
  const totalCost = useSelector((state: { cartReducer: { totalCost: number } }) => state.cartReducer.totalCost);
  const cart = useSelector((state: { cartReducer: { cart: CartItem[] } }) => state.cartReducer.cart);
  const dispatch = useDispatch();

  const handleDelete = (id: string) => {
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
        seller: item.seller,
        price: item.price,
        description: item.description || 'Description not available',
        imgurl: item.imgurl,
        classification: 'Unknown Classification',
        offer: item.offer,
      },
      quantity: 1,
    };

    dispatch(addToCart(newItem.product));
  };
    return (
      <div>
        <NavBar />
        <div className='payment-content'>
          <div className='payment-cart'>
            <p>1. Current orders</p>
            <ul className='payment-cart-list'>
            {cart.map((cartItem: CartItem) => (
              <li key={cartItem.id} className='payment-cart-item'>
                <div className='payment-cart-img' style={{ backgroundImage: `url(${cartItem.product.imgurl})`, backgroundPosition: "center", backgroundSize: "cover", height: "110px", width: "110px", borderRadius: "10px" }}>
                  <p className='payment-offer'>{cartItem.product.offer}%</p>
                </div>
                <div className='payment-cart-item-details'>
                  <p>{cartItem.product.name}</p>
                  <p>Price: ₹{cartItem.product.price}/Kg</p>
                  
                    <p>Qty: {cartItem.quantity}</p>
                  
                </div>
                {/* <div className='cart-item-price'>
                  <p>Your price: ₹{Math.round(cartItem.product.price * cartItem.quantity * (1 - cartItem.product.offer / 100))}</p>
                  <p>Real price: ₹{Math.round(cartItem.product.price * cartItem.quantity)}</p>
                  <p>You saved: ₹{Math.round((cartItem.product.price * cartItem.quantity) - (cartItem.product.price * cartItem.quantity * (1 - cartItem.product.offer / 100)))}</p>
                  
                </div> */}
                <div className='payment-cart-buttons'>
                  <button className='cart-remove btn btn-warning btn-block' onClick={() => handleDelete(cartItem.id)}>Delete</button>
                </div>
              </li>
            ))}
            </ul>
            <hr />
            <p style={{textAlign:"right", color:"grey"}}>Total Cost: <span style={{color:"var(--textcolor)"}}>₹{totalCost.toFixed(2)}</span></p>

          </div>
          <div className='payment-address'>
            <form >
              <p>2. Delivery Address</p>
              <p style={{fontSize:"0.9rem",color:"grey"}}>All fields are required*</p>
                <div className="row">
                  <div className="col-md-12 mb-4">
                    <div className="form-outline">
                      <label className="form-label">First Name</label>
                      <input
                        type="text"
                        id="fname"
                      value={name}
                      placeholder='Enter your first name'
                        // onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
                  <div className="col-md-12 mb-4">
                    <div className="form-outline">
                      <label className="form-label">Last Name</label>
                      <input
                        type="text"
                    id="lname" 
                    placeholder='Enter your last name'
                        // value={lname}
                        // onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                <div className="form-outline col-md-12 mb-4">
                  <label className="form-label">Email address</label>
                  <input
                    type="email"
                    id="email" 
                    // value={email}
                  // onChange={handleChange}
                  placeholder='Enter your email'
                    className="form-control"
                  />
                </div>

                <div className="form-outline col-md-12 mb-4">
                  <label className="form-label">Phone number</label>
                  <input
                    // type={showPassword ? "text" : "password"}
                    id="password" 
                    // value={password}
                  // onChange={handleChange}
                  placeholder='Enter your phone number'
                    className="form-control"
                  />
                  
                </div>
                <div className="form-outline col-md-12 mb-4">
                  <label className="form-label">Address</label>
                  <input
                    // type={showPassword ? "text" : "password"}
                    id="password" 
                    // value={password}
                  // onChange={handleChange}
                  placeholder='Enter your address'
                    className="form-control"
                  />
                  
                </div>
                <div className="form-outline col-md-12 mb-4">
                  <label className="form-label">City</label>
                  <input
                    // type={showPassword ? "text" : "password"}
                    id="password" 
                    // value={password}
                  // onChange={handleChange}
                  placeholder='Enter your city'
                    className="form-control"
                  />
                  
                </div>
                <div className="form-outline col-md-12 mb-4">
                  <label className="form-label">State</label>
                  <input
                    // type={showPassword ? "text" : "password"}
                    id="password" 
                    // value={password}
                  // onChange={handleChange}
                  placeholder='Enter your state'
                    className="form-control"
                  />
                </div>
                <div className="form-outline col-md-12 mb-4">
                  <label className="form-label">Zipcode</label>
                  <input
                    // type={showPassword ? "text" : "password"}
                    id="password" 
                    // value={password}
                  // onChange={handleChange}
                  placeholder='Enter your zipcode'
                    className="form-control"
                  />
              </div>
              <div className='payment-address-button'>
              <button
              type="submit"
              className="btn btn-primary btn-block mb-4">
                Save
                </button>
                </div>
              </form>
          </div>
          <div className='payment-credit'>

          </div>
          </div>
      </div>
    );
}
