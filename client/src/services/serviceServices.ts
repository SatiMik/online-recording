import type { CategoryType } from '../types/categoryTypes';
import type { ServiceFormType, ServiceType, ServicesMastersType } from '../types/serviceTypes';
import apiService from './config';

export const getServices = async (id: CategoryType['id']): Promise<ServiceType[]> => {
  const { data } = await apiService<ServiceType[]>(`/api/service/services/${id}`);

  return data;
};

export const submitService = async (formData: ServiceFormType): Promise<ServiceType> => {
  const { data } = await apiService.post<ServiceType>('/api/service/', formData);
  return data;
};

export const deleteService = async (id: ServiceType['id']): Promise<ServiceType['id']> => {
  await apiService.delete(`/api/service/${id}`);
  return id;
};

export const editService = async (
  id: ServiceType['id'],
  formData: ServiceFormType,
): Promise<ServiceType> => {
  const { data } = await apiService.patch<ServiceType>(`/api/service/${id}`, formData);
  return data;
};

export const getService = async (id: ServiceType['id']): Promise<ServicesMastersType> => {
  const { data } = await apiService<ServicesMastersType>(`/api/service/${id}`);
  return data;
};
