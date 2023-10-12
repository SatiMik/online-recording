export type UserType = {
  id: number;
  name: string;
  phone: number;
};

export type UserSignUpType = Omit<UserType, 'id'> & { password: string };
export type UserLoginType = Omit<UserSignUpType, 'name'>;

export type UserLoadingType =
  | (UserType & { status: 'logged' })
  | { status: 'loading' }
  | { status: 'guest' };

// export type AdminLoadingType =
//   | (UserType & { isAdmin: boolean } & { status: 'logged' })
//   | { status: 'loading' }
//   | { status: 'guest' };
