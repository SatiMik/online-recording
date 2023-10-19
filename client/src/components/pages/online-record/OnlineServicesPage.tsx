import { Box, Container } from '@mui/material';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { getCategories } from '../../../services/categoryService';
import { getCategoryThunk } from '../../../redux/slices/categories/CategoryThunks';
import OnlineMasterCard from '../../ui/online-record/masterRecord/OnlineMasterCard';
import OnlineServiceCard from '../../ui/online-record/serviceRecord/OnlineServiceCard';

export default function OnlineServicesPage(): JSX.Element {
  const categories = useAppSelector((store) => store.categories);
  const dispatch = useAppDispatch();
  useEffect(() => {
    void dispatch(getCategoryThunk());
  }, []);
  return (
    <Box mt={5}>
      <Container>
        <h2>Выберите категорию:</h2>
        {categories?.map((category) => (
          <>
            <h2>{category.name}</h2>
            {category?.Services.map((service) => (
              <OnlineServiceCard key={service.id} service={service} />
            ))}
          </>
        ))}
      </Container>
    </Box>
  );
}
