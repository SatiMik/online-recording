
import type { RevueFormType, RevueType } from '../types/revueTypes';
import apiService from './config';


export const getRevues = async (): Promise<RevueType[]> => {
  const { data } = await apiService<RevueType[]>('/api/revue');
  return data;
};


  export const submitRevue = async (formData: RevueFormType): Promise<RevueType> => {
    const { data } = await apiService.post<RevueType>('/api/revue', formData);
    return data;
  };
  
  export const deleteRevue= async (id: RevueType['id']): Promise<RevueType['id']> =>{
    await apiService.delete(`/api/revue/${id}`);
    return id
  }
  
  export const editRevue = async (id: RevueType['id'], formData: RevueFormType): Promise<RevueType> => {
    const { data } = await apiService.patch<RevueType>(`/api/revue/${id}`, formData);
    return data;
  };
  
  export const editStatus = async (
    id: RevueType['id'],
    status: RevueFormType['status'],
  ): Promise<RevueType> => {
    const { data } = await apiService.patch<RevueType>(`/api/revue/${id}`, { status });
    return data;
  };