import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import SaleFrom from '../ui/Sale/SaleFrom';
import SaleItem from '../ui/Sale/SaleItem';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getSaleThunk } from '../../redux/slices/sale/SaleThunks';

export default function SalePage(): JSX.Element {

  const sale = useAppSelector((store) => store.sale);
  const user = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(getSaleThunk());
  }, []);
  return (
    <>
      <SaleFrom />
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <Grid container spacing={2}>
          {sale.map((el) => (
            <Grid item xs={6} key={el.id}>
              <SaleItem sale={el} />
            </Grid>
          ))}
        </Grid>
      </div>

    </>
  );
}
