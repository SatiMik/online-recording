import type { ApplicationFormType, ApplicationType } from '../types/applicationTypes';
import apiService from './config';

export const getApplications = async (): Promise<ApplicationType[]> => {
    const { data } = await apiService<ApplicationType[]>('/api/application');
    return data;
};
export const submitApplication = async (formData: ApplicationFormType): Promise<ApplicationType> => {
    const { data } = await apiService.post<ApplicationType>('/api/application', formData);
    return data;
};
