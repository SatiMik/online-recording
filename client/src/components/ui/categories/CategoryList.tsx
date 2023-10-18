import React, { useEffect } from 'react';
import { Box, Container } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import CategoryCard from './CategoryCard';
import { getCategoryThunk } from '../../../redux/slices/categories/CategoryThunks';

export default function CategoryList(): JSX.Element {
  const dispatch = useAppDispatch();
  useEffect(() => {
    void dispatch(getCategoryThunk());
  }, []);
  const categories = useAppSelector((store) => store.categories);

  console.log(categories);
  
  const user = useAppSelector((store) => store.user);
  return (
    <Box mt={5}>
      <Container>
        <h2>Категории</h2>
        {categories?.map((category) => (
          <CategoryCard key={category.id} category={category} user={user} />
        ))}
      </Container>
    </Box>
  );
}
