/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState } from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';

import type { MasterType } from '../../../../types/masterTypes';

import OnlineModalRecordMaster from './modalMaster/OnlineModalRecordMaster';

type MasterCardProps = {
  master: MasterType;
};

export default function OnlineMasterCard({ master }: MasterCardProps): JSX.Element {
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
            <CardMedia component="img" height="240" image={master.img} alt="Image" />
            <CardContent>
              <Typography variant="h5" component="div">
                {master.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {master.desc}
              </Typography>
              <Box>
                <Button variant="contained" onClick={handleOpen}>
                 Записаться
                </Button>
              </Box>
              <OnlineModalRecordMaster open={open} setOpen={setOpen} master={master} />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
