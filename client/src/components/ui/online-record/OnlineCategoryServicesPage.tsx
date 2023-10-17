import React, { useEffect } from 'react';
import { Box, Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { getServiceThunk } from '../../../redux/slices/service/ServiceThunks';
import OnlineCategoryServicesCard from './OnlineCategoryServicesCard';

export default function OnlineCategoryServicesPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const services = useAppSelector((store) => store.services);
  const { categoryId } = useParams();

  useEffect(() => {
    void dispatch(getServiceThunk(Number(categoryId)));
  }, []);

  console.log(services);
  
 
  return (
    <Box>
      <Container>
        <h2>Название категории</h2>
        {services?.map((service) => (
          <OnlineCategoryServicesCard key={service.id} service={service} />
        ))}
      </Container>
    </Box>
  );
}
