/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState } from 'react';
import { Grid, Card, CardContent, Typography, Button, Box } from '@mui/material';
import type { ServiceType } from '../../../../types/serviceTypes';
import OnlineModalRecordService from './modalService/OnlineModalRecordService';


type ServiceCardProps = {
  service: ServiceType;
};

export default function OnlineServiceCard({ service }: ServiceCardProps): JSX.Element {
  const [open, setOpen] = useState(false);
  const handleOpen = (): void => {
    setOpen(true);
  };

  return (
    <Grid container spacing={2} sx={{}}>
      {Array.from({ length: 1 }).map((_, idx) => (
        <Grid
          item
          key={idx}
          xs={12}
          sm={4}
          md={4}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: '100px',
          }}
        >
          <Card sx={{ width: 345 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                {service.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {service.price}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {service.time}
              </Typography>
              <Box>
                <Button variant="contained" onClick={handleOpen}>
                Записаться
                </Button>
              </Box>
              <OnlineModalRecordService open={open} setOpen={setOpen} service={service} />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
