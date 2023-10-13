/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from 'react';

import { Box, Button, Modal, TextField } from '@mui/material';

import { useAppDispatch } from '../../../redux/hooks';
import type { CategoryFormType, CategoryType } from '../../../types/categoryTypes';
import { editCategoryThunk } from '../../../redux/slices/categories/CategoryThunks';

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

type CategoryModalProps = {
  category: CategoryType;
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function CategoryModal({
  category,
  open,
  setOpen,
}: CategoryModalProps): JSX.Element {
  const [input, setInput] = useState<CategoryFormType>({
    name: category.name,
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
          placeholder="Название категории"
          value={input.name}
          onChange={changeHandler}
        />

        <Button
          onClick={() => {
            void dispatch(editCategoryThunk({ id: category.id, formData: input }));
            setOpen(false);
          }}
        >
          Сохранить изменения
        </Button>
      </Box>
    </Modal>
  );
}
