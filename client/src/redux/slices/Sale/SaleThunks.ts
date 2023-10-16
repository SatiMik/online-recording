import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { SaleFormType, SaleType } from '../../../../types/Sale';

export const getSaleThunk = createAsyncThunk<SaleType[]>('sales/getSales', async () => {
  const { data } = await axios<SaleType[]>('/sales');
  return data;
});

export const addSaleThunk = createAsyncThunk<SaleType, SaleFormType>(
  'sales/addSale',
  async (formData) => {
    const { data } = await axios.post<SaleType>('/sales', formData);
    return data;
  },
);

export const deleteSaleThunk = createAsyncThunk<SaleType['id'], SaleType['id']>(
  'sales/deleteSale',
  async (id) => {
    await axios.delete(`/sales/${id}`);
    return id;
  },
);

export const updateSaleThunk = createAsyncThunk<SaleType, SaleType>(
  'sales/updateSale',
  (formData) => axios.patch<SaleType>(`/sales/${formData.id}`, formData).then((res) => res.data),
);
