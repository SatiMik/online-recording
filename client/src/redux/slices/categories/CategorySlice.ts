import { createSlice } from '@reduxjs/toolkit';
import {
  getCategoryThunk,
  deleteCategoryThunk,
  addCategoryThunk,
  editCategoryThunk,
} from './CategoryThunks';
import type { CategoryType } from '../../../types/categoryTypes';

type CategoryState = CategoryType[];
const initialState: CategoryState = [];

export const CategorySlice = createSlice({
  name: 'services',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategoryThunk.fulfilled, (state, action) => action.payload);
    builder.addCase(getCategoryThunk.rejected, (state, action) => []);

    builder.addCase(deleteCategoryThunk.fulfilled, (state, action) =>
      state.filter((el) => el.id !== action.payload),
    );
    builder.addCase(deleteCategoryThunk.rejected, (state, action) => state);

    builder.addCase(addCategoryThunk.fulfilled, (state, action) => [action.payload, ...state]);
    builder.addCase(addCategoryThunk.rejected, (state, action) => state);

    builder.addCase(editCategoryThunk.fulfilled, (state, action) => {
      const index = state.findIndex((el) => el.id === action.payload.id);
      state[index] = action.payload;
    });
    builder.addCase(editCategoryThunk.rejected, (state, action) => state);
  },
});

export default CategorySlice.reducer;
