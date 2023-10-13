import React, { useEffect } from 'react';
import { Box, Container } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import ServiceCard from './ServiceCard';
import { getServiceThunk } from '../../../redux/slices/service/ServiceThunks';

export default function ServiceList(): JSX.Element {
  const services = useAppSelector((store) => store.services);

  const dispatch = useAppDispatch();
  useEffect(() => {
    void dispatch(getServiceThunk());
  }, []);

  const user = useAppSelector((store) => store.user);
  return (
    <Box mt={5}>
      <Container>
        <h2>Наши сервисы:</h2>
        {services?.map((service) => <ServiceCard key={service.id} service={service} user={user} />)}
      </Container>
    </Box>
  );
}
