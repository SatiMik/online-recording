import { createAsyncThunk } from '@reduxjs/toolkit';
import type { SaleType } from '../../../types/saleTypes';
import apiService from '../../../services/config';

export const getSaleThunk = createAsyncThunk<SaleType[]>('sales/getSales', async () => {
  const { data } = await apiService<SaleType[]>('/sales');
  return data;
});

export const addSaleThunk = createAsyncThunk<SaleType, FormData>(
  'sales/addSale',
  async (formData) => {
    const { data } = await apiService.post<SaleType>('/sales', formData);
    return data;
  },
);

export const deleteSaleThunk = createAsyncThunk<SaleType['id'], SaleType['id']>(
  'sales/deleteSale',
  async (id) => {
    await apiService.delete(`/sales/${id}`);
    return id;
  },
);

export const updateSaleThunk = createAsyncThunk<SaleType, SaleType>(
  'sales/updateSale',
  (formData) => apiService.patch<SaleType>(`/sales/${formData.id}`, formData).then((res) => res.data),
);
