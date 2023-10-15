import React, { useState } from 'react';
import type { SaleType } from '../../../types/saleTypes';
import { useAppDispatch } from '../../../redux/hooks';
import { deleteSaleThunk, updateSaleThunk } from '../../../redux/slices/sale/SaleThunks';

type SaleItemProps = {
  sale: SaleType;
};

export default function SaleItem({ sale }: SaleItemProps): JSX.Element {
  const [isEditing, setIsEditing] = useState(false);
  const [newDescription, setNewDescription] = useState(sale.description);

  const dispatch = useAppDispatch();
  return (
    <>
      {isEditing ? (
        <input
          type="text"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
      ) : (
        <div>{sale.description}</div>
      )}
      <img
        src={`${import.meta.env.VITE_BASE_URL}/img/${sale.img}`}
        style={{ width: '300px', height: '200px' }}
      />
      <button onClick={() => void dispatch(deleteSaleThunk(sale.id))}>Удалить</button>
      {isEditing ? (
        <button
          onClick={() => {
            dispatch(updateSaleThunk({ ...sale, description: newDescription }));
            setIsEditing(false);
          }}
        >
          Сохранить
        </button>
      ) : (
        <button onClick={() => setIsEditing(true)}>Редактировать</button>
      )}
    </>
  );
}
