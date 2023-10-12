import { createSlice } from '@reduxjs/toolkit';
import type { MasterType } from '../../../types/masterTypes';
import {
  addMasterThunk,
  deleteMasterThunk,
  editMasterThunk,
  getMastersThunk,
} from './MasterThunks';

type MasterState = MasterType[];
const initialState: MasterState = [];

export const MasterSlice = createSlice({
  name: 'masters',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMastersThunk.fulfilled, (state, action) => action.payload);
    builder.addCase(getMastersThunk.rejected, (state, action) => []);

    builder.addCase(deleteMasterThunk.fulfilled, (state, action) =>
      state.filter((el) => el.id !== action.payload),
    );
    builder.addCase(deleteMasterThunk.rejected, (state, action) => state);

    builder.addCase(addMasterThunk.fulfilled, (state, action) => [action.payload, ...state]);
    builder.addCase(addMasterThunk.rejected, (state, action) => state);

    builder.addCase(editMasterThunk.fulfilled, (state, action) => {
      const index = state.findIndex((el) => el.id === action.payload.id);
      state[index] = action.payload;
    });
    builder.addCase(editMasterThunk.rejected, (state, action) => state);
  },
});

export default MasterSlice.reducer;
