import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useAppDispatch } from '../../../redux/hooks';
import type { MasterFormType } from '../../../types/masterTypes';
import { addMasterThunk } from '../../../redux/slices/master/MasterThunks';

export default function MasterForm(): JSX.Element {
  const dispatch = useAppDispatch();

  const [inputs, setInputs] = useState<MasterFormType>({
    name: '',
    desc: '',
    img: '',
  });

  const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <TextField
        name="name"
        variant="outlined"
        placeholder="Имя"
        value={inputs.name}
        onChange={changeHandler}
      />
      <TextField
        name="desc"
        variant="outlined"
        placeholder="Описание"
        value={inputs.desc}
        onChange={changeHandler}
      />
      <TextField
        name="img"
        variant="outlined"
        placeholder="Изображение"
        value={inputs.img}
        onChange={changeHandler}
      />

      <Button
        type="submit"
        variant="outlined"
        size="large"
        onClick={() => void dispatch(addMasterThunk(inputs))}
      >
        Send
      </Button>
    </Box>
  );
}
