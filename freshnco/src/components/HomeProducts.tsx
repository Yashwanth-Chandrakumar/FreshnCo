
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HomeCard from './HomeCard';

export default function HomeProducts() {
    const items = [
        { name: 'Spinach', description: 'Rich in iron, vitamins A, C, and K' },
        { name: 'Greens', description: 'Includes kale, Swiss chard, collard greens, etc.' },
        { name: 'Citrus', description: 'Oranges, grapefruits, lemons, limes, tangerines' },
        { name: 'Protein-Rich', description: 'Legumes, quinoa, tofu, edamame, Greek yogurt' },
        { name: 'Immunity', description: 'Boosted by citrus fruits, berries, garlic, ginger, turmeric' },
        { name: 'High-Fibre', description: 'Apples, pears, berries, avocado, lentils' },
      ];
      
      
  return (
      <div className='homeproducts'>
          <div className='home-category'>
              Category
              <div className='category-items'>
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
          <div className='Products'>
              <p>Exclusive at Fresh & Co.</p>
              <HomeCard/>
          </div>
    </div>
  )
}
