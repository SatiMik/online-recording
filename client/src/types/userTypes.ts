export type UserType = {
  id: number;
  name: string;
  phone: string;
  isAdmin: boolean;
};

export type UserSignUpType = Omit<UserType, 'id'> & { password: string };
export type UserLoginType = Omit<UserSignUpType, 'name'>;

export type UserLoadingType =
  | (UserType & { status: 'logged' })
  | { status: 'loading' }
  | { status: 'guest' };


