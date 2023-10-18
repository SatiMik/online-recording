import type { MasterServiceFormType, MasterServiceType } from '../types/masterServiceType';
import apiService from './config';


export const getMasterServices = async (): Promise<MasterServiceType[]> => {
    // console.log(masterId);
    // const id = masterId.masterId;
    const { data } = await apiService<MasterServiceType[]>(`/api/online-record/masters`);
    return data;
};


export const submitMasterServices = async (formData: MasterServiceFormType): Promise<MasterServiceType> => {
    const { data } = await apiService.post<MasterServiceType>('/api/online-record/masters', formData);
    return data;
};
