import React, { useEffect, useRef } from 'react';

function Map(): JSX.Element {
  const ymapRef = useRef(null);

  const loadMap = () => {
    // запуск карты
    if (window.ymaps) {
      window.ymaps.ready(() => {
        ymapRef.current = new window.ymaps.Map('map', {
          center: [55.751574, 37.573856],
          zoom: 10,
        });
        const myMap = ymapRef.current;
      });
    }
  };

  useEffect(() => {
    loadMap();
  }, []);

  return (
    <div
      id="map"
      style={{
        width: '70%',
        height: '300px',
        border: '3px solid #ccc',
        borderRadius: '5px',
        margin: '0 auto',
      }}
    />
  );
}

export default Map;
