/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from 'react';

import { Box, Button, Modal, TextField, Typography } from '@mui/material';

import { useAppDispatch } from '../../../redux/hooks';
import {
  loginHandlerThunk,
  signUpHandlerThunk,
  userCheckCodeThunk,
} from '../../../redux/slices/user/UserThunks';
import type { UserCheckCode, UserSignUpType } from '../../../types/userTypes';
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

  const [code, setCode] = useState(false);

  const [inputCode, setInputCode] = useState({});

  const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const codeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputCode((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitCodeHandler: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    void dispatch(userCheckCodeThunk(inputCode));
  };

  const submitHandler: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      if (authType === 1) {
        await dispatch(signUpHandlerThunk(input));
        setCode(true);
      } else {
        await dispatch(loginHandlerThunk(input));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      open={auth}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} display="flex" flexDirection="column" alignItems="center" component="form">
        {code ? (
          <>
            <TextField
              variant="outlined"
              name="code"
              placeholder="Введите код"
              onChange={codeHandler}
            />
            <Button
              onClick={(e) => {
                submitCodeHandler(e);
                setAuth(false);
                setCode(false);
              }}
            >
              Отправить
            </Button>
          </>
        ) : (
          <>
            {authType === 1 && (
              <>
                <TextField
                  variant="outlined"
                  name="name"
                  placeholder="Ваше имя"
                  value={input.name}
                  onChange={changeHandler}
                />

                {/* <Typography>Не верный код</Typography> */}
              </>
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
            <Button onClick={submitHandler} type="submit" variant="outlined" size="large">
              {authType === 1 ? 'Регистрация' : 'Вход'}
            </Button>
          </>
        )}
      </Box>
    </Modal>
  );
}
