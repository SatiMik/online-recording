import type { MasterType } from '../types/masterAdminTypes';
import apiService from './config';

export const getMasters = async (): Promise<MasterType[]> => {
  const { data } = await apiService<MasterType[]>('/api/masters');
  return data;
};

export default getMasters;
