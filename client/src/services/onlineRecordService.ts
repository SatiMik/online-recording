import type { OnlineRecordFormType, OnlineRecordType } from '../types/onlineRecordTypes';
import apiService from './config';

// eslint-disable-next-line import/prefer-default-export
export const addRecord = async (formData: OnlineRecordFormType): Promise<OnlineRecordType> => {
  const { data } = await apiService.post<OnlineRecordType>('/api/online-record', formData);
  return data;
};
