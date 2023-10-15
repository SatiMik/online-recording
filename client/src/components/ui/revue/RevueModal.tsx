/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from 'react';

import { Box, Button, Modal, TextField } from '@mui/material';
import { useAppDispatch } from '../../../redux/hooks';
import { editMasterThunk } from '../../../redux/slices/master/MasterThunks';
import type { RevueFormType, RevueType } from '../../../types/revueTypes';
import { editRevueThunk } from '../../../redux/slices/revue/RevueThunks';

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

type RevueModalProps = {
  revue: RevueType;
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function RevueModal({ revue, open, setOpen }: RevueModalProps): JSX.Element {
  const [input, setInput] = useState<RevueFormType>({
    text: revue.text,
    status: revue.status,
    userId: revue.userId,
  });
  const dispatch = useAppDispatch();
  const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <TextField
          name="text"
          variant="outlined"
          placeholder="Текст отзыва"
          value={input.text}
          onChange={changeHandler}
        />

        <Button
          onClick={() => {
            void dispatch(editRevueThunk({ id: revue.id, formData: input }));
            setOpen(false);
          }}
        >
          Сохранить изменения
        </Button>
      </Box>
    </Modal>
  );
}
