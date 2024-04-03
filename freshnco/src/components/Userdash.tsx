
import NavBar from './Navbar';
import { Accordion, AccordionSummary, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import * as CryptoJS from 'crypto-js';

const SECRET_KEY = 'e#4@X2!p9Zb$uYq6';

const decryptData = (ciphertext: string) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedData;
};
export default function () {
  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.setItem('auth', 'false');
    localStorage.setItem('email', '');
    localStorage.setItem('name', '');
    localStorage.setItem('admin', '');
    navigate('/login');
  };

  const encryptedName = localStorage.getItem('name');
const name = encryptedName ? decryptData(encryptedName) : '';
const encryptedEmail = localStorage.getItem('email');
const email = encryptedEmail ? decryptData(encryptedEmail) : '';
  localStorage.setItem('livetab', 'dash');
  const items = [
    { name: 'Spinach', description: 'Rich in iron, vitamins A, C, and K' },
    { name: 'Greens', description: 'Includes kale, Swiss chard, collard greens, etc.' },
    { name: 'Citrus', description: 'Oranges, grapefruits, lemons, limes, tangerines' },
    { name: 'Protein-Rich', description: 'Legumes, quinoa, tofu, edamame, Greek yogurt' },
    { name: 'Immunity', description: 'Boosted by citrus fruits, berries, garlic, ginger, turmeric' },
    { name: 'High-Fibre', description: 'Apples, pears, berries, avocado, lentils' },
  ];
  return (
    <>
      <NavBar />
      <div className="userdash">
        <div className="user-content">
          <Avatar
            sx={{
              bgcolor: 'var(--btncolor)',
              fontFamily: 'var(--body-font)',
              fontWeight: 600,
              height: 80,
              width:80,
              fontSize: 'var(--big-font-size)',
            }}
          >
            {name.charAt(0)}
          </Avatar>
          <div>
            <p>
              Name: <span>{name}</span>
            </p>
            <p>
              Email: <span>{email}</span>
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="btn btn-primary btn-block mb-4"
          >
            Logout
          </button>
        </div>
              <div className='dash-divs'>
                  <div className='dash-category'>Category
                  <div>
                  {items.map((item, index) => (
        <Accordion key={index} style={{ boxShadow: 'none', borderBottom:'1px solid var(--btncolor)', borderRadius: '5px',alignSelf:'flex-start' }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}a-content`}
            id={`panel${index}a-header`}
          >
            <Typography>{item.name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{item.description}</Typography>
          </AccordionDetails>
        </Accordion>
                  ))}
                      </div>

                  </div>
                  <div className="dash-orders">Previous orders
                      <div>
                  <Accordion  style={{ boxShadow: 'none', borderBottom:'1px solid var(--btncolor)', borderRadius: '5px',alignSelf:'flex-start' }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panela-content`}
            id={`panela-header`}
          >
            <Typography>Order 1</Typography>
          </AccordionSummary>
          <AccordionDetails>
                      <Typography>
                      <p>1. Apples - 2 kg - ₹49.99/kg</p>
    <p>2. Bananas - 1.5 kg - ₹29.49/kg</p>
    <p>3. Oranges - 3 kg - ₹39.99/kg</p>
    <p>4. Grapes - 1 kg - ₹59.99/kg</p>
    <p>5. Strawberries - 0.5 kg - ₹69.99/kg</p>
            </Typography>
          </AccordionDetails>
                          </Accordion>
                          </div></div>
              </div>
              
      </div>
    </>
  );
}
