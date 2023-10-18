/* eslint-disable import/prefer-default-export */
import type { UserRecordType } from '../types/userRecordTypes';
import apiService from './config';

export const getUserRecords = async (): Promise<UserRecordType[]> => {
  const { data } = await apiService<UserRecordType[]>('/api/user-records');
  return data;
};

export const deleteUserRecord = async (id: UserRecordType['id']): Promise<UserRecordType['id']> => {
  await apiService.delete(`/api/user-records/${id}`);
  return id;
};
