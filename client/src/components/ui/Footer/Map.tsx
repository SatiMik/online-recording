import React, { useEffect, useRef } from 'react';

function Map(): JSX.Element {
  const ymapRef = useRef<ymaps.Map | null>(null);
  const placemarkRef = useRef<ymaps.Placemark | null>(null);

  const loadMap = () => {
    if (window.ymaps) {
      window.ymaps.ready(() => {
        ymapRef.current = new (window.ymaps.Map as any)('map', {
          center: [55.743526, 37.629797],
          zoom: 17,
          controls: []
        });

        // Создаем метку
        placemarkRef.current = new (window.ymaps.Placemark as any)([55.743526, 37.629797], {
          hintContent: 'Эльбрус гламур',
          balloonContent: 'Это метка с заданными координатами',
        });

        // Добавляем метку на карту
        ymapRef.current.geoObjects.add(placemarkRef.current);
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
