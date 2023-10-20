import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../../redux/hooks';
import type { ServiceFormType } from '../../../types/serviceTypes';
import { addServiceThunk } from '../../../redux/slices/service/ServiceThunks';

export default function ServiceForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const { categoryId } = useParams();

  const [inputs, setInputs] = useState<ServiceFormType>({
    name: '',
    price: 0,
    time: 0,
    categoryId: Number(categoryId),
  });

  const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <Box>
       <Typography variant="h4" component="div" style={{textAlign: 'center', marginBottom: '20px'}}>Добавить услугу</Typography>
      <Grid container flexDirection="column" rowGap={3} alignItems="center" backgroundColor="white">
        <Grid item xs={5}>
          <TextField
            name="name"
            variant="outlined"
            placeholder="Название услуги"
            value={inputs.name}
            onChange={changeHandler}
          />
        </Grid>
        <Grid item xs={5}>
          <TextField
            name="price"
            variant="outlined"
            placeholder="Цена"
            value={inputs.price}
            onChange={changeHandler}
          />
        </Grid>
        <Grid item xs={5}>
          <TextField
            name="time"
            variant="outlined"
            placeholder="Время оказания услуги"
            value={inputs.time}
            onChange={changeHandler}
          />
        </Grid>

        <Grid item xs={5}>
          <Button
            type="submit"
            variant="outlined"
            size="large"
            onClick={() => {
              void dispatch(addServiceThunk(inputs));
              setInputs({
                name: '',
                price: 0,
                time: 0,
                categoryId: Number(categoryId),
              });
            }}
          >
            Send
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
