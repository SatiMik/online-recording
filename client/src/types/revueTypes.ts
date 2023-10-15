import type { UserType } from './userTypes';

export type RevueType = {
  id: number;
  text: string;
  status: boolean;
  userId: number;
  User: UserType;
};

export type RevueFormType = Omit<RevueType, 'id'>;
