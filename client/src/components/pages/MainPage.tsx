import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import { Container, Grid } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getMastersThunk } from '../../redux/slices/master/MasterThunks';
import MasterCard from '../ui/masters/MasterCard';
import ImageCarousel from './ImageCarousel';

export default function MainPage(): JSX.Element {
  const masters = useAppSelector((store) => store.masters);

  const dispatch = useAppDispatch();
  useEffect(() => {
    void dispatch(getMastersThunk());
  }, []);

  const user = useAppSelector((store) => store.user);
  return (
    <Container>
      <ImageCarousel />
      <Box mt={5}>
        <h2>Лучшие мастера:</h2>
        <Grid container spacing={2}>
          {masters?.map((master) => (
            <Grid item xs={6} key={master.id}>
              <MasterCard master={master} user={user} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
