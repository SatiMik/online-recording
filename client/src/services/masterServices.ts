import type { MasterFormType, MasterType, MasterWorkType } from '../types/masterTypes';
import apiService from './config';


export const getMasters = async (): Promise<MasterType[]> => {
  const { data } = await apiService<MasterType[]>('/api/master');
  return data;
};



  export const submitMaster = async (formData: MasterFormType): Promise<MasterType> => {
    const { data } = await apiService.post<MasterType>('/api/master', formData);
    return data;
  };
  
  export const deleteMaster= async (id: MasterType['id']): Promise<MasterType['id']> =>{
    await apiService.delete(`/api/master/${id}`);
    return id
  }
  
  export const editMaster = async (id: MasterType['id'], formData: MasterFormType): Promise<MasterType> => {
    const { data } = await apiService.patch<MasterType>(`/api/master/${id}`, formData);
    return data;
  };
  
  
export const getWorks = async (id: MasterType['id']):Promise<MasterWorkType[]> => {
  const {data} = await apiService<MasterWorkType[]>(`/api/master/works/${id}`)
  return data
}