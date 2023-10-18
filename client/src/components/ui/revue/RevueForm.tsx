import { Box, Button, Rating, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import type { RevueFormType } from '../../../types/revueTypes';
import { addRevueThunk } from '../../../redux/slices/revue/RevueThunks';
import RevueWaitingModal from './RevueWaitingModal';

// посмотреть типы

export default function RevueForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.user);
  const [openWaitingModal, setOpenWaitingModal] = useState<boolean>(false);
  const [value, setValue] = React.useState<number>(0);

  const [inputs, setInputs] = useState<RevueFormType>({
    text: '',
    status: false,
    userId: (user.status === 'logged' && user.id) || 0,
    rating: 0,
    date: new Date(),
    User: [],
  });

  const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <TextField
        name="text"
        variant="standard"
        placeholder="Ваш отзыв"
        value={inputs.text}
        onChange={changeHandler}
      />
      <Box
        sx={{
          '& > legend': { mt: 2 },
        }}
      >
        <Typography component="legend">Оставьте оценку</Typography>
        <Rating
          style={{ color: '#4a875d' }}
          name="rating"
          variant="outlined"
          value={inputs.rating}
          onChange={changeHandler}
        />
      </Box>
      <Button
        type="submit"
        variant="outlined"
        size="large"
        onClick={() => {
          void dispatch(addRevueThunk(inputs));
          setInputs({
            text: '',
            status: false,
            userId: (user.status === 'logged' && user.id) || 0,
            User: [],
          });
          setOpenWaitingModal(true);
        }}
      >
        Отправить
      </Button>
      {openWaitingModal && (
        <RevueWaitingModal
          openWaitingModal={openWaitingModal}
          setOpenWaitingModal={setOpenWaitingModal}
        />
      )}
    </Box>
  );
}
