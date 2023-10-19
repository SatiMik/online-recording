import { createSlice } from '@reduxjs/toolkit';
import type { ServiceType } from '../../../types/serviceAdminTypes';
import { getServicesThunk } from './ServiceThunk';

type ServicesState = ServiceType[];
const initialState: ServicesState = [];

export const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getServicesThunk.fulfilled, (state, action) => action.payload);
    builder.addCase(getServicesThunk.rejected, (state, action) => []);
  },
});

export default servicesSlice.reducer;
