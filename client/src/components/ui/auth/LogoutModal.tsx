import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useAppDispatch } from '../../../redux/hooks';
import { logoutHandlerThunk } from '../../../redux/slices/user/UserThunks';

type LogoutConfirmDialogProrpsType = {
  isLogout: boolean;
  setIsLogout: (isLogout: boolean) => void;
};

export default function LogoutModal({
  isLogout,
  setIsLogout,
}: LogoutConfirmDialogProrpsType): JSX.Element {
  const dispatch = useAppDispatch();
  const handleClose = (): void => {
    setIsLogout(false);
  };
  return (
    <Dialog open={isLogout} onClose={handleClose} aria-labelledby="alert-dialog-title-logout">
      <DialogTitle id="alert-dialog-title-logout">Вы уверены, что хотите выйти?</DialogTitle>
      <DialogActions>
        <Button style = {{backgroundColor:'violet'}} onClick={handleClose} autoFocus>
          Нет
        </Button>
        <Button
        
          onClick={() => {
            void dispatch(logoutHandlerThunk());
            setIsLogout(false);
          }}
        >
          Выйти
        </Button>
      </DialogActions>
    </Dialog>
  );
}
