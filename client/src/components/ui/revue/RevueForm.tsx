import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import type { RevueFormType } from '../../../types/revueTypes';
import { addRevueThunk } from '../../../redux/slices/revue/RevueThunks';

export default function RevueForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.user);

  const [inputs, setInputs] = useState<RevueFormType>({
    text: '',
    status: false,
    userId: (user.status === 'logged' && user.id) || 0,
  });

  const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <TextField
        name="text"
        variant="outlined"
        placeholder="Ваш отзыв"
        value={inputs.text}
        onChange={changeHandler}
      />

      <Button
        type="submit"
        variant="outlined"
        size="large"
        onClick={() => void dispatch(addRevueThunk(inputs))}
      >
        Отправить
      </Button>
    </Box>
  );
}
