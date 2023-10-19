import { Box, Button, Grid, TextField, Typography } from '@mui/material';
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
      <Typography
        variant="h4"
        component="div"
        style={{ textAlign: 'center', marginBottom: '20px' }}
      >
        Добавить категорию
      </Typography>
      <Grid container flexDirection="column" rowGap={3} alignItems="center" backgroundColor="white">
        <Grid item xs={5}>
          <TextField
            name="name"
            variant="outlined"
            placeholder="Название категории"
            value={inputs.name}
            onChange={changeHandler}
          />
        </Grid>
        <Grid item xs={5}>
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
        </Grid>
      </Grid>
    </Box>
  );
}
