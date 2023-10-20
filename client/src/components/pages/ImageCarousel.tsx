import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import m2 from '../../../public/MainPageMulter/m2.png';
// import salon1 from '../../../public/salon1.jpg';
import salon2 from '../../../public/salon2.jpg';
import salon3 from '../../../public/salon3.jpg';

const imageStyle = {
  maxWidth: '90%', // Устанавливаем максимальную ширину изображения
  border: '2px solid #333', // Добавляем рамку
};
export default function ImageCarousel(): JSX.Element {
  return (
    <Carousel
      autoPlay
      interval={3000}
      infiniteLoop
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <div style={{ width: '100%', height: '400px', position: 'relative' }}>
        <img
          src={m2}
          alt="Salon 1"
          style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
        />
        {/* <p className="legend" style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', color: 'white', fontSize: '24px', fontWeight: 'bold' }}>Salon 1</p> */}
      </div>
      <div style={{ width: '100%', height: '400px', position: 'relative' }}>
        <img
          src={salon2}
          alt="Salon 2"
          style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
        />
        {/* <p className="legend" style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', color: 'white', fontSize: '24px', fontWeight: 'bold' }}>Salon 2</p> */}
      </div>
      <div style={{ width: '100%', height: '400px', position: 'relative' }}>
        <img
          src={salon3}
          alt="Salon 3"
          style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
        />
        {/* <p className="legend" style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', color: 'white', fontSize: '24px', fontWeight: 'bold' }}>Salon 3</p> */}
      </div>
    </Carousel>
  )
}