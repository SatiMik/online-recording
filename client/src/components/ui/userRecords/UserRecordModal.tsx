import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useAppDispatch } from '../../../redux/hooks';
import { deleteUserRecordThunk } from '../../../redux/slices/userRecords/UserRecordsThunks';
import type { UserRecordType } from '../../../types/userRecordTypes';

type UserRecordModalProrpsType = {
  open: boolean;
  setOpen: (open: boolean) => void;
  userRecord: UserRecordType;
};

export default function UserRecordModal({
  open,
  setOpen,
  userRecord,
}: UserRecordModalProrpsType): JSX.Element {
  const dispatch = useAppDispatch();
  const handleClose = (): void => {
    setOpen(false);
  };
  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title-logout">
      <DialogTitle id="alert-dialog-title-logout">
        Вы уверены, что хотите отменить запись?
      </DialogTitle>
      <DialogActions>
        <Button style={{ backgroundColor: 'violet' }} onClick={handleClose} autoFocus>
          Нет
        </Button>
        <Button
          onClick={() => {
            void dispatch(deleteUserRecordThunk(userRecord.id));
            setOpen(false);
          }}
        >
          Да
        </Button>
      </DialogActions>
    </Dialog>
  );
}
