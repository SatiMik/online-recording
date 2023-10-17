import { Box, Button, TextField } from '@mui/material';
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
    <Box display="flex" flexDirection="column" alignItems="center">
      <TextField
        name="name"
        variant="outlined"
        placeholder="Название услуги"
        value={inputs.name}
        onChange={changeHandler}
      />
      <TextField
        name="price"
        variant="outlined"
        placeholder="Цена"
        value={inputs.price}
        onChange={changeHandler}
      />
      <TextField
        name="time"
        variant="outlined"
        placeholder="Время оказания услуги"
        value={inputs.time}
        onChange={changeHandler}
      />

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
    </Box>
  );
}
