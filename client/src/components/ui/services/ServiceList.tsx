import React, { useEffect } from 'react';

import { Box, Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { getServiceThunk } from '../../../redux/slices/service/ServiceThunks';
import ServiceCard from './ServiceCard';

export default function ServiceList(): JSX.Element {
  const dispatch = useAppDispatch();
  const {categoryId} = useParams();

  
  useEffect(() => {
    void dispatch(getServiceThunk(Number(categoryId)));
  }, []);

  const services = useAppSelector((store) => store.services);
  

  return (
    <Box mt={5}>
      <Container>
        {services?.map((service) => <ServiceCard key={service.id} service={service} />)}
      </Container>
    </Box>
  );
}
