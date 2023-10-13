import React from 'react';

import SaleFrom from '../ui/Sale/SaleFrom';
import SaleItem from '../ui/Sale/SaleItem';
import { useAppSelector } from '../../redux/hooks';

export default function SalePage(): JSX.Element {
  const sale = useAppSelector((store) => store.sale);

  return (
    <>
      <SaleFrom />
      {sale.map((el) => (
        <SaleItem sale={el} key={el.id} />
      ))}
    </>
  );
}
