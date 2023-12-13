
import './App.css'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom'
import Productbuy from './components/Productbuy'
function App(){
  return (
  
    <div>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Productbuy />} />
        </Routes>
      </Router>
       </div>
  )
}

export default App
