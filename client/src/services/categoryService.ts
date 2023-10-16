import type { CategoryFormType, CategoryType } from '../types/categoryTypes';
import apiService from './config';

export const getCategories = async (): Promise<CategoryType[]> => {
  const { data } = await apiService<CategoryType[]>(`/api/categories`);

  return data;
};

export const submitCategories = async (formData: CategoryFormType): Promise<CategoryType> => {
  const { data } = await apiService.post<CategoryType>('/api/categories', formData);
  return data;
};

export const deleteCategories = async (id: CategoryType['id']): Promise<CategoryType['id']> => {
  await apiService.delete(`/api/categories/${id}`);
  return id;
};

export const editCategories = async (
  id: CategoryType['id'],
  formData: CategoryFormType,
): Promise<CategoryType> => {
  const { data } = await apiService.patch<CategoryType>(`/api/categories/${id}`, formData);
  return data;
};
