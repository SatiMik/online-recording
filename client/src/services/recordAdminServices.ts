import type { RecordFormType, RecordsFromBackType } from '../types/recordAdminTypes';
import apiService from './config';

export const getRecords = async (): Promise<RecordsFromBackType[]> => {
  const { data } = await apiService<RecordsFromBackType[]>('/api/records');
  return data;
};

export const submitRecord = async (formData: RecordFormType): Promise<RecordsFromBackType[]> => {
  const { data } = await apiService.post<RecordsFromBackType[]>('/api/records', formData);
  return data;
};

export const deleteRecord = async (id: number): Promise<RecordsFromBackType[]> => {
  console.log('-------------------------', id);
  const { data } = await apiService.delete<RecordsFromBackType[]>(`/api/records/${id}`);
  return data;
};
