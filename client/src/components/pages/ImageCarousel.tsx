import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import salon1 from '../../../public/salon1.jpg';
import salon2 from '../../../public/salon2.jpg';
import salon3 from '../../../public/salon3.jpg';

const imageStyle = {
  maxWidth: '90%', // Устанавливаем максимальную ширину изображения
  border: '2px solid #333', // Добавляем рамку
};

export default function ImageCarousel(): JSX.Element {
  return (
    <Carousel autoPlay interval={3000} infiniteLoop>
      <div>
        <img src={salon1} alt="Salon 1" style={imageStyle} />
        <p className="legend">Salon 1</p>
      </div>
      <div>
        <img src={salon2} alt="Salon 2" style={imageStyle} />
        <p className="legend">Salon 2</p>
      </div>
      <div>
        <img src={salon3} alt="Salon 3" style={imageStyle} />
        <p className="legend">Salon 3</p>
      </div>
    </Carousel>
  );
}
