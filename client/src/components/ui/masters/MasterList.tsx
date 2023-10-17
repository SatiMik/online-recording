import React, { useEffect } from 'react';
import { Box, Container } from '@mui/material';


import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { getMastersThunk } from '../../../redux/slices/master/MasterThunks';
import MasterCard from './MasterCard';



export default function MasterList(): JSX.Element {
  const masters = useAppSelector((store) => store.masters);

  const dispatch = useAppDispatch();
  useEffect(() => {
    void dispatch(getMastersThunk())
  }, []);

  const user = useAppSelector(store => store.user)
  return (
    <Box mt={5}>
      <Container>
        <h2>Наши мастера:</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {masters?.map((master) => (
            <MasterCard key={master.id} master={master} user={user} style={{ flexBasis: '33.33%', padding: '10px' }} />
          ))}
        </div>
      </Container>
    </Box>
  );
}
