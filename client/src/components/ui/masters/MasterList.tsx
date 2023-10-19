import React, { useEffect } from 'react';
import { Box, Container, Grid } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { getMastersThunk } from '../../../redux/slices/master/MasterThunks';
import MasterCard from './MasterCard';

export default function MasterList(): JSX.Element {
  const masters = useAppSelector((store) => store.masters);

  const dispatch = useAppDispatch();
  useEffect(() => {
    void dispatch(getMastersThunk());
  }, []);

  const user = useAppSelector((store) => store.user);
  return (
  
    <Grid container spacing={1} wrap="wrap" justifyContent="center">
      {masters?.map((master) => (
        <Grid item xs={4}>
          <MasterCard
            key={master.id}
            master={master}
            user={user}
          />
        </Grid>
      ))}
    </Grid>
  );
}
