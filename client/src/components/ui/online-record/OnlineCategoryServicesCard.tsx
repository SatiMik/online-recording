/* eslint-disable no-return-assign */
/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { memo} from 'react';
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Box,
  Container,
  Link,
} from '@mui/material';

import { Link as NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';

import type { ServiceType } from '../../../types/serviceTypes';

type ServiceCardPropsType = {
  service: ServiceType;
};
const linkStyle = { color: 'violet', mr: 2, fontFamily: 'Raleway, Arial' };

function OnlineCategoryServicesCard({ service }: ServiceCardPropsType): JSX.Element {
//   const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.user);

  return (
    <Box mt={8}>
      <Container>
        <Card sx={{ maxWidth: 345 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {service.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Цена: {service.price} рублей
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Время процедуры: {service.time} минут
            </Typography>
          </CardContent>
          <CardActions>
            <Link key="record" component={NavLink} to={`/online-record/services/masters/${service.id}` }sx={linkStyle}>
              Перейти к выбору мастера
            </Link>
          </CardActions>
        </Card>
      </Container>
    </Box>
  );
}

export default memo(OnlineCategoryServicesCard);
