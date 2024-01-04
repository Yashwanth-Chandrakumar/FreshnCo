import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Productbuy from "./components/Productbuy";
import Admin from "./components/Admin";
import Edituser from "./user/Edituser";
import Viewuser from "./user/Viewuser";
import Editproduct from "./user/Editproduct";
import Viewproduct from "./user/Viewproduct";
import AddUser from "./user/Adduser";
import AddProduct from "./user/Addproduct";
import Cart from "./components/Cart";
import Userdash from "./components/Userdash";
import Payment from "./components/Payment";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Productbuy />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/adduser" element={<AddUser />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/dash" element={<Userdash />} />
          <Route path="/payment/:id" element={<Payment />} />
          <Route path="/edituser/:id" element={<Edituser />} />
          <Route path="/viewuser/:id" element={<Viewuser />} />
          <Route path="/editproduct/:id" element={<Editproduct />} />
          <Route path="/viewproduct/:id" element={<Viewproduct />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
