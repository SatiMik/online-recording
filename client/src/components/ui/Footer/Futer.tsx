import React from 'react';
import './Footer.css';
import Map from './Map';

function Footer(): JSX.Element {
  return (
    <div>
      <footer className="footer-container">
        <div className="map-container">
          <Map />
        </div>
      </footer>
    </div>
  );
}

export default Footer;