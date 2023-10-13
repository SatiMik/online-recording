import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useAppDispatch } from '../../../redux/hooks';

import type { CategoryFormType } from '../../../types/categoryTypes';
import { addCategoryThunk } from '../../../redux/slices/categories/CategoryThunks';

export default function CategoryForm(): JSX.Element {
  const dispatch = useAppDispatch();

  const [inputs, setInputs] = useState<CategoryFormType>({
    name: '',
  });

  const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <TextField
        name="name"
        variant="outlined"
        placeholder="Название категории"
        value={inputs.name}
        onChange={changeHandler}
      />

      <Button
        type="submit"
        variant="outlined"
        size="large"
        onClick={() => {
          void dispatch(addCategoryThunk(inputs));
          setInputs({ name: '' });
        }}
      >
        Добавить категорию
      </Button>
    </Box>
  );
}
