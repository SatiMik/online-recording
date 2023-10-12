import { Box, Container } from '@mui/material';
import React, { memo, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import type { CategoryType } from '../../../types/serviceTypes';
import { getServiceThunk } from '../../../redux/slices/service/ServiceThunks';
import ServiceCard from './ServiceCard';

type ServiceCardListPropsType = {
  category: CategoryType;
};

function ServiceCardList({ category }: ServiceCardListPropsType): JSX.Element {
//   console.log(category);
  
    const dispatch = useAppDispatch();
  useEffect(() => {
    void dispatch(getServiceThunk(category.id));
  }, []);

  const services = useAppSelector((store) => store.services);
//  console.log(services);
 

  return (
    <Box mt={5}>
      <Container>
     
        {services?.map((service) => <ServiceCard key={service.id} service={service} />)}
      </Container>
    </Box>
  );
}
export default memo(ServiceCardList);
