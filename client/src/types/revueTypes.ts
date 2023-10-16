import type { UserType } from './userTypes';

export type RevueType = {
  id: number;
  text: string;
  status: boolean;
  userId: number;
  rating: number;
  date: Date;
  User: UserType;
};

export type RevueFormType = Omit<RevueType, 'id'>;
