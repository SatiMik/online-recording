/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from 'react';

import { Box, Button, Modal, TextField } from '@mui/material';
import type { MasterFormType, MasterType } from '../../../types/masterTypes';
import { useAppDispatch } from '../../../redux/hooks';
import { editMasterThunk } from '../../../redux/slices/master/MasterThunks';

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

type MasterModalProps = {
  master: MasterType;
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function MasterModal({ master, open, setOpen }: MasterModalProps): JSX.Element {
  const [input, setInput] = useState<MasterFormType>({
    name: master.name,
    desc: master.desc,
    img: master.img,
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
          name="name"
          variant="outlined"
          placeholder="Имя"
          value={input.name}
          onChange={changeHandler}
        />
        <TextField
          name="desc"
          variant="outlined"
          placeholder="Описание"
          value={input.desc}
          onChange={changeHandler}
        />
        <TextField
          name="img"
          variant="outlined"
          placeholder="Изображение"
          value={input.img}
          onChange={changeHandler}
        />
        <Button
          onClick={() => {
            void dispatch(editMasterThunk({ id: master.id, formData: input }));
            setOpen(false);
          }}
        >
          Сохранить изменения
        </Button>
      </Box>
    </Modal>
  );
}
