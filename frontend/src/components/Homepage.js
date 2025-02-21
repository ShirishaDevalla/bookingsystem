import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Image1 from '../images/image1.jpg'
import Image2 from '../images/image2.jpg'

const Homepage = () => {
  const [index, setIndex] = useState(0)
  const images = [Image1, Image2];
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/addnewentry')
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((preIndex) => (preIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="homepage-container" style={{ position: 'relative', height: '100vh' }}>
      
      <div className="slideshow-container" style={{ position: 'absolute', top: '0', left: '0', right: '0', bottom: '0' }}>
        {images.map((image, idx) => (
          <div key={idx} className="slide" style={{ display: index === idx ? 'block' : 'none', position: 'absolute', width: '100%', height: '100%', backgroundSize: 'cover', backgroundPosition: 'center'}}>
            <img src={image} alt={`image${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        ))}
      </div>

      
      <motion.div
        className="welcome-text" style={{ position: 'absolute', top: '50%', left: '30%', transform: 'translate(-50%, -50%)', fontFamily: "'Space Grotesk', sans-serif", color: '#fff', textAlign: 'center', fontSize: '36px', fontWeight: 'bold'}}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
      >
        Welcome to Ticket Booking Section
      </motion.div>

      
      <motion.div
        className="button-container"
        style={{ position: 'absolute',top: '60%', left: '40%',  transform: 'translateX(-50%)', textAlign: 'center'  }}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }} >
        <button
          style={{ color: 'black', background: '#A9A9A9', fontSize: '40px', marginTop: '20px', cursor: 'pointer',  border: '4px solid', borderRadius: '6px', width: '300px', padding: '10px'}}
          onClick={handleClick} >
          Book Now
        </button>
      </motion.div>
    </div>
  )
}

export default Homepage;
