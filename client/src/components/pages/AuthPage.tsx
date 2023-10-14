import { Box, Button, TextField } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch } from '../../redux/hooks';
import { loginHandlerThunk, signUpHandlerThunk } from '../../redux/slices/user/UserThunks';
import type { UserLoginType, UserSignUpType } from '../../types/userTypes';
// прикрутить валидацию на телефон
export default function AuthPage(): JSX.Element {
  const { auth } = useParams();
  const dispatch = useAppDispatch();

  const submitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.currentTarget));

    return auth === 'signup'
      ? void dispatch(signUpHandlerThunk(formData as UserSignUpType))
      : void dispatch(loginHandlerThunk(formData as UserLoginType));
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      component="form"
      onSubmit={submitHandler}
    >
      {auth === 'signup' && <TextField variant="outlined" name="name" label="Ваше имя" />}
      <TextField variant="outlined" name="phone" label="Ваш номер телефона" type="tel" />
      <TextField variant="outlined" name="password" label="password" type="password" />
      <Button type="submit" variant="outlined" size="large">
        {auth === 'signup' ? 'Sign Up' : 'Login'}
      </Button>
    </Box>
  );
}
