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
    <Card sx={{ width: 500, height: 200, borderRadius: '10px', marginBottom: '20px' }}>
      <CardHeader title="Заявка от клиента" />
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography sx={{ mt: 1, fontSize: 20 }}>{application.clientName}</Typography>
        <Typography sx={{ mt: 1, fontSize: 18 }}>{application.phone}</Typography>
        {!application.status && (
          <Button
            variant="contained"
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
