/* eslint-disable no-return-assign */
/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { memo, useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
  Container,
} from '@mui/material';

import type { UserLoadingType } from '../../../types/userTypes';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';

import ServiceModal from './ServiceModal';
import type { ServiceType } from '../../../types/serviceTypes';
import { deleteServiceThunk } from '../../../redux/slices/service/ServiceThunks';

type ServiceCardPropsType = {
  service: ServiceType;
};

function ServiceCard({ service }: ServiceCardPropsType): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.user);
  // console.log(service);

  return (
    <Box mt={8}>
      <Container>
        <Card sx={{ maxWidth: 345 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {service.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {service.price}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {service.time}
            </Typography>
          </CardContent>
          <CardActions>
            {user.status === 'logged' && user?.isAdmin && (
              <>
                <Button
                  onClick={() => void dispatch(deleteServiceThunk({ id: service.id }))}
                  size="small"
                >
                  Удалить
                </Button>
                <Button onClick={() => setOpen(true)} size="small">
                  Редактировать
                </Button>
              </>
            )}
          </CardActions>
          {open && <ServiceModal open={open} service={service} setOpen={setOpen} />}
        </Card>
      </Container>
    </Box>
  );
}

export default memo(ServiceCard);
