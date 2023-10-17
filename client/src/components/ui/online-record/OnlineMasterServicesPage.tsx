import React, { useEffect } from 'react';
import { Box, Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { getMasterServicesThunk } from '../../../redux/slices/masrterService/MasterServiceThunk';
import OnlineMasterServiceCard from './OnlineMasterServiceCard';

export default function OnlineMasterServicesPage(): JSX.Element {
  const services = useAppSelector((store) => store.masterService);
  const masterId = useParams();

  const dispatch = useAppDispatch();
  useEffect(() => {
    void dispatch(getMasterServicesThunk(masterId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box mt={5}>
      <Container>
        <h2>Услуги этого мастера</h2>
        {services?.map((service) => <OnlineMasterServiceCard key={service.id} service={service} />)}
      </Container>
    </Box>
  );
}
