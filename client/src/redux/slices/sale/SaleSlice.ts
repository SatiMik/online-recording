import { createSlice } from '@reduxjs/toolkit';
import type { SaleType } from '../../../types/saleTypes';
import { deleteSaleThunk, getSaleThunk, updateSaleThunk, addSaleThunk } from './SaleThunks';

const initialState: SaleType[] = [];

export const saleSlice = createSlice({
  name: 'sale',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getSaleThunk.fulfilled,
      (state, action) => action.payload,
      
    );// Возвращаем новое состояние на основе action.payload

    builder.addCase(
      addSaleThunk.fulfilled,
      (state, action) => [...state, action.payload], // Добавляем новый элемент к текущему состоянию
    );

    builder.addCase(
      deleteSaleThunk.fulfilled,
      (state, action) => state.filter((el) => el.id !== action.payload), // Удаляем элемент из текущего состояния
    );

    builder.addCase(updateSaleThunk.fulfilled, (state, action) => {
      const updatedSale = action.payload;
      return state.map((sale) => (sale.id === updatedSale.id ? updatedSale : sale)); // Обновляем элемент в текущем состоянии
    });
  },
});

export default saleSlice.reducer;
