/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from 'react';

import { Box, Button, Modal, TextField } from '@mui/material';

import { useAppDispatch } from '../../../redux/hooks';
import { loginHandlerThunk, signUpHandlerThunk } from '../../../redux/slices/user/UserThunks';
import type { UserSignUpType } from '../../../types/userTypes';
import validPhoneNumber from '../../../utils/validNumber';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

type AuthModalProps = {
  auth: boolean;
  setAuth: (auth: boolean) => void;
  authType: number;
  setAuthType: (authType: number) => void;
};

// попробовать прописать закрытие на аутсайд

export default function AuthModal({
  auth,
  setAuth,
  authType,
  setAuthType,
}: AuthModalProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [input, setInput] = useState<UserSignUpType>({
    name: '',
    phone: '',
    password: '',
    isAdmin: false,
  });

  // const [close, setClose] = useState(true);

  //   const handleClose = (): void => {
  //     setClose(false);
  //   };
  // }
  const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const submitHandler: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      if (authType === 1) {
        await dispatch(signUpHandlerThunk(input));
      } else {
        await dispatch(loginHandlerThunk(input));
      }
      setAuth(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      open={auth}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      onClick={() => {
        setAuth(false);
      }}
    >
      <Box
        sx={style}
        display="flex"
        flexDirection="column"
        alignItems="center"
        component="form"
        onSubmit={submitHandler}
      >

        {authType === 1 && (
          <TextField
            variant="outlined"
            name="name"
            placeholder="Ваше имя"
            value={input.name}
            onChange={changeHandler}
          />
        )}

        <TextField
          variant="outlined"
          name="phone"
          placeholder="Ваш номер телефона"
          type="tel"
          value={input.phone}
          onChange={changeHandler}
        />
        <TextField
          variant="outlined"
          name="password"
          placeholder="Ваш пароль"
          type="password"
          value={input.password}
          onChange={changeHandler}
        />
        <Box sx={{ margin: '20px 10px' }}>

          <Button type="submit" variant="outlined" size="large"
            onClick={() => {
              setAuth(false);
            }}
          >
            Закрыть
          </Button>
          <Button type="submit" variant="outlined" size="large">
            {authType === 1 ? 'Регистрация' : 'Вход'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
