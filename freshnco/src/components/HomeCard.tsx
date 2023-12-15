import { useNavigate } from "react-router-dom";

export default function HomeCard() {
    const cardData = [
        {
          title: 'Spinach',
          description: 'Rich in iron, vitamins A, C, and K. Good for overall health and immune system.',
          image: 'https://media.istockphoto.com/id/121286472/photo/baby-spinach-in-the-garden.jpg?s=612x612&w=0&k=20&c=wPG7LZbynB8aDOcqf3yNM1dOoYdJn0EQed3QWB-mYnQ=', 
        },
        {
          title: 'Blueberries',
          description: 'Packed with antioxidants, vitamin C, and fiber. Supports brain health.',
          image: 'https://img.freepik.com/premium-photo/close-up-blueberries-with-water-droplets-them_667286-2754.jpg', 
        },
        {
          title: 'Avocado',
          description: 'High in healthy monounsaturated fats, vitamins, and minerals. Supports heart health.',
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Avocado_Hass_-_single_and_halved.jpg/640px-Avocado_Hass_-_single_and_halved.jpg', 
        },
        {
          title: 'Broccoli',
          description: 'Rich in fiber, vitamins C and K. Supports digestion and overall health.',
          image: 'https://media.istockphoto.com/id/147060621/photo/broccoli.jpg?s=612x612&w=0&k=20&c=I1cCxLxci23nrSNZb7o6gsqUYB911z6IZlLdEOk4I9M=',
        },
        {
            title: 'Salmon',
            description: 'High in omega-3 fatty acids, protein, and vitamin D. Supports heart and brain health.',
            image: 'https://cdn.pixabay.com/photo/2016/03/05/19/02/salmon-1238248_640.jpg',
          },
          {
            title: 'Quinoa',
            description: 'A complete protein source, rich in fiber, vitamins, and minerals. Supports energy and digestion.',
            image: 'https://img.freepik.com/premium-photo/dry-quinoa-croup-closeup-full-frame_143127-384.jpg?w=2000',
          },
          {
            title: 'Kale',
            description: 'Packed with vitamins A, C, and K, and rich in antioxidants. Supports eye health and immune function.',
            image: 'https://media.istockphoto.com/id/1218679698/photo/fresh-kale-salad-isolated-on-white-background-raw-kale-curly-leaves-food-concept.jpg?b=1&s=612x612&w=0&k=20&c=uhn5CchMttka1KTSI8Mx5geseHq-_RDY5uLeAuUa9vE=',
          },
          {
            title: 'Sweet Potatoes',
            description: 'High in vitamins A and C, fiber, and antioxidants. Supports skin health and boosts the immune system.',
            image: 'https://www.acouplecooks.com/wp-content/uploads/2019/11/Roasted-Sweet-Potatoes-008.jpg',
          },
          {
            title: 'Greek Yogurt',
            description: 'Rich in protein, probiotics, and calcium. Supports gut health and provides a good source of energy.',
            image: 'https://www.notenoughcinnamon.com/wp-content/uploads/2021/03/No-Mayo-Potato-Salad-with-Greek-Yogurt-Dressing-1.jpg',
          },
  ];
  let navigate = useNavigate();
  const handleClick = () => {
    navigate("/products")
  }
    return (
      
      <div className="homecards">
          {cardData.map((card, index) => (
        <div key={index} className="cardh" style={{ backgroundImage: `url(${card.image})`,backgroundSize:"cover",backgroundPosition: "center"  }}>
          <div className="contenth">
            <h2 className="titleh">{card.title}</h2>
            <p className="copyh">{card.description}</p>
            <button className="btnh" onClick={handleClick}>View Details</button>
          </div>
        </div>
      ))}
    </div>
  )
}
