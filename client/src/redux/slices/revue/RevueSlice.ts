import { createSlice } from '@reduxjs/toolkit';
import type { RevueType } from '../../../types/revueTypes';
import {
  addRevueThunk,
  changeStatusThunk,
  deleteRevueThunk,
  editRevueThunk,
  getRevuesThunk,
  getSortedByABSDateRevuesThunk,
  getSortedByDESCDateRevuesThunk,
} from './RevueThunks';

type RevueState = RevueType[];
const initialState: RevueState = [];

export const RevueSlice = createSlice({
  name: 'revues',
  initialState,
  reducers: {
    sortLow: (state) => state.toSorted((a, b) => a.rating - b.rating),
    sortHigh: (state) => state.toSorted((a, b) => b.rating - a.rating),
  },
  extraReducers: (builder) => {
    builder.addCase(getRevuesThunk.fulfilled, (state, action) => action.payload);
    builder.addCase(getRevuesThunk.rejected, (state, action) => []);
    builder.addCase(getSortedByABSDateRevuesThunk.fulfilled, (state, action) =>
      action.payload.toSorted((a, b) => a.rating - b.rating),
    );
    builder.addCase(getSortedByABSDateRevuesThunk.rejected, (state, action) => []);

    builder.addCase(getSortedByDESCDateRevuesThunk.fulfilled, (state, action) =>
      action.payload.toSorted((a, b) => b.rating - a.rating),
    );
    builder.addCase(getSortedByDESCDateRevuesThunk.rejected, (state, action) => []);
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
    builder.addCase(changeStatusThunk.fulfilled, (state, action) => {
      const index = state.findIndex((el) => el.id === action.payload.id);
      state[index] = action.payload;
    });
    builder.addCase(changeStatusThunk.rejected, (state, action) => state);
  },
});

export const { sortHigh, sortLow } = RevueSlice.actions;
export default RevueSlice.reducer;
