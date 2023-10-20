import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import { Container, Grid, Typography } from '@mui/material';
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
      <Container>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '70px' }}>
          <div
            style={{ textAlign: 'center', fontWeight: 300, fontSize: '20px', width: '200px' }}
            className="item"
          >
            <img
              style={{ marginBottom: '20px' }}
              src="https://gorod-krasoti.com/wp-content/uploads/2021/08/specialists.svg"
              alt=""
            />
            <h5>лучшие специалисты</h5>
          </div>
          <div
            style={{ textAlign: 'center', fontWeight: 300, fontSize: '20px', width: '200px' }}
            className="item"
          >
            <img
              style={{ marginBottom: '20px' }}
              src="https://gorod-krasoti.com/wp-content/uploads/2021/08/krasota.svg"
              alt=""
            />
            <h5>красота и комфорт</h5>
          </div>
          <div
            style={{ textAlign: 'center', fontWeight: 300, fontSize: '20px', width: '200px' }}
            className="item"
          >
            <img
              style={{ marginBottom: '20px' }}
              src="https://gorod-krasoti.com/wp-content/uploads/2021/08/acii.svg"
              alt=""
            />
            <h5>скидки и акции</h5>
          </div>
          <div
            style={{ textAlign: 'center', fontWeight: 300, fontSize: '20px', width: '200px' }}
            className="item"
          >
            <img
              style={{ marginBottom: '20px' }}
              src="https://gorod-krasoti.com/wp-content/uploads/2021/08/location.svg"
              alt=""
            />
            <h5>удобное расположение</h5>
          </div>
          <div
            style={{ textAlign: 'center', fontWeight: 300, fontSize: '20px', width: '200px' }}
            className="item"
          >
            <img
              style={{ marginBottom: '20px' }}
              src="https://gorod-krasoti.com/wp-content/uploads/2021/08/card.svg"
              alt=""
            />
            <h5>доступные цены</h5>
          </div>
        </div>
      </Container>
      <Box mt={5}>
        <Typography
          style={{ fontWeight: 'bold', fontSize: '27px', color: '#566F5F', padding: '20px' }}
        >
          Наши мастера
        </Typography>
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
