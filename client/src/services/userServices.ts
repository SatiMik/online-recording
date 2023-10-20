import type { UserLoginType, UserSignUpType, UserType, UserCheckCode } from '../types/userTypes';
import apiService from './config';

export const checkUser = async (): Promise<UserType> => {
  const { data } = await apiService<UserType>('/api/user/check');
  return data;
};

export const userSignUp = async (formData: UserSignUpType): Promise<UserType> => {
  const { data } = await apiService.post<UserType>('/api/user/signup', formData);
  return { ...data };
};

export const userLogin = async (formData: UserLoginType): Promise<UserType> => {
  const { data } = await apiService.post<UserType>('/api/user/login', formData);
  return { ...data };
};

export const userLogout = async (): Promise<UserType> => apiService('/api/user/logout');

// export const checkCode = async (): Promise<UserCheckCode> => apiService('api/user/code');

export const checkCode = async (formData: UserCheckCode): Promise<UserType> => {
  const { data } = await apiService.post<UserType>('/api/user/code', formData);
  return { data };
};
