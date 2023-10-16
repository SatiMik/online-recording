import { createSlice } from '@reduxjs/toolkit';
import type { RevueType } from '../../../types/revueTypes';
import { addRevueThunk, deleteRevueThunk, editRevueThunk, getRevuesThunk } from './RevueThunks';

type RevueState = RevueType[];
const initialState: RevueState = [];

export const RevueSlice = createSlice({
  name: 'revues',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRevuesThunk.fulfilled, (state, action) => action.payload);
    builder.addCase(getRevuesThunk.rejected, (state, action) => []);

    builder.addCase(deleteRevueThunk.fulfilled, (state, action) =>
      state.filter((el) => el.id !== action.payload),
    );
    builder.addCase(deleteRevueThunk.rejected, (state, action) => state);

    builder.addCase(addRevueThunk.fulfilled, (state, action) => [action.payload, ...state]);
    builder.addCase(addRevueThunk.rejected, (state, action) => state);

    builder.addCase(editRevueThunk.fulfilled, (state, action) => {
      const index = state.findIndex((el) => el.id === action.payload.id);
      state[index] = action.payload;
    });
    builder.addCase(editRevueThunk.rejected, (state, action) => state);
  },
});

export default RevueSlice.reducer;
