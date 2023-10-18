import React, { useEffect } from 'react';
import SaleFrom from '../ui/Sale/SaleFrom';
import SaleItem from '../ui/Sale/SaleItem';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getSaleThunk } from '../../redux/slices/sale/SaleThunks';

export default function SalePage(): JSX.Element {

  const sale = useAppSelector((store) => store.sale);

  const dispatch = useAppDispatch();
  
  useEffect(() => {
    void dispatch(getSaleThunk());
  }, []);
  return (
    <>
      <SaleFrom />
      {sale.map((el) => (
        <SaleItem sale={el} key={el.id} />
      ))}
    </>
  );
}
