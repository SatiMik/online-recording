import React from 'react';
import { Box, Container } from '@mui/material';

import ServiceCardList from './ServiceCardList';
import type { CategoryType } from '../../../types/serviceTypes';

type ServiceListPropsType = {
  categories: CategoryType[];
};

export default function ServiceList({ categories }: ServiceListPropsType): JSX.Element {
  return (
    <Box mt={5}>
      <Container>
        <h2>Услуги:</h2>
        {categories?.map((category) => (
          <>
            <h2>{category.name}</h2>
            <ServiceCardList key={category.id} category={category} />
          </>
        ))}
      </Container>
    </Box>
  );
}
