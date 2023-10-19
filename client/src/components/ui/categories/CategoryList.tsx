import React, { useEffect } from 'react';
import { Box, Container, Typography } from '@mui/material';

import Carousel from 'react-material-ui-carousel';
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
     
        <Typography>Рады представить вам услуги нашего салона! Для вашего удобства вы можете выбрать категорию и просмотреть перечень услуг, которые мы можем вам предложить</Typography>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {categories?.map((category) => (
            <CategoryCard key={category.id} category={category} user={user} style={{ flex: '0 0 calc(33.33% - 20px)' }} />
          ))}
        </div>
      </Container>
    </Box>
  );
}
