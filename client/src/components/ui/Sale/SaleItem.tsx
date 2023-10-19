import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import type { SaleType } from '../../../types/saleTypes';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { deleteSaleThunk, updateSaleThunk } from '../../../redux/slices/sale/SaleThunks';

type SaleItemProps = {
  sale: SaleType;
};

export default function SaleItem({ sale }: SaleItemProps): JSX.Element {
  const [isEditing, setIsEditing] = useState(false);
  const [newDescription, setNewDescription] = useState(sale.description);
  const user = useAppSelector((store) => store.user);

  const dispatch = useAppDispatch();
  return (
    <Box mt={1} style={{ width: '100%' }}>
      <Container style={{ padding: '16px', display: 'flex', alignItems: 'center' }}>
        <Card sx={{ width: '100%' }}>
          <CardContent>
            <CardMedia
              component="img"
              src={`${import.meta.env.VITE_BASE_URL}/img/${sale.img}`}
              style={{ width: '100%', height: '500px' }}
            />
            <Grid container spacing={1} justifyContent="center">
              {isEditing ? (
                <Grid item xs={12} marginTop={2}>
                  <TextField
                    type="text"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    style={{ width: '100%', height: '100px' }}
                  />
                </Grid>
              ) : (
                <Grid item xs={12} marginTop={2}>
                  <Typography
                    style={{ color: '#4a875d', width: '100%', height: '100px' }}
                    variant="h6"
                    color="text.secondary"
                  >
                    {sale.description}
                  </Typography>
                </Grid>
              )}

              {user.status === 'logged' && user.isAdmin && (
                <Grid container>
                  <Button onClick={() => void dispatch(deleteSaleThunk(sale.id))} size="medium">
                    Удалить
                  </Button>
                  {isEditing ? (
                    <Button
                      onClick={() => {
                        void dispatch(updateSaleThunk({ ...sale, description: newDescription }));
                        setIsEditing(false);
                      }}
                    >
                      Сохранить
                    </Button>
                  ) : (
                    <Button onClick={() => setIsEditing(true)}>Редактировать</Button>
                  )}
                </Grid>
              )}
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
