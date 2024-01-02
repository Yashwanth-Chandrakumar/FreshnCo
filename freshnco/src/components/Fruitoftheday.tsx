import { useState, useEffect } from 'react';
import Modal from 'react-modal';

const Fruitoftheday = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setModalIsOpen(true);
      
    }, 30000);
    return () => clearTimeout(timeout);
  }, []);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="fruitoftheday">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Fruit of the Day Popup"
        className={`Modal ${modalIsOpen ? 'open' : ''}`}
              overlayClassName="Overlay"
      >
        <div className="product">
          <div className="product__photo">
            <div className="photo-container">
              <div className="photo-main">
                <img
                  src="https://res.cloudinary.com/john-mantas/image/upload/v1537291846/codepen/delicious-apples/green-apple-with-slice.png"
                  alt="green apple slice"
                />
              </div>
            </div>
          </div>
          <div className="product__info">
            <div className="title">
              <h1>Fruit of the day</h1>
              <span>Apple</span>
            </div>
            <div className="price">
              Rs. <span>40</span>
            </div>
            <div className="description">
              <h3>BENEFITS</h3>
              <ul>
                <li>Apples are nutritious</li>
                <li>Apples may be good for weight loss</li>
                <li>Apples may be good for bone health</li>
                <li>They're linked to a lowest risk of diabetes</li>
              </ul>
            </div>
            <button onClick={closeModal} className="buy--btn">
              Close Popup
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Fruitoftheday;
