import { createAsyncThunk } from '@reduxjs/toolkit';
import type { CategoryFormType, CategoryType } from '../../../types/categoryTypes';
import {
  deleteCategories,
  editCategories,
  getCategories,
  submitCategories,
} from '../../../services/categoryService';

export const getCategoryThunk = createAsyncThunk<CategoryType[]>(
  'categories/getCategoryThunk',
  async () => getCategories(),
);

export const deleteCategoryThunk = createAsyncThunk<CategoryType['id'], { id: CategoryType['id'] }>(
  'categories/deleteCategoryThunk',
  async ({ id }) => deleteCategories(id),
);

export const addCategoryThunk = createAsyncThunk<CategoryType, CategoryFormType>(
  'categories/addCategoryThunk',
  async (inputs) => submitCategories(inputs),
);

export const editCategoryThunk = createAsyncThunk<
  CategoryType,
  { id: CategoryType['id']; formData: CategoryFormType }
>('/categories/editCategoryThunk', async ({ id, formData }) => editCategories(id, formData));
