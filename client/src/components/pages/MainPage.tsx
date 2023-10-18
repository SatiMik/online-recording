import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import { Container } from '@mui/material';
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
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {masters?.map((master) => (
            <div key={master.id} style={{  padding: '10px' }}>
              <MasterCard master={master} user={user} />
            </div>
          ))}
        </div>      
        </Box>
    </Container>
  );
}
