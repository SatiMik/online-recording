import { createSlice } from '@reduxjs/toolkit';
import { getMastersThunk } from './MasterThunks';
import type { MasterType } from '../../../types/masterAdminTypes';

type MastersState = MasterType[];
const initialState: MastersState = [];

export const mastersSlice = createSlice({
  name: 'masters',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMastersThunk.fulfilled, (state, action) => action.payload);
    builder.addCase(getMastersThunk.rejected, (state, action) => []);
  },
});

export default mastersSlice.reducer;
