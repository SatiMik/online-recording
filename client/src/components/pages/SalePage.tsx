import React from 'react';
import SaleCard from '../ui/Sale/SaleCard';
import SaleFrom from '../ui/Sale/SaleFrom';

export default function SalePage(): JSX.Element {
  return (
    <>
      <SaleFrom />
      <SaleCard />
    </>
  );
}
