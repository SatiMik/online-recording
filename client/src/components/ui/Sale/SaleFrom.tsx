import React, { useState } from 'react';
import { Box, Button, Grid, TextField } from '@mui/material';
import type { SaleFormType } from '../../../types/saleTypes';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { addSaleThunk } from '../../../redux/slices/sale/SaleThunks';

export default function SaleForm(): JSX.Element {
  const [input, setInput] = useState({ description: '', img: '' });

  const dispatch = useAppDispatch();

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const description = e.currentTarget.description as HTMLInputElement;
    const fileInput = e.currentTarget.file as HTMLInputElement;

    if (!description.value || !fileInput.files || !fileInput.files[0]) return;

    const formData = new FormData();
    formData.append('description', description.value);
    formData.append('file', fileInput.files[0]);

    e.currentTarget.reset();
    void dispatch(addSaleThunk(formData));
  };

  return (
    <Box component="form" onSubmit={submitHandler}>
      <Grid container spacing={3} flexDirection="column" alignItems="center">
        <Grid item xs={5}>
          <TextField
            name="description"
            label="Название акции"
            placeholder="Название акции"
            onChange={changeHandler}
            style={{ width: '400px' }}
          />
        </Grid>
        <Grid item xs={5}>
          <TextField style={{ width: '400px' }} variant="outlined" placeholder="Изображение" type="file" name="file" />
        </Grid>
        <Grid item xs={5}>
          <Button style={{ height: '55px', marginLeft:'30px' }} type="submit" variant="contained">
            Загрузить файл
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
