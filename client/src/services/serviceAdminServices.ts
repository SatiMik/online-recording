import type { ServiceType } from '../types/serviceAdminTypes';
import apiService from './config';

export const getServices = async ({
  id,
  status,
}: {
  id: number;
  status: number;
}): Promise<ServiceType[]> => {
  const { data } = await apiService<ServiceType[]>(`/api/services/${id}/${status}`);
  return data;
};

export default getServices;
