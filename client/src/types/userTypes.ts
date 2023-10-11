export type UserType = {
    id: number;
    phone: number;
    role: boolean;
};

export type UserSignUpType = Omit<UserType, 'id'> & { password: string };
export type UserLoginType = Omit<UserSignUpType, 'phone'>;

export type UserLoadingType =
    | (UserType & { status: 'logged' })
    | { status: 'loading' }
    | { status: 'guest' };