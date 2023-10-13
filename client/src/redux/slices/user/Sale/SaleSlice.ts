import { createSlice } from '@reduxjs/toolkit';
import type { SaleType } from '../../../../types/Sale';
import { deleteSaleThunk, getSaleThunk, updateSaleThunk } from './SaleThunks';

const initialState: SaleType[] = [];

export const saleSlice = createSlice({
  name: 'sale',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSaleThunk.fulfilled, (state, action) => action.payload);
    builder.addCase(deleteSaleThunk.fulfilled, (state, action) =>
      state.filter((el) => el.id !== action.payload),
    );
    builder.addCase(updateSaleThunk.fulfilled, (state, action) => {
      const updatedSale = action.payload;
      const index = state.findIndex((sale) => sale.id === updatedSale.id);
      if (index !== -1) {
        state[index] = updatedSale;
      }
    });
  },
});

export default saleSlice.reducer;
