import React from 'react';
import { Button, Card, CardContent, CardHeader, Typography } from '@mui/material';
import type { ApplicationType } from '../../../types/applicationTypes';
import { useAppDispatch } from '../../../redux/hooks';
import {
  changeStatusApplicationThunk,
  deleteApplicationThunk,
} from '../../../redux/slices/application/ApplicationThunks';

type ApplicationItemTypeProps = {
  application: ApplicationType;
};
export default function ApplicationCard({ application }: ApplicationItemTypeProps): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <Card sx={{ width: 500, height: 250, borderRadius: '10px', marginBottom: '20px', marginTop: '20px' }}>
      <CardHeader title={`Заявка  #${application.id}`} />
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography sx={{ mt: 1, fontSize: 20,  }}>{` Клиент: ${application.clientName}`}</Typography>
        <Typography sx={{ mt: 1, fontSize: 20 }}>{` Номер телефона: ${application.clientName}`}</Typography>
        {!application.status && (
          <Button
            variant="contained"
            style={{ marginTop: '30px' }}
            onClick={() =>
              void dispatch(
                changeStatusApplicationThunk({ id: application.id, status: !application.status }),
              )
            }
          >
            Принята
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
