import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import { Container } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getMastersThunk } from '../../redux/slices/master/MasterThunks';
import MasterCard from '../ui/masters/MasterCard';

export default function MainPage(): JSX.Element {
  const masters = useAppSelector((store) => store.masters);

  const dispatch = useAppDispatch();
  useEffect(() => {
    void dispatch(getMastersThunk());
  }, []);

  const user = useAppSelector((store) => store.user);
  return (
    <Container>
      <Box mt={5}>
        <h2>Лучшие мастера:</h2>
        {masters?.map((master) => <MasterCard key={master.id} master={master} user={user} />)}
      </Box>
    </Container>
  );
}
