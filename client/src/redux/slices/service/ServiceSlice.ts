import { createSlice } from '@reduxjs/toolkit';

import type { ServiceType } from '../../../types/serviceTypes';
import {
  addServiceThunk,
  deleteServiceThunk,
  editServiceThunk,
  getOneServiceThunk,
  getServiceThunk,
} from './ServiceThunks';

type ServiceState = ServiceType[];
const initialState: ServiceState = [];

export const ServiceSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getServiceThunk.fulfilled, (state, action) => action.payload);
    builder.addCase(getServiceThunk.rejected, (state, action) => []);

    builder.addCase(deleteServiceThunk.fulfilled, (state, action) =>
      state.filter((el) => el.id !== action.payload),
    );
    builder.addCase(deleteServiceThunk.rejected, (state, action) => state);

    builder.addCase(addServiceThunk.fulfilled, (state, action) => [action.payload, ...state]);
    builder.addCase(addServiceThunk.rejected, (state, action) => state);

    builder.addCase(editServiceThunk.fulfilled, (state, action) => {
      const index = state.findIndex((el) => el.id === action.payload.id);
      state[index] = action.payload;
    });
    builder.addCase(editServiceThunk.rejected, (state, action) => state);

  },
  
});

export default ServiceSlice.reducer;
