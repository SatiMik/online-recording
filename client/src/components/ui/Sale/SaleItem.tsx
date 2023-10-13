import React from 'react';
import type { SaleType } from '../../../types/saleTypes';
import { useAppDispatch } from '../../../redux/hooks';
import { deleteSaleThunk, updateSaleThunk } from '../../../redux/slices/sale/SaleThunks';

type SaleItemProps = {
  sale: SaleType;
};

export default function SaleItem({ sale }: SaleItemProps): JSX.Element {
  const dispatch = useAppDispatch();
  return (
    <>
      <div>SaleCard</div>
      <div>{sale.description}</div>
      <img src={`${import.meta.env.VITE_BASE_URL}/img/${sale.img}`} />
      <button onClick={() => void dispatch(deleteSaleThunk(sale.id))}>Удалить</button>
      <button onClick={() => void dispatch(updateSaleThunk(sale.id))}>Редактировать</button>
    </>
  );
}
